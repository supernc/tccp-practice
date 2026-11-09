import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getWrongQuestions, getFavorites, removeWrongQuestion, toggleFavorite, restoreWrongQuestionsFromHistory, getAnswerRecords } from '../services/storage';
import { getQuestionsByIds } from '../services/questionService';
import { chapters } from '../data/chapters';
import useStats from '../hooks/useStats';
import QuestionCard from '../components/question/QuestionCard';
import Badge from '../components/common/Badge';
import { RotateCcw, Trash2, BookOpen, Star, Play, ChevronDown } from 'lucide-react';

export default function WrongBookPage() {
  useStats(); // React to new answers, explicit removals, imports and other browser tabs.
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'favorites' ? 'favorites' : 'wrong';
  const [filterChapter, setFilterChapter] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const wrongIds = [...getWrongQuestions()];
  const favIds = [...getFavorites()];
  const ids = tab === 'wrong' ? wrongIds : favIds;
  const allQuestions = getQuestionsByIds(ids);
  const questions = allQuestions.filter(q => !filterChapter || q.chapter === filterChapter);
  const records = getAnswerRecords();
  const historyCanRestore = records.some(r => !r.isCorrect && !wrongIds.includes(r.questionId));

  function removeWrong(id: string) {
    removeWrongQuestion(id);
    setMessage('已从错题集移除。以后再次答错时会重新收录。');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {([
            { value: 'wrong', label: '错题本', count: wrongIds.length, icon: BookOpen },
            { value: 'favorites', label: '收藏夹', count: favIds.length, icon: Star },
          ] as const).map(({ value, label, count, icon: Icon }) => <button key={value} onClick={() => { setParams(value === 'favorites' ? {tab: value} : {}); setMessage(''); }}
            aria-pressed={tab === value} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border ${tab === value ? 'bg-primary/15 text-primary-light border-primary/30' : 'bg-bg-card text-text-secondary border-white/10'}`}>
            <Icon size={16} />{label}<span className="text-xs">{count}</span>
          </button>)}
        </div>
        <button onClick={() => navigate(`/random?source=${tab === 'wrong' ? 'wrong' : 'favorites'}`)} disabled={!allQuestions.length}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed">
          <Play size={15} />{tab === 'wrong' ? '练习错题' : '练习收藏'}
        </button>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{tab === 'wrong' ? '错题持续累积，刷新或答对后都会保留。掌握后点击“移除”，由你决定何时移出错题集。' : '收藏的重点题目会一直保留，可在题目中点击星标取消。'}</p>
      {tab === 'wrong' && historyCanRestore && <div className="flex flex-wrap justify-between gap-3 rounded-xl bg-bg-card/60 border border-white/5 p-4">
        <p className="text-xs text-text-secondary leading-relaxed flex-1">如果以前的错题被自动移除了，可以从保留的答题记录中补回。也会补回你曾手动移除的历史错题。</p>
        <button onClick={() => setMessage(`已从答题记录中补回 ${restoreWrongQuestionsFromHistory()} 道错题。`)} className="inline-flex gap-1.5 items-center text-xs text-primary-light"><RotateCcw size={14} />补回历史错题</button>
      </div>}
      {message && <p role="status" className="text-xs text-primary-light rounded-lg bg-primary/10 p-3">{message}</p>}
      <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="章节筛选">
        {[{id: 0, name: '全部'}, ...chapters].map(ch => <button key={ch.id} onClick={() => setFilterChapter(ch.id || null)} aria-pressed={(filterChapter || 0) === ch.id}
          className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${((filterChapter || 0) === ch.id) ? 'bg-primary/15 text-primary-light' : 'bg-bg-card text-text-secondary'}`}>
          {ch.id ? `Ch${ch.id} ${ch.name}` : ch.name}
        </button>)}
      </div>
      {!questions.length ? <div className="card-glow rounded-2xl bg-bg-secondary p-8 text-center">
        <BookOpen size={32} className="mx-auto text-primary-light mb-3" /><h2 className="text-lg font-bold mb-2">{filterChapter ? '这个章节暂时没有题目' : tab === 'wrong' ? '暂无错题，继续保持' : '暂无收藏题目'}</h2>
        <p className="text-sm text-text-secondary">{filterChapter ? '可以切换到其他章节或查看全部。' : tab === 'wrong' ? '练习和模考中答错的题会自动收录到这里。' : '练习时点击星标，可以收藏重点题。'}</p>
      </div> : <div className="space-y-3">
        {questions.map((q, i) => <div key={q.id}>
          <div className="card-glow rounded-xl bg-bg-secondary flex items-center p-3 gap-2">
            <button onClick={() => setExpandedId(expandedId === q.id ? null : q.id)} aria-expanded={expandedId === q.id}
              className="flex items-center gap-2 flex-1 min-w-0 text-left p-1">
              <span className="text-xs text-text-secondary shrink-0">{i + 1}</span>
              <Badge variant="primary" size="sm">Ch{q.chapter}</Badge>
              <span className="text-sm text-text-primary truncate flex-1">{q.stem}</span>
              <ChevronDown size={15} className={`text-text-secondary shrink-0 ${expandedId === q.id ? 'rotate-180' : ''}`} />
            </button>
            {tab === 'wrong' && <button onClick={() => removeWrong(q.id)} aria-label={`移除错题：${q.stem}`} className="flex items-center gap-1 text-xs text-text-secondary hover:text-danger rounded-lg px-2 py-2 hover:bg-danger/10 shrink-0"><Trash2 size={14} />移除</button>}
          </div>
          {expandedId === q.id && <div className="mt-2 animate-slide-up"><QuestionCard question={q} index={i} total={questions.length} userAnswer={q.answer} onAnswer={() => {}} showResult
            isFavorited={getFavorites().has(q.id)} onToggleFavorite={toggleFavorite} /></div>}
        </div>)}
      </div>}
    </div>
  );
}
