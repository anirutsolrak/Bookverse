import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaginaNaoEncontrada = () => {
  const navigate = useNavigate();

  const handleRedirecionarParaHome = () => {
    navigate('/');
  };

  // Redirecionamento automático com useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Página não encontrada!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Aguarde 3 segundos, você será redirecionado para a página inicial.
      </Typography>
      <Typography variant="body1">
        Ou clique{' '}
        <Button variant="text" onClick={handleRedirecionarParaHome}>
          aqui
        </Button>{' '}
        para redirecionar imediatamente.
      </Typography>
    </Box>
  );
};

export default PaginaNaoEncontrada;
