// Arquivo: src/components/3d/MugModel.tsx
// Descrição: Refatorado para usar exportação de constante, visando corrigir o erro de módulo.

import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CapModelProps {
  texture: THREE.CanvasTexture | null;
  color: string;
}

const FRONT_PANEL_MESH_NAME = 'trucker_hat_badge_0';

export function CapModel({ texture, color }: CapModelProps) {
  // Carregando o modelo usando useGLTF, que é o padrão no P1 agora.
  const { scene } = useGLTF('/cap.glb');

  const texturedModel = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child: any) => {
      if (!child.isMesh) return;

      // DEBUG: se quiser checar nomes das meshes, descomente a linha abaixo
      // console.log('mesh name:', child.name);

      const applyToMaterial = (origMat: any) => {
        const mat = origMat.clone();

        if (child.name === FRONT_PANEL_MESH_NAME) {
          // Frente: só recebe a TEXTURA (se houver) e NUNCA deve ser tingida.
          if (texture) {
            mat.map = texture;
            // Garante que a textura não tinge o material.
            if (!mat.color) mat.color = new THREE.Color(0xffffff);
            mat.color.set(0xffffff);
            if ((mat.map as any)) (mat.map as any).needsUpdate = true;
            // Se a textura vier de um canvas e estiver invertida, descomente:
            // if ((texture as any).flipY !== undefined) (texture as any).flipY = false;
          } else {
            // Sem textura: preserva o material/clonagem original (não aplica a cor global).
            // Não alteramos mat.color aqui.
          }
        } else {
          // Restante do boné: não aceita textura e deve receber a cor do usuário.
          mat.map = null;
          if (!mat.color) mat.color = new THREE.Color();
          mat.color.set(color);
        }

        mat.needsUpdate = true;
        return mat;
      };

      // Suporta materiais únicos e arrays de materiais
      if (Array.isArray(child.material)) {
        child.material = child.material.map((m: any) => applyToMaterial(m));
      } else {
        child.material = applyToMaterial(child.material);
      }
    });

    return cloned;
  }, [scene, texture, color]);

  // Aplicando os ajustes de escala (Etapa 5/P1) e posição (Etapa 6) para centralizar o modelo.
  return (
    <primitive object={texturedModel} scale={6} position={[0, -0.2, 0]} dispose={null} />
  );
}

useGLTF.preload('/cap.glb');
