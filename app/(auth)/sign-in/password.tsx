import React, { useState } from "react";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AuthInputScreen from "@/components/common/AuthInputScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = async (password: string) => {
    if (!email) {
      Alert.alert("오류", "이메일 정보가 없습니다.");
      router.back();
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 실제 로그인 API 호출
      const response = await fetch("https://api.mailpocket.me/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const authToken = await response.text();
        await AsyncStorage.setItem("authToken", authToken);
        router.replace("/(tabs)");
      } else {
        Alert.alert("로그인 실패", "이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("오류", "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthInputScreen
      title="비밀번호를 입력해주세요"
      placeholder="비밀번호"
      onNext={handlePasswordSubmit}
      buttonLabel={isLoading ? "로그인 중..." : "로그인"}
      secureTextEntry
    />
  );
}
