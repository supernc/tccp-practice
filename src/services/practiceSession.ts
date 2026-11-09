import { getQuestionsByIds } from './questionService';
import { Question } from '../types';

export const RANDOM_SESSION_KEY = 'tccp-random-session';
export interface RandomSession {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string[]>;
  submitted: string[];
}

export function loadRandomSession(): RandomSession | null {
  try {
    const raw = sessionStorage.getItem(RANDOM_SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!Array.isArray(data.ids) || !data.answers || typeof data.answers !== 'object' ||
        !Array.isArray(data.submitted)) return null;
    const byId = new Map(getQuestionsByIds(data.ids).map(q => [q.id, q]));
    const questions: Question[] = [...new Set<string>(data.ids)].flatMap(id => {
      const question = byId.get(id);
      return question ? [question] : [];
    });
    if (!questions.length) return null;
    const answers: Record<string, string[]> = {};
    for (const question of questions) {
      const answer = data.answers[question.id];
      if (Array.isArray(answer) && answer.every(label => question.options.some(opt => opt.label === label))) {
        answers[question.id] = [...new Set<string>(answer)];
      }
    }
    return {
      questions, answers,
      currentIndex: Number.isInteger(data.currentIndex) ? Math.max(0, Math.min(data.currentIndex, questions.length - 1)) : 0,
      submitted: [...new Set<string>(data.submitted)].filter(id => byId.has(id) && answers[id]?.length),
    };
  } catch { return null; }
}

export function saveRandomSession(session: RandomSession): void {
  if (!session.questions.length) { sessionStorage.removeItem(RANDOM_SESSION_KEY); return; }
  sessionStorage.setItem(RANDOM_SESSION_KEY, JSON.stringify({
    ids: session.questions.map(q => q.id), currentIndex: session.currentIndex,
    answers: session.answers, submitted: session.submitted,
  }));
}
