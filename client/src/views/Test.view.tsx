import { useState, useEffect } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { Box, Button, Typography } from "@mui/joy";

export const TestView = () => {
  return (
    <Box>
      <Typography level="h2">Test</Typography>

      <Button>Test</Button>
    </Box>
  );
};
