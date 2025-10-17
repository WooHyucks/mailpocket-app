import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/index" options={{ headerShown: false }} />
    </Stack>
  );
}
