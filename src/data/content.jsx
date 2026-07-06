import { useState } from 'react';


// ============ UNSPLASH IMG ============
// Helper: render an Unsplash photo with cover-fit, lazy load, soft fade-in.
function UImg({ id, alt = '', w = 600, h = 540, focal }) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80${focal ? `&crop=${focal}` : ''}`;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      style={{
        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'scale(1)' : 'scale(1.04)',
        transition: 'opacity .5s ease, transform .8s ease',
        background: '#EFF1F5',
      }}
    />
  );
}

// ============ PROJECT THUMBS — Unsplash ============
const ThumbHabit       = () => <UImg id="1611224885990-ab7363d1f2a9" alt="habit"  w={520} h={440}/>; // green plants / habit
const ThumbPomotree    = () => <UImg id="1466692476868-aef1dfb1e735" alt="tree"   w={520} h={440}/>; // single plant
const ThumbCamera      = () => <UImg id="1495121605193-b116b5b9c5fe" alt="camera" w={520} h={440}/>; // retro camera
const ThumbIsland      = () => <UImg id="1469474968028-56623f02e42e" alt="island" w={520} h={440}/>; // landscape
const ThumbDataViz     = () => <UImg id="1551288049-bebda4e38f71" alt="data"     w={520} h={440}/>; // analytics dashboard
const ThumbStudio      = () => <UImg id="1620207418302-439b387441b0" alt="3d"     w={520} h={440}/>; // 3d render scene
const ThumbGenerative  = () => <UImg id="1618005182384-a83a8bd57fbe" alt="gen"    w={520} h={440}/>; // generative
const ThumbUIKit       = () => <UImg id="1559028012-481c04fa702d" alt="uikit"    w={520} h={440}/>; // wireframe
const ThumbShader      = () => <UImg id="1614851099511-773084f6911d" alt="shader" w={1040} h={440}/>;// abstract gradient
const ThumbPhoto       = () => <UImg id="1554080353-a576cf803bda" alt="photo"    w={1040} h={440}/>;// photo grid

// ============ DATA ============
export const PROJECTS = [
  { id: 'portfolio-site', name: 'ポートフォリオサイト', cat: 'Web', catKey: 'web', desc: 'Reactと3D表現を組み合わせた、制作物を伝えるためのポートフォリオサイト(これ)です。', tags: [['React','blue'],['Three.js','blue'],['TypeScript','blue'],['Tailwind CSS','blue']], thumb: <ThumbDataViz/>, badge: 'Web', year: '2026.06', overview: '自分自身の制作物や公開データを整理して見せるためのWebサイトです。白基調のUI、余白、カード、軽いモーションを組み合わせ、作品・ダウンロード・問い合わせまで自然につながる構成にしました。', features: ['触れる3Dオブジェクト風のヒーロー表現', '作品カードとカテゴリフィルタ', 'ダウンロード導線', 'お問い合わせフォーム'] },
  { id: 'task-app', name: 'タスク管理アプリ', cat: 'App', catKey: 'app', desc: '日々のタスクを直感的に整理できる、シンプルなタスク管理アプリ。', tags: [['Next.js','blue'],['TypeScript','blue'],['Firebase','blue'],['Tailwind CSS','blue']], thumb: <ThumbHabit/>, badge: 'App', year: '2026.04', overview: '毎日のタスクを軽く、迷わず扱えることを重視したアプリです。登録・完了・振り返りの導線を短くし、継続して使いやすい体験を目指しました。', features: ['タスクの作成・編集・完了管理', 'スマホで見やすいレイアウト', 'Firebase連携を想定した設計'] },
  { id: 'interior-model', name: '3Dインテリアモデル', cat: '3D', catKey: '3d', desc: 'Blenderで制作した北欧風インテリアモデル。ライティングやマテリアルにこだわりました。', tags: [['Blender','green'],['Cycles','green'],['GLB','green']], thumb: <ThumbStudio/>, badge: '3D', year: '2026.03', overview: '家具・小物・空間のバランスを見ながら制作した3Dモデルです。Web上での表示や配布を想定し、軽量化と見栄えの両立を意識しました。', features: ['Blenderによるモデリング', 'Cyclesレンダリング', 'GLB形式での公開を想定'] },
  { id: 'shopping-support', name: '買い物サポートアプリ', cat: 'App', catKey: 'app', desc: '高齢者の買い物を支援する、チーム制作のプロトタイプアプリ。', tags: [['Flutter','violet'],['Firebase','violet'],['Dart','violet']], thumb: <ThumbPomotree/>, badge: 'App', year: '2025.10', overview: '全国高専プログラミングコンテストに向けて制作した、高齢者の買い物支援アプリです。チームで役割分担し、ユーザーの困りごとに沿った機能設計を行いました。', features: ['買い物リスト管理', '支援者との情報共有', 'チームでのUI・実装分担'] },
  { id: 'product-model', name: 'プロダクト3Dモデル', cat: '3D', catKey: '3d', desc: 'ヘッドホンを題材にしたプロダクト3Dモデル。リアルな質感表現に挑戦しました。', tags: [['Blender','green'],['Substance','green'],['GLB','green']], thumb: <ThumbCamera/>, badge: '3D', year: '2026.02', overview: 'プロダクトデザインの練習として制作した3Dモデルです。形状の読みやすさと質感の説得力を重視しました。', features: ['曲面モデリング', 'マテリアル調整', 'Web掲載向けレンダリング'] },
  { id: 'data-visualizer', name: 'データ可視化ツール', cat: 'Data', catKey: 'data', desc: 'CSVデータを読み取り、グラフで傾向を見やすく整理する実験的なツール。', tags: [['JavaScript','amber'],['Chart.js','amber'],['CSV','amber']], thumb: <ThumbDataViz/>, badge: 'Data', year: '2025.12', overview: '表形式のデータを視覚的に確認できるツールです。情報を整理し、判断しやすくするUIを意識しました。', features: ['CSV読み込み', 'グラフ表示', '小さな画面でも読めるUI'] },
];

export const DOWNLOADS = [
  { id: 'interior-3d', name: 'インテリア3Dモデルセット', kind: '3D Models', category: '3d', size: '12.4 MB', date: '2026.06.20', desc: 'インテリアシーンで使える3Dモデルのセット。椅子、テーブル、小物類を含みます。', thumb: <ThumbStudio/> },
  { id: 'headphone-3d', name: 'プロダクト3Dモデル', kind: '3D Models', category: '3d', size: '8.7 MB', date: '2026.06.15', desc: 'ヘッドホンの3Dモデルです。テクスチャ付きのプレビュー用データを含みます。', thumb: <ThumbCamera/> },
  { id: 'portfolio-template', name: 'ポートフォリオテンプレート', kind: 'Template', category: 'templates', size: '2.1 MB', date: '2026.06.10', desc: 'このポートフォリオサイトの構成をもとにしたテンプレートです。', thumb: <ThumbDataViz/> },
  { id: 'sample-data', name: 'サンプルデータセット', kind: 'Data', category: 'data', size: '1.8 KB', date: '2026.06.05', desc: 'グラフやチャートの実装に使える小さなサンプルデータです。', thumb: <ThumbUIKit/> },
];
