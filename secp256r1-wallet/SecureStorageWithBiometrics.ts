import { ISecureStorage } from "@thirdweb-dev/react-core";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

const PREFIX = "__tw__";

export class SecureStorageWithBiometrics implements ISecureStorage {
  name: string;
  asyncStorage: typeof SecureStore;

  constructor(name: string) {
    this.name = name;
    this.asyncStorage = SecureStore;
  }

  async getItem(key: string) {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const hasEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && hasEnrolled) {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: "Scan your face to unlock",
      });

      if (success) {
        const val = await this.asyncStorage.getItemAsync(
          `${PREFIX}_${this.name}_${key}`,
          {
            requireAuthentication: true,
          }
        );

        console.log("Read:", val);
        return val;
      }
    } else {
      console.log("No biometrics available");
    }

    return null;
  }

  setItem(key: string, value: string) {
    return this.asyncStorage.setItemAsync(
      `${PREFIX}_${this.name}_${key}`,
      value,
      {
        requireAuthentication: true,
      }
    );
  }

  removeItem(key: string) {
    return this.asyncStorage.deleteItemAsync(`${PREFIX}_${this.name}_${key}`, {
      requireAuthentication: true,
    });
  }
}

/**
 * Returns a new instance of SecureStorage implemented by Expo SecureStore
 *
 * @param name Name to namespace the storage with
 * @returns A new instance of SecureStorage
 */
export function createSecureStorageWithBiometrics(name: string) {
  return new SecureStorageWithBiometrics(name);
}
