import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Newsletter } from "../types";

interface NewsletterItemProps {
  newsletter: Newsletter;
  onSubscribe: (id: string) => void;
}

export default function NewsletterItem({
  newsletter,
  onSubscribe,
}: NewsletterItemProps) {
  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <TouchableOpacity
        className="flex-row items-center flex-1 pr-3"
        onPress={() => onSubscribe(newsletter.id)}
      >
        {newsletter.logo ? (
          <Image
            source={{ uri: newsletter.logo }}
            className="size-12 rounded-full mr-3 object-cover"
            resizeMode="cover"
          />
        ) : (
          <View className="w-10 h-10 rounded-full bg-gray-100 mr-3 items-center justify-center">
            <Text className="text-gray-400 text-lg">O</Text>
          </View>
        )}
        <View className="flex-1">
          <Text className="text-xs font-medium text-gray-400 mb-1">
            {newsletter.name}
          </Text>
          <Text
            className="text-gray-700 text-sm font-semibold line-clamp-2 max-w-[90%]"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {newsletter.title}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-purple-600 rounded-full px-3 py-2"
        activeOpacity={0.8}
      >
        <Text className="text-white text-xs font-semibold">구독하기</Text>
      </TouchableOpacity>
    </View>
  );
}
