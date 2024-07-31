import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from './MobileMenu';
import BotaoCarrinho from './BotaoCarrinho';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#A0522D' }}> 
      <Toolbar>
        {isSmallScreen ? (
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        )}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: 'Lora', fontWeight: 'bold' }}
        >
          Minha Estante
        </Typography>
        {isSmallScreen ? (
          <Link to="/carrinho" style={{ color: 'inherit', textDecoration: 'none' }}>
            <IconButton color="inherit">
              <BotaoCarrinho />
            </IconButton>
          </Link>
        ) : (
          <>
            <Link to="/carrinho" style={{ color: 'inherit', textDecoration: 'none', display: { xs: 'none', sm: 'inline-flex' } }}> 
          <Button color="inherit" sx={{ marginLeft: 'auto' }}>
            <BotaoCarrinho />
            Carrinho
          </Button>
        </Link>
            <Link to="/perfil" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button color="inherit">
                <PersonIcon /> Perfil
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
      {isSmallScreen && (
        <MobileMenu open={mobileMenuOpen} onClose={handleDrawerToggle} />
      )}
    </AppBar>
  );
}

export default Header;