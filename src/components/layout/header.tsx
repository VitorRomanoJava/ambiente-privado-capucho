// Arquivo: src/components/layout/header.tsx
// Descrição: Versão final com layout vertical (Imagem -> Nome -> Logos).

import logo from "@/capucho-logo.png";
import { Instagram } from "lucide-react";


const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);


const Header = () => {
  return (
    <header className="py-6 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="flex flex-col items-center text-center">

          {/* 1. IMAGEM */}
          <img src={logo} alt="Logo da Capucho" className="h-14 w-14" />
          
          {/* 2. NOME */}
          <h1 className="text-5xl font-bold font-heading tracking-tight mb-2">
            Capucho
          </h1>

          {/* 3. LOGOS */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/capuchobrindesbrasil/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Capucho"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/capuchopersonalizados"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Capucho"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FacebookIcon className="h-6 w-6" />
            </a>
            <a
              href="https://wa.me/551939096319"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Capucho"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
          </div>
          
        </div>
        {}
      </div>
    </header>
  );
};

export default Header;