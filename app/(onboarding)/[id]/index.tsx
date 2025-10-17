import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams } from "expo-router";
import NewsletterDetail from "@/components/newsletterDetail";
import { NewsletterDetailData } from "@/components/newsletterDetail";

const NEWSLETTER_DETAILS: Record<string, NewsletterDetailData> = {
  "1": {
    id: "1",
    name: "아웃스탠딩",
    title: "팀원 5명에서 MAU 100만 소규모 팀으로 순위권 앱 만든 스타트업들",
    categoryId: "economy",
    description:
      "스타트업의 성장 스토리와 인사이트를 전달하는 뉴스레터입니다. 소규모 팀이 어떻게 큰 성과를 낼 수 있는지에 대한 실질적인 경험과 노하우를 공유합니다.",
    recentArticles: [
      {
        id: "1-1",
        title: "5명 팀이 만든 앱이 100만 사용자를 얻은 비밀",
        summary:
          "소규모 팀의 효율적인 개발 프로세스와 사용자 중심의 제품 개발 전략에 대해 알아봅니다.",
        date: "2024-01-15",
      },
      {
        id: "1-2",
        title: "스타트업 마케팅 예산 0원으로 성장시키는 방법",
        summary:
          "제한된 자원으로도 효과적인 마케팅을 할 수 있는 창의적인 방법들을 소개합니다.",
        date: "2024-01-10",
      },
      {
        id: "1-3",
        title: "원격 근무 팀의 협업 도구와 문화 만들기",
        summary:
          "원격 근무 환경에서도 효율적으로 협업할 수 있는 도구와 문화 조성 방법을 다룹니다.",
        date: "2024-01-05",
      },
    ],
  },
  "2": {
    id: "2",
    name: "아웃스탠딩",
    title:
      "팀원 5명에서 MAU 100만.. 소규모 팀으로 순위권 앱 만든 스타트업들...",
    categoryId: "economy",
    description: "스타트업의 성장 스토리와 인사이트를 전달하는 뉴스레터입니다.",
    recentArticles: [
      {
        id: "2-1",
        title: "스타트업 성장의 핵심 요소들",
        summary: "성공한 스타트업들의 공통점과 성장 동력에 대해 분석합니다.",
        date: "2024-01-12",
      },
    ],
  },
};

export default function NewsletterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const newsletter = NEWSLETTER_DETAILS[id || "1"];

  if (!newsletter) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">뉴스레터를 찾을 수 없습니다.</Text>
          <Link
            href="/(onboarding)"
            asChild
            className="text-blue-500 mt-4 text-center text-base font-semibold"
          >
            <Text className="text-blue-500 mt-4 text-center text-base font-semibold">
              뉴스레터 목록으로 돌아가기
            </Text>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  const handleSubscribe = (newsletterId: string) => {
    console.log(`구독: ${newsletterId}`);
    // TODO: 구독 로직 구현
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <NewsletterDetail
      newsletter={newsletter}
      onSubscribe={handleSubscribe}
      onBack={handleBack}
    />
  );
}
