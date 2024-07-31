import React from 'react';
import { useQuery } from 'react-query';
import api from '../../Servicos/api.jsx';
import CardLivro from '../Card/CardLivro.jsx';
import SkeletonLivro from '../../Carregamento/SkeletonLivro.jsx';
import { Grid, Typography, Container } from '@mui/material';

function ListaLivros() {
  const { isLoading, error, data: livros } = useQuery('livros', api.getLivros);

  if (isLoading) {
    return (
      <Grid container spacing={2} justifyContent="center">
        <SkeletonLivro />
        <SkeletonLivro />
        <SkeletonLivro />
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Erro ao carregar livros: {error.message}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      <Grid container spacing={2} justifyContent="center">
        {livros &&
          livros.map((livro) => (
            <Grid item key={livro.id} xs={12} sm={6} md={4} lg={3}>
              <CardLivro livro={livro} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default ListaLivros;
