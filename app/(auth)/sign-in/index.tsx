import React from "react";
import { router } from "expo-router";
import AuthInputScreen from "@/components/common/AuthInputScreen";

export default function SignInEmailScreen() {
  const handleEmailSubmit = (email: string) => {
    // 이메일을 파라미터로 전달하며 비밀번호 화면으로 이동
    router.push({
      pathname: "/(auth)/sign-in/password",
      params: { id: email },
    } as any);
  };

  return (
    <AuthInputScreen
      title="아이디를 입력해주세요"
      placeholder="아이디를 입력해주세요"
      onNext={handleEmailSubmit}
      buttonLabel="다음"
    />
  );
}
