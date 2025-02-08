import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { navData, NavItem } from './navData';

const drawerWidth = 230;

// Estilização do Drawer para se adaptar ao tema
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default, // Usa cor de fundo do tema
    color: theme.palette.text.primary, // Usa cor do texto do tema
    borderRight: '1px solid',
    borderColor: theme.palette.divider, // Usa a cor do divider do tema
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
              bgcolor: theme.palette.background.paper, // Usa a cor de papel do tema
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover, // Usa cor de hover do tema
              },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
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
