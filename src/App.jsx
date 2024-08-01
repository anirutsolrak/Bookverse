import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Importações dos componentes
import Header from './componentes/Cabecalho/Header';
import Rodape from './componentes/Rodape/Rodape';
import Home from './Paginas/Home';
import DetalhesLivro from './Paginas/PaginaDetalhesLivro';
import Perfil from './Paginas/Perfil';
import Carrinho from './Paginas/Carrinho';
import PaginaNaoEncontrada from './Paginas/PaginaNaoEncontrada';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Container className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livro/:id" element={<DetalhesLivro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/*" element={<PaginaNaoEncontrada />} />
          </Routes>
          <Rodape />
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
