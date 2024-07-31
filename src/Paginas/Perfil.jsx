import React from 'react';
import {
  Typography,
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';

function Perfil() {
  // Simulando dados do perfil do usuário
  const usuario = {
    nome: 'Usuário Exemplo',
    email: 'usuario@exemplo.com',
    livrosFavoritos: [
      {
        id: 1,
        nome: 'Livro 1',
        autor: 'Autor 1',
        imagem: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        nome: 'Livro 2',
        autor: 'Autor 2',
        imagem: 'https://via.placeholder.com/150',
      },
    ],
  };

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
            Meu Perfil
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Nome: {usuario.nome}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: {usuario.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontFamily: 'Lora' }}
              >
                Livros Favoritos:
              </Typography>
              <List>
                {usuario.livrosFavoritos.map((livro) => (
                  <ListItem key={livro.id}>
                    <ListItemAvatar>
                      <Avatar alt={livro.nome} src={livro.imagem} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={livro.nome}
                      secondary={livro.autor}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </motion.div>
  );
}

export default Perfil;