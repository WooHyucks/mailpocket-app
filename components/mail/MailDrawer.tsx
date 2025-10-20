import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Email } from "@/app/(tabs)/mail";

interface MailDrawerProps {
  visible: boolean;
  onClose: () => void;
  emails: Email[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CATEGORIES = [
  { id: "economy", label: "시사/경제", icon: "📰", color: "#3B82F6" },
  { id: "it", label: "IT/프로덕트", icon: "💻", color: "#8B5CF6" },
  { id: "design", label: "디자인", icon: "🎨", color: "#EC4899" },
  { id: "startup", label: "스타트업", icon: "🚀", color: "#10B981" },
  { id: "marketing", label: "마케팅", icon: "📊", color: "#F59E0B" },
  { id: "business", label: "비즈니스", icon: "💼", color: "#6366F1" },
];

export default function MailDrawer({
  visible,
  onClose,
  emails,
  selectedCategory,
  onSelectCategory,
}: MailDrawerProps) {
  const insets = useSafeAreaInsets();

  // 카테고리별 통계 계산
  const getCategoryStats = () => {
    const stats: Record<string, { total: number; unread: number }> = {};

    CATEGORIES.forEach((cat) => {
      const categoryEmails = emails.filter((e) => e.category === cat.id);
      stats[cat.id] = {
        total: categoryEmails.length,
        unread: categoryEmails.filter((e) => !e.isRead).length,
      };
    });

    return stats;
  };

  const stats = getCategoryStats();
  const totalEmails = emails.length;
  const unreadEmails = emails.filter((e) => !e.isRead).length;
  const importantEmails = emails.filter((e) => e.isImportant).length;

  const handleSelectCategory = (categoryId: string | null) => {
    onSelectCategory(categoryId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.drawer} onPress={(e) => e.stopPropagation()}>
          <View className="flex-1">
            {/* 헤더 */}
            <View
              className="px-6 py-5 border-b border-gray-100"
              style={{ paddingTop: insets.top + 20 }}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-gray-900">전체</Text>
                <TouchableOpacity onPress={onClose} hitSlop={10}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* 카테고리 목록 */}
            <ScrollView
              className="flex-1 py-4"
              contentContainerStyle={{ paddingBottom: insets.bottom }}
            >
              {/* 전체 보기 */}
              <TouchableOpacity
                onPress={() => handleSelectCategory(null)}
                className={`flex-row items-center px-6 py-4 mx-3 rounded-xl mb-2 ${
                  selectedCategory === null ? "bg-purple-50" : ""
                }`}
                activeOpacity={0.7}
              >
                <View
                  className={`w-12 h-12 rounded-2xl items-center justify-center ${
                    selectedCategory === null ? "bg-purple-100" : "bg-gray-100"
                  }`}
                >
                  <Ionicons
                    name="apps"
                    size={24}
                    color={selectedCategory === null ? "#9333ea" : "#6B7280"}
                  />
                </View>
                <View className="flex-1 ml-4">
                  <Text
                    className={`text-base font-bold ${
                      selectedCategory === null
                        ? "text-purple-600"
                        : "text-gray-900"
                    }`}
                  >
                    전체 보기
                  </Text>
                  <Text className="text-xs text-gray-500 mt-0.5">
                    받은 뉴스레터
                  </Text>
                </View>
                <View className="items-end">
                  <Text
                    className={`text-lg font-bold ${
                      selectedCategory === null
                        ? "text-purple-600"
                        : "text-gray-900"
                    }`}
                  >
                    {totalEmails}
                  </Text>
                  {unreadEmails > 0 && (
                    <View className="bg-purple-600 px-2 py-0.5 rounded-full mt-1">
                      <Text className="text-xs font-bold text-white">
                        {unreadEmails}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              {/* 카테고리별 */}
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category.id;
                const categoryStats = stats[category.id];

                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => handleSelectCategory(category.id)}
                    className={`flex-row items-center px-6 py-4 mx-3 rounded-xl mb-2 ${
                      isSelected ? "bg-purple-50" : ""
                    }`}
                    activeOpacity={0.7}
                  >
                    <View
                      className={`w-12 h-12 rounded-2xl items-center justify-center ${
                        isSelected ? "bg-purple-100" : "bg-gray-100"
                      }`}
                    >
                      <Text className="text-2xl">{category.icon}</Text>
                    </View>
                    <View className="flex-1 ml-4">
                      <Text
                        className={`text-base font-bold ${
                          isSelected ? "text-purple-600" : "text-gray-900"
                        }`}
                      >
                        {category.label}
                      </Text>
                      <Text className="text-xs text-gray-500 mt-0.5">
                        {categoryStats.total}개의 뉴스레터
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text
                        className={`text-lg font-bold ${
                          isSelected ? "text-purple-600" : "text-gray-900"
                        }`}
                      >
                        {categoryStats.total}
                      </Text>
                      {categoryStats.unread > 0 && (
                        <View className="bg-purple-600 px-2 py-0.5 rounded-full mt-1">
                          <Text className="text-xs font-bold text-white">
                            {categoryStats.unread}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
  },
  drawer: {
    width: 280,
    height: "100%",
    backgroundColor: "#fff",
  },
});
