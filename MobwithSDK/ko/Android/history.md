# History <!-- {docsify-ignore} -->

Android SDK의 버전별 변경 이력입니다.

### 1.0.112 <span class="release-date">2026-10-30</span><span class="release-badge">Latest</span> <!-- {docsify-ignore} -->

- 인앱 랜딩 콜백 `onInAppLanding()` 추가
- 포인트 배너 HybridBridgeBanner 리워드 기능 추가
- SortList 가중치(`exlItlSeq`) 파라미터 추가
- Appier SDK 버전 파라미터 추가
- Appier(Aistra) SDK 의존성을 선택 사항으로 변경 (SDK Installation 문서 참고)
- 스플래시 광고 UI 수정 (하단형, 전면형, 영상)
- maven 저장소 변경: SDK 1.0.112 이상은 project `build.gradle`에 MobWith maven 저장소 설정 필요 (SDK Installation 문서 참고)

### 1.0.111 <span class="release-date">2026-10-22</span> <!-- {docsify-ignore} -->

- MobwithBannerView, MobwithNativeAdView에 리워드 Affordance 커스텀 기능 추가 (`AffordanceStyle`)
- MobwithNativeAdView 영상 광고 송출 기능 추가

### 1.0.110 <span class="release-date">2026-10-16</span> <!-- {docsify-ignore} -->

- 네이티브 광고 리소스 해제 함수 destroy() 추가

### 1.0.109 <span class="release-date">2026-10-16</span> <!-- {docsify-ignore} -->

- 네이티브 광고 로드 시 중복 요청이 발생하지 않도록 로직 개선
- MediationManager 객체 관리 고도화 및 MediationManager.release() 보완

### 1.0.108 <span class="release-date">2026-10-08</span> <!-- {docsify-ignore} -->

- 전면/리워드 로컬라이징 구현
- 리워드 배너 bug fix

### 1.0.107 <span class="release-date">2026-10-02</span> <!-- {docsify-ignore} -->

- HybridBannerBridge 오류 수정

### 1.0.106 <span class="release-date">2026-10-01</span> <!-- {docsify-ignore} -->

- 일반 배너광고, 네이티브 광고 포인트 배너 기능 추가
- UserAgent 고도화
- 안드로이드 API 버전 대응

### 1.0.105 <span class="release-date">2026-09-29</span> <!-- {docsify-ignore} -->

- ADID bug fix

### 1.0.104 <span class="release-date">2026-09-28</span> <!-- {docsify-ignore} -->

- SDK 리소스 정리

### 1.0.103 <span class="release-date">2026-09-22</span> <!-- {docsify-ignore} -->

- Adpopcorn NAM 연동
- 스플래시 배너 UI 변경

### 1.0.102 <span class="release-date">2026-09-17</span> <!-- {docsify-ignore} -->

- Adpopcorn NAM 광고 연동
- 글로벌 지면 Native 광고 Asset 노출 정책 대응
- Context 타입 변경

### 1.0.101 <span class="release-date">2026-09-03</span> <!-- {docsify-ignore} -->

- 전면&리워드 문구 사이즈 조절 및 닫기 버튼 문구 변경

### 1.0.100 <span class="release-date">2026-09-02</span> <!-- {docsify-ignore} -->

- bug fix

### 1.0.99 <span class="release-date">2026-09-02</span> <!-- {docsify-ignore} -->

- 전면&리워드 광고 닫기 버튼 UI 변경

### 1.0.98 <span class="release-date">2026-09-02</span> <!-- {docsify-ignore} -->

- NativeAd 메인 이미지 scaleType 설정 기능 추가

### 1.0.97 <span class="release-date">2026-09-02</span> <!-- {docsify-ignore} -->

- Adpopcorn Naver 미디에이션 광고 기능 추가
- Mixer Video 버그 수정

### 1.0.96 <span class="release-date">2026-08-28</span> <!-- {docsify-ignore} -->

- HybridBannerBridge destroy() 버그 수정

### 1.0.95 <span class="release-date">2026-08-25</span> <!-- {docsify-ignore} -->

- HybridBannerBridge No Ad 버그 수정

