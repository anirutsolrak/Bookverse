import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BotaoCarrinho from '../Cabecalho/BotaoCarrinho'; // Importe o botão do carrinho

const MobileMenu = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List>
        <ListItem button component={Link} to="/" onClick={onClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button component={Link} to="/carrinho" onClick={onClose}>
          <ListItemIcon>
            <BotaoCarrinho /> {/* Usando o botão do carrinho */}
          </ListItemIcon>
          <ListItemText primary="Carrinho" />
        </ListItem>

        <ListItem button component={Link} to="/perfil" onClick={onClose}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MobileMenu;
