## Cocoapods 사용하여 설치
---
프로젝트의 Podfile에 'MobWithAD' 를 추가합니다.
```swift
// 기본
pod 'MobWithAD', :git => 'https://github.com/mobon/MobWithAD_iOS.git'

// 특정 버전 지정시
pod 'MobWithAD', :git => 'https://github.com/mobon/MobWithAD_iOS.git', :tag => '1.2.40'
```

만약 ':git', ':tag' 등을 사용 할 수 없는 경우 아래를 참고하시기 바랍니다.  
<b>1.2.20</b> 버전부터 지원하며, 잘못 설정하신 경우 1.2.8 버전이 설치될 수 있으니 설치된 버전 확인에 주의 바랍니다.
```swift
// PodFile 상단에 아래와 같이 source를 지정 합니다. 
// 순서대로 우선 순위가 할당되니 아래 지정된 순서를 유지해야 합니다.
source 'https://github.com/mobon/mobonPods.git'
source 'https://github.com/CocoaPods/Specs.git'

// 기본
pod 'MobWithAD'

// 특정 버전 지정시
pod 'MobWithAD', '1.2.40'

// source 지정 없이 사용이 필요한 경우
// 단, 최신 버전 SDK 업데이트 및 특정 버전의 경우 지원되지 않을 수 있습니다.
// 해당 방식으로 업데이트되지 않은 최신 버전의 사용이 필요한 경우 별도로 문의 바랍니다.
pod 'MobWithADSDK'
```

* 1.2.35 버전 부터는 Cauly SDK를 사용하고 있으며, 사용중인 버전은 3.1.22 입니다.  
 만약, Cauly SDK를 프로젝트에 이미 포함하고 있다면 충돌할 가능성이 있으니 참고 바랍니다.

* 1.2.40 버전 부터는 AdFit SDK를 내부에 직접 포함하고 있으며 3.21.15 버전을 사용중입니다.
  만약, 호환되지 않는 다른 버전의 사용이 필요한 경우 별도로 문의 바랍니다.

 ### AdMob SDK 미디에이션 사용시
 1.2.36 버전 부터는 AdMob SDK 미디에이션용 어댑터를 자동으로 추가하지 않습니다.
 [[여기](https://developers.google.com/admob/ios/choose-networks?hl=ko&_gl=1*1mnsgrx*_up*MQ..*_ga*MTMwNjAwMzAyLjE3NjkxMzE3MTQ.*_ga_SM8HXJ53K2*czE3NjkxMzE3MTQkbzEkZzAkdDE3NjkxMzE3MTQkajYwJGwwJGgw)]에서 사용하기로 협의된 외부 광고 SDK에 대한 어댑터 적용 방법을 확인하여 아래와 같이 pod에 추가해 주셔야 합니다.
```swift
// DTExchange, InMobi, IronSource LevelPlay, Moloco, Pangle를 사용하 경우에 대한 예시 입니다.
pod 'GoogleMobileAdsMediationFyber'
pod 'GoogleMobileAdsMediationInMobi'
pod 'GoogleMobileAdsMediationIronSource'
pod 'GoogleMobileAdsMediationMoloco'
pod 'GoogleMobileAdsMediationPangle'
```


<br><br>

## 수동 설치
---
SDK 수동 설치시 아래 항목들을 모두 적용해 주셔야 합니다. 

### 기본 프레임워크
- MobWithADSDKFramework.xcframework, CouOffsiteAds.xcframework, CaulySDK.xcframework, AdFitSDK.xcframework를 다운로드 받습니다.  
- 다운로드 받은 두 Framwork를 앱 프로젝트의 General > Embeded Binaries 항목으로 끌어서 놓습니다.

### UnitySDK
- 본 프레임워크는 UnitySDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://docs.unity.com/ads/ko-kr/manual/InstallingTheUnitySDK)를 눌러 UnitySDK의 설치 가이드를 따르시면 됩니다.
- UnitySDK 버전은 4.14.1에 최적화 되어 있습니다.

### LevelPlaySDK
- 본 프레임워크는 LevelPlaySDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://developers.is.com/ironsource-mobile/ios/ios-sdk/#step-1)를 눌러 LevelPlaySDK의 설치 가이드를 따르시면 됩니다.
- LevelPlaySDK 버전은 8.7.0.0에 최적화 되어 있습니다.

### PangleSDK
- 본 프레임워크는 PangleSDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://www.pangleglobal.com/kr/integration/integrate-pangle-sdk-for-ios)를 눌러 PangleSDK 설치 가이드를 따르시면 됩니다.
- PangleSDK 버전은 7.1.1.1에 최적화 되어 있습니다.
  
### DT Exchange SDK
- 본 프레임워크는 DT Exchange SDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://developer.digitalturbine.com/hc/en-us/articles/360010915618-Integrating-the-iOS-SDK)를 눌러 DT Exchange SDK의 설치 가이드를 따르시면 됩니다.
- DT Exchange SDK 버전은 8.3.8에 최적화 되어 있습니다.

### ADOP BidMad SDK
- 본 프레임워크는 ADOP BidMad SDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://github.com/bidmad/Bidmad-iOS)를 눌러 ADOP BidMad SDK의 설치 가이드를 따르시면 됩니다.
- ADOP BidMad SDK 버전은 6.13.3에 최적화 되어 있습니다.

### InMobi SDK
- 본 프레임워크는 InMobi SDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://support.inmobi.com/monetize/getting-started)를 눌러 InMobi SDK의 설치 가이드를 따르시면 됩니다.
- InMobi SDK 버전은 10.8.6에 최적화 되어 있습니다.


### Google AdMob SDK
- 본 프레임워크는 AdMob SDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://developers.google.com/admob/ios/quick-start?hl=ko)를 눌러 AdMob SDK의 설치 가이드를 따르시면 됩니다.
- InMobi SDK 버전은 12.6.0에 최적화 되어 있습니다.
- AdMob SDK 사용시 설정해야 하는 Application ID는 전달 받은 값을 사용하면 됩니다.




### Other Linker 설정
수동 설치시 반드시 [여기(Other Linker 설정)](/iOS/installation_other?id=other-linker-설정)을 참고하여 Other Linker 값을 수정해 주셔야 합니다.
