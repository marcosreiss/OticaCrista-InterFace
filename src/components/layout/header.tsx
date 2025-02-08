import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { ColorModeContext } from '../../theme/themeProvider'; // Ajuste o caminho conforme necessário

const Header: React.FC = () => {
  // Estado para controlar o ancoramento do menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { toggleColorMode } = useContext(ColorModeContext); // Obtém a função para alternar o tema

  // Abre o menu definindo o elemento âncora
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Fecha o menu limpando o elemento âncora
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        {/* Título ou logo do aplicativo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Meu App
        </Typography>

        {/* Botão de alternância entre tema claro/escuro */}
        <IconButton color="inherit" onClick={toggleColorMode} sx={{ marginRight: 1 }}>
          <Brightness4Icon />
        </IconButton>

        {/* Botão de usuário que abre o menu */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu do usuário"
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <PersonIcon />
        </IconButton>

        {/* Menu do usuário */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleMenuClose}>Configurações</MenuItem>
          <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
