import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Email } from "@/app/(tabs)/mail";

interface MailListProps {
  emails: Email[];
  selectedCategory?: string | null;
  onToggleImportant: (id: string) => void;
  onEmailPress?: (id: string) => void;
}

// 날짜를 표시 형식으로 변환
function formatDateHeader(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 날짜를 YYYY-MM-DD 형식으로 비교
  const dateStr = dateString;
  const todayStr = today.toISOString().split("T")[0];
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (dateStr === todayStr) return "오늘";
  if (dateStr === yesterdayStr) return "어제";

  // 이번 주인지 확인
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (date >= weekAgo) {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[date.getDay()] + "요일";
  }

  // 그 이전 날짜
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

// 날짜별로 이메일 그룹화
function groupEmailsByDate(emails: Email[]): Record<string, Email[]> {
  const groups: Record<string, Email[]> = {};
  emails.forEach((email) => {
    if (!groups[email.date]) {
      groups[email.date] = [];
    }
    groups[email.date].push(email);
  });
  return groups;
}

export default function MailList({
  emails,
  selectedCategory,
  onToggleImportant,
  onEmailPress,
}: MailListProps) {
  // 카테고리 필터링
  const filteredEmails = emails.filter((email) => {
    if (selectedCategory) {
      return email.category === selectedCategory;
    }
    return true;
  });

  // 날짜별로 정렬 (최신순)
  const sortedEmails = [...filteredEmails].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedEmails.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="mail-outline" size={64} color="#D1D5DB" />
        <Text className="text-xl font-bold text-gray-900 mt-4 mb-2">
          받은 뉴스레터가 없습니다
        </Text>
        <Text className="text-base text-gray-500 text-center">
          새로운 뉴스레터가 도착하면 여기에 표시됩니다
        </Text>
      </View>
    );
  }

  // 날짜별로 그룹화
  const emailGroups = groupEmailsByDate(sortedEmails);
  const sortedDates = Object.keys(emailGroups).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // 각 메일마다 고유한 배경색 또는 이미지
  const backgroundColors = [
    "#667eea",
    "#f093fb",
    "#4facfe",
    "#fa709a",
    "#30cfd0",
    "#a8edea",
  ];

  // 공통 썸네일 이미지 URL
  const thumbnailUrl =
    "https://d2phebdq64jyfk.cloudfront.net/media/article/e2013d66031b430ab61546a5a1f0f8f8.png";

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* 날짜별 그룹화된 목록 */}
      {sortedDates.map((date) => {
        const groupEmails = emailGroups[date];
        return (
          <View key={date} className="mb-6">
            {/* 날짜 헤더 */}
            <View className="px-5 py-3 bg-white border-b border-gray-100">
              <Text className="text-sm font-bold text-gray-900">
                {formatDateHeader(date)}
              </Text>
            </View>

            {/* 해당 날짜의 이메일 목록 */}
            <View className="px-4 pt-4">
              {groupEmails.map((email, index) => (
                <TouchableOpacity
                  key={email.id}
                  className="bg-white rounded-3xl mb-4 overflow-hidden"
                  style={styles.cardShadow}
                  activeOpacity={0.95}
                  onPress={() => onEmailPress?.(email.id)}
                >
                  {/* 썸네일 영역 */}
                  <View className="h-48 relative">
                    {thumbnailUrl ? (
                      <Image
                        source={{ uri: thumbnailUrl }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View
                        className="w-full h-full"
                        style={{
                          backgroundColor:
                            backgroundColors[
                              parseInt(email.id) % backgroundColors.length
                            ],
                        }}
                      />
                    )}
                    {/* 발신자 태그 오버레이 */}
                    <View className="absolute bottom-0 left-0 right-0 p-6">
                      <View className="bg-white/90 self-start px-3 py-1.5 rounded-full mb-3">
                        <Text className="text-xs font-bold text-gray-900">
                          {email.sender}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* 콘텐츠 영역 */}
                  <View className="p-5">
                    {/* 제목 */}
                    <Text
                      className="text-xl font-bold text-gray-900 mb-3 leading-7"
                      numberOfLines={2}
                    >
                      {email.subject}
                    </Text>

                    {/* 미리보기 */}
                    <Text
                      className="text-base text-gray-600 leading-6 mb-4"
                      numberOfLines={3}
                    >
                      {email.preview}
                    </Text>

                    {/* 하단 액션 바 */}
                    <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                      <Text className="text-sm text-gray-500">
                        {email.time}
                      </Text>
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          className="w-9 h-9 items-center justify-center rounded-full bg-gray-50 mr-2"
                          onPress={(e) => {
                            e.stopPropagation();
                            // 공유 기능
                          }}
                        >
                          <Ionicons
                            name="share-outline"
                            size={18}
                            color="#6B7280"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* 읽지 않음 표시 */}
                  {!email.isRead && (
                    <View className="absolute top-4 right-4 w-2.5 h-2.5 bg-purple-600 rounded-full" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});
