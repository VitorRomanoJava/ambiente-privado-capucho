// Arquivo: src/components/3d/types.ts
// Objetivo: Renomear TextureProps para CommonViewerProps para padronização.

export type CommonViewerProps = {
  productColor: string;
  uploadedImage: string | null;
  customText: string;
  textColor: string;
  textFont: string;
  textSize: number;
  textureOffsetX?: number;
  imageScaleX: number;
  imageScaleY: number;
  imageOffsetX: number;
  imageOffsetY: number;
  imageRotation: number;
  textScaleY: number;
  textOffsetX: number;
  textOffsetY: number;
  textRotation: number;
  selectedProduct: string;
};