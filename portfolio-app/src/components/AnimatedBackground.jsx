import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/AnimatedBackground.css';

/* ── Tweak these to explore the look ──────────────────────────────────────
 * Colors are hex like CSS but written 0x.... (e.g. CSS #4444ff → 0x4444ff).
 */
const CUBE_COLOR = 0x4444ff;      // color of the blocks themselves
const LIGHT_COLOR = 0x018696;     // color the point light casts (the "red" glow)
const LIGHT_INTENSITY = 1.2;        // brightness of that light — lower = dimmer
const FOG_COLOR = 0x000000;       // background / distance fade color
/* ─────────────────────────────────────────────────────────────────────── */

/**
 * Animated WebGL hero background: an infinite scrolling grid of cubes with a
 * slowly orbiting camera. Ported from a standalone Three.js sketch into a
 * self-contained, responsive, fully-cleaned-up React component.
 */
function AnimatedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const xRows = 25;
    const zRows = 25;
    const cubeSize = 600;
    const cubeGap = 200;
    const cubeRow = cubeSize + cubeGap;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 20000);
    camera.position.y = 5000;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(FOG_COLOR, 5000, 10000);

    // Three.js r155+ uses physically-based lights (decay = 2 by default), which
    // makes this distant point light fall off to ~0. Disable decay + give it an
    // infinite range so it behaves like the original legacy lighting.
    const pointLight = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY, 0, 0);
    pointLight.position.set(0, 1800, -1800);
    scene.add(pointLight);

    // Faint ambient so faces facing away from the point light aren't pure black.
    scene.add(new THREE.AmbientLight(0x222244, 1.2));

    const group = new THREE.Object3D();
    scene.add(group);

    const cubes = [];
    const geometries = [];
    const materials = [];

    const halfXRows = (cubeRow * -xRows) / 2;
    const halfZRows = (cubeRow * -zRows) / 2;

    for (let x = 0; x < xRows; x++) {
      cubes[x] = [];
      for (let z = 0; z < zRows; z++) {
        const cubeHeight =
          10 +
          (Math.sin((x / xRows) * Math.PI) + Math.sin((z / zRows) * Math.PI)) * 200 +
          Math.random() * 150;

        const geometry = new THREE.BoxGeometry(cubeSize, cubeHeight, cubeSize);
        const material = new THREE.MeshPhongMaterial({
          color: CUBE_COLOR,
          specular: 0xffffff,
          shininess: 10,
        });
        geometries.push(geometry);
        materials.push(material);

        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = halfXRows + x * cubeRow;
        cube.position.y = cubeHeight / 2;
        cube.position.z = halfZRows + z * cubeRow;
        cube.userData.height = cubeHeight;

        group.add(cube);
        cubes[x][z] = cube;
      }
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const position = { x: 0, y: 0, z: 0 };

    function checkRow() {
      const xIndex = position.x / cubeRow;
      const xLoops = Math.floor(xIndex / xRows);
      const zIndex = position.z / cubeRow;
      const zLoops = Math.floor(zIndex / zRows);

      for (let x = 0; x < xRows; x++) {
        for (let z = 0; z < zRows; z++) {
          let dx;
          let dz;
          if (x >= xIndex - xLoops * xRows) {
            dx = xRows * (1 - xLoops);
          } else {
            dx = xRows * (0 - xLoops);
          }
          if (z >= zIndex - zLoops * zRows) {
            dz = zRows * (1 - zLoops);
          } else {
            dz = zRows * (0 - zLoops);
          }

          const cube = cubes[x][z];
          cube.position.x = (x - dx) * cubeRow - halfXRows;
          cube.position.z = (z - dz) * cubeRow - halfZRows;

          let scale = (cube.position.z + group.position.z) / 1500;
          if (scale < 1) scale = 1;
          scale = Math.pow(scale, 1.2);

          cube.scale.y = scale;
          cube.position.y = (cube.userData.height * scale) / 2;
        }
      }
    }

    const camPos = new THREE.Vector3(0, 0, 0);
    let rafId;

    function render(t) {
      rafId = requestAnimationFrame(render);

      position.x += Math.sin(t * 0.001) * 20;
      position.z += (Math.cos(t * 0.0008) + 5) * 20;
      group.position.x = -position.x;
      group.position.z = -position.z;

      checkRow();

      camera.position.x = Math.sin(t * 0.0003) * 1000;
      camera.position.z = -4000;
      camera.position.y = (Math.cos(t * 0.0004) + 1.3) * 3000;
      camera.lookAt(camPos);

      renderer.render(scene, camera);
    }
    render(0);

    function handleResize() {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="animated-background" aria-hidden="true" />;
}

export default AnimatedBackground;
