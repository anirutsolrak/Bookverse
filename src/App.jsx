import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container } from '@mui/material'; // Importe o Container

import Header from './componentes/Cabecalho/Header';
import Rodape from './componentes/Rodape/Rodape';
import Home from './Paginas/Home';
import DetalhesLivro from './Paginas/PaginaDetalhesLivro';
import Perfil from './Paginas/Perfil';
import Carrinho from './Paginas/Carrinho';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Container className="App">
          {' '}
     {/* Usando Container do MUI */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livro/:id" element={<DetalhesLivro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
          <Rodape />
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
