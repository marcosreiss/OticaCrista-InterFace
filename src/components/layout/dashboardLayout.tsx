import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./sidebar";
import Header from "./header";

// Define o tipo das props, permitindo children
interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const drawerWidth = 240;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}>
        <Header />
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
