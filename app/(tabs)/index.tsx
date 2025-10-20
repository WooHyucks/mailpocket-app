import { Redirect } from "expo-router";

// (tabs) 루트로 접근하면 자동으로 mail 탭으로 리다이렉트
export default function TabsIndex() {
  return <Redirect href="/(tabs)/mail" />;
}
