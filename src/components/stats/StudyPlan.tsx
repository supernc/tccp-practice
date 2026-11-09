import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock3, Sparkles, Target, BookOpen, Play } from 'lucide-react';
import { getStudyQueue } from '../../services/studyService';
import { getField, setField, getWrongQuestions } from '../../services/storage';
import { loadRandomSession } from '../../services/practiceSession';
import { getTotalCount } from '../../services/questionService';
import { StatsData } from '../../types';
import ProgressBar from '../common/ProgressBar';

export default function StudyPlan({ todayAnswered, chapterStats }: {
  todayAnswered: number; chapterStats: StatsData['chapterStats'];
}) {
  const navigate = useNavigate();
  const queue = getStudyQueue();
  const wrongCount = getWrongQuestions().size;
  const storedGoal = getField('dailyGoal');
  const goal = storedGoal && storedGoal >= 5 && storedGoal <= 100 ? storedGoal : 20;
  const session = loadRandomSession();
  const remaining = session ? session.questions.length - session.submitted.length : 0;
  const suggestion = remaining > 0
    ? { label: '继续上次练习', detail: `还有 ${remaining} 题，接着上次的位置继续。`, path: '/random' }
    : queue.due.length > 0
      ? { label: '先复习，再学新题', detail: `${queue.due.length} 道题已到复习时间，先把旧知识记牢。`, path: '/random?source=due' }
      : queue.unseen.length > 0
        ? { label: '今天，学一点新知识', detail: '从未做过的题开始，逐步覆盖五大章节。', path: '/random?source=unseen' }
        : { label: '保持手感，继续巩固', detail: '题库已全部练过，可以继续回顾或进行模拟考试。', path: '/exam' };

  return (
    <section className="card-glow rounded-2xl bg-bg-secondary overflow-hidden" aria-label="今日学习计划">
      <div className="grid lg:grid-cols-[1.5fr_1fr]">
        <div className="p-5 sm:p-6 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="flex items-center gap-2 text-xs text-primary-light mb-3"><Sparkles size={15} /> 今天从这里开始</div>
          <h2 className="text-xl font-bold mb-2">{suggestion.label}</h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-5">{suggestion.detail}</p>
          <button onClick={() => navigate(suggestion.path)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-white text-sm font-medium hover:bg-primary-dark">
            <Play size={15} />{remaining > 0 ? '继续练习' : '开始学习'}<ArrowRight size={15} />
          </button>
        </div>
        <div className="p-5 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/5">
          <div className="flex justify-between items-center gap-2 mb-4">
            <span className="flex items-center gap-2 text-sm font-semibold"><Target size={16} className="text-primary-cyan" />每日目标</span>
            <select aria-label="每日目标题数" value={goal} onChange={e => setField('dailyGoal', Number(e.target.value))}
              className="bg-bg-card text-xs text-text-secondary border border-white/10 rounded-lg px-2 py-1.5">
              {[5, 10, 20, 30, 50, 100].map(n => <option key={n} value={n}>{n} 题 / 天</option>)}
            </select>
          </div>
          <div className="text-3xl font-bold mb-3">{todayAnswered}<span className="text-sm text-text-secondary font-normal ml-2">/ {goal} 题</span></div>
          <ProgressBar value={Math.min(todayAnswered, goal)} max={goal} color="cyan" size="sm" />
          <p className="text-xs text-text-secondary mt-3">{todayAnswered >= goal ? '今日目标已完成，做得不错。' : `还差 ${goal - todayAnswered} 题，按自己的节奏来。`}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-white/5">
        {([
          { source: 'due', label: '到期复习', count: queue.due.length, icon: Clock3, color: 'text-warning' },
          { source: 'unseen', label: '未做题', count: queue.unseen.length, icon: Sparkles, color: 'text-primary-light' },
          { source: 'wrong', label: '错题巩固', count: wrongCount, icon: BookOpen, color: 'text-danger' },
        ]).map(({ source, label, count, icon: Icon, color }) => <button key={source} onClick={() => navigate(`/random?source=${source}`)}
          className="p-4 sm:p-5 text-left hover:bg-white/[0.03] border-r last:border-r-0 border-white/5">
          <Icon size={17} className={`${color} mb-2`} /><div className="text-xl font-bold">{count}<span className="text-xs text-text-secondary font-normal ml-1">题</span></div>
          <div className="text-xs text-text-secondary mt-1">{label}</div>
        </button>)}
      </div>
      <div className="p-5 sm:p-6 border-t border-white/5">
        <div className="flex flex-wrap justify-between gap-2 mb-4"><h3 className="text-sm font-semibold">题库覆盖进度</h3><span className="text-xs text-text-secondary">已练 {queue.covered} / {getTotalCount()} 题 · 同一题只计一次</span></div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3">
          {Object.entries(chapterStats).map(([id, chapter]) => <button key={id} onClick={() => navigate(`/practice?chapter=${id}`)} className="text-left rounded-xl bg-bg-card/60 p-3 hover:bg-bg-card">
            <div className="text-xs text-text-secondary mb-2 truncate" title={chapter.name}>Ch{id} · {chapter.name}</div>
            <div className="text-sm font-semibold mb-2">{chapter.uniqueAnswered}<span className="text-xs text-text-secondary font-normal"> / {chapter.total}</span></div>
            <ProgressBar value={chapter.uniqueAnswered} max={chapter.total || 1} color="primary" size="sm" />
          </button>)}
        </div>
      </div>
    </section>
  );
}
