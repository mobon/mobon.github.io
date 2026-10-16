# AdMob Adapter SDK 설치 <!-- {docsify-ignore} -->

AdMob 미디에이션을 통해 MobWith 광고를 송출하는 데 필요한 SDK 설치 방법을 안내합니다.<br>
**MobWith SDK**와 **AdMob Adapter SDK**를 모두 설치해야 합니다.

!> AdMob Adapter는 AdMob 미디에이션에 3rd Party로 참여하는 방식이므로, 프로젝트에 **AdMob SDK가 먼저 설치**되어 있어야 합니다.<br>
AdMob SDK가 설치되어 있지 않다면 [Android](https://developers.google.com/admob/android/quick-start) / [iOS](https://developers.google.com/admob/ios/quick-start) 가이드를 참고하여 AdMob SDK 설치와 광고 설정을 먼저 진행해 주세요.

## 1. MobWith SDK 기본 설정 <!-- {docsify-ignore} -->

AdMob Adapter는 MobWith SDK를 통해 광고를 송출하므로, MobWith SDK의 기본 설정이 먼저 필요합니다.

- Android : SDK Installation 문서의 [Gradle 설정](/Android/installation?id=gradle-설정)에서 저장소(mavenCentral, jitpack)를 추가하고, [권한 설정](/Android/installation?id=권한-설정)을 적용합니다.<br>MobWith SDK 의존성은 해당 문서가 아닌 아래 2단계의 설정을 사용합니다.
- iOS : SDK Installation 문서의 [CocoaPods 사용하여 설치](/iOS/installation_base?id=cocoapods-사용하여-설치)를 참고하여 MobWith SDK를 설치합니다.

?> MobWith SDK 자체의 미디에이션(AdFit, BidMad 등 다른 광고 네트워크 연동)은 AdMob Adapter 연동과 별개의 기능입니다. 협의된 경우에만 SDK Installation 문서의 각 네트워크 SDK 추가 항목을 참고하여 적용합니다.

## 2. AdMob Adapter SDK 추가 <!-- {docsify-ignore} -->

플랫폼별로 아래 의존성을 추가합니다.<br>
Android는 AdMob Adapter, AdMob SDK, MobWith SDK를 함께 추가하고, iOS는 AdMob Adapter만 추가합니다. (iOS의 MobWith SDK는 1단계에서 설치합니다.)

<!-- tabs:start -->

#### **Android**

app 모듈의 `build.gradle(.kts)` 파일 `dependencies` 블록에 추가합니다.

```kotlin
// AdMob Mediation Adapter
implementation("io.github.mobon:MobwithAdMobMediationAdapter:1.0.0-alpha2")

// AdMob SDK
implementation("com.google.android.gms:play-services-ads:24.2.0")
implementation("com.google.android.gms:play-services-ads-identifier:17.0.0")

// MobWith SDK
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

# AdMob Adapter SDK
pod 'MobWithAdMobMediationAdapter'
```

?> CocoaPods 소스 지정은 MobWith SDK 설치 과정에서 이미 설정했다면 생략해도 됩니다.

<!-- tabs:end -->

## 3. SDK 설치 확인 <!-- {docsify-ignore} -->

앱에서 호출하고 있는 AdMob SDK 초기화 코드의 완료 콜백에 아래와 같이 Adapter 상태를 출력하는 로그를 추가하면, SDK가 정상적으로 설치되었는지 확인할 수 있습니다.

!> 설치 확인 전에 AdMob 관리자 콘솔의 미디에이션 설정이 완료되어 있어야 합니다. 설정 방법은 [Ad Configuration](/CustomAdapter/AdMob/loadAd.md)을 참고 바랍니다.

<!-- tabs:start -->

#### **Android**

```java
MobileAds.initialize(context, new OnInitializationCompleteListener() {
    @Override
    public void onInitializationComplete(@NonNull InitializationStatus initializationStatus) {
        Log.d("Admob", "AdMob SDK initialized");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            initializationStatus.getAdapterStatusMap().forEach((s, adapterStatus) -> {
                String log = "Adapter: " + s +
                        ", State: " + adapterStatus.getInitializationState() +
                        ", Latency: " + adapterStatus.getLatency() +
                        ", Description: " + adapterStatus.getDescription();
                Log.d("Admob", log);
            });
        }
    }
});
```

Logcat에서 `Admob` 태그로 로그를 확인합니다. `com.mobwith.admopmediation.AdmobMediationAdapter`의 State가 **READY**로 표시되면 정상적으로 설치된 것입니다.

![Android Adapter 설치 확인](./img/admob_3rd_init_android.png)

#### **iOS**

```swift
MobileAds.shared.start { [weak self] initializationStatus in
    print("AdMob SDK initialized")

    for (adapterName, status) in initializationStatus.adapterStatusesByClassName {
        print("Adapter: \(adapterName), Description: \(status.description), Latency: \(status.latency)")
    }
}
```

Xcode 콘솔에서 로그를 확인합니다. `MobwithAdMobMediationAdapter`의 state가 **Ready**로 표시되면 정상적으로 설치된 것입니다.

![iOS Adapter 설치 확인](./img/admob_3rd_init_ios.png)

<!-- tabs:end -->

?> Adapter가 목록에 보이지 않거나 준비 상태가 아니라면, 1~2단계의 설치 내용과 AdMob 관리자 콘솔의 미디에이션 설정을 다시 확인해 주세요.

## 참고 사항 <!-- {docsify-ignore} -->

- 향후 SDK 정식 배포 이후에는 SDK 적용 방법이 변경될 수 있습니다.
- 배포 방식은 Android는 Maven, iOS는 CocoaPods(Custom Repo 사용) 또는 SPM(Swift Package Manager)으로 예정되어 있습니다.

---

**다음 단계** : [Ad Configuration](/CustomAdapter/AdMob/loadAd.md)에서 AdMob 관리자 콘솔의 미디에이션을 설정합니다.
