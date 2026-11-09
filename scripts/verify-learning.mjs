// Pure regression checks use an isolated in-memory store; no browser/user data is read.
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
process.env.TZ = 'Asia/Shanghai';
const scratch = await mkdtemp(resolve(tmpdir(), 'tccp-check-'));
let checks = 0;
function test(name, action) { action(); checks++; console.log(`PASS ${name}`); }
class MemoryStorage {
  data = new Map();
  getItem(key) { return this.data.get(key) ?? null; }
  setItem(key, value) { this.data.set(key, String(value)); }
  removeItem(key) { this.data.delete(key); }
  clear() { this.data.clear(); }
}
globalThis.localStorage = new MemoryStorage();
globalThis.sessionStorage = new MemoryStorage();
globalThis.window = new EventTarget();
try {
  await build({
    stdin: { contents: `export * from './src/services/date'; export * from './src/services/storage'; export * from './src/services/statsService'; export * from './src/services/studyService'; export * from './src/services/practiceSession'; export * from './src/data';`, resolveDir: process.cwd() },
    bundle: true, platform: 'node', format: 'esm', outfile: resolve(scratch, 'services.mjs'), logLevel: 'silent',
  });
  const s = await import(pathToFileURL(resolve(scratch, 'services.mjs')));
  const all = s.getAllQuestions();
  const first = all[0];
  const now = new Date('2026-11-09T01:00:00+08:00');
  const record = (daysAgo, correct = true) => {
    const date = new Date(now); date.setDate(date.getDate() - daysAgo);
    return { questionId: first.id, userAnswer: first.answer, isCorrect: correct, timestamp: date.getTime(), mode: 'random' };
  };
  test('凌晨按本地日期记录，跨月日期正确', () => {
    assert.equal(s.localDateKey(now), '2026-11-09');
    assert.equal(s.daysAgoKey(1, new Date('2026-11-01T01:00:00+08:00')), '2026-10-31');
  });
  test('新题和复习题互不重叠；不把未做题加入复习', () => {
    const queue = s.buildStudyQueue([record(1)], now);
    assert.equal(queue.covered, 1); assert.equal(queue.unseen.length, all.length - 1);
    assert.deepEqual(queue.due, [first.id]); assert.ok(!queue.unseen.includes(first.id));
    assert.equal(s.buildStudyQueue([], now).due.length, 0);
  });
  test('复习间隔随答对延长，答错重新从 1 天开始', () => {
    assert.equal(s.buildStudyQueue([record(0)], now).due.length, 0);
    assert.equal(s.buildStudyQueue([record(5), record(2)], now).due.length, 0);
    assert.deepEqual(s.buildStudyQueue([record(6), record(3)], now).due, [first.id]);
    assert.deepEqual(s.buildStudyQueue([record(5), record(3), record(1, false)], now).due, [first.id]);
  });
  test('默认数据相互独立，不会在清空后残留内存中的旧记录', () => {
    const records = s.getAnswerRecords(); records.push(record(1));
    assert.equal(s.getAnswerRecords().length, 0);
  });
  test('章节覆盖按去重题目计数，实操题按真实章节归类', () => {
    const practical = s.getPracticalQuestions()[0];
    s.setField('answerRecords', [record(1), record(0), { ...record(0), questionId: practical.id }]);
    const stats = s.getStatsData();
    assert.equal(stats.chapterStats[first.chapter].uniqueAnswered, first.chapter === practical.chapter ? 2 : 1);
    assert.ok(stats.chapterStats[practical.chapter].uniqueAnswered >= 1);
  });
  test('导出含备注和目标，重复导入不重复，备注冲突保留本机', () => {
    s.setField('dailyGoal', 30); s.saveNote(first.id, '本机学习备注');
    const backup = JSON.parse(s.exportData());
    assert.equal(backup.notes[first.id], '本机学习备注'); assert.equal(backup.data.dailyGoal, 30);
    backup.data.answerRecords.push(backup.data.answerRecords[0]);
    backup.notes[first.id] = '其他设备备注'; backup.notes['another-question'] = '新增备注';
    assert.equal(s.importData(JSON.stringify(backup)).success, true);
    assert.equal(s.getAnswerRecords().length, 3);
    assert.equal(s.getNote(first.id), '本机学习备注'); assert.equal(s.getNote('another-question'), '新增备注');
    assert.equal(s.importData(JSON.stringify(backup)).success, true);
    assert.equal(s.getAnswerRecords().length, 3);
  });
  test('旧格式备份兼容，缺少可选字段不会导入失败', () => {
    assert.equal(s.importData(JSON.stringify({ answerRecords: [], wrongQuestions: [], favorites: [] })).success, true);
    assert.equal(s.getNote(first.id), '本机学习备注');
  });
  test('无效记录和备注导入被拒绝，原数据不变', () => {
    const before = s.exportData();
    for (const invalid of [{ answerRecords: [null] }, { notes: { bad: 12 } }, { dailyStats: { '2026-11-09': { answered: 1, correct: 2 } } }]) {
      const backup = JSON.parse(before);
      if (invalid.notes) backup.notes = invalid.notes; else Object.assign(backup.data, invalid);
      assert.equal(s.importData(JSON.stringify(backup)).success, false);
      assert.deepEqual(JSON.parse(s.exportData()).data, JSON.parse(before).data);
    }
  });
  test('刷新续做保留题序、选择、提交状态并过滤失效题目', () => {
    s.saveRandomSession({ questions: [all[2], first], currentIndex: 1, answers: { [first.id]: first.answer }, submitted: [first.id] });
    const restored = s.loadRandomSession();
    assert.deepEqual(restored.questions.map(q => q.id), [all[2].id, first.id]);
    assert.equal(restored.currentIndex, 1); assert.deepEqual(restored.submitted, [first.id]);
    sessionStorage.setItem(s.RANDOM_SESSION_KEY, '{invalid'); assert.equal(s.loadRandomSession(), null);
  });
  test('错题增量保存、去重；答对不删除，仅手动移除且可重新收录', () => {
    localStorage.clear();
    s.recordAnswerResult(record(2, false)); s.recordAnswerResult(record(1, false));
    assert.deepEqual([...s.getWrongQuestions()], [first.id]);
    s.recordAnswerResult(record(0, true));
    assert.deepEqual([...s.getWrongQuestions()], [first.id]);
    const stored = localStorage.getItem('tccp-practice-data');
    localStorage.clear(); localStorage.setItem('tccp-practice-data', stored);
    assert.deepEqual([...s.getWrongQuestions()], [first.id]);
    s.removeWrongQuestion(first.id); assert.equal(s.getWrongQuestions().size, 0);
    assert.equal(s.getField('wrongQuestions').length, 0);
    s.recordAnswerResult(record(0, false)); assert.equal(s.getWrongQuestions().size, 1);
  });
  test('翻页偏好包含在备份中，合并时保留本机设置', () => {
    s.setField('autoAdvanceOnCorrect', true); const backup = s.exportData();
    localStorage.clear(); assert.equal(s.importData(backup).success, true);
    assert.equal(s.getField('autoAdvanceOnCorrect'), true);
    s.setField('autoAdvanceOnCorrect', false); s.importData(backup);
    assert.equal(s.getField('autoAdvanceOnCorrect'), false);
  });
  test('断签显示归零；当天答题后实时更新统计与连续天数', () => {
    localStorage.clear();
    s.setField('lastStudyDate', '2000-01-01'); s.setField('streakDays', 99);
    assert.equal(s.getCurrentStreak(), 0);
    s.recordDailyAnswer(true);
    assert.equal(s.getTodayStats().answered, 1); assert.equal(s.getCurrentStreak(), 1);
    assert.equal(s.getField('lastStudyDate'), s.localDateKey());
  });
  test('清空覆盖所有学习数据（仅内存测试数据）', () => {
    s.clearAllData(); assert.equal(s.getAnswerRecords().length, 0); assert.equal(s.getDataSummary().notes, 0);
  });
  console.log(`\n${checks} regression checks passed.`);
} finally { await rm(scratch, { recursive: true, force: true }); }
