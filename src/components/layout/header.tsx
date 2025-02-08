import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Header: React.FC = () => {
  // Estado para controlar o ancoramento do menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Abre o menu definindo o elemento âncora
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Fecha o menu limpando o elemento âncora
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="default" elevation={0}>
      <Toolbar>
        {/* Título ou logo do aplicativo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Meu App
        </Typography>

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

        {/* Menu que aparece ao clicar no botão do usuário */}
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
