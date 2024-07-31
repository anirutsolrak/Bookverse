import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../Servicos/api';
import {
  Typography,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';

function DetalhesLivro() {
  const { id } = useParams();
  const { isLoading, error, data: livros } = useQuery('livros', api.getLivros);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Erro ao carregar livro: {error.message}
      </Typography>
    );
  }

  const livro = livros.find((livro) => livro.id === parseInt(id));

  if (!livro) {
    return <Typography variant="body1">Livro não encontrado.</Typography>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src={livro.imagem}
                alt={livro.nome}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom>
                {livro.nome}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Autor: {livro.autor}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Gênero: {livro.genero}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </motion.div>
  );
}

export default DetalhesLivro;
