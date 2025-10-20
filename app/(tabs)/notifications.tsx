import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const NOTIFICATIONS = [
  {
    id: "1",
    type: "newsletter",
    title: "새로운 뉴스레터가 도착했습니다",
    body: "아웃스탠딩에서 새 글을 보냈습니다",
    time: "5분 전",
    isRead: false,
    icon: "mail" as const,
    color: "#9333ea",
  },
  {
    id: "2",
    type: "subscribe",
    title: "구독 완료",
    body: "요즘IT 뉴스레터 구독이 완료되었습니다",
    time: "2시간 전",
    isRead: true,
    icon: "checkmark-circle" as const,
    color: "#10B981",
  },
  {
    id: "3",
    type: "recommendation",
    title: "추천 뉴스레터",
    body: "관심있을만한 뉴스레터를 발견했어요",
    time: "어제",
    isRead: true,
    icon: "sparkles" as const,
    color: "#F59E0B",
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      {/* 헤더 */}
      <View className="px-6 py-4 border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-900">알림</Text>
        <TouchableOpacity>
          <Text className="text-sm font-semibold text-purple-600">
            모두 읽음
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {NOTIFICATIONS.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            className={`px-6 py-4 border-b border-gray-50 flex-row ${
              notification.isRead ? "bg-white" : "bg-purple-50"
            }`}
            activeOpacity={0.7}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: `${notification.color}20` }}
            >
              <Ionicons
                name={notification.icon}
                size={24}
                color={notification.color}
              />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-base font-bold text-gray-900 flex-1">
                  {notification.title}
                </Text>
                {!notification.isRead && (
                  <View className="w-2 h-2 bg-purple-600 rounded-full ml-2 mt-2" />
                )}
              </View>
              <Text className="text-sm text-gray-600 mb-1">
                {notification.body}
              </Text>
              <Text className="text-xs text-gray-500">{notification.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* 빈 상태 (알림이 없을 때) */}
        {NOTIFICATIONS.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="notifications-outline" size={64} color="#D1D5DB" />
            <Text className="text-xl font-bold text-gray-900 mt-4 mb-2">
              알림이 없습니다
            </Text>
            <Text className="text-base text-gray-500 text-center px-6">
              새로운 뉴스레터나 업데이트가 있으면 알려드릴게요
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
