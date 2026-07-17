// ============ 爆発エフェクト(ゲーム風) ============
// ロゴを10秒以内に30回クリックすると再生される隠し演出。
// 差し替え方法と共通ルールは src/effects/README.md を参照。
//
// 数値はこの CONFIG だけで調整できる。色や文字を変えるだけならここを触れば済む。
const CONFIG = {
  duration: 2600,        // 演出全体の長さ(ms)
  text: 'BOOM!',         // 中央に出す文字
  particleCount: 170,    // 破片の数
  particleSpeed: [4, 15],// 破片の初速(最小, 最大)
  particleSize: [3, 9],  // 破片の一辺(px)
  gravity: 0.22,         // 破片が落ちる強さ
  friction: 0.985,       // 破片の減速率(1に近いほど滑る)
  shake: 26,             // 画面ゆれの最大幅(px)
  shakeMs: 420,          // 画面ゆれの長さ(ms)
  flashMs: 120,          // 白フラッシュの長さ(ms)
  ringMs: 520,           // 衝撃波リングの長さ(ms)
  ringRadius: 420,       // 衝撃波リングの最大半径(px)
  colors: ['#2563EB', '#60A5FA', '#FBBF24', '#F97316', '#EF4444', '#FFFFFF'],
};

const rand = (min, max) => min + Math.random() * (max - min);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function createParticles(origin) {
  return Array.from({ length: CONFIG.particleCount }, () => {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(...CONFIG.particleSpeed);
    return {
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - rand(0, 4),
      size: Math.round(rand(...CONFIG.particleSize)),
      color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
      spin: rand(-0.3, 0.3),
      angle: rand(0, Math.PI * 2),
    };
  });
}

// canvas: 描画先 / origin: 爆発の中心(画面座標) / done: 再生終了時に呼ぶ
// 戻り値: 途中で止めるための後始末関数
export default function explosion({ canvas, origin, done }) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const particles = createParticles(origin);
  const start = performance.now();
  let raf = 0;

  const draw = (now) => {
    const elapsed = now - start;
    const progress = elapsed / CONFIG.duration;
    if (progress >= 1) {
      cleanup();
      done();
      return;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.save();

    // 画面ゆれ: 最初だけ強く、すぐ収まる
    if (elapsed < CONFIG.shakeMs) {
      const power = (1 - elapsed / CONFIG.shakeMs) * CONFIG.shake;
      ctx.translate(rand(-power, power), rand(-power, power));
    }

    // 破片
    for (const p of particles) {
      p.vx *= CONFIG.friction;
      p.vy = p.vy * CONFIG.friction + CONFIG.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - progress);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      // 四角のまま描いてドット絵っぽい質感にする
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    // 衝撃波リング
    if (elapsed < CONFIG.ringMs) {
      const t = elapsed / CONFIG.ringMs;
      ctx.globalAlpha = 1 - t;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 8 * (1 - t) + 1;
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, easeOut(t) * CONFIG.ringRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 中央の文字: 勢いよく出て、最後に消える
    const textT = Math.min(1, elapsed / 260);
    const scale = easeOut(textT) * 1.15 - (textT === 1 ? 0.15 : 0);
    ctx.globalAlpha = progress > 0.7 ? (1 - progress) / 0.3 : 1;
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scale, scale);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${Math.min(width * 0.16, 130)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillStyle = '#0B1220';
    ctx.fillText(CONFIG.text, 6, 6);        // 影をずらして置くとレトロゲームっぽくなる
    ctx.fillStyle = '#FBBF24';
    ctx.fillText(CONFIG.text, 0, 0);
    ctx.restore();

    ctx.restore();

    // 白フラッシュは最前面
    if (elapsed < CONFIG.flashMs) {
      ctx.globalAlpha = 1 - elapsed / CONFIG.flashMs;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
    }

    raf = requestAnimationFrame(draw);
  };

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  };

  raf = requestAnimationFrame(draw);
  return cleanup;
}
