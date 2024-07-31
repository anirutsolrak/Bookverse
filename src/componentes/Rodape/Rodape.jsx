import React from 'react';
import { Typography, Container, Link, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';

function Rodape() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <Box
        component="footer"
        sx={{
          backgroundColor: '#A0522D',
          color: '#FFF8F0',
          padding: '20px 0',
          marginTop: '40px',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Lora' }}>
                Redes Sociais
              </Typography>          
              <Grid container justifyContent="center">
                <Link
                  href="https://www.linkedin.com/in/carlos-eduardo-turina-014a5425b"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  color="inherit"
                  sx={{ marginRight: 2 }}
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://github.com/anirutsolrak"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  color="inherit"
                >
                  GitHub
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontFamily: 'Open Sans' }}>
                © 2024 por Carlos Eduardo Turina.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
}

export default Rodape;