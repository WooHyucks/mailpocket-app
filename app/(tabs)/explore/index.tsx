import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// ---------- Mock Data ----------
const CATEGORIES = [
  { id: "economy", label: "시사/경제", icon: "📰", color: "#3B82F6" },
  { id: "it", label: "IT/프로덕트", icon: "💻", color: "#8B5CF6" },
  { id: "design", label: "디자인", icon: "🎨", color: "#EC4899" },
  { id: "startup", label: "스타트업", icon: "🚀", color: "#10B981" },
  { id: "marketing", label: "마케팅", icon: "📊", color: "#F59E0B" },
  { id: "business", label: "비즈니스", icon: "💼", color: "#6366F1" },
];

const NEWSLETTERS = [
  {
    id: "1",
    name: "아웃스탠딩",
    description: "스타트업과 비즈니스 인사이트",
    categoryId: "economy",
    subscribers: "1.2만",
    imageUrl: null,
    backgroundColor: "#000000",
  },
  {
    id: "2",
    name: "요즘IT",
    description: "개발자와 디자이너를 위한 뉴스",
    categoryId: "it",
    subscribers: "8천",
    imageUrl: null,
    backgroundColor: "#000000",
  },
  {
    id: "3",
    name: "GeekNews",
    description: "개발자 커뮤니티 뉴스",
    categoryId: "it",
    subscribers: "5천",
    imageUrl: null,
    backgroundColor: "#000000",
  },
  {
    id: "4",
    name: "디자인나침반",
    description: "UI/UX 디자인 트렌드",
    categoryId: "design",
    subscribers: "3천",
    imageUrl: null,
    backgroundColor: "#000000",
  },
  {
    id: "5",
    name: "스타트업스토리",
    description: "창업가들의 실전 경험담",
    categoryId: "startup",
    subscribers: "4.5천",
    imageUrl: null,
    backgroundColor: "#000000",
  },
  {
    id: "6",
    name: "마케팅인사이트",
    description: "그로스 해킹 전략",
    categoryId: "marketing",
    subscribers: "2.8천",
    imageUrl: null,
    backgroundColor: "#000000",
  },
];

// ---------- Screen ----------
export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNewsletters = NEWSLETTERS.filter((newsletter) => {
    const matchesCategory = selectedCategory
      ? newsletter.categoryId === selectedCategory
      : true;
    const matchesSearch = newsletter.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterPress = (id: string) => {
    router.push(`/(tabs)/explore/${id}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "bottom"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View className="bg-white px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            둘러보기
          </Text>
          <Text className="text-base text-gray-500 mb-6">
            관심있는 뉴스레터를 찾아보세요
          </Text>

          {/* 검색 바 */}
          <View className="bg-gray-100 rounded-2xl px-4 py-3 flex-row items-center">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2 text-base text-gray-900"
              placeholder="뉴스레터 검색..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 카테고리 */}
        <View className="px-4 py-6">
          <Text className="text-lg font-bold text-gray-900 mb-4 px-2">
            카테고리
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          >
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)}
              className={`mr-3 px-5 py-3 rounded-2xl ${
                selectedCategory === null ? "bg-purple-600" : "bg-white"
              }`}
              style={styles.categoryShadow}
            >
              <Text
                className={`text-base font-semibold ${
                  selectedCategory === null ? "text-white" : "text-gray-700"
                }`}
              >
                전체
              </Text>
            </TouchableOpacity>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`mr-3 px-5 py-3 rounded-2xl flex-row items-center ${
                  selectedCategory === category.id
                    ? "bg-purple-600"
                    : "bg-white"
                }`}
                style={styles.categoryShadow}
              >
                <Text className="text-lg mr-2">{category.icon}</Text>
                <Text
                  className={`text-base font-semibold ${
                    selectedCategory === category.id
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 뉴스레터 목록 */}
        <View className="px-4 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4 px-2">
            {selectedCategory
              ? CATEGORIES.find((c) => c.id === selectedCategory)?.label
              : "추천 뉴스레터"}
          </Text>
          <View>
            {filteredNewsletters.map((newsletter) => (
              <TouchableOpacity
                key={newsletter.id}
                className="bg-white rounded-3xl mb-4 overflow-hidden"
                style={styles.cardShadow}
                activeOpacity={0.7}
                onPress={() => handleNewsletterPress(newsletter.id)}
              >
                <View className="h-32 relative">
                  {newsletter.imageUrl ? (
                    <Image
                      source={{ uri: newsletter.imageUrl }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      className="w-full h-full"
                      style={{ backgroundColor: newsletter.backgroundColor }}
                    />
                  )}
                  {/* 텍스트 오버레이 */}
                  <View className="absolute bottom-0 left-0 right-0 p-5">
                    <Text className="text-2xl font-bold text-white mb-1">
                      {newsletter.name}
                    </Text>
                    <Text className="text-sm text-white opacity-90">
                      {newsletter.description}
                    </Text>
                  </View>
                </View>
                <View className="p-5 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="people" size={16} color="#9CA3AF" />
                    <Text className="text-sm text-gray-500 ml-2">
                      구독자 {newsletter.subscribers}
                    </Text>
                  </View>
                  <View className="bg-purple-100 px-4 py-2 rounded-xl">
                    <Text className="text-purple-600 text-sm font-bold">
                      자세히 보기
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {filteredNewsletters.length === 0 && (
            <View className="py-20 items-center">
              <Ionicons name="search" size={64} color="#D1D5DB" />
              <Text className="text-lg font-semibold text-gray-900 mt-4">
                검색 결과가 없습니다
              </Text>
              <Text className="text-sm text-gray-500 mt-2">
                다른 검색어를 입력해보세요
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categoryShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});
