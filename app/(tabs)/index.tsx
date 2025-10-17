import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">MailPocket</Text>
      <Link href="/authScreen">Auth</Link>
      <Link href="/onboardingScreen">Onboarding</Link>
      <View className="my-8 h-px w-4/5 bg-gray-200" />
    </View>
  );
}
