import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

// Mock 데이터
const NEWSLETTERS_DATA = {
  "1": {
    id: "1",
    name: "아웃스탠딩",
    description: "스타트업과 비즈니스 인사이트",
    longDescription:
      "국내외 스타트업 생태계의 최신 동향과 비즈니스 인사이트를 제공합니다. 창업가, 투자자, 스타트업 종사자들이 꼭 알아야 할 정보를 엄선하여 전달합니다.",
    categoryId: "economy",
    categoryLabel: "시사/경제",
    subscribers: "1.2만",
    imageUrl: "",
    backgroundColor: "#667eea",
    frequency: "주 3회 발행",
    recentIssues: [
      {
        id: "101",
        title: "팀원 5명에서 MAU 100만 달성한 스타트업의 비밀",
        date: "2025.01.20",
        preview:
          "소규모 팀으로 순위권 앱을 만든 스타트업들의 이야기. 효율적인 개발 프로세스와 사용자 중심의 제품 개발 전략을 공유합니다.",
      },
      {
        id: "102",
        title: "2025년 주목할 스타트업 투자 트렌드",
        date: "2025.01.18",
        preview:
          "벤처캐피털들이 주목하는 투자 분야와 성공적인 펀딩 전략. 국내외 투자 시장의 변화를 분석합니다.",
      },
      {
        id: "103",
        title: "스타트업 창업가가 반드시 알아야 할 법률 지식",
        date: "2025.01.15",
        preview:
          "주주간 계약, 스톡옵션, 지식재산권 등 창업 과정에서 발생하는 법률 이슈를 쉽게 설명합니다.",
      },
    ],
  },
  "2": {
    id: "2",
    name: "요즘IT",
    description: "개발자와 디자이너를 위한 뉴스",
    longDescription:
      "IT 업계의 최신 기술 트렌드와 개발/디자인 노하우를 공유합니다. 실무에 바로 적용할 수 있는 실용적인 정보를 제공합니다.",
    categoryId: "it",
    categoryLabel: "IT/프로덕트",
    subscribers: "8천",
    imageUrl: "",
    backgroundColor: "#f093fb",
    frequency: "주 2회 발행",
    recentIssues: [
      {
        id: "201",
        title: "개발자가 알아야 할 2025년 기술 트렌드",
        date: "2025.01.19",
        preview:
          "AI, 클라우드, 웹3 등 올해 주목해야 할 기술 트렌드를 정리했습니다. 실무에 바로 적용 가능한 인사이트를 제공합니다.",
      },
      {
        id: "202",
        title: "React 19의 새로운 기능 완벽 가이드",
        date: "2025.01.16",
        preview:
          "React 최신 버전의 주요 변경사항과 실무 활용법을 상세히 소개합니다.",
      },
      {
        id: "203",
        title: "효율적인 코드 리뷰 문화 만들기",
        date: "2025.01.13",
        preview:
          "팀 생산성을 높이는 코드 리뷰 프로세스와 커뮤니케이션 팁을 공유합니다.",
      },
    ],
  },
  "3": {
    id: "3",
    name: "GeekNews",
    description: "개발자 커뮤니티 뉴스",
    longDescription:
      "개발자들이 공유하는 최신 기술 소식과 흥미로운 프로젝트를 전달합니다. GitHub 트렌딩부터 기술 블로그까지 다양한 소식을 다룹니다.",
    categoryId: "it",
    categoryLabel: "IT/프로덕트",
    subscribers: "5천",
    imageUrl: "",
    backgroundColor: "#4facfe",
    frequency: "매일 발행",
    recentIssues: [
      {
        id: "301",
        title: "주간 개발자 뉴스 모음 - 오픈소스 특집",
        date: "2025.01.20",
        preview:
          "이번 주에 주목할 만한 개발 소식과 오픈소스 프로젝트를 소개합니다. GitHub 트렌딩 저장소 분석도 함께 제공합니다.",
      },
      {
        id: "302",
        title: "2025년 가장 인기있는 프로그래밍 언어",
        date: "2025.01.19",
        preview: "Stack Overflow 설문조사 결과와 언어별 전망을 분석합니다.",
      },
      {
        id: "303",
        title: "개발자를 위한 AI 도구 10선",
        date: "2025.01.18",
        preview: "생산성을 높이는 AI 기반 개발 도구들을 소개합니다.",
      },
    ],
  },
  "4": {
    id: "4",
    name: "디자인나침반",
    description: "UI/UX 디자인 트렌드",
    longDescription:
      "최신 디자인 트렌드와 UX 사례를 소개합니다. 디자이너와 개발자 모두에게 유용한 인사이트를 제공합니다.",
    categoryId: "design",
    categoryLabel: "디자인",
    subscribers: "3천",
    imageUrl: "",
    backgroundColor: "#fa709a",
    frequency: "주 1회 발행",
    recentIssues: [
      {
        id: "401",
        title: "사용자 경험을 개선하는 10가지 UX 패턴",
        date: "2025.01.19",
        preview:
          "실제 프로젝트에 적용 가능한 UX 개선 사례를 소개합니다. 대형 서비스들의 디자인 시스템 분석과 함께 제공됩니다.",
      },
      {
        id: "402",
        title: "2025 디자인 트렌드 리포트",
        date: "2025.01.12",
        preview: "올해 주목할 디자인 트렌드와 실무 적용 방법을 소개합니다.",
      },
      {
        id: "403",
        title: "Figma 플러그인 Best 20",
        date: "2025.01.05",
        preview: "디자이너 생산성을 높이는 필수 Figma 플러그인을 소개합니다.",
      },
    ],
  },
  "5": {
    id: "5",
    name: "스타트업스토리",
    description: "창업가들의 실전 경험담",
    longDescription:
      "실제 창업가들의 생생한 경험과 노하우를 공유합니다. 성공과 실패 사례를 통해 배우는 창업 인사이트를 제공합니다.",
    categoryId: "startup",
    categoryLabel: "스타트업",
    subscribers: "4.5천",
    imageUrl: "",
    backgroundColor: "#30cfd0",
    frequency: "주 2회 발행",
    recentIssues: [
      {
        id: "501",
        title: "창업가가 알아야 할 펀딩 전략",
        date: "2025.01.18",
        preview:
          "Y Combinator 출신 창업가들의 펀딩 노하우. 투자 유치 과정과 피칭 팁을 상세히 안내합니다.",
      },
      {
        id: "502",
        title: "초기 스타트업의 PMF 찾기",
        date: "2025.01.15",
        preview: "제품-시장 적합성을 찾는 구체적인 방법론과 사례를 소개합니다.",
      },
      {
        id: "503",
        title: "1인 창업으로 월 1억 달성하기",
        date: "2025.01.11",
        preview: "솔로 창업가들의 성공 스토리와 실전 노하우를 공유합니다.",
      },
    ],
  },
  "6": {
    id: "6",
    name: "마케팅인사이트",
    description: "그로스 해킹 전략",
    longDescription:
      "데이터 기반 마케팅 전략과 그로스해킹 노하우를 제공합니다. 실무에서 바로 활용 가능한 마케팅 기법을 소개합니다.",
    categoryId: "marketing",
    categoryLabel: "마케팅",
    subscribers: "2.8천",
    imageUrl: "",
    backgroundColor: "#a8edea",
    frequency: "주 1회 발행",
    recentIssues: [
      {
        id: "601",
        title: "성공적인 그로스해킹 사례 분석",
        date: "2025.01.17",
        preview:
          "실제 스타트업들의 그로스해킹 전략과 성과를 공유합니다. 데이터 기반 마케팅 기법도 함께 소개합니다.",
      },
      {
        id: "602",
        title: "SNS 마케팅 완벽 가이드",
        date: "2025.01.10",
        preview:
          "인스타그램, 틱톡, 유튜브 등 플랫폼별 마케팅 전략을 소개합니다.",
      },
      {
        id: "603",
        title: "이메일 마케팅으로 매출 3배 올리기",
        date: "2025.01.03",
        preview:
          "효과적인 이메일 캠페인 작성법과 A/B 테스트 노하우를 공유합니다.",
      },
    ],
  },
};

