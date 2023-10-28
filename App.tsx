import React from "react";
import { ConnectWallet, ThirdwebProvider } from "@thirdweb-dev/react-native";
import { Button, Text, View } from "react-native";
import { TW_CLIENT_ID } from "@env";
import { myWallet } from "./secp256r1-wallet/MyConnector";
import * as LocalAuthentication from "expo-local-authentication";

const App = () => {
  return (
    <ThirdwebProvider
      clientId={TW_CLIENT_ID}
      activeChain="mumbai"
      supportedWallets={[myWallet()]}
    >
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  return (
    <View className="bg-black h-full w-full">
      <Text>React Native thirdweb starter</Text>
      <ConnectWallet />
      {/* Button that calls whether or not LocalAuthentication.hasHardwareAsync() */}
      <Button
        title="Check for biometrics"
        onPress={async () => {
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();

          const authTypes = await LocalAuthentication.authenticateAsync();
          console.log(authTypes);
        }}
      />
    </View>
  );
};

export default App;
