# tomoki-arai-portfolio

新井智己のポートフォリオサイト。React + Vite で構築し、**本番を Vercel**、**サブ公開を GitHub Pages**(GitHub Actions で自動デプロイ)の二系統で配信しています。

- 本番(メイン): https://tomoki-arai.vercel.app/
- サブ公開(GitHub Pages): https://toki-0508.github.io/tomoki-arai-portfolio/

---

## コンセプト

**テーマ:「身の回りを、ちょっと好きになる」**

私は、日常の中にある小さな困りごとや退屈を、Web・アプリ・3D の力で「使いやすく、少しだけワクワクする形」に変えることを制作の軸にしています。身の回りにあるものにこだわり、それを好きになれること自体が生活の質を上げ、幸福感につながると考えているからです。このポートフォリオは、その姿勢を説明するのではなく、サイトを触る体験そのものとして伝えることを目的に設計しました。

**想定する対象**は、私に制作を任せるかどうかを判断する方(採用担当者・クライアント)です。そのため「何を作れる人か」「どう考えて作る人か」を短時間で把握できることを最優先にしました。

**狙う印象は「丁寧で、触っていて心地よい」**ことです。派手さで押し切るのではなく、迷わず読めること自体を品質として提示したいと考えました。

この意図を、構成・デザイン・演出の全体で一貫させています。トップには Three.js による 3D 表現を置き、静的な経歴書ではなく「作れること」を最初の数秒で示します。同時に 3D が主張しすぎて可読性を損なわないよう、動きと情報量は意図的に抑制しました。Works はカテゴリ(Web / App / 3D / Other)でフィルタでき、閲覧者が自分の関心から作品へ辿れるようにしています。各作品は一覧に概要だけを置き、背景・役割・成果は詳細ページへ分離することで、一覧性と情報量を両立させました。Contact はフォームから直接送信でき、問い合わせのハードルを下げています。

**技術選定**にもこの考えを反映しました。React + Vite を採用し、ハッシュルーティングの SPA として構築しています。本番は Vercel、サブとして GitHub Actions 経由で GitHub Pages へ自動デプロイする二系統構成です。GitHub Pages は静的配信のみでサーバー処理を持てず、そのままでは問い合わせ機能が失われます。そこで Pages 版のみビルド時に API の向き先を Vercel の絶対 URL へ切り替え、CORS で許可することで、**どちらの公開先でも閲覧者の体験が変わらない**ようにしました。見た目だけでなく、使う人が迷わず、作った後も使い続けられることを大切にしています。

---

## 技術スタック

| 区分 | 内容 |
|------|------|
| フレームワーク | React 18 |
| ビルド | Vite 6 |
| 3D 表現 | Three.js |
| ルーティング | ハッシュルーティング(自作・静的ホスティング互換) |
| 問い合わせ | Vercel Serverless Functions + Resend |
| ホスティング | Vercel(本番) / GitHub Pages(サブ・GitHub Actions 自動デプロイ) |

## レスポンシブ対応

`src/styles/responsive.css` にて 960px / 640px のブレークポイントを設計し、PC・タブレット・スマートフォンで破綻しないレイアウトにしています。Chrome / Safari の両方で表示を確認しています。

---

## ローカル開発

```bash
npm install
npm run dev     # 開発サーバー
npm run build   # 本番ビルド(Vercel 向け)
npm run preview # ビルド結果の確認
```

### GitHub Pages 向けビルド(通常は CI が実行)

```bash
GITHUB_PAGES=true VITE_CONTACT_API_BASE=https://tomoki-arai.vercel.app npm run build
```

| 環境変数 | 用途 | 未設定時 |
|----------|------|----------|
| `GITHUB_PAGES` | `true` で `base` をサブパスへ切替 | `/`(Vercel 用) |
| `VITE_CONTACT_API_BASE` | 問い合わせ API の向き先 | 空文字(同一オリジン) |

Vercel ではどちらも未設定のため、**従来どおりの出力・挙動のまま**です。

---

## デプロイ構成

```
push to main
   ├─ Vercel        → https://tomoki-arai.vercel.app/         (本番・メイン)
   └─ GitHub Actions → https://toki-0508.github.io/...        (サブ公開)
         .github/workflows/deploy.yml
```

Pages 版の問い合わせは Vercel の `/api/contact` へ転送されます(`api/contact.js` の
`ALLOWED_ORIGINS` で許可)。SEO 上の重複を避けるため、`index.html` の canonical は
本番である Vercel を指しています。

---

## AI の使用について

本サイトの制作では生成 AI(Claude)を以下の範囲で利用しました。

- **利用した箇所**: React コンポーネントの実装補助、CSS のレスポンシブ調整、
  問い合わせ API の実装、GitHub Actions ワークフローの作成、コードレビューとリファクタリング。
- **利用しなかった箇所**: サイトのコンセプト立案、掲載する作品の選定と評価、
  デザインの方向性の決定、3D モデルおよび楽曲の制作。
- **確認体制**: AI が生成したコードは、そのまま採用せず内容を理解したうえで採用し、
  ローカルおよび実機ブラウザで動作確認を行っています。
