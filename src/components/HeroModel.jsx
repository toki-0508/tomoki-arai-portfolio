import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { asset } from '../asset.js';

// ========== INTERACTIVE 3D HERO (Three.js) ==========
export default function HeroModelCanvas() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 480;
    let height = mount.clientHeight || 430;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'pan-y';
    mount.appendChild(renderer.domElement);

    // main model group (loaded from models/hero.glb, with a fallback crystal)
    const group = new THREE.Group();
    scene.add(group);
    let disposed = false;
    const disposers = [];

    // fit any Object3D into a ~2.2 radius, centered at origin
    const fitObject = (obj) => {
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scale = 3.7 / maxDim;
      obj.position.sub(center);
      const wrap = new THREE.Group();
      wrap.add(obj);
      wrap.scale.setScalar(scale);
      group.add(wrap);
    };

    const fallbackCrystal = () => {
      if (disposed) return;
      const geo = new THREE.IcosahedronGeometry(2, 0);
      const mat = new THREE.MeshStandardMaterial({ color: 0x2563eb, flatShading: true, metalness: 0.18, roughness: 0.34 });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);
      disposers.push(geo, mat);
      const wg = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.06, 0));
      const wm = new THREE.LineBasicMaterial({ color: 0x9db4ff, transparent: true, opacity: 0.5 });
      group.add(new THREE.LineSegments(wg, wm));
      disposers.push(wg, wm);
    };

    if (GLTFLoader) {
      new GLTFLoader().load(
        asset('/models/hero.glb') + '?v=' + Date.now(),
        (gltf) => {
          if (disposed) return;
          gltf.scene.traverse((o) => {
            if (o.isMesh && o.material) {
              o.material.side = THREE.DoubleSide;
              if ('vertexColors' in o.material && o.geometry.attributes.color) o.material.vertexColors = true;
            }
          });
          fitObject(gltf.scene);
        },
        undefined,
        fallbackCrystal
      );
    } else {
      fallbackCrystal();
    }

    // orbiting cubes
    const cubeGeo = new THREE.BoxGeometry(0.36, 0.36, 0.36);
    const cubes = [];
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(cubeGeo, new THREE.MeshStandardMaterial({ color: i === 0 ? 0x3b7af0 : 0x1b53d4, metalness: 0.2, roughness: 0.4 }));
      c.userData = { a: (i * Math.PI * 2) / 3, r: 2.7, speed: 0.4 + i * 0.1 };
      scene.add(c);
      cubes.push(c);
    }

    // lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 0.95); key.position.set(5, 6, 8); scene.add(key);
    const fill = new THREE.DirectionalLight(0x9db4ff, 0.6); fill.position.set(-6, -3, -4); scene.add(fill);

    // controls: drag to rotate, wheel/pinch to zoom + gentle auto-rotate
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 6.2;
    controls.maxDistance = 12.5;
    controls.zoomSpeed = 0.8;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.1;
    controls.rotateSpeed = 0.85;
    const grab = () => { renderer.domElement.style.cursor = 'grabbing'; };
    const release = () => { renderer.domElement.style.cursor = 'grab'; };
    renderer.domElement.addEventListener('pointerdown', grab);
    window.addEventListener('pointerup', release);

    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      const t = clock.getElapsedTime();
      cubes.forEach((c) => {
        const a = c.userData.a + t * c.userData.speed * 0.5;
        c.position.set(Math.cos(a) * c.userData.r, Math.sin(a * 0.8) * 0.85, Math.sin(a) * c.userData.r);
        c.rotation.x += 0.01;
        c.rotation.y += 0.012;
      });
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      width = mount.clientWidth; height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', grab);
      window.removeEventListener('pointerup', release);
      renderer.dispose();
      disposers.forEach((d) => d.dispose && d.dispose());
      cubeGeo.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="illus hero-model">
      <div className="model-backdrop"></div>
      <div className="model-canvas" ref={mountRef}></div>
    </div>
  );
}
