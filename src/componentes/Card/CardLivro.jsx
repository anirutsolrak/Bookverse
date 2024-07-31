import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import api from '../../Servicos/api.jsx';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { obterCarrinhoLocalStorage } from '../../Paginas/Carrinho.jsx';

function CardLivro({ livro }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDetalhesClick = () => {
    navigate(`/livro/${livro.id}`);
  };

  const adicionarAoCarrinho = async () => {
    try {
      console.log('ID do livro:', livro.id); // Verifique se o ID está correto
      const carrinhoAtual = obterCarrinhoLocalStorage();
      console.log(carrinhoAtual);
      const livroExistente = carrinhoAtual.find((item) => item.id === livro.id);

      if (livroExistente) {
        livroExistente.quantidade++;
      } else {
        const novoLivro = { ...livro, quantidade: 1 };
        carrinhoAtual.push(novoLivro);
      }

      localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
      setSnackbarOpen(true);
      queryClient.invalidateQueries('carrinho');
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="card-livro"
        sx={{
          boxShadow: 3,
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 10,
            transform: 'translateY(-2px)',
          },
        }}
      >
        <CardActionArea onClick={handleDetalhesClick}>
          <CardMedia
            component="img"
            sx={{ height: 300, objectFit: 'contain' }}
            image={livro.imagem}
            alt={livro.nome}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {livro.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {livro.autor}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Button size="small" color="primary" onClick={adicionarAoCarrinho}>
          Adicionar ao Carrinho
        </Button>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Livro adicionado ao carrinho!
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default CardLivro;
