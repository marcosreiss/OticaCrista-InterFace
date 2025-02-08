import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface CustomThemeProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ColorModeContext = createContext({ toggleColorMode: () => { } });

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  // Estado para armazenar o modo atual (light ou dark)
  const [mode, setMode] = useState<PaletteMode>('light');

  // Função para alternar entre os modos
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  // Criação do tema com base no estado atual
  const lightPalette = {
    mode: 'light' as PaletteMode,
    primary: { main: '#53ac59', light: '#81d681', dark: '#3b8952', contrastText: '#ffffff' },
    secondary: { main: '#0f684b', light: '#44a378', dark: '#03484c', contrastText: '#ffffff' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
    text: { primary: '#1c232e', secondary: '#3b8952' },
  };


  const darkPalette = {
    mode: 'dark' as PaletteMode,
    primary: { main: '#3b8952', light: '#53ac59', dark: '#0f684b', contrastText: '#ffffff' },
    secondary: { main: '#03484c', light: '#0f684b', dark: '#1c232e', contrastText: '#ffffff' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff', secondary: '#81d681' },
  };


  const theme = useMemo(() => createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography: { fontFamily: 'Roboto, sans-serif' },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [mode]);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
