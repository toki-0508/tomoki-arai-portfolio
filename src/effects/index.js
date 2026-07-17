import explosion from './explosion.js';

// ============ 再生する演出の切り替え ============
// ここを別のエフェクトに変えるだけで、隠し演出の中身が入れ替わる。
// 例) import fireworks from './fireworks.js';
//     export const ACTIVE_EFFECT = fireworks;
//
// 作り方は README.md を参照。
export const ACTIVE_EFFECT = explosion;

// ============ 発動条件 ============
// ロゴを WINDOW_MS 以内に CLICKS_NEEDED 回クリックすると再生される。
export const CLICKS_NEEDED = 30;
export const WINDOW_MS = 10000;
