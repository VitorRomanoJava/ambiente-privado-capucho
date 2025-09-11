import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        {/* O conteúdo da página será gerenciado pelo sistema de rotas */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* O Toaster é necessário para as notificações do MockupGenerator funcionarem */}
      <Toaster />
    </>
  );
}

export default App;