import { useState } from 'react';
import { DownloadRow } from '../components/PageShared.jsx';
import { DOWNLOADS } from '../data/content.jsx';

export function DownloadsPage() {
  const [filter, setFilter] = useState('all');
  const filters = [
    ['all', 'All'],
    ['3d', '3D Models'],
    ['templates', 'Templates'],
    ['data', 'Data'],
    ['assets', 'Assets'],
  ];
  const files = filter === 'all' ? DOWNLOADS : DOWNLOADS.filter((file) => file.category === filter);

  return (
    <div className="page-enter">
      <section className="page-header simple downloads-header">
        <div className="wrap">
          <h1 className="page-title">Downloads</h1>
          <p className="page-kicker">配布データ・素材</p>
          <div className="tabs">
            {filters.map(([id, label]) => <button key={id} className={`tab ${filter === id ? 'active' : ''}`} onClick={() => setFilter(id)}>{label}</button>)}
          </div>
        </div>
      </section>
      <section className="block downloads-block">
        <div className="wrap download-list">
          {files.length > 0 ? files.map((file) => <DownloadRow key={file.id} file={file}/>) : (
            <div className="empty-state">
              <div className="empty-mark">↓</div>
              <strong>まだ何もないようです</strong>
              <span>このカテゴリの公開データは準備中です。近日公開予定です。</span>
            </div>
          )}
          <p className="download-note">ダウンロードするデータは個人利用の範囲でご利用ください。商用利用や再配布については、利用条件をご確認ください。</p>
        </div>
      </section>
    </div>
  );
}

