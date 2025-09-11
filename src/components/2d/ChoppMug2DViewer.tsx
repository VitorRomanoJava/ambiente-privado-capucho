// Arquivo: src/components/2d/ChoppMug2DViewer.tsx
// Descrição: Componente para a visualização 2D da Caneca de Chopp (sem alteração de cor).

import React from 'react';

// A interface de propriedades permanece a mesma, mesmo que 'productColor' não seja mais usado visualmente aqui.
// Manter a interface consistente simplifica a passagem de props no componente pai.
interface ViewerProps {
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
  textScaleY: number;
  textOffsetX: number;
  textOffsetY: number;
  textRotation: number;
}

export const ChoppMug2DViewer: React.FC<ViewerProps> = ({
  // A prop 'productColor' ainda é recebida, mas não é utilizada.
  productColor,
  uploadedImage,
  customText,
  textColor,
  textFont,
  textSize,
  imageScaleX,
  imageScaleY,
  imageOffsetX,
  imageOffsetY,
  imageRotation,
}) => {
  const hasContent = uploadedImage || customText;

  return (
    <div id="viewer-2d-container" className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Imagem base do produto */}
      <img
        src="/chopp-mug.png"
        alt="Caneca de Chopp"
        className="max-w-full max-h-full object-contain"
        // O atributo 'style' que aplicava o filtro de cor foi REMOVIDO daqui.
      />

      {/* Container para a arte do usuário (imagem ou texto) */}
      {hasContent && (
         <div
         className="absolute"
         style={{
           top: '50%',
           left: '50%',
           transform: `translate(-50%, -50%) translate(${imageOffsetX}px, ${imageOffsetY}px) scale(${imageScaleX}, ${imageScaleY}) rotate(${imageRotation}deg)`,
           width: '400px',
           height: '400px',
         }}
       >
         {uploadedImage && (
            <div
              className="w-full h-full bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${uploadedImage})`,
              }}
            ></div>
          )}

         {customText && !uploadedImage && (
           <div
             className="w-full h-full flex items-center justify-center"
             style={{
               color: textColor,
               fontFamily: textFont,
               fontSize: `${textSize}px`,
               textAlign: 'center',
             }}
           >
             {customText}
           </div>
         )}
       </div>
      )}
    </div>
  );
};