import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../Servicos/api';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Button,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'framer-motion';
// Função para obter o carrinho do localStorage
export const obterCarrinhoLocalStorage = () => {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
};

const Carrinho = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {
    isLoading,
    error,
    data: carrinho,
  } = useQuery('carrinho', obterCarrinhoLocalStorage);
  const [quantidades, setQuantidades] = useState({});

  useEffect(() => {
    if (!isLoading) {
      if (Array.isArray(carrinho) && carrinho.length === 0) {
        setQuantidades({});
      } else if (Array.isArray(carrinho)) {
        const quantidadesIniciais = carrinho.reduce((acc, item) => {
          acc[item.id] = item.quantidade;
          return acc;
        }, {});
        setQuantidades(quantidadesIniciais);
      }
    }
  }, [carrinho, isLoading]);

  const handleIncrementarQuantidade = useCallback(
    (livroId) => {
      setQuantidades((prevQuantidades) => {
        const carrinhoAtualizado = carrinho.map((item) =>
          item.id === livroId
            ? {
                ...item,
                quantidade: (prevQuantidades[livroId] || 0) + 1,
              }
            : item
        );

        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
        queryClient.invalidateQueries('carrinho');

        return {
          ...prevQuantidades,
          [livroId]: (prevQuantidades[livroId] || 0) + 1,
        };
      });
    },
    [carrinho, queryClient]
  );

  const handleDecrementarQuantidade = useCallback(
    (livroId) => {
      setQuantidades((prevQuantidades) => {
        const novaQuantidade = Math.max((prevQuantidades[livroId] || 1) - 1, 1);

        const carrinhoAtualizado = carrinho.map((item) =>
          item.id === livroId ? { ...item, quantidade: novaQuantidade } : item
        );

        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
        queryClient.invalidateQueries('carrinho');

        return {
          ...prevQuantidades,
          [livroId]: novaQuantidade,
        };
      });
    },
    [carrinho, queryClient]
  );

  const handleRemoverDoCarrinho = useCallback(
    (livroId) => {
      const carrinhoAtualizado = carrinho.filter((item) => item.id !== livroId);

      localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
      setQuantidades((prevQuantidades) => {
        const { [livroId]: _, ...resto } = prevQuantidades;
        return resto;
      });

      queryClient.invalidateQueries('carrinho');
    },
    [carrinho, queryClient]
  );

  const handleFinalizarCompra = () => {
    localStorage.removeItem('carrinho');
    queryClient.invalidateQueries('carrinho');
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Erro ao carregar o carrinho: {error.message}
      </Typography>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ fontFamily: 'Lora', fontWeight: 'bold' }}
          >
            Meu Carrinho
          </Typography>
          {carrinho.length === 0 ? (
            <Typography variant="body1" align="center">
              Seu carrinho está vazio.
            </Typography>
          ) : (
            <List>
              {carrinho.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoverDoCarrinho(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="add"
                        onClick={() => handleIncrementarQuantidade(item.id)}
                      >
                        <AddIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ margin: '0 8px' }}>
                        {quantidades[item.id] || 0}
                      </Typography>
                      <IconButton
                        aria-label="remove"
                        onClick={() => handleDecrementarQuantidade(item.id)}
                        disabled={(quantidades[item.id] || 1) <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt={item.nome} src={item.imagem} />
                  </ListItemAvatar>
                  <ListItemText primary={item.nome} secondary={item.autor} />
                </ListItem>
              ))}
            </List>
          )}
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={carrinho.length === 0}
              sx={{ backgroundColor: '#A0522D' }}
              onClick={handleFinalizarCompra}
            >
              Finalizar Compra (Simulação)
            </Button>
          </Grid>
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
              Obrigado pela compra!
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default React.memo(Carrinho);
