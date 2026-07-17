# 隠し演出(イースターエッグ)

Home の左上のロゴ「新井智己」を **10秒以内に30回クリック** すると、全画面で演出が流れる。
ロゴのクリック位置が爆発の中心になる。Home 以外のページとフッターのロゴでは発動しない。

## ファイルの役割

| ファイル | 役割 |
|---|---|
| `index.js` | **どの演出を流すか**と発動条件(回数・秒数)の設定 |
| `explosion.js` | 既定の演出そのもの(ゲーム風の爆発) |

## 1. 見た目だけ変えたい場合

`explosion.js` の先頭にある `CONFIG` を書き換える。ここだけで色・文字・破片の量などが変わる。

```js
const CONFIG = {
  duration: 2600,      // 演出の長さ(ms)
  text: 'BOOM!',       // 中央に出る文字
  particleCount: 170,  // 破片の数
  colors: ['#2563EB', ...],
  ...
};
```

## 2. 発動条件を変えたい場合

`index.js` の数値を変える。

```js
export const CLICKS_NEEDED = 30;   // 何回クリックで発動するか
export const WINDOW_MS = 10000;    // 何ミリ秒以内に達成する必要があるか
```

## 3. 演出そのものを別物に差し替える場合

新しいファイルを作り、`index.js` の `ACTIVE_EFFECT` の向き先を変えるだけでよい。
`explosion.js` は消さずに残しておけば、いつでも戻せる。

```js
// index.js
import fireworks from './fireworks.js';
export const ACTIVE_EFFECT = fireworks;
```

### 演出ファイルが満たすルール

デフォルトエクスポートが以下の形の関数であること。

```js
export default function myEffect({ canvas, origin, done }) {
  // canvas : 画面全体を覆う <canvas>。好きに描いてよい
  // origin : 爆発の中心 { x, y }(クリックされたロゴの位置・画面座標)
  // done   : 演出が終わったら必ず呼ぶ。これで canvas が画面から外れる

  // ... 描画 ...

  // 途中で中断されたときの後始末を返す(タイマーやイベントの解除)
  return () => { /* cleanup */ };
}
```

守るのは次の3点だけ。

1. `done()` を必ず呼ぶ。呼ばないと canvas が画面に残り続ける。
2. 後始末の関数を返す。ページ移動などで途中終了したときに呼ばれる。
3. canvas はクリックを透過する設定なので、演出中もサイトは普通に操作できる。

canvas のサイズ合わせ(`devicePixelRatio` 対応)は各エフェクト側で行う。
`explosion.js` の `resize()` がそのまま参考になる。
