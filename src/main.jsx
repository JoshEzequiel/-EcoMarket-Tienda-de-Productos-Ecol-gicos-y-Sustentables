import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { TiendaProvider } from './context/TiendaContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TiendaProvider><App /></TiendaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
