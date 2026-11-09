import { useState, useCallback, useEffect, useRef } from 'react';
import { loadRandomSession, saveRandomSession } from '../services/practiceSession';
import { Question } from '../types';
import { isAnswerCorrect } from '../services/examService';
import {
  recordAnswerResult,
  getField,
  toggleFavorite as toggleFav,
  getFavorites,
} from '../services/storage';

interface PracticeReturn {
  questions: Question[];
  currentIndex: number;
  currentQuestion: Question | null;
  userAnswer: string[];
  isSubmitted: boolean;
  isCorrect: boolean;
  stats: { answered: number; correct: number };
  favorites: Set<string>;
  submittedIds: Set<string>;
  setQuestions: (qs: Question[]) => void;
  answerQuestion: (answer: string[]) => void;
  submitAnswer: () => boolean;
  goNext: () => void;
  goPrev: () => void;
  goTo: (index: number) => void;
  toggleFavorite: (questionId: string) => void;
  reset: () => void;
}

export default function usePractice(mode: 'practice' | 'random' = 'practice'): PracticeReturn {
  const [restored] = useState(() => mode === 'random' ? loadRandomSession() : null);
  const [questions, setQuestionsState] = useState<Question[]>(restored?.questions || []);
  const [currentIndex, setCurrentIndex] = useState(restored?.currentIndex || 0);
  const [answers, setAnswers] = useState<Record<string, string[]>>(restored?.answers || {});
  const [submittedSet, setSubmittedSet] = useState<Set<string>>(() => new Set(restored?.submitted));
  const submittedRef = useRef(new Set(restored?.submitted));
  const [stats, setStats] = useState(() => ({
    answered: restored?.submitted.length || 0,
    correct: restored?.questions.filter(q => restored.submitted.includes(q.id) &&
      isAnswerCorrect(restored.answers[q.id] || [], q.answer, q.type)).length || 0,
  }));
  const [favorites, setFavorites] = useState<Set<string>>(getFavorites);
  const advanceTimer = useRef<number | null>(null);
  const cancelAutoAdvance = useCallback(() => {
    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
  }, []);
  useEffect(() => cancelAutoAdvance, [cancelAutoAdvance]);

  useEffect(() => {
    if (mode === 'random') saveRandomSession({ questions, currentIndex, answers, submitted: [...submittedSet] });
  }, [mode, questions, currentIndex, answers, submittedSet]);

  const currentQuestion = questions[currentIndex] || null;
  const userAnswer = currentQuestion ? (answers[currentQuestion.id] || []) : [];
  const isSubmitted = currentQuestion ? submittedSet.has(currentQuestion.id) : false;
  const isCorrect = currentQuestion && isSubmitted
    ? isAnswerCorrect(userAnswer, currentQuestion.answer, currentQuestion.type)
    : false;

  const setQuestions = useCallback((qs: Question[]) => {
    cancelAutoAdvance();
    setQuestionsState(qs);
    setCurrentIndex(0);
    setAnswers({});
    setSubmittedSet(new Set());
    submittedRef.current = new Set();
    setStats({ answered: 0, correct: 0 });
  }, [cancelAutoAdvance]);

  const answerQuestion = useCallback((answer: string[]) => {
    if (!currentQuestion || isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  }, [currentQuestion, isSubmitted]);

  const submitAnswer = useCallback((): boolean => {
    if (!currentQuestion || submittedRef.current.has(currentQuestion.id)) return false;
    const ans = answers[currentQuestion.id] || [];
    if (ans.length === 0) return false;

    const correct = isAnswerCorrect(ans, currentQuestion.answer, currentQuestion.type);
    submittedRef.current.add(currentQuestion.id);

    setSubmittedSet(prev => new Set(prev).add(currentQuestion.id));
    setStats(prev => ({
      answered: prev.answered + 1,
      correct: prev.correct + (correct ? 1 : 0),
    }));

    // 记录答题
    recordAnswerResult({
      questionId: currentQuestion.id,
      userAnswer: ans,
      isCorrect: correct,
      timestamp: Date.now(),
      mode,
    });

    if (correct && getField('autoAdvanceOnCorrect') === true && currentIndex < questions.length - 1) {
      cancelAutoAdvance();
      const submittedIndex = currentIndex;
      advanceTimer.current = window.setTimeout(() => {
        setCurrentIndex(index => index === submittedIndex ? index + 1 : index);
        advanceTimer.current = null;
      }, 1000);
    }

    return correct;
  }, [currentQuestion, isSubmitted, answers, mode, currentIndex, questions.length, cancelAutoAdvance]);

  const goNext = useCallback(() => {
    cancelAutoAdvance();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1));
    }
  }, [currentIndex, questions.length, cancelAutoAdvance]);

  const goPrev = useCallback(() => {
    cancelAutoAdvance();
    if (currentIndex > 0) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  }, [currentIndex, cancelAutoAdvance]);

  const goTo = useCallback((index: number) => {
    cancelAutoAdvance();
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  }, [questions.length, cancelAutoAdvance]);

  const toggleFavorite = useCallback((questionId: string) => {
    const isFav = toggleFav(questionId);
    setFavorites(getFavorites());
  }, []);

  const reset = useCallback(() => {
    cancelAutoAdvance();
    setQuestionsState([]);
    setCurrentIndex(0);
    setAnswers({});
    setSubmittedSet(new Set());
    submittedRef.current = new Set();
    setStats({ answered: 0, correct: 0 });
  }, [cancelAutoAdvance]);

  return {
    questions,
    currentIndex,
    currentQuestion,
    userAnswer,
    isSubmitted,
    isCorrect,
    stats,
    favorites,
    submittedIds: submittedSet,
    setQuestions,
    answerQuestion,
    submitAnswer,
    goNext,
    goPrev,
    goTo,
    toggleFavorite,
    reset,
  };
}
