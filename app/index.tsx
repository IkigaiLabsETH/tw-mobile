import { SafeAreaView, Text, View } from "react-native";
import StyledText from "../components/StyledText";

export default function Home() {
  return (
    <SafeAreaView className="bg-white h-full mx-2">
      <View className="flex flex-col items-center justify-center gap-2"></View>

      <StyledText className="text-black">Hey wtf?</StyledText>
    </SafeAreaView>
  );
}
