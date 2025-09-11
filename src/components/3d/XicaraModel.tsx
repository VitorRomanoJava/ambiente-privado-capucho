// Arquivo: src/components/3d/MugModel.tsx
// Descrição: Refatorado para usar exportação de constante, visando corrigir o erro de módulo.

import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface XicaraModelProps {
  texture: THREE.CanvasTexture | null;
}

// MODIFICADO: A função foi transformada em uma constante (arrow function).
const XicaraModelComponent = ({ texture }: XicaraModelProps) => {
  // Carrega o modelo 3D da caneca
  const { scene } = useGLTF('/xicara.glb');

  // Clona a cena para evitar mutações no cache do useGLTF
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Aplica a textura ao material da caneca dinamicamente
  useMemo(() => {
    if (!texture) return;

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.map = texture;
        child.material.color.set(0xffffff); // Garante que a cor base não tinja a textura
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, texture]);

  return <primitive object={clonedScene} scale={1} position={[0, -0.1, 0]} dispose={null} />;
};

// Pré-carrega o modelo para uma experiência mais rápida
useGLTF.preload('/xicara.glb');

// MODIFICADO: A exportação agora é feita explicitamente.
export { XicaraModelComponent as XicaraModel };