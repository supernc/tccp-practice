import { StorageData } from '../types';

const STORAGE_KEY = 'tccp-practice-data';
const CURRENT_VERSION = 1;

// 默认存储数据
const defaultData: StorageData = {
  answerRecords: [],
  wrongQuestions: [],
  favorites: [],
  examHistory: [],
  dailyStats: {},
  lastStudyDate: '',
  streakDays: 0,
  version: CURRENT_VERSION,
};

// 获取完整存储数据
function getData(): StorageData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...defaultData };
  const parsed = JSON.parse(raw) as StorageData;
  // 版本迁移
  if (!parsed.version || parsed.version < CURRENT_VERSION) {
    return migrateData(parsed);
  }
  return parsed;
}

// 保存完整存储数据
function setData(data: StorageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 版本迁移
function migrateData(data: StorageData): StorageData {
  const migrated = { ...defaultData, ...data, version: CURRENT_VERSION };
  setData(migrated);
  return migrated;
}

// 获取指定字段
export function getField<K extends keyof StorageData>(key: K): StorageData[K] {
  return getData()[key];
}

// 更新指定字段
export function setField<K extends keyof StorageData>(key: K, value: StorageData[K]): void {
  const data = getData();
  data[key] = value;
  setData(data);
}

// 获取错题集合
export function getWrongQuestions(): Set<string> {
  return new Set(getField('wrongQuestions'));
}

// 添加错题
export function addWrongQuestion(questionId: string): void {
  const wrongs = getField('wrongQuestions');
  if (!wrongs.includes(questionId)) {
    setField('wrongQuestions', [...wrongs, questionId]);
  }
}

// 移除错题（做对后自动移除）
export function removeWrongQuestion(questionId: string): void {
  const wrongs = getField('wrongQuestions');
  setField('wrongQuestions', wrongs.filter(id => id !== questionId));
}

// 获取收藏集合
export function getFavorites(): Set<string> {
  return new Set(getField('favorites'));
}

// 切换收藏状态
export function toggleFavorite(questionId: string): boolean {
  const favs = getField('favorites');
  const index = favs.indexOf(questionId);
  if (index === -1) {
    setField('favorites', [...favs, questionId]);
    return true;
  } else {
    setField('favorites', favs.filter(id => id !== questionId));
    return false;
  }
}

// 获取考试历史
export function getExamHistory() {
  return getField('examHistory');
}

// 保存考试记录
export function saveExamRecord(record: StorageData['examHistory'][0]): void {
  const history = getField('examHistory');
  setField('examHistory', [...history, record]);
}

// 记录今日答题
export function recordDailyAnswer(isCorrect: boolean): void {
  const today = new Date().toISOString().split('T')[0];
  const dailyStats = getField('dailyStats');
  if (!dailyStats[today]) {
    dailyStats[today] = { answered: 0, correct: 0 };
  }
  dailyStats[today].answered += 1;
  if (isCorrect) {
    dailyStats[today].correct += 1;
  }
  setField('dailyStats', dailyStats);
  updateStreak(today);
}

// 更新连续打卡天数
function updateStreak(today: string): void {
  const lastDate = getField('lastStudyDate');
  if (lastDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastDate === yesterdayStr) {
    setField('streakDays', getField('streakDays') + 1);
  } else if (lastDate !== today) {
    setField('streakDays', 1);
  }
  setField('lastStudyDate', today);
}

// 保存答题记录
export function saveAnswerRecord(record: StorageData['answerRecords'][0]): void {
  const records = getField('answerRecords');
  records.push(record);
  // 最多保留最近 5000 条
  if (records.length > 5000) {
    records.splice(0, records.length - 5000);
  }
  setField('answerRecords', records);
}

// 获取所有答题记录
export function getAnswerRecords() {
  return getField('answerRecords');
}

// 清除所有数据
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// 导出所有存储 API
const storageService = {
  getData,
  getField,
  setField,
  getWrongQuestions,
  addWrongQuestion,
  removeWrongQuestion,
  getFavorites,
  toggleFavorite,
  getExamHistory,
  saveExamRecord,
  recordDailyAnswer,
  saveAnswerRecord,
  getAnswerRecords,
  clearAllData,
};

export default storageService;
