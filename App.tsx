import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react-native";
import { TW_CLIENT_ID } from "@env";
import { myWallet } from "./secp256r1-wallet/MyConnector";
import Home from "./app/index";

const App = () => {
  return (
    <ThirdwebProvider
      clientId={TW_CLIENT_ID}
      activeChain="mumbai"
      supportedWallets={[myWallet()]}
    >
      <Home />
    </ThirdwebProvider>
  );
};

export default App;