### 1.0.94 <span class="release-date">2026-08-20</span> <!-- {docsify-ignore} -->

- NativeAdView Kakao BizBoard Banner 광고 노출 기능 추가
- Banner 광고 닫기 (X) 버튼 크기 조절
- URL Query Encoding (Carrier, Language) 파라미터 추가

### 1.0.93 <span class="release-date">2026-08-14</span> <!-- {docsify-ignore} -->

- EndingBannerView의 UI 업데이트

### 1.0.92 <span class="release-date">2026-08-11</span> <!-- {docsify-ignore} -->

- bug fix

### 1.0.91 <span class="release-date">2026-08-05</span> <!-- {docsify-ignore} -->

- bug fix

### 1.0.90 <span class="release-date">2026-08-05</span> <!-- {docsify-ignore} -->

- 배너 닫기 기능 제거
- bug fix

### 1.0.89 <span class="release-date">2026-07-28</span> <!-- {docsify-ignore} -->

- HybridBannerBridgeView 스크립트 추가
- HybridBannerBridgeView webViewFinishLoad() 함수 수정

### 1.0.88 <span class="release-date">2026-07-28</span> <!-- {docsify-ignore} -->

- SplashAd Container 파라미터 추가
- HybridBannerBridgeView bug fix

### 1.0.87 <span class="release-date">2026-07-24</span> <!-- {docsify-ignore} -->

- 신규 광고 상품 추가 (SplashAd, EndingBannerView, HybridBannerBridgeView)
- 광고 성능 최적화

### 1.0.86 <span class="release-date">2026-07-14</span> <!-- {docsify-ignore} -->

- freepass bug fix

### 1.0.84 <span class="release-date">2026-06-16</span> <!-- {docsify-ignore} -->

- 리워드 Prepare bug fix
- ADID 갱신 로직

### 1.0.83 <span class="release-date">2026-06-01</span> <!-- {docsify-ignore} -->

- 배너 닫기 버튼 기능 추가
- Applovin MAX Imp, Click 통계 API 추가

### 1.0.82 <span class="release-date">2026-05-14</span> <!-- {docsify-ignore} -->

- Frame Ad UI 최적화
- Bidmad SDK 최신화

### 1.0.81 <span class="release-date">2026-05-06</span> <!-- {docsify-ignore} -->

- Mixer 병렬 송출 기능
- 전면배너 UI 최적화

### 1.0.80 <span class="release-date">2026-04-21</span> <!-- {docsify-ignore} -->

- 전면배너, 리워드배너 UI 개선

### 1.0.79 <span class="release-date">2026-02-10</span> <!-- {docsify-ignore} -->

- RewardAdDialog Back 클릭 이벤트 제거

### 1.0.78 <span class="release-date">2026-02-04</span> <!-- {docsify-ignore} -->

- Script 광고(Toast) 클릭 기능 수정

### 1.0.77 <span class="release-date">2026-02-04</span> <!-- {docsify-ignore} -->

- Script 광고 크롬 시스템 로그 제거
- Script 광고 간헐적으로 안나오는 현상 수정 (스크립트 광고 비율 조절 기능 이슈 수정)

### 1.0.76 <span class="release-date">2026-02-02</span> <!-- {docsify-ignore} -->

- 후후 프리패스 영상광고 송출 기능 추가
- 리워드 배너 Count 기능 제거
- ScriptAdapter 로그 제거

### 1.0.75 <span class="release-date">2026-01-28</span> <!-- {docsify-ignore} -->

- BugFix (Inmobi)

### 1.0.74 <span class="release-date">2026-01-21</span> <!-- {docsify-ignore} -->

- Script 광고 비율 조정 기능 추가
- Cauly SDK 추가 (Banner)

### 1.0.73 <span class="release-date">2026-01-15</span> <!-- {docsify-ignore} -->

- Admob mediation SDK 추가

### 1.0.72 <span class="release-date">2026-01-13</span> <!-- {docsify-ignore} -->

- BugFix

### 1.0.71 <span class="release-date">2026-01-12</span> <!-- {docsify-ignore} -->

- BugFix

### 1.0.70 <span class="release-date">2026-01-08</span> <!-- {docsify-ignore} -->

