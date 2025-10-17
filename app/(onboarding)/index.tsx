import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Category, Newsletter } from "@/components/types";
import NewsletterList from "@/components/newsletter";

// ---------- Mock Data ----------
const CATEGORIES: Category[] = [
  { id: "economy", label: "시사/경제" },
  { id: "it", label: "IT/프로덕트" },
  { id: "design", label: "디자인" },
  { id: "startup", label: "스타트업" },
  { id: "marketing", label: "마케팅" },
  { id: "business", label: "비즈니스" },
];

const NEWSLETTERS: Newsletter[] = [
  {
    id: "1",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만 소규모 팀으로 순위권 앱 만든 스타트업들  팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들",
    categoryId: "economy",
  },
  {
    id: "2",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
  },
  {
    id: "3",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
  },
  {
    id: "4",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
  },
  {
    id: "5",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
  },
  {
    id: "6",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
  },
  {
    id: "7",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
  },
  {
    id: "8",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
  },
  {
    id: "9",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
  },
  {
    id: "10",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
  },
  {
    id: "11",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들 팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들",
    categoryId: "economy",
  },
];

// ---------- Screen ----------
export default function NewsletterPickScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category["id"]>("economy");

  const handleSubscribe = (id: string) => {
    // 뉴스레터 상세 페이지로 이동
    router.push(`/(onboarding)/${id}` as any);
  };

  // ---------- Header (타이틀) ----------
  const HeaderTop = () => (
    <View className="px-4 pt-4">
      <View className="justify-center items-center pt-12 pb-6">
        <Text className="text-lg font-bold text-gray-800">
          어떤 뉴스레터를 좋아하세요?
        </Text>
        <Text className="text-gray-400 mt-2">
          클릭해서 최근 요약 확인하고, 쉽게 구독하기
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NewsletterList
        categories={CATEGORIES}
        newsletters={NEWSLETTERS}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onSubscribe={handleSubscribe}
        ListHeaderComponent={HeaderTop}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      />

      {/* 하단 CTA 바 */}
      <View className="absolute bottom-0 left-0 right-0 bg-white pt-3 pb-10 px-4">
        <TouchableOpacity
          onPress={() => router.replace("/(auth)")}
          className="bg-purple-600 rounded-2xl py-4 items-center"
          activeOpacity={0.9}
        >
          <Text className="text-white text-base font-semibold">시작하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/(auth)/sign-in")}
          className="mt-3 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-gray-400 font-bold text-sm">
            이미 아이디가 있어요
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
