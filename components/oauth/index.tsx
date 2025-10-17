import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// SVG 로고 import
import KakaoLogo from "@/assets/images/auth/kakao_logo.svg";
import GoogleLogo from "@/assets/images/auth/google_logo.svg";

WebBrowser.maybeCompleteAuthSession();

const API_BASE_URL = "https://api.mailpocket.me";

type OAuthProvider = "kakao" | "naver" | "google";

// OAuth 설정
const OAUTH_CONFIG = {
  kakao: {
    authUrl:
      "https://kauth.kakao.com/oauth/authorize?client_id=f898615d1b15529653e04549bd5203b7&redirect_uri=mailpocket://oauth/callback&response_type=code",
    apiUrl: `${API_BASE_URL}/user/kakao-login`,
  },
  naver: {
    authUrl:
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Q9vH3BUxoFpZea90R2g3&redirect_uri=mailpocket://oauth/callback",
    apiUrl: `${API_BASE_URL}/user/naver-login`,
  },
  google: {
    authUrl:
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=470039216193-568hnttd1011ddmc5j22nqia9rcjm1ah.apps.googleusercontent.com&redirect_uri=mailpocket://oauth/callback",
    apiUrl: `${API_BASE_URL}/user/google-login`,
  },
};

// 백엔드에 토큰 전송
async function sendTokenToBackend(
  token: string,
  apiUrl: string
): Promise<boolean> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (response.status === 201) {
      const authToken = await response.text();
      await AsyncStorage.setItem("authToken", authToken);
      return true;
    }
    return false;
  } catch (error) {
    console.error("백엔드 전송 실패:", error);
    return false;
  }
}

export function OAuthButtons() {
  const [loading, setLoading] = useState<OAuthProvider | null>(null);

  const handleSocialLogin = async (provider: OAuthProvider) => {
    setLoading(provider);

    try {
      const config = OAUTH_CONFIG[provider];
      const result = await WebBrowser.openAuthSessionAsync(
        config.authUrl,
        "mailpocket://oauth/callback"
      );

      if (result.type === "success") {
        const { url } = result;
        let token: string | null = null;

        // Google은 access_token을 hash에서, Kakao/Naver는 code를 query에서 추출
        if (provider === "google") {
          const hashParams = new URLSearchParams(url.split("#")[1]);
          token = hashParams.get("access_token");
        } else {
          const { queryParams } = Linking.parse(url);
          token = queryParams?.code as string;
        }

        if (token) {
          const success = await sendTokenToBackend(token, config.apiUrl);

          if (success) {
            router.replace("/(tabs)");
          } else {
            Alert.alert("로그인 실패", "서버 응답이 올바르지 않습니다.", [
              { text: "확인", onPress: () => setLoading(null) },
            ]);
            return;
          }
        } else {
          Alert.alert("로그인 실패", "토큰을 받아올 수 없습니다.", [
            { text: "확인", onPress: () => setLoading(null) },
          ]);
          return;
        }
      }
    } catch (error) {
      console.error("OAuth Error:", error);
      Alert.alert("오류", "로그인 중 오류가 발생했습니다.", [
        { text: "확인", onPress: () => setLoading(null) },
      ]);
      return;
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <View className="mb-8">
        {/* Kakao */}
        <TouchableOpacity
          className="bg-[#FEE500] rounded-xl py-4 mb-3 flex-row items-center justify-center"
          onPress={() => handleSocialLogin("kakao")}
          disabled={loading !== null}
          style={styles.button}
        >
          <View style={styles.logoContainer}>
            <KakaoLogo width={20} height={20} />
          </View>
          <Text className="text-gray-900 text-sm font-bold">
            카카오 계정으로 계속하기
          </Text>
        </TouchableOpacity>

        {/* Naver */}
        <TouchableOpacity
          className="bg-[#21c55e] rounded-xl py-4 mb-3 flex-row items-center justify-center"
          onPress={() => handleSocialLogin("naver")}
          disabled={loading !== null}
          style={styles.button}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/auth/naver_logo.png")}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          </View>
          <Text className="text-white text-sm font-bold">
            네이버 계정으로 계속하기
          </Text>
        </TouchableOpacity>

        {/* Google */}
        <TouchableOpacity
          className="bg-white border border-gray-300 rounded-xl py-4 mb-3 flex-row items-center justify-center"
          onPress={() => handleSocialLogin("google")}
          disabled={loading !== null}
          style={styles.button}
        >
          <View style={styles.logoContainer}>
            <GoogleLogo width={20} height={20} />
          </View>
          <Text className="text-gray-900 text-sm font-bold">
            Google 계정으로 계속하기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 로딩 오버레이 - 서버 통신 중에만 표시 */}
      <Modal
        transparent
        visible={loading !== null}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.overlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9333ea" />
            <Text style={styles.loadingText}>
              {loading === "kakao" && "카카오 로그인 중..."}
              {loading === "naver" && "네이버 로그인 중..."}
              {loading === "google" && "구글 로그인 중..."}
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    left: 16,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    minWidth: 200,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
});
