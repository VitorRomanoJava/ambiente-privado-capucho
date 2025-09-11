// Arquivo: src/components/3d/TshirtModel.tsx

import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TshirtModelProps {
  texture: THREE.CanvasTexture | null;
  color: string;
}

export function TshirtModel({ texture, color }: TshirtModelProps) {
  const { scene } = useGLTF('/Tshirt.glb');
  
  // Clona a cena e aplica a textura ou cor.
  const texturedModel = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child: any) => {
      if (child.isMesh && child.geometry?.attributes?.uv) {
        const materials = Array.isArray(child.material) 
          ? child.material 
          : [child.material];

        const newMaterials = materials.map((mat: THREE.MeshStandardMaterial) => {
          if (!mat) return null;
          const clonedMat = mat.clone();
          
          if (texture) {
            clonedMat.map = texture;
            clonedMat.color.set(0xffffff); // Cor branca para não interferir na textura
          } else {
            clonedMat.color.set(color); // Aplica a cor sólida selecionada
          }
          clonedMat.transparent = false; 
          clonedMat.needsUpdate = true;
          return clonedMat;
        });

        child.material = Array.isArray(child.material) 
          ? newMaterials 
          : newMaterials[0];
      }
    });
    return cloned;
  }, [scene, texture, color]);

  return (
    <primitive object={texturedModel} scale={2.5} position={[0, -1, 0]} dispose={null} />
  );
}

useGLTF.preload('/Tshirt.glb');