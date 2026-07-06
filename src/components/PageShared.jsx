import { Icon } from './Icon.jsx';

export const goTo = (path) => {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'auto' });
};

export const SectionLabel = ({ children }) => (
  <div className="section-label"><span></span>{children}</div>
);

export function WorkCard({ work, index = 1 }) {
  return (
    <article className={`project-card fade-in d${Math.min(index, 5)}`}>
      <a href={`#/works/${work.id}`} onClick={(e) => { e.preventDefault(); goTo(`/works/${work.id}`); }}>
        <div className="project-thumb">
          <span className={`cat-pill ${work.catKey === '3d' ? 'green' : work.catKey === 'app' ? 'violet' : ''}`}>{work.cat}</span>
          {work.thumb}
        </div>
        <div className="project-body">
          <h3 className="project-name">{work.name}</h3>
          <p className="project-desc">{work.desc}</p>
          <div className="card-bottom">
            <div className="tags">{work.tags.slice(0, 4).map(([tag, color], i) => <span key={i} className={`tag ${color === 'blue' ? '' : color}`}>{tag}</span>)}</div>
            <Icon.Arrow/>
          </div>
        </div>
      </a>
    </article>
  );
}

export function DownloadRow({ file }) {
  return (
    <article className="download-row">
      <div className="download-thumb">{file.thumb}</div>
      <div className="download-info">
        <h3>{file.name}</h3>
        <p>{file.desc}</p>
        <div className="tags"><span className="tag">{file.kind}</span></div>
      </div>
      <span className="download-meta">{file.size}</span>
      <span className="download-meta">{file.date}</span>
      <a className="download-button" href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${file.name}\n${file.desc}`)}`} download={`${file.id}.txt`} aria-label={`${file.name}をダウンロード`}>
        ↓
      </a>
    </article>
  );
}


