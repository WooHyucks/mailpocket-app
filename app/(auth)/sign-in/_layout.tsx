import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignInLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
        headerTitle: "",
        headerShadowVisible: false,
        headerBackTitle: "",
        headerTintColor: "#000",
        headerStyle: { backgroundColor: "#fff" },
        presentation: "card",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ paddingLeft: 8 }}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="password" />
    </Stack>
  );
}
