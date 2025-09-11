// Arquivo: src/components/3d/LongSleeveViewer.tsx
// Descrição: Visualizador 3D com ajuste de posição para o modelo.

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { LongSleeveModel } from './LongSleeveModel';
import { useTextureManager } from '@/hooks/useTextureManager';
import { CommonViewerProps } from './types';

export const LongSleeveViewer = (props: CommonViewerProps) => {
  const { texture } = useTextureManager({
    imageSrc: props.uploadedImage,
    text: props.customText,
    textColor: props.textColor,
    fontFamily: props.textFont,
    fontSize: props.textSize,
    productColor: props.productColor,
    imageScaleX: props.imageScaleX,
    imageScaleY: props.imageScaleY,
    imageOffsetX: props.imageOffsetX,
    imageOffsetY: props.imageOffsetY,
    imageRotation: props.imageRotation,
    textureOffsetX: props.textureOffsetX,
    textScaleY: props.textScaleY,
    textOffsetX: props.textOffsetX,
    textOffsetY: props.textOffsetY,
    textRotation: props.textRotation,
  });

return (
    <Canvas id="product-canvas" camera={{ position: [0, 0, 15], fov: 50 }} shadows>
      <Suspense fallback={null}>
        <Environment preset="lobby" intensity={0.7} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <LongSleeveModel texture={texture} color={props.productColor} />

        <OrbitControls 
          minDistance={2} 
          maxDistance={10} 
          enablePan={true}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Suspense>
    </Canvas>
  );
};