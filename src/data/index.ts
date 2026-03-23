import { Question } from '../types';
import chapter1Data from './questions/chapter1.json';
import chapter2Data from './questions/chapter2.json';
import chapter3Data from './questions/chapter3.json';
import chapter4Data from './questions/chapter4.json';
import chapter5Data from './questions/chapter5.json';

// 合并所有章节题库
const allQuestions: Question[] = [
  ...(chapter1Data as Question[]),
  ...(chapter2Data as Question[]),
  ...(chapter3Data as Question[]),
  ...(chapter4Data as Question[]),
  ...(chapter5Data as Question[]),
];

// 获取全部题目
export function getAllQuestions(): Question[] {
  return allQuestions;
}

// 按章节获取题目
export function getQuestionsByChapter(chapter: number): Question[] {
  return allQuestions.filter(q => q.chapter === chapter);
}

// 按子章节获取题目
export function getQuestionsBySubChapter(subChapter: string): Question[] {
  return allQuestions.filter(q => q.subChapter === subChapter);
}

// 按 ID 获取单题
export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find(q => q.id === id);
}
