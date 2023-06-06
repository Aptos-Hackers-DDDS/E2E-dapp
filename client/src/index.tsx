import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { App } from "./App";
import { theme } from "./Theme";
import { CssVarsProvider } from "@mui/joy";

const wallets = [new PetraWallet()];

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
    <CssVarsProvider theme={theme} defaultMode="dark">
      <App />
    </CssVarsProvider>
  </AptosWalletAdapterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
