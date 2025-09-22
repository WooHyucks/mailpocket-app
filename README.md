# MailPocket App

React Native와 Expo를 사용한 이메일 관리 앱입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js (v18 이상)
- npm 또는 yarn
- Expo CLI
- iOS Simulator (iOS 개발용)
- Android Studio (Android 개발용)

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start

# iOS에서 실행
npm run ios

# Android에서 실행
npm run android

# 웹에서 실행
npm run web
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
├── screens/            # 화면 컴포넌트
├── navigation/         # 네비게이션 설정
├── hooks/              # 커스텀 훅
├── utils/              # 유틸리티 함수
├── types/              # TypeScript 타입 정의
├── context/            # React Context
├── services/           # API 서비스
└── constants/          # 상수 정의
```

## 🛠️ 사용된 기술

- **React Native** - 크로스 플랫폼 모바일 개발
- **Expo** - 개발 도구 및 배포 플랫폼
- **TypeScript** - 타입 안전성
- **React Navigation** - 네비게이션
- **React Query** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리
- **AsyncStorage** - 로컬 저장소
- **React Native Reanimated** - 애니메이션
- **React Native Gesture Handler** - 제스처 처리

## 🎨 테마 시스템

앱은 다크/라이트 테마를 지원합니다. 테마는 `src/constants/theme.ts`에서 정의되며, `ThemeContext`를 통해 관리됩니다.

## 📱 주요 기능

- ✅ 다크/라이트 테마 지원
- ✅ 반응형 디자인
- ✅ 안전 영역 관리
- ✅ 타입 안전성
- ✅ 로컬 저장소
- ✅ 암호화된 저장소
- ✅ 네비게이션
- ✅ 상태 관리

## 🧪 테스트

```bash
# 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch
```

## 🔧 개발 도구

```bash
# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 타입 검사
npm run type-check
```

## 📦 빌드 및 배포

```bash
# 프로덕션 빌드
expo build:android
expo build:ios

# OTA 업데이트
expo publish
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
