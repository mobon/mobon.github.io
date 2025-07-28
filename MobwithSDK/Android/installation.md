# 설치 방법

## Gradle 설정

- project build.gradle 에 mavenCentral() 을 추가합니다.  

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
```
- app build.gradle 에 com.google.android.gms 와 MobWith 라이브러리를 추가합니다.  

```groovy
dependencies {
    implementation 'com.google.android.gms:play-services-ads-identifier:17.0.0'
    implementation 'io.github.mobon:mobwithSDK:1.0.58'
}
```

## 권한 설정

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

**Android 9 (Pie) 업데이트에 따른 추가설정**
- targetSdkVersion 28 부터 네트워크 통신 시 암호화 되지 않은 HTTP통신이 차단되도록 기본설정이 변경되었습니다.  
  SDK 내 모든 미디에이션 광고가 정상동작하기 위해서는 HTTP 통신을 허용해주셔야 하며, 방법은 아래와 같습니다.  
  AndroidManifest.xml 파일에서 application 항목의 속성값으로 usesCleartextTraffic을 true로 설정해야 합니다.  
  (Android 9 부터 해당값이 default로 false 설정되어 HTTP 통신이 제한됩니다.)

```xml
<manifest ...>
<application
...
android:usesCleartextTraffic="true"
...>
</application>
</manifest>
```

## ADFIT SDK 추가
- Adfit 광고를 송출하기 위해 링크를 참고하여 주세요.  
  [Adfit SDK 바로가기](https://github.com/adfit/adfit-android-sdk)  
- MobWithSDK는 Adfit SDK 3.15.2버전에 최적화 되어 있습니다.  
- 경우에 따라서는 가이드에 안내된 "com.kakao.adfit:ads-base:3.15.2"가 아닌 다른 버전/타입의 SDK를 추가 해야 할 수도 있습니다.  
  (해당되는 경우 별도로 안내됩니다.)

## ADOP BidMad SDK 추가
- ADOP 광고를 송출하기 위해 링크를 참고하여 주세요.  
  [ADOP BidMad SDK 바로가기](https://github.com/bidmad/Bidmad-Android/blob/master/README.md#1-SDK-%EC%84%B8%ED%8C%85)  
- MobWithSDK는 ADOP BidMad SDK 3.18.0 버전에 최적화 되어 있습니다.  
- SDK 세팅 부분만 참고 하시면 되며, API키 등 설정 해줘야 하는 값들은 협의된 내용을 토대로 적용 하시면 됩니다.

## Coupang SDK 추가
- Gradle 설정 
1.  먼저 프로젝트 단위의 Gradle에 아래를 참고하여 CoupangSDK를 가져오기 위한 저장소를 추가해줍니다.

```groovy
buildscript {
  ...
  repositories {
      ...
      maven { url "https://raw.githubusercontent.com/coupang-ads-sdk/android/main" }
      ...
  }
}
...
allprojects {
  repositories {
      ...
      maven { url "https://raw.githubusercontent.com/coupang-ads-sdk/android/main" }
      ...
  }
}
```
 2. 다음으로 App단위의 Gradle 파일에 아래와 같이 Coupnag SDK를 Implements 해주시면 됩니다.  

```groovy
implementation 'com.coupang:ads:1.3.0'
```

- AdnroidMenifest.xml에서 아래와 같이 applicaion태그 내부에 meta-data를 추가해 줍니다. 넣어야 할 값은 가이드와 함께 제공된 Coupang Sub ID 값을 참고 하시면 됩니다.  

```xml
  <application>
    ....
    <meta-data android:name="coupang_ads_sub_id"
          android:value="{전달 받은 Coupnag Sub ID}"/>
    ....
  </application>
```

- Proguard 설정  
  Proguard 사용시 아래와 같이 예외 설정을 추가해 주셔야 합니다.  

```groovy
  -keep interface com.coupang.ads.dto.DTO
  -keep class * implements com.coupang.ads.dto.DTO { *; }
```
- 주의 및 참고 사항
  - 광고 View 들을 생성 시 전달 하는 Context는 LifecycleOwner를 상속 또는 Implements 하고 있어야 합니다. 
  - 대체로 AndroidX의 ComponentActivity를 상속 받고있는 객체라면 특별히 문제 되지는 않습니다. 
  - 전면 배너의 경우 사이즈 옵션과는 무관하게 Coupang SDK에서 지원하는 사이즈로만 출력됩니다.

## Unity Ads SDK 추가
- Unity Ads 광고를 송출하기 위해 링크를 참고하여 주세요. (4.7.0 버전에 최적화 되어 있습니다.)  
  [Unity Ads SDK 바로가기](https://docs.unity.com/grow/ko-kr/ads/android-sdk)
- SDK 연동 요구사항 및 Unity Ads SDK를 설치하기 위한 부분을 참고 하시면 됩니다.
- GameID 설정  
  Unity Ads SDK를 미디에이션 하기위해서는 광고 로딩전 아래와 같이 GameID의 설정이 필요합니다.

```java
MobwithSDK.getInstance().setUnityGameId(this,"{ 전달 받은 GameId }");
```

## IronSource(LevelPlay) SDK 추가
- IronSource(LevelPlay) 광고를 송출하기 위해 링크를 참고하여 주세요. (8.4.0 버전에 최적화 되어 있습니다.)
[IronSource(LevelPlay) SDK 바로가기](https://developers.is.com/ironsource-mobile/android/getting-started-android/)
- Getting started와 Adnroid SDK Integration 항목을 참고 하시면 됩니다.
- AppKey 설정  
IronSource(LevelPlay) SDK를 미디에이션 하기위해서는 광고 로딩전 아래와 같이 AppKey의 설정이 필요합니다.

```java
MobwithSDK.getInstance().setLevelPlayAppKey(this,"{ 전달 받은 AppKey }");
```

## Pangle SDK 추가
- Pangle 광고를 송출하기 위해 링크를 참고하여 주세요. (7.1.0.4 버전에 최적화 되어 있습니다.)  
[Pangle SDK 바로가기](https://www.pangleglobal.com/kr/integration/integrate-pangle-sdk-for-android)
- AppKey 설정  
Pangle SDK를 미디에이션 하기위해서는 광고 로딩전 아래와 같이 AppKey의 설정이 필요합니다.

```java
MobwithSDK.getInstance().setPangleAppKey("전달 받은 AppKey");
```
- 주의사항 : 외부 미디에이션 사용 시 라이브러리 간 충돌이 발생할 수 있습니다. 아래의 미디에이션이 implementation 되어있으면 해당 라이브러리는 충돌이 발생하니 제거해주시기 바랍니다.

```groovy
implementation 'com.adop.sdk.adapter:pangle:5.2.1.1.3'
implementation 'com.adop.sdk.partners:admobbidding:1.0.2'
```
implementation된 라이브러리의 dependency의 Pangle 관련 라이브러리가 있으면 충돌이 발생할 수 있으니 관련해서 협의 바랍니다.

- 라이브러리 충돌 확인 방법
1. 안드로이드 스튜디오 -> 터미널 -> .\gradlew app:dependencies --configuration debugRuntimeClasspath 입력
2. 결과 로그에서 "(*)", "->", "conflict", "requested" 같은 키워드는 중복되었다는 의미
3. 중복된 implementation 제거