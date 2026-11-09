import { getAllQuestions } from '../data';
import { AnswerRecord } from '../types';
import { getAnswerRecords } from './storage';
import { localDateKey } from './date';

// A wrong answer restarts the schedule. Correct answers expand it to 1/3/7/14/30 days.
const REVIEW_INTERVALS = [1, 3, 7, 14, 30];

export function buildStudyQueue(records: AnswerRecord[], now = new Date()) {
  const history = new Map<string, { last: AnswerRecord; streak: number }>();
  for (const record of [...records].sort((a, b) => a.timestamp - b.timestamp)) {
    const previous = history.get(record.questionId);
    history.set(record.questionId, {
      last: record,
      streak: record.isCorrect ? (previous?.streak || 0) + 1 : 0,
    });
  }
  const unseen: string[] = [];
  const due: { id: string; date: string }[] = [];
  for (const question of getAllQuestions()) {
    const state = history.get(question.id);
    if (!state) { unseen.push(question.id); continue; }
    const reviewDate = new Date(state.last.timestamp);
    const interval = REVIEW_INTERVALS[Math.min(Math.max(state.streak - 1, 0), REVIEW_INTERVALS.length - 1)];
    reviewDate.setDate(reviewDate.getDate() + interval);
    const date = localDateKey(reviewDate);
    if (date <= localDateKey(now)) due.push({ id: question.id, date });
  }
  due.sort((a, b) => a.date.localeCompare(b.date));
  return { unseen, due: due.map(item => item.id), covered: getAllQuestions().length - unseen.length };
}

export function getStudyQueue() {
  return buildStudyQueue(getAnswerRecords());
}
