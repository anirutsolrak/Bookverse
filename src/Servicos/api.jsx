import axios from 'axios';

const BASE_URL = 'https://api-alura-book-lilac.vercel.app/produtos';

const api = {
  getLivros: async () => {
    try {
      const resposta = await axios.get(BASE_URL);
      return resposta.data;
    } catch (error) {
      console.error('Erro ao obter livros:', error);
      throw error;
    }
  },

  getLivroPorId: async (id) => {
    try {
      console.log('ID do livro na função getLivroPorId:', id); // Log do ID
      console.log("URL da requisição:", `${BASE_URL}/${id}`); 
      const resposta = await axios.get(`${BASE_URL}/${id}`);
      console.log('Resposta da API em getLivroPorId:', resposta); // Log da resposta
      return resposta.data;
    } catch (error) {
      console.error('Erro ao obter livro por ID:', error);
      throw error;
    }
  },

  adicionarLivro: async (valores) => {
    try {
      const resposta = await axios.post(BASE_URL, valores);
      return resposta.data;
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
      throw error;
    }
  },

  atualizarLivro: async (id, livroAtualizado) => {
    try {
      const resposta = await axios.put(`${BASE_URL}/${id}`, livroAtualizado);
      return resposta.data;
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      throw error;
    }
  },

  excluirLivro: async (id) => {
    try {
      const resposta = await axios.delete(`${BASE_URL}/${id}`);
      return resposta.data;
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      throw error;
    }
  },
};

export default api;
