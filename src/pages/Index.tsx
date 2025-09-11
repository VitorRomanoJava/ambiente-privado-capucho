import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import MockupGenerator from "@/components/MockupGenerator";
import Footer from "@/components/layout/Footer"; // 1. Importar o Footer
import { ShoppingCart } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col flex-1 bg-background">
      {/* 1. Cima -> Logo e Nome */}
      <Header />

      {/* 2. Meio -> "experimente agora" */}
      <MockupGenerator />
      
      {/* 3. Baixo -> Botão de comprar */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 font-heading">
            Gostou do resultado?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Clique no botão abaixo para adicionar ao carrinho e finalizar sua compra.
          </p>
          {/* 2. Alterar a classe do botão */}
          <Button size="lg" className="btn-brand text-lg px-8 py-4">
            <ShoppingCart className="mr-2 h-5 w-5" />
            <a href="https://wa.me/551939096319">Comprar Agora</a>
          </Button>
        </div>
      </section>

      {/* 4. Adicionar o Footer no final da página */}
      <Footer />
    </div>
  );
};

export default Index;