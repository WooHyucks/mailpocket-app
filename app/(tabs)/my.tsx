import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MENU_ITEMS = [
  { id: 1, title: "계정 설정", icon: "person-outline", action: "account" },
  {
    id: 2,
    title: "알림 설정",
    icon: "notifications-outline",
    action: "notifications",
  },
  { id: 3, title: "구독 관리", icon: "mail-outline", action: "subscriptions" },
  { id: 4, title: "고객 지원", icon: "help-circle-outline", action: "support" },
];

const DEV_MENU_ITEMS = [
  {
    id: 5,
    title: "🧪 데이터 초기화",
    icon: "refresh-outline",
    action: "reset",
  },
  {
    id: 6,
    title: "🧭 온보딩 보기",
    icon: "compass-outline",
    action: "onboarding",
  },
  { id: 7, title: "🔐 인증 보기", icon: "lock-closed-outline", action: "auth" },
];

export default function MyScreen() {
  const handleLogout = async () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("authToken");
          router.replace("/(auth)" as any);
        },
      },
    ]);
  };

  const handleMenuPress = (action: string) => {
    Alert.alert("준비 중", `${action} 기능은 준비 중입니다.`);
  };

  const handleDevMenuPress = async (action: string) => {
    if (action === "reset") {
      Alert.alert(
        "데이터 초기화",
        "모든 데이터를 초기화하고 온보딩으로 이동합니다.",
        [
          { text: "취소", style: "cancel" },
          {
            text: "초기화",
            style: "destructive",
            onPress: async () => {
              await AsyncStorage.clear();
              router.replace("/(onboarding)" as any);
            },
          },
        ]
      );
    } else if (action === "onboarding") {
      router.push("/(onboarding)" as any);
    } else if (action === "auth") {
      router.push("/(auth)" as any);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "bottom"]}>
      <ScrollView className="flex-1">
        {/* 프로필 헤더 */}
        <View className="bg-white px-6 py-8 mb-4">
          <View className="items-center">
            <View className="w-20 h-20 bg-purple-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="person" size={40} color="#9333ea" />
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-1">
              사용자 이름
            </Text>
            <Text className="text-sm text-gray-500">user@example.com</Text>
          </View>
        </View>

        {/* 메뉴 목록 */}
        <View className="bg-white mb-4">
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center px-6 py-4 ${
                index < MENU_ITEMS.length - 1 ? "border-b border-gray-100" : ""
              }`}
              onPress={() => handleMenuPress(item.action)}
            >
              <Ionicons name={item.icon as any} size={22} color="#6B7280" />
              <Text className="text-base text-gray-900 ml-4 flex-1">
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 개발자 메뉴 */}
        <View className="bg-orange-50 mb-4 rounded-xl overflow-hidden">
          <View className="px-6 py-3 bg-orange-100">
            <Text className="text-sm font-bold text-orange-700">
              🧪 개발자 메뉴
            </Text>
          </View>
          {DEV_MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center px-6 py-4 bg-white ${
                index < DEV_MENU_ITEMS.length - 1
                  ? "border-b border-orange-100"
                  : ""
              }`}
              onPress={() => handleDevMenuPress(item.action)}
            >
              <Ionicons name={item.icon as any} size={22} color="#EA580C" />
              <Text className="text-base text-gray-900 ml-4 flex-1">
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#FED7AA" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 로그아웃 버튼 */}
        <View className="px-4 mb-8">
          <TouchableOpacity
            className="bg-white border border-red-300 rounded-xl py-4 items-center"
            onPress={handleLogout}
          >
            <Text className="text-red-600 text-base font-semibold">
              로그아웃
            </Text>
          </TouchableOpacity>
        </View>

        {/* 버전 정보 */}
        <View className="items-center pb-8">
          <Text className="text-sm text-gray-400">MailPocket v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
