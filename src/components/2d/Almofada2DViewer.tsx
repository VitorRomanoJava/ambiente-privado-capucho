// Arquivo: src/components/2d/Almofada2DViewer.tsx
// Descrição: Componente de visualização 2D para o produto Almofada.

import React from 'react';

// Tipagem para as propriedades do componente (reutilizada)
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
};

export const Almofada2DViewer: React.FC<ViewerProps> = ({
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
      {/* Imagem base da almofada */}
      <img
        src="/almofada.png" // Caminho para a imagem da almofada na pasta `public`
        alt="Almofada"
        className="max-w-full max-h-full object-contain pointer-events-none shadow-md"
      />

      {/* Camada de personalização (imagem do usuário) */}
      {uploadedImage && (
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `
              translateX(-50%) translateY(-50%) 
              translateX(${imageOffsetX}px) 
              translateY(${imageOffsetY}px) 
              scaleX(${imageScaleX}) 
              scaleY(${imageScaleY}) 
              rotate(${imageRotation}deg)
            `,
            maxWidth: '80%', 
            maxHeight: '80%',
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