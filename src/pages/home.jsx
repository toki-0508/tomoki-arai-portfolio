import { Icon } from '../components/Icon.jsx';
import { CTABanner } from '../components/Layout.jsx';
import { HeroModel } from '../components/Hero.jsx';
import { DownloadRow, goTo, SectionLabel, WorkCard } from '../components/PageShared.jsx';
import { DOWNLOADS, PROJECTS } from '../data/content.jsx';

export function HomePage() {
  return (
    <div className="page-enter">
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="fade-in">
            <SectionLabel>Concept</SectionLabel>
            <h1 className="h-display">
              <span className="line">Web、アプリ、3Dを活用し</span>
              <span className="line">面白いを形にする</span>
            </h1>
            <p className="h-body">
              使って便利で楽しいと感じれるようなサービスやコンテンツを作ることを掲げ、学習しながら制作活動を行っています。
              このポートフォリオでは、制作物や公開データを通じて、私の考え方とスキルを紹介します。
            </p>
            <p className="seo-name-variants">新井智己（あらいともき / アライトモキ / Tomoki Arai）の制作ポートフォリオです。</p>
            <div className="hero-ctas">
              <a href="#/works" onClick={(e) => { e.preventDefault(); goTo('/works'); }} className="btn btn-primary">作品を見る <Icon.Arrow className="arrow"/></a>
              <a href="#/downloads" onClick={(e) => { e.preventDefault(); goTo('/downloads'); }} className="btn btn-ghost">ダウンロード <Icon.Arrow/></a>
            </div>
          </div>
          <div className="fade-in d2 hero-visual-wrap">
            <HeroModel/>
            <div className="drag-hint">ドラッグで回転・ピンチで拡大縮小</div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="section-head">
            <SectionLabel>注目の作品</SectionLabel>
            <a href="#/works" onClick={(e) => { e.preventDefault(); goTo('/works'); }} className="section-link">すべての作品を見る <Icon.Arrow/></a>
          </div>
          <div className="grid-3">
            {PROJECTS.slice(0, 3).map((work, i) => <WorkCard key={work.id} work={work} index={i + 1}/>)}
          </div>
        </div>
      </section>

      <section className="block category-band">
        <div className="wrap category-grid">
          {[
            ['Web', '制作実績を見る', '/works'],
            ['App', 'アプリ開発を見る', '/works'],
            ['3D', '3Dモデルを見る', '/works'],
          ].map(([title, desc, path], i) => (
            <a key={title} href={`#${path}`} onClick={(e) => { e.preventDefault(); goTo(path); }} className={`category-link fade-in d${i + 1}`}>
              <span className="category-icon">{title === 'Web' ? '⌘' : title === 'App' ? '▯' : '◇'}</span>
              <span><strong>{title}</strong><small>{desc}</small></span>
              <Icon.Arrow/>
            </a>
          ))}
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="section-head">
            <SectionLabel>Downloads Preview</SectionLabel>
            <a href="#/downloads" onClick={(e) => { e.preventDefault(); goTo('/downloads'); }} className="section-link">公開データを見る <Icon.Arrow/></a>
          </div>
          <div className="download-list compact">
            {DOWNLOADS.slice(0, 3).map((file) => <DownloadRow key={file.id} file={file}/>)}
          </div>
        </div>
      </section>

      <CTABanner
        title="一緒に、面白いものをつくりませんか？"
        sub="制作の相談、作品等への質問、コラボレーションなどお気軽にご連絡ください。"
        btns={[{ label: 'お問い合わせはこちら', to: '/contact', icon: 'mail' }]}
      />
    </div>
  );
}
