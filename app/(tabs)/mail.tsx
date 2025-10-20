import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MailList from "@/components/mail/MailList";
import MailDrawer from "@/components/mail/MailDrawer";

const CATEGORIES = [
  { id: "economy", label: "시사/경제", icon: "📰" },
  { id: "it", label: "IT/프로덕트", icon: "💻" },
  { id: "design", label: "디자인", icon: "🎨" },
  { id: "startup", label: "스타트업", icon: "🚀" },
  { id: "marketing", label: "마케팅", icon: "📊" },
  { id: "business", label: "비즈니스", icon: "💼" },
];

export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string; // 날짜 그룹화를 위한 필드 (YYYY-MM-DD 형식)
  time: string; // 표시용 시간
  isRead: boolean;
  isImportant: boolean;
  category: string;
}

const MOCK_EMAILS: Email[] = [
  {
    id: "1",
    sender: "아웃스탠딩",
    subject: "팀원 5명에서 MAU 100만 달성한 스타트업의 비밀",
    preview:
      "소규모 팀으로 순위권 앱을 만든 스타트업들의 이야기. 효율적인 개발 프로세스와 사용자 중심의 제품 개발 전략을 공유합니다.",
    date: "2025-01-20",
    time: "오후 2:30",
    isRead: false,
    isImportant: true,
    category: "economy",
  },
  {
    id: "2",
    sender: "요즘IT",
    subject: "개발자가 알아야 할 2025년 기술 트렌드",
    preview:
      "AI, 클라우드, 웹3 등 올해 주목해야 할 기술 트렌드를 정리했습니다. 실무에 바로 적용 가능한 인사이트를 제공합니다.",
    date: "2025-01-20",
    time: "오전 11:15",
    isRead: true,
    isImportant: false,
    category: "it",
  },
  {
    id: "3",
    sender: "GeekNews",
    subject: "주간 개발자 뉴스 모음 - 오픈소스 특집",
    preview:
      "이번 주에 주목할 만한 개발 소식과 오픈소스 프로젝트를 소개합니다. GitHub 트렌딩 저장소 분석도 함께 제공합니다.",
    date: "2025-01-19",
    time: "오후 6:20",
    isRead: true,
    isImportant: false,
    category: "it",
  },
  {
    id: "4",
    sender: "디자인나침반",
    subject: "사용자 경험을 개선하는 10가지 UX 패턴",
    preview:
      "실제 프로젝트에 적용 가능한 UX 개선 사례를 소개합니다. 대형 서비스들의 디자인 시스템 분석과 함께 제공됩니다.",
    date: "2025-01-19",
    time: "오전 10:00",
    isRead: false,
    isImportant: true,
    category: "design",
  },
  {
    id: "5",
    sender: "비즈니스워치",
    subject: "2025년 주목할 비즈니스 트렌드",
    preview:
      "글로벌 시장의 변화와 새로운 비즈니스 모델을 분석합니다. 투자 전략과 시장 예측을 함께 제공합니다.",
    date: "2025-01-18",
    time: "오후 3:45",
    isRead: true,
    isImportant: false,
    category: "business",
  },
  {
    id: "6",
    sender: "마케팅인사이트",
    subject: "성공적인 그로스해킹 사례 분석",
    preview:
      "실제 스타트업들의 그로스해킹 전략과 성과를 공유합니다. 데이터 기반 마케팅 기법도 함께 소개합니다.",
    date: "2025-01-18",
    time: "오전 9:30",
    isRead: true,
    isImportant: false,
    category: "marketing",
  },
  {
    id: "7",
    sender: "스타트업스토리",
    subject: "창업가가 알아야 할 펀딩 전략",
    preview:
      "Y Combinator 출신 창업가들의 펀딩 노하우. 투자 유치 과정과 피칭 팁을 상세히 안내합니다.",
    date: "2025-01-17",
    time: "오후 4:20",
    isRead: false,
    isImportant: false,
    category: "startup",
  },
  {
    id: "8",
    sender: "한경비즈니스",
    subject: "2025 경제 전망과 투자 전략",
    preview:
      "새해 경제 동향과 투자 포인트를 정리했습니다. 전문가들의 시장 분석과 함께 제공합니다.",
    date: "2025-01-16",
    time: "오전 8:00",
    isRead: true,
    isImportant: false,
    category: "economy",
  },
];

export default function MailScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [emails, setEmails] = useState(MOCK_EMAILS);

  const toggleImportant = (id: string) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, isImportant: !email.isImportant } : email
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* 심플한 헤더 */}
      <View className="px-5 py-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          className="w-10 h-10 items-center justify-center -ml-2"
        >
          <Ionicons name="menu" size={26} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">받은 뉴스레터</Text>
        <View className="w-10 h-10" />
      </View>

      {/* 카테고리 필터 */}
      <View className="pb-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            className={`mr-3 px-4 py-2.5 rounded-full flex-row items-center ${
              selectedCategory === null ? "bg-purple-600" : "bg-gray-100"
            }`}
            style={styles.filterChip}
          >
            <Text
              className={`text-sm font-semibold ${
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
              className={`mr-3 px-4 py-2.5 rounded-full flex-row items-center ${
                selectedCategory === category.id
                  ? "bg-purple-600"
                  : "bg-gray-100"
              }`}
              style={styles.filterChip}
            >
              <Text className="text-base mr-1.5">{category.icon}</Text>
              <Text
                className={`text-sm font-semibold ${
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

      {/* 메일 목록 */}
      <MailList
        emails={emails}
        selectedCategory={selectedCategory}
        onToggleImportant={toggleImportant}
        onEmailPress={(id) => console.log("Email pressed:", id)}
      />

      {/* Drawer */}
      <MailDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        emails={emails}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterChip: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
