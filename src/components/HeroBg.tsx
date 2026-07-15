import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBg() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const w = c.clientWidth, h = c.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 0, 18);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    c.appendChild(renderer.domElement);
    const palette = ['#6366f1', '#06b6d4', '#a855f7', '#22c55e', '#f59e0b'].map(s => new THREE.Color(s));
    const N = 200, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 8 * Math.pow(Math.random(), 0.6), t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(p) * Math.cos(t); pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t); pos[i * 3 + 2] = r * Math.cos(p);
      const c2 = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c2.r; col[i * 3 + 1] = c2.g; col[i * 3 + 2] = c2.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.2, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
    const pts = new THREE.Points(geo, mat);
    const g = new THREE.Group(); g.add(pts); scene.add(g);
    const hubs: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2, r = 3 + Math.random() * 2, h2 = (Math.random() - 0.5) * 5;
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.25 + Math.random() * 0.2, 12, 12), new THREE.MeshBasicMaterial({ color: palette[i], transparent: true, opacity: 0.5 }));
      m.position.set(Math.cos(a) * r, h2, Math.sin(a) * r); g.add(m); hubs.push(m);
    }

    /* ── Input state ── */
    let tx = 0, ty = 0;          // target (incoming)
    let cx = 0, cy = 0;          // current (lerped)

    /* ── Desktop: mouse ── */
    const mm = (e: MouseEvent) => {
      tx = (e.clientX / w - 0.5) * 2;
      ty = (e.clientY / h - 0.5) * 2;
    };
    document.addEventListener('mousemove', mm);

    /* ── Mobile: touch drag ── */
    const tm = (e: TouchEvent) => {
      const t = e.touches[0];
      tx = (t.clientX / w - 0.5) * 2;
      ty = (t.clientY / h - 0.5) * 2;
    };
    document.addEventListener('touchmove', tm, { passive: true });

    /* ── Mobile: device orientation (gyroscope) ── */
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      /* gamma: left(-90) → right(90), beta: front(-180) → back(180) */
      tx = (e.gamma / 45) * 1.2;
      ty = (e.beta / 90) * 0.8;
    };
    /* Request permission on iOS 13+ */
    const requestOrientation = () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent) {
        (DeviceOrientationEvent as any).requestPermission()
          .then((s: string) => { if (s === 'granted') window.addEventListener('deviceorientation', handleOrientation); })
          .catch(() => {});
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };
    /* Only activate orientation on touch-enabled devices (mobile/tablet) */
    if ('ontouchstart' in window) {
      requestOrientation();
      /* Also try on first user gesture — required by iOS */
      const gestureStart = () => { requestOrientation(); document.removeEventListener('touchstart', gestureStart); };
      document.addEventListener('touchstart', gestureStart, { once: true });
    }

    /* ── Resize ── */
    const rs = () => {
      const w2 = c.clientWidth, h2 = c.clientHeight || window.innerHeight;
      camera.aspect = w2 / h2; camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener('resize', rs);

    /* ── Animation loop ── */
    let id: number;
    const anim = () => {
      id = requestAnimationFrame(anim);
      /* Smooth lerp toward target */
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      g.rotation.y += 0.0006;
      camera.position.x += (cx * 0.2 * 2 - camera.position.x) * 0.05;
      camera.position.y += (-(cy * 0.15) * 2 - camera.position.y) * 0.05;
      const t = Date.now() * 0.001;
      hubs.forEach(m => { const s = 1 + Math.sin(t * 0.8) * 0.3; m.scale.set(s, s, s); });
      renderer.render(scene, camera);
    };
    anim();

    return () => {
      document.removeEventListener('mousemove', mm);
      document.removeEventListener('touchmove', tm);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('resize', rs);
      cancelAnimationFrame(id);
      renderer.dispose();
      if (c.contains(renderer.domElement)) c.removeChild(renderer.domElement);
    };
  }, []);
  return <div id="bg-canvas" ref={ref} />;
}
