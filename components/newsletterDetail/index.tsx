import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NewsletterDetailData {
  id: string;
  name: string;
  title: string;
  categoryId: string;
  description: string;
  recentArticles: Array<{
    id: string;
    title: string;
    summary: string;
    date: string;
  }>;
}

interface NewsletterDetailProps {
  newsletter: NewsletterDetailData;
  onSubscribe: (id: string) => void;
  onBack: () => void;
  showHeader?: boolean;
}

function NewsletterDetail({
  newsletter,
  onSubscribe,
  onBack,
  showHeader = true,
}: NewsletterDetailProps) {
  const handleSubscribe = () => {
    onSubscribe(newsletter.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 헤더 */}
      {showHeader && (
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
          <TouchableOpacity onPress={onBack} className="p-2">
            <Text className="text-lg">←</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-800">
            {newsletter.name}
          </Text>
          <View className="w-8" />
        </View>
      )}

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 뉴스레터 정보 */}
        <View className="px-4 py-6">
          <View className="flex-row items-start mb-4">
            <View className="w-16 h-16 rounded-full bg-gray-100 mr-4 items-center justify-center">
              <Text className="text-gray-400 text-2xl">O</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-400 mb-1">
                {newsletter.name}
              </Text>
              <Text className="text-lg font-bold text-gray-800 mb-2">
                {newsletter.title}
              </Text>
              <Text className="text-sm text-gray-600 leading-5">
                {newsletter.description}
              </Text>
            </View>
          </View>

          {/* 구독 버튼 */}
          <TouchableOpacity
            onPress={handleSubscribe}
            className="bg-purple-600 rounded-2xl py-4 items-center mb-6"
            activeOpacity={0.9}
          >
            <Text className="text-white text-base font-semibold">구독하기</Text>
          </TouchableOpacity>
        </View>

        {/* 최근 아티클 */}
        <View className="px-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            최근 소식
          </Text>

          {newsletter.recentArticles.map((article) => (
            <View key={article.id} className="mb-4">
              <View className="bg-gray-50 rounded-2xl p-4">
                <Text className="text-sm text-gray-500 mb-2">
                  {article.date}
                </Text>
                <Text className="text-base font-semibold text-gray-800 mb-2">
                  {article.title}
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                  {article.summary}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* 하단 여백 */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}

// Export types and component
export type { NewsletterDetailData };
export default NewsletterDetail;
