import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../Servicos/api';
import { useQueryClient } from 'react-query';
import { TextField, Button, Grid, Box } from '@mui/material';

const LivroSchema = Yup.object().shape({
  nome: Yup.string().required('O nome do livro é obrigatório'),
  genero: Yup.string().required('O gênero é obrigatório'),
  autor: Yup.string().required('O autor é obrigatório'),
  imagem: Yup.string().required('A URL da imagem é obrigatória'),
});

function FormularioLivro({ onClose }) {
  const queryClient = useQueryClient();

  const handleSubmit = async (valores, { setSubmitting, resetForm }) => {
    try {
      await api.adicionarLivro(valores);
      console.log('Livro adicionado com sucesso:', valores);
      resetForm();
      onClose();

      queryClient.invalidateQueries('livros');
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ nome: '', genero: '', autor: '', imagem: '' }}
      validationSchema={LivroSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="nome"
                  label="Nome do Livro"
                />
                <ErrorMessage name="nome" component="div" className="erro" />
              </Grid>
              <Grid item xs={12}>
                <Field as={TextField} fullWidth name="genero" label="Gênero" />
                <ErrorMessage name="genero" component="div" className="erro" />
              </Grid>
              <Grid item xs={12}>
                <Field as={TextField} fullWidth name="autor" label="Autor" />
                <ErrorMessage name="autor" component="div" className="erro" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="imagem"
                  label="URL da Imagem"
                />
                <ErrorMessage name="imagem" component="div" className="erro" />
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: '#A0522D',
                    color: '#FFF8F0',
                    marginTop: '20px',
                    '&:hover': {
                      backgroundColor: '#80421D',
                    },
                  }}
                  disabled={isSubmitting}
                >
                  Adicionar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default FormularioLivro;
