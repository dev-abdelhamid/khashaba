import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HelmetProvider>
      <App />
      <Toaster />
    </HelmetProvider>
  </BrowserRouter>
);