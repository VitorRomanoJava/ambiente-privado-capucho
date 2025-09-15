// src/components/ArtEditor.tsx

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Upload, Text, Palette, Type, CaseUpper, Save, RotateCw, ZoomIn, FlipHorizontal, FlipVertical } from 'lucide-react';

// --- PROPS ---
interface ArtEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  initialArt?: {
    imageUrl?: string;
    text?: string;
  };
}

// --- CONFIGURAÇÕES ---
const fonts = [
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Lobster', value: "'Lobster', cursive" },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
];

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 1024;

// --- COMPONENTE ---
export const ArtEditor: React.FC<ArtEditorProps> = ({ isOpen, onClose, onSave, initialArt }) => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados dos elementos da arte
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [customText, setCustomText] = useState(initialArt?.text || '');
  const [textColor, setTextColor] = useState('#000000');
  const [textFont, setTextFont] = useState(fonts[0].value);
  const [textSize, setTextSize] = useState(100);
  const [textPosition, setTextPosition] = useState({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 });
  
  // Estados para transformação da imagem
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [imageFlip, setImageFlip] = useState({ horizontal: false, vertical: false });

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  }, []);
  
  useEffect(() => {
    if (initialArt?.imageUrl) {
      loadImage(initialArt.imageUrl)
        .then(setBackgroundImage)
        .catch(() => {
          toast({ title: "Erro ao carregar imagem inicial", variant: "destructive" });
        });
    }
  }, [initialArt, loadImage, toast]);

  // Efeito para desenhar no canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundImage) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(imageRotation * Math.PI / 180);
      ctx.scale(imageFlip.horizontal ? -1 : 1, imageFlip.vertical ? -1 : 1);
      
      const scaledWidth = backgroundImage.width * imageScale;
      const scaledHeight = backgroundImage.height * imageScale;

      ctx.drawImage(backgroundImage, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
      ctx.restore();
    }
    
    if (customText) {
      const loadAndDraw = async () => {
        const fontSpec = `${textSize}px ${textFont}`;
        await document.fonts.load(fontSpec);
        ctx.font = fontSpec;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(customText, textPosition.x, textPosition.y);
      };
      loadAndDraw();
    }
  }, [backgroundImage, customText, textColor, textFont, textSize, textPosition, imageScale, imageRotation, imageFlip]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageScale(1);
      setImageRotation(0);
      setImageFlip({ horizontal: false, vertical: false });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        loadImage(reader.result as string)
          .then(setBackgroundImage)
          .catch(err => console.error("Falha ao carregar a imagem", err));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSaveClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
        toast({ title: "Erro", description: "O canvas não foi encontrado.", variant: "destructive"});
        return;
    }
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    onSave(dataUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader><DialogTitle>Editor de Arte</DialogTitle></DialogHeader>
        <div className="grid grid-cols-3 gap-6 flex-1 overflow-hidden">
          <div className="col-span-1 flex flex-col space-y-4 overflow-y-auto pr-2">
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image"><Upload className="w-4 h-4 mr-2" /> Fundo</TabsTrigger>
                <TabsTrigger value="text"><Text className="w-4 h-4 mr-2" /> Texto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="image" className="pt-4 space-y-4">
                <div className="space-y-2">
                    <Label>Imagem de Fundo</Label>
                    <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2"/> Escolher Arquivo
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/png, image/jpeg"/>
                </div>

                {backgroundImage && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                       <Label className='flex justify-between items-center'>
                         <span className="flex items-center"><ZoomIn className="w-4 h-4 mr-2" /> Tamanho</span>
                         <span>{Math.round(imageScale * 100)}%</span>
                       </Label>
                       <Slider value={[imageScale]} onValueChange={(v) => setImageScale(v[0])} min={0.1} max={3} step={0.05} />
                    </div>
                    <div className="space-y-2">
                       <Label className='flex justify-between items-center'>
                         <span className="flex items-center"><RotateCw className="w-4 h-4 mr-2" /> Rotação</span>
                         <span>{imageRotation}°</span>
                       </Label>
                       <Slider value={[imageRotation]} onValueChange={(v) => setImageRotation(v[0])} min={0} max={360} step={1} />
                    </div>
                    <div className="space-y-2">
                      <Label>Espelhar</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={() => setImageFlip(f => ({ ...f, horizontal: !f.horizontal }))}>
                          <FlipHorizontal className="w-4 h-4 mr-2"/> Horizontal
                        </Button>
                        <Button variant="outline" onClick={() => setImageFlip(f => ({ ...f, vertical: !f.vertical }))}>
                          <FlipVertical className="w-4 h-4 mr-2"/> Vertical
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="text" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-text">Texto (opcional)</Label>
                  <Input id="custom-text" placeholder="Digite aqui..." value={customText} onChange={(e) => setCustomText(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className='flex items-center'><Palette className="w-4 h-4 mr-2" /> Cor</Label>
                  <Input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="p-0 h-10 w-full cursor-pointer"/>
                </div>
                <div className="space-y-2">
                  <Label className='flex items-center'><Type className="w-4 h-4 mr-2" /> Fonte</Label>
                  <Select value={textFont} onValueChange={setTextFont}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      {fonts.map(font => (
                        <SelectItem key={font.name} value={font.value}>
                          <span style={{ fontFamily: font.value }}>{font.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className='flex justify-between items-center'>
                    <span className="flex items-center"><CaseUpper className="w-4 h-4 mr-2" /> Tamanho</span>
                    <span>{textSize}px</span>
                  </Label>
                  <Slider value={[textSize]} onValueChange={(v) => setTextSize(v[0])} min={20} max={300} step={2} />
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <Label>Posição do Texto (X)</Label>
                  <Slider value={[textPosition.x]} onValueChange={(v) => setTextPosition(p => ({...p, x: v[0]}))} min={0} max={CANVAS_WIDTH} step={5}/>
                </div>
                <div className="space-y-2">
                  <Label>Posição do Texto (Y)</Label>
                  <Slider value={[textPosition.y]} onValueChange={(v) => setTextPosition(p => ({...p, y: v[0]}))} min={0} max={CANVAS_HEIGHT} step={5}/>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="col-span-2 bg-white rounded-lg flex items-center justify-center p-2">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="w-full h-full object-contain"
              style={{ background: `
                linear-gradient(45deg, rgba(0,0,0,0.098) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.098) 75%),
                linear-gradient(45deg, rgba(0,0,0,0.098) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.098) 75%)
                0px 0px / 20px 20px,
                rgb(255, 255, 255)`
              }}
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveClick}>
                <Save className="w-4 h-4 mr-2"/> Salvar Arte
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};