import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePractice from '../hooks/usePractice';
import { getRandomQuestions, getRandomQuestionsFromIds, getAvailableCount, getQuestionsByIds } from '../services/questionService';
import { getWrongQuestions, getFavorites, getField } from '../services/storage';
import { getStudyQueue } from '../services/studyService';
import QuestionCard from '../components/question/QuestionCard';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import { ChevronLeft, ChevronRight, CheckCircle, Shuffle, Play, BookOpen, Star, Clock3, Sparkles } from 'lucide-react';

type SourceType = 'all' | 'wrong' | 'favorites' | 'unseen' | 'due';
const sourceNames = { all: '全部题库', wrong: '错题巩固', favorites: '我的收藏', unseen: '未做题', due: '到期复习' };

export default function RandomPage() {
  const practice = usePractice('random');
  const [params, setParams] = useSearchParams();
  const [started, setStarted] = useState(practice.questions.length > 0 && !params.get('source'));
  const [showSummary, setShowSummary] = useState(false);
  const [count, setCount] = useState<number | 'all'>(20);
  const [qType, setQType] = useState<'mixed' | 'single' | 'multiple'>('mixed');
  const [source, setSource] = useState<SourceType>(() => {
    const requested = params.get('source');
    return requested && Object.prototype.hasOwnProperty.call(sourceNames, requested) ? requested as SourceType : 'all';
  });
  const [error, setError] = useState('');
  const queue = getStudyQueue();
  const sourcePools = {
    all: null, wrong: [...getWrongQuestions()], favorites: [...getFavorites()], unseen: queue.unseen, due: queue.due,
  };
  const sourceIds = sourcePools[source];
  const availableCount = getAvailableCount(sourceIds, qType);
  const complete = practice.questions.length > 0 && practice.stats.answered === practice.questions.length;
  const firstUnanswered = practice.questions.findIndex(q => !practice.submittedIds.has(q.id));

  const startRandom = () => {
    const take = count === 'all' ? availableCount : Math.min(count, availableCount);
    let questions = sourceIds === null ? getRandomQuestions(take, qType)
      : getRandomQuestionsFromIds(sourceIds, take, qType);
    if (source === 'due') {
      // Keep the most overdue questions first, even when taking only a small batch.
      const byId = new Map(getQuestionsByIds(queue.due).map(q => [q.id, q]));
      questions = queue.due.flatMap(id => {
        const q = byId.get(id);
        return q && (qType === 'mixed' || q.type === qType) ? [q] : [];
      }).slice(0, take);
    }
    if (!questions.length) { setError('当前来源没有符合条件的题目，请换一个来源或题型。'); return; }
    setError('');
    practice.setQuestions(questions);
    setShowSummary(false);
    setStarted(true);
    setParams({}, { replace: true });
  };

  if (!started) return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      <div className="card-glow rounded-2xl bg-bg-secondary p-5 sm:p-8">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-12 h-12 rounded-xl bg-primary-cyan/15 text-primary-cyan flex items-center justify-center"><Shuffle size={24} /></div>
          <div><h1 className="text-xl font-bold">练习，把知识留住</h1><p className="text-sm text-text-secondary mt-1">选一组适合现在的题，按自己的节奏练习。</p></div>
        </div>
        <fieldset className="mb-7">
          <legend className="text-sm font-semibold mb-3">01 · 练什么</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {([
              ['all', Shuffle], ['unseen', Sparkles], ['due', Clock3], ['wrong', BookOpen], ['favorites', Star],
            ] as const).map(([value, Icon]) => {
              const size = getAvailableCount(sourcePools[value], 'mixed');
              return <button key={value} onClick={() => { setSource(value); setError(''); }} aria-pressed={source === value}
                className={`rounded-xl border p-3 text-left transition-colors ${source === value ? 'border-primary bg-primary/10 text-primary-light' : 'border-white/10 bg-bg-card text-text-secondary hover:border-primary/40'}`}>
                <Icon size={17} className="mb-2" /><div className="text-sm font-medium">{sourceNames[value]}</div><div className="text-xs text-text-secondary mt-1">{size} 题</div>
              </button>;
            })}
          </div>
          {source === 'due' && <p className="mt-3 text-xs text-text-secondary leading-relaxed">按 1、3、7、14、30 天安排复习，优先练逾期题；答错后从 1 天重新开始。</p>}
        </fieldset>
        <fieldset className="mb-7">
          <legend className="text-sm font-semibold mb-3">02 · 练多少</legend>
          <div className="flex flex-wrap gap-2">{[10, 20, 30, 60, 'all'].map(n => (
            <button key={n} onClick={() => setCount(n as number | 'all')} aria-pressed={count === n}
              className={`px-4 py-2 rounded-lg text-sm border ${count === n ? 'bg-primary text-white border-primary' : 'bg-bg-card text-text-secondary border-white/10'}`}>
              {n === 'all' ? '全部' : `${n} 题`}
            </button>
          ))}</div>
        </fieldset>
        <fieldset className="mb-7">
          <legend className="text-sm font-semibold mb-3">03 · 题型</legend>
          <div className="flex flex-wrap gap-2">{([['mixed', '混合'], ['single', '仅单选'], ['multiple', '仅多选']] as const).map(([value, label]) => (
            <button key={value} onClick={() => setQType(value)} aria-pressed={qType === value}
              className={`px-4 py-2 rounded-lg text-sm border ${qType === value ? 'border-primary-cyan text-primary-cyan bg-primary-cyan/10' : 'border-white/10 bg-bg-card text-text-secondary'}`}>{label}</button>
          ))}</div>
        </fieldset>
        <p className="text-xs text-text-secondary mb-4" aria-live="polite">当前可练 {availableCount} 题，本轮将抽取 {count === 'all' ? availableCount : Math.min(count, availableCount)} 题。</p>
        {error && <p role="alert" className="text-sm text-danger mb-3">{error}</p>}
        <Button variant="primary" size="lg" onClick={startRandom} disabled={availableCount === 0} className="w-full"><Play size={17} /> 开始练习</Button>
      </div>
    </div>
  );

  if (showSummary && complete) return (
    <div className="max-w-lg mx-auto card-glow rounded-2xl bg-bg-secondary p-8 text-center animate-fade-in">
      <CheckCircle size={40} className="text-success mx-auto mb-4" />
      <h1 className="text-2xl font-bold">这一轮，完成了</h1>
      <p className="text-sm text-text-secondary mt-2">共 {practice.stats.answered} 题 · 正确 {practice.stats.correct} 题 · 正确率 {Math.round(practice.stats.correct / practice.stats.answered * 100)}%</p>
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Button variant="secondary" onClick={() => setShowSummary(false)}>回看本轮解析</Button>
        <Button variant="primary" onClick={() => { practice.reset(); setStarted(false); setShowSummary(false); }}><Shuffle size={16} /> 再来一轮</Button>
      </div>
    </div>
  );

  if (!practice.currentQuestion) return null;
  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      <div className="card-glow rounded-xl bg-bg-secondary p-4">
        <div className="flex flex-wrap justify-between gap-2 text-xs mb-3">
          <span className="text-text-secondary">已提交 {practice.stats.answered} / {practice.questions.length} 题 · 本轮进度自动保存</span>
          <span className="text-primary-light">正确率 {practice.stats.answered ? Math.round(practice.stats.correct / practice.stats.answered * 100) : 0}%</span>
        </div>
        <ProgressBar value={practice.stats.answered} max={practice.questions.length} color="cyan" size="sm" />
        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="题目导航">
          {practice.questions.map((q, i) => <button key={q.id} onClick={() => practice.goTo(i)}
            aria-label={`第 ${i + 1} 题${practice.submittedIds.has(q.id) ? '，已提交' : '，未提交'}`} aria-current={i === practice.currentIndex ? 'step' : undefined}
            className={`w-8 h-8 rounded-md text-xs border ${i === practice.currentIndex ? 'border-primary text-primary-light ring-1 ring-primary' : practice.submittedIds.has(q.id) ? 'border-success/30 bg-success/10 text-success' : 'border-white/10 text-text-secondary'}`}>{i + 1}</button>)}
        </div>
      </div>
      <QuestionCard question={practice.currentQuestion} index={practice.currentIndex} total={practice.questions.length}
        userAnswer={practice.userAnswer} onAnswer={(_, answer) => practice.answerQuestion(answer)} showResult={practice.isSubmitted}
        isFavorited={practice.favorites.has(practice.currentQuestion.id)} onToggleFavorite={practice.toggleFavorite} />
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Button variant="ghost" onClick={practice.goPrev} disabled={practice.currentIndex === 0}><ChevronLeft size={16} /> 上一题</Button>
        <div className="flex gap-2 flex-wrap">
          {!practice.isSubmitted && <Button variant="primary" onClick={() => practice.submitAnswer()} disabled={!practice.userAnswer.length}><CheckCircle size={16} /> 提交答案</Button>}
          {practice.currentIndex < practice.questions.length - 1 && <Button variant={practice.isSubmitted ? 'primary' : 'secondary'} onClick={practice.goNext}>下一题 <ChevronRight size={16} /></Button>}
          {practice.currentIndex === practice.questions.length - 1 && !complete && firstUnanswered !== practice.currentIndex &&
            <Button variant="secondary" onClick={() => practice.goTo(firstUnanswered)}>继续未答题</Button>}
          {complete && <Button variant="primary" onClick={() => setShowSummary(true)}>查看本轮总结</Button>}
        </div>
      </div>
      <p className="text-xs text-text-secondary">{getField('autoAdvanceOnCorrect') === true ? '答对后 1 秒自动进入下一题，答错时停留看解析。' : '当前为手动翻页，可在设置中切换。'}离开此页或刷新后可继续本轮；关闭标签页后进度不保留。</p>
    </div>
  );
}
