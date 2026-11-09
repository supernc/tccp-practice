import { useState } from 'react';
import { Settings2, MousePointer2, FastForward, CheckCircle2 } from 'lucide-react';
import { getField, setField } from '../services/storage';

export default function SettingsPage() {
  const [autoAdvance, setAutoAdvance] = useState(() => getField('autoAdvanceOnCorrect') === true);
  const changeMode = (value: boolean) => { setField('autoAdvanceOnCorrect', value); setAutoAdvance(value); };
  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      <div><h1 className="text-xl font-bold flex items-center gap-2"><Settings2 size={22} className="text-primary-light" />学习设置</h1>
        <p className="text-sm text-text-secondary mt-2">按自己的节奏练习，设置自动保存。</p></div>
      <section className="card-glow rounded-2xl bg-bg-secondary p-5 sm:p-6">
        <h2 className="font-semibold mb-2">答对后的翻页方式</h2>
        <p className="text-sm text-text-secondary mb-5">适用于章节练习、随机练习和实操题。答错时始终停留，方便阅读解析。</p>
        <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="答对后的翻页方式">
          {[
            { value: false, title: '手动翻页', desc: '答对后停留，阅读解析，再点击下一题。', icon: MousePointer2 },
            { value: true, title: '自动翻页', desc: '答对后 1 秒进入下一题，可随时返回查看解析。', icon: FastForward },
          ].map(({ value, title, desc, icon: Icon }) => <button key={title} role="radio" aria-checked={autoAdvance === value} onClick={() => changeMode(value)}
            className={`rounded-xl border p-4 text-left ${autoAdvance === value ? 'border-primary bg-primary/10' : 'border-white/10 bg-bg-card'}`}>
            <div className="flex justify-between items-center mb-3"><Icon size={20} className="text-primary-light" />{autoAdvance === value && <CheckCircle2 size={18} className="text-primary-light" />}</div>
            <div className="text-sm font-semibold mb-2">{title}</div><p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
          </button>)}
        </div>
        <p className="text-xs text-success mt-4" role="status">已保存 · 当前使用{autoAdvance ? '自动翻页' : '手动翻页'}</p>
      </section>
      <section className="card-glow rounded-xl bg-bg-secondary p-5">
        <h2 className="text-sm font-semibold mb-2">错题集保存方式</h2>
        <p className="text-sm text-text-secondary leading-relaxed">错题会持续累积并保存在当前浏览器，刷新页面和后续答对都不会移除。需要时可到错题本点击“移除”。</p>
        <p className="text-xs text-text-secondary leading-relaxed mt-3">请固定使用同一个网页地址。不同浏览器、地址或端口的数据各自独立；换设备前可在“数据管理”中导出备份。</p>
      </section>
    </div>
  );
}
