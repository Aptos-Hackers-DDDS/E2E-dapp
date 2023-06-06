import { Box, useTheme } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{ backgroundColor: theme.palette.background.body, display: "flex" }}
    >
      <Sidebar />
      <Box
        sx={{
          marginLeft: "265px",
          minHeight: "100vh",
          overflowY: "hidden",
          width: "100%",
        }}
      >
        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