- Smart Frame Banner AD 기능 추가

### 1.0.69 <span class="release-date">2025-12-31</span> <!-- {docsify-ignore} -->

- Script 광고 고도화
- BannerWithArticle Article 클릭 이벤트 추가

### 1.0.68 <span class="release-date">2025-12-04</span> <!-- {docsify-ignore} -->

- BugFix

### 1.0.67 <span class="release-date">2025-11-12</span> <!-- {docsify-ignore} -->

- BugFix (Inmobi Init 에러 수정, DTExchange 에러 수정)

### 1.0.66 <span class="release-date">2025-11-12</span> <!-- {docsify-ignore} -->

- BugFix (Adfit AdInfoIcon 대응)

### 1.0.65 <span class="release-date">2025-11-11</span> <!-- {docsify-ignore} -->

- BugFix (WHOWHO)

### 1.0.64 <span class="release-date">2025-10-28</span> <!-- {docsify-ignore} -->

- BugFix (AdFit)

### 1.0.63 <span class="release-date">2025-10-15</span> <!-- {docsify-ignore} -->

- 신규 SDK 추가 (Inmobi)
- BugFix (AdFit)

### 1.0.62 <span class="release-date">2025-09-24</span> <!-- {docsify-ignore} -->

- AdFit NativeAdView 기능 추가
- 코드 정리 및 최적화 작업

### 1.0.61 <span class="release-date">2025-09-11</span> <!-- {docsify-ignore} -->

- BugFix

### 1.0.60 <span class="release-date">2025-09-11</span> <!-- {docsify-ignore} -->

- NativeAdView 서브 레이아웃 기능 추가
- 코드 정리 및 최적화 작업

### 1.0.59 <span class="release-date">2025-08-19</span> <!-- {docsify-ignore} -->

- 신규 광고 SDK 추가 (DT Exchange)
- 리워드 광고 시 destroy Excaption 예외 처리
- 기능 정리 및 최적화 작업

### 1.0.58 <span class="release-date">2025-07-28</span> <!-- {docsify-ignore} -->

- Imp, Click Tracker 이슈 수정
- API Header SDK 정보 추가 (SDK version, os, 매체 App Version)

### 1.0.57 <span class="release-date">2025-07-15</span> <!-- {docsify-ignore} -->

- Passback setAGHeaders Context Null 로직 수정

### 1.0.56 <span class="release-date">2025-07-15</span> <!-- {docsify-ignore} -->

- 스크립트 광고 매체 추가 (메조미디어, 아크로스, NHN)
- 안드로이드 15 대응 (샘플 UI 수정)
- 기능 정리 및 최적화

### 1.0.55 <span class="release-date">2025-06-26</span> <!-- {docsify-ignore} -->

- 안드로이드 15 Edge TO Edge (스테이터스 바와 전면, 리워드 광고가 겹치는 현상 수정)

### 1.0.54 <span class="release-date">2025-06-24</span> <!-- {docsify-ignore} -->

- AdapterObject가 간헐적으로 nullpoint exception이 발생하는 현상 수정

### 1.0.53 <span class="release-date">2025-06-23</span> <!-- {docsify-ignore} -->

- MBC Banner 대응 (FullScreenMode 추가)
- 안드로이드 15 스테이터스바 영역과 겹치는 현상 수정

### 1.0.52 <span class="release-date">2025-06-18</span> <!-- {docsify-ignore} -->

- 스마트 스코어 SDK bug fix
- onOpened 중복 호출 제거
- 타 SDK에서 RewardAdTestActivity 로그가 나오는 현상 수정

### 1.0.51 <span class="release-date">2025-06-12</span> <!-- {docsify-ignore} -->

- Imp, Click Tracker 추가
- Pangle Native 광고 안나오는 현상 수정
- 전면, 엔딩 Close Event 추가

### 1.0.50 <span class="release-date">2025-06-09</span> <!-- {docsify-ignore} -->

- Pangle SDK 연동
- LevelPlay Init 로직 개선

### 1.0.49 <span class="release-date">2025-04-18</span> <!-- {docsify-ignore} -->

- 스마트 광고 (카테고리 타겟팅) 기능 추가
