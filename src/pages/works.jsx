import { useMemo, useState } from 'react';
import { WorkCard } from '../components/PageShared.jsx';
import { PROJECT_CATEGORIES, PROJECTS } from '../data/content.jsx';

export function WorksPage() {
  const [filter, setFilter] = useState('all');
  const works = useMemo(() => filter === 'all' ? PROJECTS : PROJECTS.filter((work) => work.catKey === filter), [filter]);

  return (
    <div className="page-enter">
      <section className="page-header simple">
        <div className="wrap">
          <h1 className="page-title">Works</h1>
          <p className="page-kicker">制作実績</p>
          <p className="page-body">Web制作、アプリ、3D、その他の制作物など、これまでに作ったものをまとめています。</p>
          <div className="tabs">
            {PROJECT_CATEGORIES.map(({ id, label }) => <button key={id} className={`tab ${filter === id ? 'active' : ''}`} onClick={() => setFilter(id)}>{label}</button>)}
          </div>
        </div>
      </section>
      <section className="block works-block">
        <div className="wrap grid-3">
          {works.length > 0 ? works.map((work, i) => <WorkCard key={work.id} work={work} index={i + 1}/>) : (
            <div className="empty-state">
              <div className="empty-mark">◇</div>
              <strong>まだ何もないようです</strong>
              <span>このカテゴリの作品は準備中です。近日公開予定です。</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
