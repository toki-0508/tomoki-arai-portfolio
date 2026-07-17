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
  { id: 'app', label: 'App' },
  { id: '3d', label: '3D Models' },
  { id: 'sounds', label: 'Sounds' },
  { id: 'other', label: 'Other' },
];

const categoryLabel = (categories, id) => categories.find((category) => category.id === id)?.label ?? 'Other';
const normalizeTags = (tags) => tags.map((tag) => Array.isArray(tag) ? tag : [tag, 'blue']);


// ============ THUMB ============
// image: '/images/projects/sample.png' -> public/images/projects/sample.png
function ThumbImage({ image, alt = '' }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={image}
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

// url: 'https://example.com' -> 詳細ページに「サイトに飛ぶ」ボタンを表示。未設定ならボタンは出ない。
function defineProject({ catKey = 'other', tags = [], image, alt, url = null, ...project }) {
  return {
    ...project,
    url,
    cat: categoryLabel(PROJECT_CATEGORIES, catKey),
    catKey,
    tags: normalizeTags(tags),
    thumb: <ThumbImage image={image} alt={alt ?? project.name} />,
  };
}

function defineDownload({ category = 'other', kind, tags = [], image, alt, file = null, ...download }) {
  return {
    ...download,
    category,
    kind: kind ?? categoryLabel(DOWNLOAD_CATEGORIES, category),
    tags: normalizeTags(tags),
    file,
    thumb: <ThumbImage image={image} alt={alt ?? download.name} />,
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
    image: '/images/projects/portfolio-site.png',
    url: 'https://tomoki-arai-portfolio.vercel.app/#/',
    year: '2026.06',
    overview: '自分自身の制作物や公開データを整理して見せるためのWebサイトです。白基調のUI、余白、カード、軽いモーションを組み合わせ、作品・ダウンロード・問い合わせまで自然につながる構成にしました。',
    features: ['触れる3Dオブジェクト風のヒーロー表現', '作品カードとカテゴリフィルタ', 'ダウンロード導線', 'お問い合わせフォーム'],
    target: '採用担当の方や、制作を依頼するか検討している方。限られた時間で「何を作れる人なのか」を掴みたい相手を想定して作成しました。',
    purpose: '制作物が公開先ごとにばらばらだと、まとめて見てもらうことができないので私のできること、やっていることを知ってもらうために、作品を一覧できる場所としてポートフォリオを用意し、興味を持った人がダウンロードや問い合わせまで迷わず進めれるような設計にしています。',
    result: 'Web・アプリ・3Dにまたがる制作物をカテゴリで整理し、各詳細から実際のサイトへ直接移動できるようにしたので自分自身の成果を見返すこともやりやすくなった上これからインターン等をしていく上で活用できると考えています。',
  }),
  defineProject({
    id: 'kakeibo-app',
    name: '便利な家計簿！',
    catKey: 'app',
    desc: '日頃の出費や収入、サブスクによる支出まで便利に簡単に管理できるサービスです！。',
    tags: ['Flutter', 'Dart', 'Firebase'],
    image: '/images/projects/kakeibo-app.png',
    url: 'https://bennrina-kakeibo.web.app/#/',
    year: '2026.06',
    overview: '毎日の家計簿を簡単に管理できる多機能な家計簿サービスです',
    features: ['家計簿の作成・編集・完了管理', 'スマホで見やすいレイアウト'],
    target: '日々の出費やサブスクのような毎月の固定費まで把握しきれていないけどきちんと家計簿を取りたいと考えている人。',
    purpose: '家計簿は続けるのが面倒ですが大事なので私自身がつけているのですが管理などがやりずらいなぁと感じたことがあったので自分が欲しいと思う機能を詰めると同時に。収入・支出・サブスクを1か所で管理できる状態を目標に作成しました。',
    result: 'Flutterでのアプリ開発の経験を積むと同時に自分で使える家計簿アプリを作ることができました。AppleDevelopperに登録したらStoreなどでインストールできるようにしたいと考えています。',
  }),
  defineProject({
    id: 'desk-model',
    name: '3Dデスク周りモデル',
    catKey: '3d',
    desc: 'Blenderで制作したゲーミングデスクとモニターです。',
    tags: [['Blender', 'green']],
    image: '/images/projects/desk-model.png',
    year: '2024.09',
    overview: 'Blenderの練習として自分が好きなゲーム関連でデスク周りを作成してみました。',
    features: ['Blenderによるモデリング'],
    purpose: 'Blenderの基礎を身につけるにあたって、自分が好きなゲーム周りを題材にすれば細部まで粘れると考え、練習用の題材として作って選びました。',
    result: 'デスクとモニターのモデリングから質感やライティングの調整まで一通り自分で組み立てて、Blenderでの制作に慣れることができました。',
  }),
  defineProject({
    id: 'kyounomeigen-web',
    name: '今日の名言.web',
    catKey: 'web',
    desc: '毎日ランダムな名言が1個表示されるサイト',
    tags: [['API', 'violet'], ['Firebase', 'violet'], ['JS', 'violet']],
    image: '/images/projects/kyounomeigen-web.png',
    url: 'https://kyounomeigen-ec5b7.web.app/',
    year: '2025.10',
    overview: '思いつきで作った名言が1日一個取り上げられているサイトで偉人やアニメ、漫画から選ばれた有名な名言を紹介しています。',
    features: ['API利用'],
    target: '名言を求めている人、毎日の楽しみを求めている人',
    purpose: '名言が結構私好きでYoutubeで見たりするんですが能動的に調べたりするのって結構面倒なので開くだけで毎日一個出てきたら面白いなと思い作成しました。',
    result: '偉人やアニメ・漫画の名言を1日1件だけ表示する仕組みを考えちょうどいいAPIを見つけることができたので、APIを利用したWebサイトの開発の勉強になりました。またAPI連携からFirebaseでの公開までを一通り経験できたので今後のWeb開発に活かせると考えます。',
  }),
  defineProject({
    id: 'jigyomemo-web',
    name: 'じぎょメモ',
    catKey: 'app',
    desc: '事業アイデアをメモすることに特化したメモアプリで項目に沿って埋めるだけで価値あるアイデアにまとめることができます',
    tags: [['Flutter', 'amber'], ['dart', 'amber'], ['Firebase', 'amber']],
    image: '/images/projects/jigyomemo-web.png',
    url: 'https://jigyomemo.web.app/',
    year: '2026.5',
    overview: '事業アイデアをメモすることに特化していて現在のレベル感に合わせてアイデアをメモすることでフレームワークを活用することにより具体的に事業計画的にまとめることができます',
    features: ['誰でもわかりやすいUI'],
    target: '事業アイデアを思いついても、形にする手前で止まってしまう人、すぐに忘れてしまう人',
    purpose: '浮かんだアイデアがメモのまま埋もれてしまうのを防ぎ、項目に沿って埋めるだけできちんとした事業計画になるという体験を作ることを目的にフレームなどを調べた上で全ての事業アイデアを考える人のために作りました。',
    result: 'アイデアのレベル感に応じて使えるフレームワークを探して活用し、firebaseに個人ごとにデータを保存する方法を学んだと同時にず分で使えるレベルのわかりやすいUIなどにもするよう頑張りました。',
  }),
];

export const DOWNLOADS = [
  defineDownload({
    id: 'rennda-app',
    name: '自動連打ツール',
    category: 'app',
    size: '81.7 MB',
    date: '2025.06',
    desc: '連打ツールは作業やゲームをしていると欲しくなる時が結構あると思うのですがどこからダウンロードしたら安全なのかや軽いのかが難しいため自作しました。',
    image: '/images/projects/rennda-app.png',
    file: '/downloads/AutoClicker.zip',
  }),
  defineDownload({
    id: 'nightbell',
    name: 'NightBell',
    category: 'sounds',
    size: '908.08 KB',
    date: '2025.09',
    desc: 'garagebandを使って初めて作ったジングル？BGM？みたいなものです。',
    image: '/images/projects/chilltime.png',
    file: '/downloads/NightBell.mp3',
  }),
  defineDownload({
    id: 'bitfight',
    name: 'BitFight',
    category: 'sounds',
    size: '1.05 MB',
    date: '2026.07',
    desc: 'garagebandを使って作った戦闘の場面をイメージしたBGMです。',
    image: '/images/projects/chilltime.png',
    file: '/downloads/BitFight.mp3',
  }),
];
