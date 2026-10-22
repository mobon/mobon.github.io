# SDK Initialization <!-- {docsify-ignore} -->

SDK를 사용하기 위한 프레임워크 Import와 초기화 방법을 안내합니다.<br>
MobWith SDK 초기화와 함께, 사용하는 미디에이션 SDK의 초기화도 진행해야 합니다.

## 1. 프레임워크 Import <!-- {docsify-ignore} -->

SDK를 사용하기 전에 아래와 같이 프레임워크를 Import합니다.<br>
AdFitSDK는 비즈보드 광고의 여백 설정 등 AdFit 전용 설정이 필요한 경우에만 추가하면 됩니다.

```swift
// MobWithAD SDK 추가
import MobWithADSDKFramework

// AdFit SDK를 통해 비즈보드 사용 시 여백 설정을 하는 경우에만 적용하시면 됩니다.
import AdFitSDK
```

## 2. MobWith SDK 초기화 <!-- {docsify-ignore} -->

SDK를 사용하기 전에 아래와 같이 초기화합니다.

```swift
MobWithADSDK.standard.initSDK()
```

?> 초기화는 가급적 앱 실행 초기에 진행하는 것을 권장합니다.

## 3. 미디에이션 SDK 초기화 <!-- {docsify-ignore} -->

미디에이션 SDK는 코드에서 직접 초기화하는 경우와 `Info.plist`에 설정해야 하는 경우로 나뉩니다.<br>
사용하지 않는 미디에이션 SDK의 초기화 과정은 생략해도 됩니다.

##### 코드에서 초기화하는 SDK

아래를 참고하여 필요한 항목만 적용합니다.

```swift
// LevelPlay Adapter SDK 초기화
MobWithADSDK.standard.setLevelPlaySDKAppKey("{전달받은 LevelPlay AppKey}")

// Pangle Adapter SDK 초기화
MobWithADSDK.standard.setPangleAppId(appId: "{전달받은 Pangle App ID}")

// DT Exchange Adapter SDK 초기화
MobWithADSDK.standard.setDTExchangeAppID(appId: "{전달받은 DT Exchange App ID}")

// InMobi Adapter SDK 초기화
MobWithADSDK.standard.setInMobiAccountId(accountId: "{전달받은 InMobi Account ID}")

// AdPopcorn Adapter SDK (for NAM) 초기화
MobWithADSDK.standard.setAdPopcornAppKey("{전달받은 AdPopcorn AppKey}")

// 앱스토어 등록 시 발급된 App ID 입력, Cauly Adapter SDK 사용 시 필수로 적용하셔야 합니다.
MobWithADSDK.standard.appId = "{App Store App ID}"
```

!> Cauly Adapter SDK를 사용하는 경우 **`appId`를 반드시 설정**해야 합니다.

App Store App ID는 `https://apps.apple.com/kr/app/id{App Store ID}`와 같은 앱 URL을 참고하거나, [App Store Connect](https://appstoreconnect.apple.com/)에서 해당 앱의 앱 정보 > 일반 정보 > Apple ID 값을 확인하여 입력합니다.

##### Info.plist 설정이 필요한 SDK

| SDK | 설정 항목 | 가이드 |
|---|---|---|
| ADOP BidMad | 앱의 `Info.plist`에 AppDomain, AppKey 등 설정 | [BidMad SDK Interface Guide](https://github.com/bidmad/Bidmad-iOS?tab=readme-ov-file#bidmadsdk-interface-guide) |
| Google AdMob | 앱의 `Info.plist`에 Application ID 설정 | [AdMob Info.plist 업데이트](https://developers.google.com/admob/ios/quick-start?hl=ko#update_your_infoplist) |

ADOP BidMad SDK를 함께 사용하는 경우, AdMob은 BidMad 가이드의 AdMob Application ID 설정 부분만 적용해도 됩니다.

!> ADOP BidMad 또는 AdMob 미디에이션 사용 시, Application ID를 설정하지 않거나 잘못된 값을 넣으면 **앱이 실행되지 않을 수 있으니** 주의 바랍니다.

---

**다음 단계** : [Ad formats](/iOS/usage.md)에서 광고 유형별 구현 방법을 확인합니다.
