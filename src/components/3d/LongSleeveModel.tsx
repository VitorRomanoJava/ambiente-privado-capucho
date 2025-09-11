// Arquivo: src/components/3d/LongSleeveModel.tsx

import { useMemo, useRef } from 'react';
import { useGLTF, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { useControls } from 'leva';

interface ModelProps {
  texture: THREE.CanvasTexture | null;
  color: string;
}

// O nome da malha que queremos customizar, obtido pelo console.log
const TARGET_MESH_NAME = 'Shirt_low_uv_checker_material_uv_grid_2048x2048_0';

export function LongSleeveModel({ texture, color }: ModelProps) {
  const { scene } = useGLTF('/long_sleeve.glb');
  const modelRef = useRef<THREE.Object3D>();
  
  const texturedModel = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child: any) => {
      // 1. VERIFICAR SE A MALHA ATUAL É A MALHA ALVO
      if (child.isMesh && child.name === TARGET_MESH_NAME) {
        
        console.log(`Malha alvo ('${child.name}') encontrada. Aplicando customização...`);

        // A lógica abaixo agora só executa para a malha correta
        if (child.geometry?.attributes?.uv) {
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
      }
    });
    return cloned;
  }, [scene, texture, color]);

  return (
    <primitive 
      ref={modelRef}
      object={texturedModel} 
      scale={2.5} 
      position={[0, -3.9, 0]} 
      dispose={null} 
    />
  );
}

useGLTF.preload('/long_sleeve.glb');