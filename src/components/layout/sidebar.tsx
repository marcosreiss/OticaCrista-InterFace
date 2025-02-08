import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { navData, NavItem } from './navData';

const drawerWidth = 230;

// Estilização customizada do Drawer com gradiente e sombra
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRight: 'none',
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(2),
    boxShadow: '2px 0px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const Sidebar: React.FC = () => {
  const theme = useTheme();

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <List>
        {navData.map((item: NavItem, index: number) => (
          <ListItemButton
            key={index}
            component={Link}
            to={item.path}
            sx={{
              margin: theme.spacing(1, 2),
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
