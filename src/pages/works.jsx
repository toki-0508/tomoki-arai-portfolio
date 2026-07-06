import { useMemo, useState } from 'react';
import { WorkCard } from '../components/PageShared.jsx';
import { PROJECTS } from '../data/content.jsx';

export function WorksPage() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'web', 'app', '3d', 'data'];
  const labels = { all: 'All', web: 'Web', app: 'App', '3d': '3D', data: 'Data' };
  const works = useMemo(() => filter === 'all' ? PROJECTS : PROJECTS.filter((work) => work.catKey === filter), [filter]);

  return (
    <div className="page-enter">
      <section className="page-header simple">
        <div className="wrap">
          <h1 className="page-title">Works</h1>
          <p className="page-kicker">制作実績</p>
          <p className="page-body">Web制作、アプリ、3Dデータなど、これまでに作ったものをまとめています。</p>
          <div className="tabs">
            {filters.map((id) => <button key={id} className={`tab ${filter === id ? 'active' : ''}`} onClick={() => setFilter(id)}>{labels[id]}</button>)}
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

