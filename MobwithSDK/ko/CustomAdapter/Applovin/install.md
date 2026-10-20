# AppLovin MAX Adapter SDK 설치 <!-- {docsify-ignore} -->

AppLovin MAX 미디에이션을 통해 MobWith 광고를 송출하는 데 필요한 SDK 설치 방법을 안내합니다.<br>
**MobWith SDK**와 **AppLovin MAX Adapter SDK**를 모두 설치해야 합니다.

!> AppLovin MAX Adapter는 AppLovin MAX 미디에이션에 3rd Party로 참여하는 방식이므로, 프로젝트에 **AppLovin MAX SDK가 먼저 설치**되어 있어야 합니다.<br>
AppLovin MAX SDK가 설치되어 있지 않다면 [Android](https://support.axon.ai/en/max/android/overview/integration) / [iOS](https://support.axon.ai/en/max/ios/overview/integration) 가이드를 참고하여 AppLovin MAX SDK 설치와 광고 설정을 먼저 진행해 주세요.

## 1. MobWith SDK 기본 설정 <!-- {docsify-ignore} -->

AppLovin MAX Adapter는 MobWith SDK를 통해 광고를 송출하므로, MobWith SDK의 기본 설정이 먼저 필요합니다.

- Android : SDK Installation 문서의 [Gradle 설정](/Android/installation?id=gradle-설정)에서 저장소(mavenCentral, jitpack)를 추가하고, [권한 설정](/Android/installation?id=권한-설정)을 적용합니다.<br>MobWith SDK 의존성은 해당 문서가 아닌 아래 2단계의 설정을 사용합니다.
- iOS : SDK Installation 문서의 [CocoaPods를 이용하여 설치](/iOS/installation_base?id=cocoapods를-이용하여-설치)를 참고하여 MobWith SDK를 설치합니다.

?> MobWith SDK 자체의 미디에이션(AdFit, BidMad 등 다른 광고 네트워크 연동)은 AppLovin MAX Adapter 연동과 별개의 기능입니다. 협의된 경우에만 SDK Installation 문서의 각 네트워크 SDK 추가 항목을 참고하여 적용합니다.

## 2. AppLovin MAX Adapter SDK 추가 <!-- {docsify-ignore} -->

플랫폼별로 아래 의존성을 추가합니다.<br>
Android는 AppLovin MAX Adapter, AppLovin MAX SDK, MobWith SDK를 함께 추가하고, iOS는 AppLovin MAX Adapter만 추가합니다. (iOS의 MobWith SDK는 1단계에서 설치합니다.)

<!-- tabs:start -->

#### **Android**

app 모듈의 `build.gradle(.kts)` 파일 `dependencies` 블록에 추가합니다.

```kotlin
// AppLovin MAX Mediation Adapter
implementation("io.github.mobon:MobwithApplovinMediationAdapter:1.0.0-alpha")

// AppLovin MAX SDK
implementation("com.applovin:applovin-sdk:+@aar")

// MobWith SDK (원활한 광고 송출을 위해 반드시 1.0.80 버전을 사용해야 합니다)
implementation("com.google.android.gms:play-services-ads:23.0.0")
implementation("com.google.android.gms:play-services-ads-identifier:17.1.0")
implementation("io.github.mobon:mobwithSDK:1.0.80")
implementation("com.github.Dimezis:BlurView:version-3.2.0")
```

#### **iOS**

프로젝트의 `Podfile`에 추가한 뒤 `pod install`을 실행합니다.

```ruby
# CocoaPods 소스 지정 (순서에 따라 정상적으로 가져오지 못할 수 있으니 주의 바랍니다)

# 기본 Repo
source 'https://cdn.cocoapods.org/'

# MobWith SDK Repo
source 'https://github.com/mobon/MobwithAdSpecs.git'

# AppLovin MAX Adapter SDK
pod 'MobwithAppLovinMediationAdapter'
```

?> CocoaPods 소스 지정은 MobWith SDK 설치 과정에서 이미 설정했다면 생략해도 됩니다.

<!-- tabs:end -->

## 3. SDK 설치 확인 <!-- {docsify-ignore} -->

AppLovin MAX SDK 초기화 함수의 완료 콜백을 통해 SDK가 정상적으로 설치되었는지 확인할 수 있습니다.

!> 설치 확인 전에 AppLovin MAX 관리자 콘솔의 미디에이션 설정이 완료되어 있어야 합니다. 설정 방법은 [Ad Configuration](/CustomAdapter/Applovin/loadAd.md)을 참고 바랍니다.

<!-- tabs:start -->

#### **Android**

```java
AppLovinSdk.getInstance(activity).initialize(initConfigBuilder.build(), new AppLovinSdk.SdkInitializationListener() {
    @Override
    public void onSdkInitialized(AppLovinSdkConfiguration appLovinSdkConfiguration) {
        // SDK 초기화 완료 시 호출
    }
});
```

#### **iOS**

```swift
let initConfig = ALSdkInitializationConfiguration(sdkKey: AdIds.appKey) { builder in
    builder.mediationProvider = ALMediationProviderMAX
}

ALSdk.shared().initialize(with: initConfig) { config in
    self.isInited = true
}
```

<!-- tabs:end -->

## 참고 사항 <!-- {docsify-ignore} -->

최적화된 AppLovin MAX SDK 버전은 아래와 같습니다.

| 플랫폼 | AppLovin MAX SDK 버전 |
|---|---|
| Android | 13.6.3 |
| iOS | 13.6.0 |

---

**다음 단계** : [Ad Configuration](/CustomAdapter/Applovin/loadAd.md)에서 AppLovin MAX 관리자 콘솔의 미디에이션을 설정합니다.
