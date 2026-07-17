import { Icon } from '../components/Icon.jsx';
import { goTo } from '../components/PageShared.jsx';
import { PROJECTS } from '../data/content.jsx';

const FACTS = [
  { key: 'target', label: 'ターゲット' },
  { key: 'purpose', label: '目的' },
  { key: 'result', label: '成果' },
];

export function WorkDetailPage({ id }) {
  const work = PROJECTS.find((entry) => entry.id === id) || PROJECTS[0];
  const facts = FACTS.filter(({ key }) => work[key]);
  return (
    <div className="page-enter">
      <section className="work-detail">
        <div className="wrap">
          <a href="#/works" onClick={(e) => { e.preventDefault(); goTo('/works'); }} className="back-link">← Works一覧に戻る</a>
          <div className="work-detail-grid">
            <div>
              <div className="work-meta"><span>{work.cat}</span><span>{work.year}</span></div>
              <h1 className="work-title">{work.name}</h1>
              <h2>概要</h2>
              <p>{work.overview}</p>
              <h2>特徴</h2>
              <ul>{work.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <h2>使用技術</h2>
              <div className="tags">{work.tags.map(([tag]) => <span key={tag} className="tag">{tag}</span>)}</div>
            </div>
            <div className="work-main-visual">{work.thumb}</div>
          </div>
          {facts.length > 0 && (
            <div className="work-facts">
              {facts.map(({ key, label }) => (
                <div key={key} className="work-fact">
                  <h2>{label}</h2>
                  <p>{work[key]}</p>
                </div>
              ))}
            </div>
          )}
          {work.url && (
            <div className="work-actions">
              <a className="btn btn-primary" href={work.url} target="_blank" rel="noopener noreferrer">サイトに飛ぶ <Icon.Arrow/></a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

