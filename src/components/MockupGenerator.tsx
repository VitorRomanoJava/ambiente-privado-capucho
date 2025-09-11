// Arquivo: src/components/MockupGenerator.tsx
// Descrição: Versão atualizada para incluir a Caneca de Chopp 2D.

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';

// Importações de todos os visualizadores 3D
import { Mug3DViewer } from "@/components/3d/Mug3DViewer";
import { TshirtViewer } from "@/components/3d/TshirtViewer";
import { CapViewer } from "@/components/3d/CapViewer";
import { XicaraViewer } from "@/components/3d/XicaraViewer";
import { LongSleeveViewer } from "@/components/3d/LongSleeveViewer";

// Importação dos visualizadores 2D
import { Apron2DViewer } from "@/components/2d/Apron2DViewer";
import { Azulejo2DViewer } from "@/components/2d/Azulejo2DViewer";
import { Almofada2DViewer } from "@/components/2d/Almofada2DViewer";
import { BabyBody2DViewer } from "@/components/2d/BabyBody2DViewer";
import { Squeeze2DViewer } from "./2d/Squeeze2DViewer";
import { ChoppMug2DViewer } from "@/components/2d/ChoppMug2DViewer"; // <-- ADICIONADO: Importação do novo visualizador

// Importação de todos os ícones necessários
import {
  Download, Upload, Text, Palette, Wand2, RotateCw, Move3d, ArrowLeftRight, ArrowUpDown,
  Shirt, Coffee, HardHat, Sparkles, Ruler, CupSoda, ChefHat, Square, BedDouble, Baby, GlassWater, Beer, CaseUpper, Type // <-- ADICIONADO: Ícones para texto
} from "lucide-react";


// --- Definições de Configuração ---

const fonts = [
  { name: "Poppins", value: "Poppins, sans-serif" },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Lobster", value: "'Lobster', cursive" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
];

const availableProducts = [
  { id: "mug", name: "Caneca", icon: Coffee },
  { id: "xicara", name: "Xícara", icon: CupSoda },
  { id: "tshirt", name: "Camiseta", icon: Shirt },
  { id: "long_sleeve", name: "Camiseta Manga Longa", icon: Shirt },
  { id: "cap", name: "Boné", icon: HardHat },
  { id: "apron", name: "Avental", icon: ChefHat },
  { id: "azulejo", name: "Azulejo", icon: Square },
  { id: "almofada", name: "Almofada", icon: BedDouble },
  { id: "babybody", name: "Body de Bebê", icon: Baby },
  { id: "squeeze", name: "Squeeze", icon: GlassWater },
  { id: "chopp_mug", name: "Caneca de Chopp", icon: Beer }, // <-- ADICIONADO: Novo produto Caneca de Chopp
];

const products3D = ['mug', 'xicara', 'tshirt', 'long_sleeve', 'cap'];
const products2D = ['apron', 'azulejo', 'almofada', 'babybody', 'squeeze', 'chopp_mug']; // <-- ADICIONADO: "chopp_mug" à lista 2D

type ProductSettings = {
  imageScaleX: number;
  imageScaleY: number;
  imageOffsetX: number;
  imageOffsetY: number;
  imageRotation: number;
  textureOffsetX: number;
  textScaleY: number;
  textOffsetX: number;
  textOffsetY: number;
  textRotation: number;
};

