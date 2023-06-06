import { Box, useTheme } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect } from "react";

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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <WalletSelector />
        </Box>
        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
