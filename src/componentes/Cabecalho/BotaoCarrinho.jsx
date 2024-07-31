import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useQuery } from 'react-query';
import { obterCarrinhoLocalStorage } from '../../Paginas/Carrinho.jsx';

const BotaoCarrinho = () => {
  const { data: carrinho } = useQuery('carrinho', obterCarrinhoLocalStorage);
  const quantidadeTotalNoCarrinho = carrinho
    ? carrinho.reduce((total, item) => total + item.quantidade, 0)
    : 0;

  return (   
    <>
      {quantidadeTotalNoCarrinho > 0 ? (
        <Badge badgeContent={quantidadeTotalNoCarrinho} color="error">
          <ShoppingCartIcon />
        </Badge>
      ) : (
        <ShoppingCartIcon />
      )}
      </>  
  );
};

export default BotaoCarrinho;
