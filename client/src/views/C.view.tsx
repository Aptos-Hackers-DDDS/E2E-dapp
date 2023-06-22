import { useState, useEffect } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Box, Button, Typography } from "@mui/joy";


export const CView = () => {
  return (
    <Box>
      <Typography level="h2">C</Typography>

      <Button>C Test</Button>
    </Box>
  );
};