export default function NewsletterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const newsletter = NEWSLETTERS_DATA[id as keyof typeof NEWSLETTERS_DATA];

  if (!newsletter) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">
            뉴스레터를 찾을 수 없습니다
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    Alert.alert(
      isSubscribed ? "구독 취소" : "구독 완료",
      isSubscribed
        ? `${newsletter.name} 구독이 취소되었습니다.`
        : `${newsletter.name} 구독이 완료되었습니다!`,
      [{ text: "확인" }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 헤더 */}
        <View className="px-5 py-4 flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* 이미지 헤더 */}
        <View
          className="mx-5 rounded-3xl mb-6 overflow-hidden"
          style={styles.headerShadow}
        >
          <View className="relative">
            {newsletter.imageUrl ? (
              <Image
                source={{ uri: newsletter.imageUrl }}
                className="w-full h-64"
                resizeMode="cover"
              />
            ) : (
              <View
                className="w-full h-64"
                style={{ backgroundColor: newsletter.backgroundColor }}
              />
            )}
            {/* 텍스트 오버레이 */}
            <View className="absolute bottom-0 left-0 right-0 p-8">
              <View className="bg-white/20 self-start px-3 py-1.5 rounded-full mb-3">
                <Text className="text-xs font-bold text-white">
                  {newsletter.categoryLabel}
                </Text>
              </View>
              <Text className="text-3xl font-bold text-white mb-2">
                {newsletter.name}
              </Text>
              <Text className="text-base text-white opacity-90 mb-4">
                {newsletter.description}
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="people" size={16} color="white" />
                <Text className="text-sm text-white ml-2">
                  구독자 {newsletter.subscribers}
                </Text>
                <View className="mx-2 w-1 h-1 rounded-full bg-white opacity-50" />
                <Ionicons name="calendar-outline" size={16} color="white" />
                <Text className="text-sm text-white ml-2">
                  {newsletter.frequency}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 소개 */}
        <View className="px-5 mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-3">소개</Text>
          <Text className="text-base text-gray-600 leading-6">
            {newsletter.longDescription}
          </Text>
        </View>

        {/* 최근 발행 이슈 */}
        <View className="px-5">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            최근 발행 이슈
          </Text>
          {newsletter.recentIssues.map((issue, index) => (
            <TouchableOpacity
              key={issue.id}
              className="bg-gray-100 rounded-2xl p-5 mb-3"
              style={styles.issueShadow}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center mb-2">
                <View className="bg-purple-100 px-2 py-1 rounded-md mr-2">
                  <Text className="text-xs font-bold text-purple-600">
                    #{newsletter.recentIssues.length - index}
                  </Text>
                </View>
                <Text className="text-xs text-gray-500">{issue.date}</Text>
              </View>
              <Text className="text-base font-bold text-gray-900 mb-2 leading-6">
                {issue.title}
              </Text>
              <Text
                className="text-sm text-gray-600 leading-5"
                numberOfLines={2}
              >
                {issue.preview}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 통계 */}
        <View className="px-5 mt-6">
          <View className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-5 flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">
                {newsletter.subscribers}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">구독자</Text>
            </View>
            <View className="w-px bg-gray-300" />
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">
                {newsletter.recentIssues.length}개
              </Text>
              <Text className="text-sm text-gray-500 mt-1">최근 이슈</Text>
            </View>
            <View className="w-px bg-gray-300" />
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">
                {newsletter.frequency.split(" ")[1]}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">발행</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4"
        style={styles.bottomButtonShadow}
      >
        <TouchableOpacity
          onPress={handleSubscribe}
          className={`rounded-2xl py-4 items-center ${
            isSubscribed ? "bg-gray-200" : "bg-purple-600"
          }`}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center">
            <Ionicons
              name={isSubscribed ? "checkmark-circle" : "add-circle"}
              size={22}
              color={isSubscribed ? "#6B7280" : "#fff"}
            />
            <Text
              className={`text-base font-bold ml-2 ${
                isSubscribed ? "text-gray-700" : "text-white"
              }`}
            >
              {isSubscribed ? "구독 중" : "구독하기"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  issueShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bottomButtonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
});
