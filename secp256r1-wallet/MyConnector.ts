import { LocalWallet, WalletConfig } from "@thirdweb-dev/react-native";
import { WalletOptions, walletIds } from "@thirdweb-dev/wallets";
import { createSecureStorageWithBiometrics } from "./SecureStorageWithBiometrics";

export const myWallet = (): WalletConfig => {
  const secureStorage = createSecureStorageWithBiometrics(
    walletIds.localWallet
  );

  return {
    id: "localWalletBiometrics",
    meta: {
      name: "Local Wallet with Biometrics",
      iconURL: "todo",
    },
    create: (options: WalletOptions) => {
      return new LocalWallet({
        ...options,
        walletStorage: secureStorage,
        storage: secureStorage,
      });
    },
  };
};
