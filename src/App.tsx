// import 'src/global.css';

// import Fab from '@mui/material/Fab';

import * as useScrollToTop from './hooks/use-scroll-to-top';


// import { Iconify } from 'src/components/iconify';

import { useAuth } from "./context/AuthContext";
import { PublicRouter, PrivateRouter } from './routes/sections';
import CustomThemeProvider from './theme/themeProvider';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop.useScrollToTop();
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? (
    <CustomThemeProvider>
      <PrivateRouter />
    </CustomThemeProvider>
  ) : (
    <CustomThemeProvider>
      <PublicRouter />
    </CustomThemeProvider>
  )
}
