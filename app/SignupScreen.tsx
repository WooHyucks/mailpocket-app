import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export default function SignupScreen() {
  const [formData, setFormData] = useState<SignupForm>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SignupForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert("오류", "이름을 입력해주세요.");
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert("오류", "이메일을 입력해주세요.");
      return false;
    }
    if (!formData.password) {
      Alert.alert("오류", "비밀번호를 입력해주세요.");
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert("오류", "비밀번호는 6자 이상이어야 합니다.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: 실제 회원가입 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 지연

      Alert.alert("성공", "회원가입이 완료되었습니다!", [
        {
          text: "확인",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (error) {
      Alert.alert("오류", "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-10">
          <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
            회원가입
          </Text>
          <Text className="text-base text-gray-600 text-center mb-10">
            MailPocket에 오신 것을 환영합니다
          </Text>

          <View className="flex-1">
            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-900 mb-2">
                이름
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
                placeholder="이름을 입력하세요"
                autoCapitalize="words"
              />
            </View>

            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-900 mb-2">
                이메일
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                placeholder="이메일을 입력하세요"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-900 mb-2">
                비밀번호
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
              />
            </View>

            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-900 mb-2">
                비밀번호 확인
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-gray-50"
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                placeholder="비밀번호를 다시 입력하세요"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              className={`rounded-xl py-4 items-center mt-5 mb-5 ${
                isLoading ? "bg-gray-400" : "bg-blue-500"
              }`}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text className="text-white text-lg font-semibold">
                {isLoading ? "가입 중..." : "회원가입"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center"
              onPress={() => router.back()}
            >
              <Text className="text-blue-500 text-base">
                이미 계정이 있으신가요? 로그인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
