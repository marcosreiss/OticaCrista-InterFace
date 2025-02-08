import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";

// Define o tipo das props, permitindo children
interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const drawerWidth = 240;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItem component="a" href="/" sx={{ textDecoration: "none", color: "inherit" }}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component="a" href="/profile" sx={{ textDecoration: "none", color: "inherit" }}>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}>
        {/* Navbar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Se houver children, renderiza; senão, usa Outlet */}
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
