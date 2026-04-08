import { useState } from 'react';
import usePractice from '../hooks/usePractice';
import { getRandomQuestions } from '../services/questionService';
import QuestionCard from '../components/question/QuestionCard';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import { ChevronLeft, ChevronRight, CheckCircle, Shuffle, Play } from 'lucide-react';

export default function RandomPage() {
  const practice = usePractice('random');
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(20);
  const [qType, setQType] = useState<'mixed' | 'single' | 'multiple'>('mixed');

  const startRandom = () => {
    const qs = getRandomQuestions(count, qType);
    practice.setQuestions(qs);
    setStarted(true);
  };

  const handleSubmit = () => {
    if (practice.userAnswer.length === 0) return;
    const correct = practice.submitAnswer();
    if (correct && practice.currentIndex < practice.questions.length - 1) {
      setTimeout(() => practice.goNext(), 1000);
    }
  };

  // 配置界面
  if (!started) {
    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <div className="card-glow rounded-2xl bg-bg-secondary p-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-cyan to-teal-500 flex items-center justify-center mx-auto mb-6">
            <Shuffle size={36} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">随机练习</h2>
          <p className="text-text-secondary text-sm mb-8">从题库中随机抽取题目进行练习</p>

          {/* 题数选择 */}
          <div className="mb-6">
            <label className="text-sm text-text-secondary mb-3 block">选择题目数量</label>
            <div className="flex gap-2 justify-center">
              {[10, 20, 30, 60].map(n => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    count === n
                      ? 'bg-primary text-white'
                      : 'bg-bg-card text-text-secondary hover:text-text-primary border border-white/10 hover:border-white/20'
                  }`}
                >
                  {n} 题
                </button>
              ))}
            </div>
          </div>

          {/* 题型选择 */}
          <div className="mb-8">
            <label className="text-sm text-text-secondary mb-3 block">选择题型</label>
            <div className="flex gap-2 justify-center">
              {[
                { value: 'mixed' as const, label: '混合' },
                { value: 'single' as const, label: '仅单选' },
                { value: 'multiple' as const, label: '仅多选' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setQType(value)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    qType === value
                      ? 'bg-primary-cyan text-white'
                      : 'bg-bg-card text-text-secondary hover:text-text-primary border border-white/10 hover:border-white/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <Button variant="primary" size="lg" onClick={startRandom} className="w-full">
            <Play size={18} /> 开始练习
          </Button>
        </div>
      </div>
    );
  }

  // 练习完成
  if (practice.currentIndex >= practice.questions.length - 1 && practice.isSubmitted) {
    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <div className="card-glow rounded-2xl bg-bg-secondary p-8 text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">练习完成！</h2>
          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-bg-card rounded-xl p-4">
              <div className="text-2xl font-bold text-success">{practice.stats.correct}</div>
              <div className="text-xs text-text-secondary">正确</div>
            </div>
            <div className="bg-bg-card rounded-xl p-4">
              <div className="text-2xl font-bold text-text-primary">
                {practice.stats.answered > 0 ? Math.round((practice.stats.correct / practice.stats.answered) * 100) : 0}%
              </div>
              <div className="text-xs text-text-secondary">正确率</div>
            </div>
          </div>
          <Button variant="primary" onClick={() => { setStarted(false); practice.reset(); }}>
            <Shuffle size={16} /> 再来一轮
          </Button>
        </div>
      </div>
    );
  }

  if (!practice.currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Progress */}
      <div className="card-glow rounded-xl bg-bg-secondary p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-secondary">
            进度：{practice.stats.answered}/{practice.questions.length}
          </span>
          <span className="text-xs">
            正确率：<span className="text-primary-light font-bold">
              {practice.stats.answered > 0 ? Math.round((practice.stats.correct / practice.stats.answered) * 100) : 0}%
            </span>
          </span>
        </div>
        <ProgressBar value={practice.stats.answered} max={practice.questions.length} color="cyan" size="sm" />
      </div>

      {/* Question */}
      <QuestionCard
        question={practice.currentQuestion}
        index={practice.currentIndex}
        total={practice.questions.length}
        userAnswer={practice.userAnswer}
        onAnswer={(_, ans) => practice.answerQuestion(ans)}
        showResult={practice.isSubmitted}
        isFavorited={practice.favorites.has(practice.currentQuestion.id)}
        onToggleFavorite={practice.toggleFavorite}
      />

      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        <Button variant="ghost" onClick={practice.goPrev} disabled={practice.currentIndex === 0}>
          <ChevronLeft size={16} /> 上一题
        </Button>
        {!practice.isSubmitted ? (
          <Button variant="primary" onClick={handleSubmit} disabled={practice.userAnswer.length === 0}>
            <CheckCircle size={16} /> 提交
          </Button>
        ) : (
          <Button variant="primary" onClick={practice.goNext}>
            下一题 <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
