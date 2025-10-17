import React, { useState } from "react";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AuthInputScreen from "@/components/common/AuthInputScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpConfirmPasswordScreen() {
  const { email, password } = useLocalSearchParams<{
    email: string;
    password: string;
  }>();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmPasswordSubmit = async (confirmPassword: string) => {
    if (!email || !password) {
      Alert.alert("오류", "입력 정보가 없습니다.");
      router.replace("/(auth)/sign-up");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 실제 회원가입 API 호출
      const response = await fetch("https://api.mailpocket.me/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const authToken = await response.text();
        await AsyncStorage.setItem("authToken", authToken);

        Alert.alert("성공", "회원가입이 완료되었습니다!", [
          {
            text: "확인",
            onPress: () => router.replace("/(tabs)"),
          },
        ]);
      } else {
        Alert.alert("회원가입 실패", "다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("오류", "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthInputScreen
      title="비밀번호를 한 번만 더 확인할게요"
      placeholder="비밀번호"
      onNext={handleConfirmPasswordSubmit}
      buttonLabel={isLoading ? "가입 중..." : "회원가입"}
      secureTextEntry
    />
  );
}
