import React from "react";
import { router } from "expo-router";
import AuthInputScreen from "@/components/common/AuthInputScreen";

export default function SignUpEmailScreen() {
  const handleEmailSubmit = (email: string) => {
    // 이메일을 파라미터로 전달하며 비밀번호 화면으로 이동
    router.push({
      pathname: "/(auth)/sign-up/password",
      params: { email },
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
