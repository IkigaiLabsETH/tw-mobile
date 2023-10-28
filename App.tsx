import React from "react";
import { ConnectWallet, ThirdwebProvider } from "@thirdweb-dev/react-native";
import { Button, StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
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
  const isDarkMode = useColorScheme() === "dark";

  const textStyles = {
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.heading,
  };

  return (
    <View style={styles.view}>
      <Text style={textStyles}>React Native thirdweb starter</Text>
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

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default App;
