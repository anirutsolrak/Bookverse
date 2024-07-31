import React, { useState } from 'react';
import ListaLivros from '../componentes/Listas/Lista';
import FormularioLivro from '../Formulario/Formulario';
import { Button, Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const estiloModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Home() {
  const [modalAberto, setModalAberto] = useState(false);

  const handleAbrirModal = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
  };

  return (
    <main>
      <ListaLivros />

      <Button
        variant="contained"
        onClick={handleAbrirModal}
        sx={{ 
          backgroundColor: '#A0522D', 
          color: '#FFF8F0',
          marginTop: '20px',
          '&:hover': {
            backgroundColor: '#80421D',
          },
        }}
      >
        Adicionar Novo Livro
      </Button>

      <Modal open={modalAberto} onClose={handleFecharModal}>
        <Box sx={estiloModal}>
          <IconButton
            aria-label="fechar"
            onClick={handleFecharModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" gutterBottom>
            Adicionar Novo Livro
          </Typography>
          <FormularioLivro onClose={handleFecharModal} />
        </Box>
      </Modal>
    </main>
  );
}

export default Home;