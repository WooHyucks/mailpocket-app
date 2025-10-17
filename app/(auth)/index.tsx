import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { OAuthButtons } from "@/components/oauth";

export default function AuthScreen() {
  const handleEmailSignUp = () => {
    router.push("/(auth)/sign-up" as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center">
        <View className="items-center mb-6">
          <Image
            source={require("@/assets/images/mascot.png")}
            style={{ width: 90, height: 90 }}
            resizeMode="contain"
          />
        </View>
        <View className="items-center mb-12">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            뉴스레터 3줄 요약
          </Text>
          <Text className="text-base font-semibold text-gray-400">
            긴 내용도 지루하지 않도록
          </Text>
        </View>

        {/* OAuth 버튼 */}
        <OAuthButtons />

        {/* 구분선 */}
        <View className="flex items-center justify-center mb-8">
          <Text className="mx-4 text-gray-500 font-medium text-xs">또는</Text>
        </View>

        {/* 이메일 로그인 버튼 */}
        <TouchableOpacity
          className="bg-white border border-gray-200 rounded-xl py-4 items-center mb-4"
          onPress={handleEmailSignUp}
        >
          <Text className="text-gray-800 font-bold text-sm">
            아이디로 가입하기
          </Text>
        </TouchableOpacity>

        {/* 회원가입 링크 */}
        <TouchableOpacity
          className="items-center"
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text className="text-gray-500 text-sm  flex-row items-center">
            이미 아이디가 있으신가요?{" "}
            <Text className="text-black font-bold">로그인하기</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
