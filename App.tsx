import React, { useCallback } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react-native";
import { TW_CLIENT_ID } from "@env";
import { myWallet } from "./secp256r1-wallet/MyConnector";
import Home from "./app/index";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native";

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    // All 9 inter fonts from '/assets/fonts' folder
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <ThirdwebProvider
      clientId={TW_CLIENT_ID}
      activeChain="mumbai"
      supportedWallets={[myWallet()]}
    >
      <SafeAreaView onLayout={onLayoutRootView}>
        <Home />
      </SafeAreaView>
    </ThirdwebProvider>
  );
};

export default App;