const productConfigurations: Record<string, ProductSettings> = {
  mug: {
    imageScaleX: 2.31, imageScaleY: 1, imageOffsetX: 110, imageOffsetY: 230, imageRotation: 180,
    textureOffsetX: 190 / 360, textScaleY: 0.65, textOffsetX: -500, textOffsetY: 70, textRotation: 180,
  },
  xicara: {
    imageScaleX: 2.31, imageScaleY: 1, imageOffsetX: 110, imageOffsetY: 230, imageRotation: 180,
    textureOffsetX: 190 / 360, textScaleY: 0.65, textOffsetX: -500, textOffsetY: 70, textRotation: 180,
  },
  tshirt: {
    imageScaleX: 1.0, imageScaleY: 0.6, imageOffsetX: -500, imageOffsetY: 99, imageRotation: 180,
    textureOffsetX: 0, textScaleY: 0.50, textOffsetX: -500, textOffsetY: -50, textRotation: 180,
  },
  long_sleeve: {
    imageScaleX: 1.0, imageScaleY: 0.6, imageOffsetX: 460, imageOffsetY: -170, imageRotation: 180,
    textureOffsetX: 0, textScaleY: 0.50, textOffsetX: -500, textOffsetY: -50, textRotation: 180,
  },
  cap: {
    imageScaleX: 1.0, imageScaleY: 0.8, imageOffsetX: -500, imageOffsetY: 20, imageRotation: 180,
    textureOffsetX: 0, textScaleY: 0.6, textOffsetX: -500, textOffsetY: 30, textRotation: 180,
  },
  apron: {
    imageScaleX: 0.5, imageScaleY: 0.5, imageOffsetX: 0, imageOffsetY: -50, imageRotation: 0,
    textureOffsetX: 0, textScaleY: 1.0, textOffsetX: 0, textOffsetY: 0, textRotation: 0,
  },
  azulejo: {
    imageScaleX: 0.8, imageScaleY: 0.8, imageOffsetX: 0, imageOffsetY: 0, imageRotation: 0,
    textureOffsetX: 0, textScaleY: 1.0, textOffsetX: 0, textOffsetY: 0, textRotation: 0,
  },
  almofada: {
    imageScaleX: 0.7, imageScaleY: 0.7, imageOffsetX: 0, imageOffsetY: 0, imageRotation: 0,
    textureOffsetX: 0, textScaleY: 1.0, textOffsetX: 0, textOffsetY: 0, textRotation: 0,
  },
  babybody: {
    imageScaleX: 0.4, imageScaleY: 0.4, imageOffsetX: 0, imageOffsetY: -60, imageRotation: 0,
    textureOffsetX: 0, textScaleY: 1.0, textOffsetX: 0, textOffsetY: 0, textRotation: 0,
  },
  squeeze: {
    imageScaleX: 0.5, imageScaleY: 0.5, imageOffsetX: 0, imageOffsetY: -40, imageRotation: 0,
    textureOffsetX: 0, textScaleY: 1.0, textOffsetX: 0, textOffsetY: 0, textRotation: 0,
  },
  chopp_mug: { // <-- ADICIONADO: Configuração para a Caneca de Chopp
    imageScaleX: 0.45, imageScaleY: 0.45, imageOffsetX: 0, imageOffsetY: -30, imageRotation: 0,
    textureOffsetX: 0, textScaleY: 1.0, textOffsetX: 0, textOffsetY: 0, textRotation: 0,
  },
};

