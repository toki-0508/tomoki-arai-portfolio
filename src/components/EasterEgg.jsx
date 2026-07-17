import { useEffect, useRef } from 'react';
import { ACTIVE_EFFECT } from '../effects/index.js';

// 全画面の canvas を出し、選ばれている演出を1回だけ再生する。
// 演出が done() を呼ぶか、途中でアンマウントされると片付く。
export function EasterEgg({ origin, onDone }) {
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const cleanup = ACTIVE_EFFECT({
      canvas: canvasRef.current,
      origin,
      done: () => onDoneRef.current(),
    });
    return () => cleanup?.();
  }, [origin]);

  return <canvas ref={canvasRef} className="easter-egg-canvas" aria-hidden="true" />;
}
