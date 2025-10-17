import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthInputScreenProps = {
  title: string;
  onNext: (value: string) => void;
  buttonLabel?: string;
  placeholder?: string;
  defaultValue?: string;
  secureTextEntry?: boolean;
};

export default function AuthInputScreen({
  title,
  onNext,
  buttonLabel = "다음",
  placeholder = "입력해주세요",
  defaultValue = "",
  secureTextEntry = false,
}: AuthInputScreenProps) {
  const [value, setValue] = useState(defaultValue);
  const disabled = value.trim().length === 0;

  const handlePress = () => {
    if (!disabled) onNext(value.trim());
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        {/* 본문 */}
        <View className="mt-[140px] px-6 pt-10">
          <Text className="text-lg font-bold text-gray-900 mb-5">{title}</Text>

          <TextInput
            className="border-b border-purple-600 py-2 text-base text-neutral-900"
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={setValue}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handlePress}
            secureTextEntry={secureTextEntry}
            keyboardType={secureTextEntry ? "default" : "email-address"}
          />
        </View>

        {/* Spacer - 남은 공간 채우기 */}
        <View className="flex-1" />

        {/* 하단 버튼 - 키보드 따라 올라감 */}
        <View>
          <Pressable
            onPress={handlePress}
            disabled={disabled}
            className={`h-14 items-center justify-center ${
              disabled ? "bg-purple-300" : "bg-purple-600"
            }`}
          >
            <Text className="text-white text-base font-semibold">
              {buttonLabel}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
