// Arquivo: src/components/2d/Apron2DViewer.tsx
// Descrição: Componente de visualização 2D para o produto Avental.

import React from 'react';

// Tipagem para as propriedades do componente, mantendo a consistência com os viewers 3D
type ViewerProps = {
  productColor: string;
  uploadedImage: string | null;
  customText: string;
  textColor: string;
  textFont: string;
  textSize: number;
  imageScaleX: number;
  imageScaleY: number;
  imageOffsetX: number;
  imageOffsetY: number;
  imageRotation: number;
  // As props de texto são recebidas mas não utilizadas nesta fase
};

export const Apron2DViewer: React.FC<ViewerProps> = ({
  productColor,
  uploadedImage,
  imageScaleX,
  imageScaleY,
  imageOffsetX,
  imageOffsetY,
  imageRotation,
}) => {
  return (
    // Container principal que será alvo do html2canvas
    <div
      id="viewer-2d-container"
      className="w-full h-full flex items-center justify-center overflow-hidden relative"
      style={{ backgroundColor: productColor }} // Aplica a cor de fundo selecionada
    >
      {/* Imagem base do avental */}
      <img
        src="/apron.png" // Caminho para a imagem do avental na pasta `public`
        alt="Avental"
        className="max-w-full max-h-full object-contain pointer-events-none"
        style={{
          filter: productColor !== '#ffffff' ? 'brightness(90%)' : 'none' // Leve ajuste se a cor não for branca
        }}
      />

      {/* Camada de personalização (imagem do usuário) */}
      {uploadedImage && (
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            // Aplica as transformações de acordo com os sliders
            transform: `
              translateX(-50%) translateY(-50%) 
              translateX(${imageOffsetX}px) 
              translateY(${imageOffsetY}px) 
              scaleX(${imageScaleX}) 
              scaleY(${imageScaleY}) 
              rotate(${imageRotation}deg)
            `,
            // Previne que a imagem saia da área visível do produto (aproximado)
            maxWidth: '50%', 
            maxHeight: '50%',
          }}
        >
          <img
            src={uploadedImage}
            alt="Arte personalizada"
            className="pointer-events-none"
          />
        </div>
      )}
    </div>
  );
};