const MockupGenerator = () => {
  // ... (nenhuma mudança no estado ou hooks)
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedProduct, setSelectedProduct] = useState(availableProducts[0].id);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [textFont, setTextFont] = useState(fonts[0].value);
  const [textSize, setTextSize] = useState(120);
  const [productColor, setProductColor] = useState("#ffffff");
  const [activeTab, setActiveTab] = useState("image");

  const [settings, setSettings] = useState(productConfigurations[selectedProduct]);
  const [globalSizeMultiplier, setGlobalSizeMultiplier] = useState(1.0);

  useEffect(() => {
    setSettings(productConfigurations[selectedProduct]);
    setGlobalSizeMultiplier(1.0);
  }, [selectedProduct]);

  // ... (nenhuma mudança nas funções handleSettingChange, handleImageUpload, handleDownload)
  const handleSettingChange = (key: keyof ProductSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "Arquivo muito grande", description: "O arquivo deve ter no máximo 10MB", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setActiveTab("image");
        toast({ title: "Upload realizado!", description: "Sua imagem foi carregada." });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    const downloadImage = (dataUrl: string) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `mockup-${selectedProduct}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Download Iniciado!" });
    };

    if (products2D.includes(selectedProduct)) {
      const viewerElement = document.getElementById('viewer-2d-container');
      if (!viewerElement) {
        toast({ title: "Erro na Exportação", description: "Não foi possível encontrar o elemento do visualizador.", variant: "destructive" });
        return;
      }
      try {
        const canvas = await html2canvas(viewerElement, { useCORS: true, backgroundColor: null });
        downloadImage(canvas.toDataURL('image/png'));
      } catch (error) {
        console.error("Erro na exportação 2D com html2canvas:", error);
        toast({ title: "Erro na Exportação", description: `Não foi possível gerar a imagem do ${selectedProduct}.`, variant: "destructive" });
      }
      return;
    }

    if (products3D.includes(selectedProduct)) {
      const isMugLike = selectedProduct === 'mug' || selectedProduct === 'xicara';
      const canvasId = isMugLike ? 'mug-canvas' : 'product-canvas';
      let finalCanvasId = canvasId;
      if(selectedProduct === 'xicara' && !document.getElementById(finalCanvasId)){
        finalCanvasId = 'product-canvas';
      }

      const canvas = document.getElementById(finalCanvasId) as HTMLCanvasElement;
      if (canvas) {
          try {
              const dataUrl = canvas.toDataURL('image/png');
              downloadImage(dataUrl);
          } catch (error) {
              console.error("Erro na exportação 3D:", error);
              toast({ title: "Erro na Exportação", description: "Não foi possível gerar a imagem 3D.", variant: "destructive" });
          }
      } else {
        toast({ title: "Erro na Exportação", description: "Não foi possível encontrar o canvas 3D.", variant: "destructive" });
      }
    }
  };

  const commonViewerProps = {
    productColor: productColor, uploadedImage: uploadedImage, customText: customText,
    textColor: textColor, textFont: textFont, textSize: textSize, textureOffsetX: settings.textureOffsetX,
    imageScaleX: settings.imageScaleX * globalSizeMultiplier,
    imageScaleY: settings.imageScaleY * globalSizeMultiplier,
    imageOffsetX: settings.imageOffsetX, imageOffsetY: settings.imageOffsetY, imageRotation: settings.imageRotation,
    textScaleY: settings.textScaleY, textOffsetX: settings.textOffsetX, textOffsetY: settings.textOffsetY,
    textRotation: settings.textRotation, selectedProduct: selectedProduct,
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-subtle">
       {/* ... (nenhuma mudança no JSX até a parte de renderização do visualizador) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl">Editor de Mockup</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Personalize seu produto com visualização interativa. Gire, ajuste e veja o resultado em tempo real.
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader><CardTitle>1. Escolha o Produto</CardTitle></CardHeader>
                <CardContent>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Selecione um produto..." /></SelectTrigger>
                    <SelectContent>
                      {availableProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          <div className="flex items-center"><product.icon className="w-4 h-4 mr-2 text-muted-foreground" />{product.name}</div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image"><Upload className="w-4 h-4 mr-2" /> Imagem</TabsTrigger>
                  <TabsTrigger value="text"><Text className="w-4 h-4 mr-2" /> Texto</TabsTrigger>
                </TabsList>
                <TabsContent value="image" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader><CardTitle>Enviar Imagem</CardTitle></CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" /> Escolher Arquivo
                      </Button>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/png, image/jpeg" />
                    </CardContent>
                  </Card>
                  {uploadedImage && (
                    <Card>
                      <CardHeader><CardTitle>Ajustes da Imagem</CardTitle></CardHeader>
                      <CardContent className="space-y-6 pt-2">
                        <div className="space-y-2">
                          <Label className="flex justify-between items-center font-medium">
                            <span className="flex items-center"><Ruler className="w-4 h-4 mr-2" /> Tamanho Global</span>
                            <span>{globalSizeMultiplier.toFixed(2)}x</span>
                          </Label>
                          <Slider value={[globalSizeMultiplier]} onValueChange={(v) => setGlobalSizeMultiplier(v[0])} min={0.2} max={2.0} step={0.05} />
                        </div>
                        <div className="space-y-2 pt-4 border-t border-muted">
                          <Label className="flex justify-between items-center text-muted-foreground">
                            <span className="flex items-center"><ArrowLeftRight className="w-4 h-4 mr-2" /> Largura (Ajuste Fino)</span>
                            <span>{settings.imageScaleX.toFixed(2)}</span>
                          </Label>
                          <Slider value={[settings.imageScaleX]} onValueChange={(v) => handleSettingChange('imageScaleX', v[0])} min={0.1} max={3} step={0.01} />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex justify-between items-center text-muted-foreground">
                            <span className="flex items-center"><ArrowUpDown className="w-4 h-4 mr-2" /> Altura (Ajuste Fino)</span>
                            <span>{settings.imageScaleY.toFixed(2)}</span>
                          </Label>
                          <Slider value={[settings.imageScaleY]} onValueChange={(v) => handleSettingChange('imageScaleY', v[0])} min={0.1} max={3} step={0.01} />
                        </div>
                        <div className="space-y-2 pt-4 border-t border-muted">
                          <Label className="flex justify-between">Posição Horizontal (X)<span>{settings.imageOffsetX}px</span></Label>
                          <Slider value={[settings.imageOffsetX]} onValueChange={(v) => handleSettingChange('imageOffsetX', v[0])} min={-1000} max={1000} step={1} />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex justify-between">Posição Vertical (Y)<span>{settings.imageOffsetY}px</span></Label>
                          <Slider value={[settings.imageOffsetY]} onValueChange={(v) => handleSettingChange('imageOffsetY', v[0])} min={-1000} max={1000} step={1} />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex justify-between items-center"><span className="flex items-center"><RotateCw className="w-4 h-4 mr-2" /> Rotação 2D</span><span>{settings.imageRotation}°</span></Label>
                          <Slider value={[settings.imageRotation]} onValueChange={(v) => handleSettingChange('imageRotation', v[0])} min={0} max={360} step={1} />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                {/* INÍCIO DA SEÇÃO ADICIONADA */}
                <TabsContent value="text" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader><CardTitle>Adicionar Texto</CardTitle></CardHeader>
                    <CardContent className="space-y-6 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="custom-text">Seu Texto</Label>
                        <Input
                          id="custom-text"
                          type="text"
                          placeholder="Digite aqui..."
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center"><Palette className="w-4 h-4 mr-2" /> Cor do Texto</Label>
                        <Input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="p-0 h-10 w-full cursor-pointer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center"><Type className="w-4 h-4 mr-2" /> Fonte</Label>
                        <Select value={textFont} onValueChange={setTextFont}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma fonte..." />
                          </SelectTrigger>
                          <SelectContent>
                            {fonts.map((font) => (
                              <SelectItem key={font.name} value={font.value}>
                                <span style={{ fontFamily: font.value }}>{font.name}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="flex justify-between items-center">
                          <span className="flex items-center"><CaseUpper className="w-4 h-4 mr-2" /> Tamanho</span>
                          <span>{textSize}</span>
                        </Label>
                        <Slider
                          value={[textSize]}
                          onValueChange={(v) => setTextSize(v[0])}
                          min={20}
                          max={300}
                          step={5}
                        />
                      </div>                        
                      <div className="space-y-2 pt-4 border-t border-muted">
                          <Label className="flex justify-between">Posição Horizontal (X)<span>{settings.textOffsetX}px</span></Label>
                          <Slider value={[settings.textOffsetX]} onValueChange={(v) => handleSettingChange('textOffsetX', v[0])} min={-1000} max={1000} step={1} />
                      </div>
                      <div className="space-y-2">
                          <Label className="flex justify-between">Posição Vertical (Y)<span>{settings.textOffsetY}px</span></Label>
                          <Slider value={[settings.textOffsetY]} onValueChange={(v) => handleSettingChange('textOffsetY', v[0])} min={-1000} max={1000} step={1} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* FIM DA SEÇÃO ADICIONADA */}
              </Tabs>
              <Card>
                <CardHeader><CardTitle>Ajustes Gerais do Produto</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex justify-between items-center"><span className="flex items-center"><Move3d className="w-4 h-4 mr-2" /> Girar Arte (360°)</span><span>{(settings.textureOffsetX * 360).toFixed(0)}°</span></Label>
                    <Slider value={[settings.textureOffsetX]} onValueChange={(v) => handleSettingChange('textureOffsetX', v[0])} min={0} max={1} step={0.01} disabled={!['mug', 'xicara'].includes(selectedProduct)}/>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center"><Palette className="w-4 h-4 mr-2" /> Cor Base do Produto</Label>
                    <Input type="color" value={productColor} onChange={(e) => setProductColor(e.target.value)} className="p-0 h-10 w-full cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
              <Button size="lg" className="w-full btn-primary" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" /> Baixar Mockup PNG
              </Button>
            </div>
            <div className="lg:col-span-2">
              <Card className="h-full">
                  <CardContent className="p-2 md:p-4 h-[60vh] lg:h-[70vh] relative bg-muted/30 rounded-lg">
                    {products3D.includes(selectedProduct) ? (
                      <>
                        {selectedProduct === 'mug' && <Mug3DViewer {...commonViewerProps} />}
                        {selectedProduct === 'xicara' && <XicaraViewer {...commonViewerProps} />}
                        {selectedProduct === 'tshirt' && <TshirtViewer {...commonViewerProps} />}
                        {selectedProduct === 'long_sleeve' && <LongSleeveViewer {...commonViewerProps} />}
                        {selectedProduct === 'cap' && <CapViewer {...commonViewerProps} />}
                      </>
                    ) : (
                      <>
                        {selectedProduct === 'apron' && <Apron2DViewer {...commonViewerProps} />}
                        {selectedProduct === 'azulejo' && <Azulejo2DViewer {...commonViewerProps} />}
                        {selectedProduct === 'almofada' && <Almofada2DViewer {...commonViewerProps} />}
                        {selectedProduct === 'babybody' && <BabyBody2DViewer {...commonViewerProps} />}
                        {selectedProduct === 'squeeze' && <Squeeze2DViewer {...commonViewerProps} />}
                        {selectedProduct === 'chopp_mug' && <ChoppMug2DViewer {...commonViewerProps} />} 
                      </>
                    )}
                    {!uploadedImage && !customText && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg text-center shadow-lg">
                          <p className="text-muted-foreground font-medium">Faça upload de uma imagem ou adicione texto para começar.</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockupGenerator;