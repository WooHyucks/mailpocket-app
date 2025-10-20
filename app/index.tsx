import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";

// 개발 모드: true로 설정하면 초기 라우팅을 수동으로 선택할 수 있습니다
const DEV_MODE = true;

export default function Index() {
  const [showDevMenu, setShowDevMenu] = useState(DEV_MODE);

  useEffect(() => {
    if (!DEV_MODE) {
      checkInitialRoute();
    }
  }, []);

  async function checkInitialRoute() {
    try {
      // 1. 온보딩 완료 여부 체크
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );

      // 온보딩을 완료하지 않았으면 온보딩으로
      if (!hasCompletedOnboarding) {
        router.replace("/(onboarding)" as any);
        return;
      }

      // 2. 인증 토큰 체크
      const authToken = await AsyncStorage.getItem("authToken");

      // 로그인 상태면 탭으로, 아니면 인증으로
      if (authToken) {
        router.replace("/(tabs)" as any);
      } else {
        router.replace("/(auth)" as any);
      }
    } catch (error) {
      console.error("초기 라우팅 체크 실패:", error);
      // 에러 발생 시 온보딩으로
      router.replace("/(onboarding)" as any);
    }
  }

  const handleDevRoute = async (route: string) => {
    // 개발 모드에서 특정 경로로 이동할 때 필요한 데이터 설정
    if (route === "/(tabs)") {
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      await AsyncStorage.setItem("authToken", "dev-token");
    } else if (route === "/(auth)") {
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      await AsyncStorage.removeItem("authToken");
    } else if (route === "/(onboarding)") {
      await AsyncStorage.removeItem("hasCompletedOnboarding");
      await AsyncStorage.removeItem("authToken");
    }
    router.replace(route as any);
  };

  // 개발 메뉴
  if (showDevMenu) {
    return (
      <View className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">개발 모드</Text>
        <Text className="text-sm text-gray-500 mb-8 text-center">
          테스트할 화면을 선택하세요
        </Text>

        <TouchableOpacity
          className="bg-purple-600 rounded-xl py-4 px-8 mb-3 w-full"
          onPress={() => handleDevRoute("/(onboarding)")}
        >
          <Text className="text-white text-base font-semibold text-center">
            🧭 온보딩
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-purple-600 rounded-xl py-4 px-8 mb-3 w-full"
          onPress={() => handleDevRoute("/(auth)")}
        >
          <Text className="text-white text-base font-semibold text-center">
            🔐 인증 (로그인/회원가입)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-purple-600 rounded-xl py-4 px-8 mb-6 w-full"
          onPress={() => handleDevRoute("/(tabs)")}
        >
          <Text className="text-white text-base font-semibold text-center">
            📱 메인 앱 (탭)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => {
            setShowDevMenu(false);
            checkInitialRoute();
          }}
        >
          <Text className="text-gray-500 text-sm">자동 라우팅으로 이동</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 로딩 화면
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <ActivityIndicator size="large" color="#9333ea" />
    </View>
  );
}
