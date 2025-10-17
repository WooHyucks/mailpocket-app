import React from "react";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AuthInputScreen from "@/components/common/AuthInputScreen";

export default function SignUpPasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  const handlePasswordSubmit = (password: string) => {
    if (!email) {
      Alert.alert("오류", "아이디 정보가 없습니다.");
      router.back();
      return;
    }

    if (password.length < 6) {
      Alert.alert("오류", "비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    // 비밀번호 확인 화면으로 이동
    router.push({
      pathname: "/(auth)/sign-up/confirm-password",
      params: { email, password },
    } as any);
  };

  return (
    <AuthInputScreen
      title="사용하실 비밀번호를 입력해주세요"
      placeholder="비밀번호"
      onNext={handlePasswordSubmit}
      buttonLabel="다음"
      secureTextEntry
    />
  );
}
