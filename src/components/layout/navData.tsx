import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';


export interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const navData: NavItem[] = [
  {
    title: 'Página Inicial',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    title: 'Clientes',
    path: '/clients',
    icon: <PeopleAltIcon />,
  },
  {
    title: 'Produtos',
    path: '/products',
    icon: <InventoryIcon />,
  },
];
