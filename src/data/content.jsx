import { useState } from 'react';

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'app', label: 'App' },
  { id: '3d', label: '3D' },
  { id: 'other', label: 'Other' },
];

export const DOWNLOAD_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: '3d', label: '3D Models' },
  { id: 'templates', label: 'Templates' },
  { id: 'assets', label: 'Assets' },
  { id: 'other', label: 'Other' },
];

const categoryLabel = (categories, id) => categories.find((category) => category.id === id)?.label ?? 'Other';
const normalizeTags = (tags) => tags.map((tag) => Array.isArray(tag) ? tag : [tag, 'blue']);


// ============ UNSPLASH IMG ============
// image: '/images/projects/sample.png' -> public/images/projects/sample.png
// unsplash: '1611224885990-ab7363d1f2a9' -> Unsplash fallback image
function ThumbImage({ image, unsplash, alt = '', w = 600, h = 540, focal }) {
  const [loaded, setLoaded] = useState(false);
  const src = image ?? `https://images.unsplash.com/photo-${unsplash}?auto=format&fit=crop&w=${w}&h=${h}&q=80${focal ? `&crop=${focal}` : ''}`;
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
const THUMB_PRESETS = {
  habit: { unsplash: '1611224885990-ab7363d1f2a9', alt: 'habit' },
  pomotree: { unsplash: '1466692476868-aef1dfb1e735', alt: 'tree' },
  camera: { unsplash: '1495121605193-b116b5b9c5fe', alt: 'camera' },
  island: { unsplash: '1469474968028-56623f02e42e', alt: 'island' },
  dataViz: { unsplash: '1551288049-bebda4e38f71', alt: 'dashboard' },
  studio: { unsplash: '1620207418302-439b387441b0', alt: '3d' },
  generative: { unsplash: '1618005182384-a83a8bd57fbe', alt: 'generative' },
  uiKit: { unsplash: '1559028012-481c04fa702d', alt: 'uikit' },
  shader: { unsplash: '1614851099511-773084f6911d', alt: 'shader', w: 1040 },
  photo: { unsplash: '1554080353-a576cf803bda', alt: 'photo', w: 1040 },
};

function createThumb({ image, thumbKey = 'studio', alt, w = 520, h = 440, focal }) {
  const preset = THUMB_PRESETS[thumbKey] ?? THUMB_PRESETS.studio;
  return <ThumbImage {...preset} image={image} alt={alt ?? preset.alt} w={w ?? preset.w} h={h ?? preset.h ?? h} focal={focal ?? preset.focal} />;
}

function defineProject({ catKey = 'other', tags = [], image, thumbKey, alt, ...project }) {
  const cat = categoryLabel(PROJECT_CATEGORIES, catKey);
  return {
    ...project,
    cat,
    catKey,
    badge: project.badge ?? cat,
    tags: normalizeTags(tags),
    thumb: createThumb({ image, thumbKey, alt: alt ?? project.name }),
  };
}

function defineDownload({ category = 'other', kind, tags = [], image, thumbKey, alt, file = null, ...download }) {
  return {
    ...download,
    category,
    kind: kind ?? categoryLabel(DOWNLOAD_CATEGORIES, category),
    tags: normalizeTags(tags),
    file,
    thumb: createThumb({ image, thumbKey, alt: alt ?? download.name }),
  };
}

// ============ DATA ============
export const PROJECTS = [
  defineProject({ 
    id: 'portfolio-site', 
    name: 'ポートフォリオサイト', 
    catKey: 'web', 
    desc: 'Reactと3D表現を組み合わせた、制作物を伝えるためのポートフォリオサイト(これ)です。', 
    tags: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'], 
    image: '/images/projects/portfolio-site.svg',
    year: '2026.06', 
    overview: '自分自身の制作物や公開データを整理して見せるためのWebサイトです。白基調のUI、余白、カード、軽いモーションを組み合わせ、作品・ダウンロード・問い合わせまで自然につながる構成にしました。', 
    features: ['触れる3Dオブジェクト風のヒーロー表現', '作品カードとカテゴリフィルタ', 'ダウンロード導線', 'お問い合わせフォーム'] 
  }),
  defineProject({ 
    id: 'kakeibo-app', 
    name: '便利な家計簿！', 
    catKey: 'web', 
    desc: '日頃の出費や収入、サブスクによる支出まで便利に簡単に管理できるサービスです！。', 
    tags: ['Flutter', 'Dart', 'Firebase'], 
    image: '/images/projects/kakeibo-app.svg',
    year: '2026.06', 
    overview: '毎日の家計簿を簡単に管理できる多機能な家計簿サービスです', 
    features: ['家計簿の作成・編集・完了管理', 'スマホで見やすいレイアウト'] 
  }),
  defineProject({ 
    id: 'desk-model', 
    name: '3Dデスク周りモデル', 
    catKey: '3d', 
    desc: 'Blenderで制作したゲーミングデスクとモニターです。', 
    tags: [['Blender', 'green']], 
    image: '/images/projects/desk-model.svg',
    year: '2024.09', 
    overview: 'Blenderの練習として自分が好きなゲーム関連でデスク周りを作成してみました。', 
    features: ['Blenderによるモデリング'] 
  }),
  defineProject({ 
    id: 'kyounomeigen-web', 
    name: '今日の名言.web', 
    catKey: 'web', 
    desc: '毎日ランダムな名言が1個表示されるサイト', 
    tags: [['API', 'violet'], ['Firebase', 'violet'], ['JS', 'violet']], 
    image: '/images/projects/kyounomeigen-web.svg',
    year: '2025.10', 
    overview: '思いつきで作った名言が1日一個取り上げられているサイトで偉人やアニメ、漫画から選ばれた有名な名言を紹介しています。', 
    features: ['API利用'] 
  }),
  defineProject({ 
    id: 'rennda-app', 
    name: '自動連打ツール', 
    catKey: 'app', 
    desc: 'シンプルかつパソコンに負担がかかりづらい使いやすい連打ツールです', 
    tags: [['Python','green']], 
    image: '/images/projects/rennda-app.svg',
    year: '2025.06', 
    overview: '連打ツールは作業やゲームをしていると欲しくなる時が結構あると思うのですがどこからダウンロードしたら安全なのかや軽いのかが難しいため自作しました。', 
    features: ['自動ツール'] 
  }),
  defineProject({ 
    id: 'jigyomemo-web', 
    name: 'じぎょメモ', 
    catKey: 'web', 
    desc: '事業アイデアをメモすることに特化したメモアプリで項目に沿って埋めるだけで価値あるアイデアにまとめることができます', 
    tags: [['Flutter', 'amber'], ['dart', 'amber'], ['Firebase', 'amber']], 
    image: '/images/projects/jigyomemo-web.svg',
    year: '2026.5', 
    overview: '事業アイデアをメモすることに特化していて現在のレベル感に合わせてアイデアをメモすることでフレームワークを活用することにより具体的に事業計画的にまとめることができます', 
    features: ['誰でもわかりやすいUI'] 
  }),
];

export const DOWNLOADS = [
  defineDownload({ 
    id: 'interior-3d', 
    name: 'インテリア3Dモデルセット', 
    category: '3d', 
    size: '12.4 MB', 
    date: '2026.06.20', 
    desc: 'インテリアシーンで使える3Dモデルのセット。椅子、テーブル、小物類を含みます。', 
    image: '/images/projects/interior-3d.svg',
    file: '/downloads/interior-3d.txt',
  }),
  defineDownload({ 
    id: 'headphone-3d', 
    name: 'プロダクト3Dモデル', 
    category: '3d', 
    size: '8.7 MB', 
    date: '2026.06.15', 
    desc: 'ヘッドホンの3Dモデルです。テクスチャ付きのプレビュー用データを含みます。', 
    image: '/images/projects/headphone-3d.svg',
    file: '/downloads/headphone-3d.txt',
  }),
  defineDownload({ 
    id: 'portfolio-template', 
    name: 'ポートフォリオテンプレート', 
    category: 'templates', 
    kind: 'Template', 
    size: '2.1 MB', 
    date: '2026.06.10', 
    desc: 'このポートフォリオサイトの構成をもとにしたテンプレートです。', 
    image: '/images/projects/portfolio-template.svg',
    file: '/downloads/portfolio-template.txt',
  }),
  defineDownload({ 
    id: 'sample-data', 
    name: 'サンプルデータセット', 
    category: 'other', 
    kind: 'Other', 
    size: '1.8 KB', 
    date: '2026.06.05', 
    desc: 'グラフやチャートの実装に使える小さなサンプルデータです。', 
    image: '/images/projects/sample-data.svg',
    file: '/downloads/sample-data.txt',
  }),
];
