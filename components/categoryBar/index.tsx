import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Category } from "../types";

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: Category["id"];
  onCategorySelect: (categoryId: Category["id"]) => void;
}

export default function CategoryBar({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryBarProps) {
  return (
    <View className="bg-white px-4 py-3">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => {
          const active = category.id === selectedCategory;
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => onCategorySelect(category.id)}
              className={`mr-2 rounded-full px-3 py-2 border ${
                active
                  ? "bg-gray-600 border-gray-600"
                  : "bg-gray-200 border-gray-200"
              }`}
              activeOpacity={0.8}
            >
              <Text
                className={`${active ? "text-white" : "text-gray-400"} text-xs font-semibold`}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
