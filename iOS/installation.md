## Cocoapods 사용하여 설치
---
프로젝트의 Podfile에 'MobWithAD' 를 추가합니다.
```swift
// 기본
pod 'MobWithAD', :git => 'https://github.com/mobon/MobWithAD_iOS.git'

// 특정 버전 지정시
pod 'MobWithAD', :git => 'https://github.com/mobon/MobWithAD_iOS.git', :tag => '1.2.21'
```

만약 ':git', ':tag' 등을 사용 할 수 없는 경우 아래를 참고하시기 바랍니다.  
<b>1.2.20</b> 버전부터 지원하며, 잘못 설정하신 경우 1.2.8 버전이 설치될 수 있으니 설치된 버전 확인에 주의 바랍니다.
```swift
// PodFile 상단에 아래와 같이 source를 지정 합니다. 
// 순서대로 우선순위가 할당된니 아래 지정된 순서를 유지해야 합니다.
source 'https://github.com/mobon/mobonPods.git'
source 'https://github.com/CocoaPods/Specs.git'

// 기본
pod 'MobWithAD'

// 특정 버전 지정시
pod 'MobWithAD', '1.2.21'

// source 지정 없이 사용이 필요한 경우
// 단, 최신 버전 SDK 업데이트 및 특정 버전의 경우 지원되지 않을 수 있습니다.
pod 'MobWithADSDK'
```


<br><br>

## 수동 설치
---
### 기본 프레임워크 추가
- MobWithADSDKFramework.xcframework와 CouOffsiteAds.xcframework를 다운로드 받습니다.  
- 다운로드 받은 두 Framwork를 앱 프로젝트의 General > Embeded Binaries 항목으로 끌어서 놓습니다.

### AdFitSDK 추가
- 본 SDK에서는 AdFitSDK의 비즈보드 템플릿을 활용하도록 되어 있습니다. 따라서 AdFitSDK의 추가가 필요합니다. 
자세한 사항은 [여기](https://github.com/adfit/adfit-ios-sdk/blob/master/Guide/Install%20SDK.md)를 눌러 AdFitSDK의 설치 가이드를 따르시면 됩니다.
- AdFitSDK 버전은 3.14.5에 최적화 되어 있습니다.

### UnitySDK 추가
- 본 프레임워크는 UnitySDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://docs.unity.com/ads/ko-kr/manual/InstallingTheUnitySDK)를 눌러 UnitySDK의 설치 가이드를 따르시면 됩니다.
- UnitySDK 버전은 4.14.1에 최적화 되어 있습니다.

### LevelPlaySDK 추가
- 본 프레임워크는 LevelPlaySDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://developers.is.com/ironsource-mobile/ios/ios-sdk/#step-1)를 눌러 LevelPlaySDK의 설치 가이드를 따르시면 됩니다.
- LevelPlaySDK 버전은 8.7.0.0에 최적화 되어 있습니다.

### PangleSDK 추가
- 본 프레임워크는 PangleSDK를 활용하여 광고를 표시하기도 합니다. 
자세한 사항은 [여기](https://www.pangleglobal.com/kr/integration/integrate-pangle-sdk-for-ios)를 눌러 UnitySDK의 설치 가이드를 따르시면 됩니다.
- PangleSDK 버전은 7.1.1.1에 최적화 되어 있습니다.
