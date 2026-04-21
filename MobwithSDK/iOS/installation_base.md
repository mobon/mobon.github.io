## Cocoapods 사용하여 설치
---
1.3.0 버전 부터 cocoapod 및 미이에이션을 위한 SDK 적용 방법이 변경되었으니 참고 부탁드립니다.  
특히 pod 이름이 기존 'MobWithAD'에서 'MobWithAdSDK'로 변경되었으니 주의 바랍니다.


### 1. MobWithAdSDK 설치
프로젝트의 Podfile에 'MobWithAdSDK' 를 추가합니다.  
아래는 1.3.1 버전을 지정해서 SDK를 설치하는 예시 입니다.
```
# Cocoapod 소스 지정.  순서에 따라 제대로 가져오지 못 할 수 있으니 주의 바랍니다.

# 기본 Repo.
source 'https://cdn.cocoapods.org/'                   

# MobWithAdSDK의 Repo.   
source 'https://github.com/mobon/MobwithAdSpecs.git'  

# MobWithAdSDK 추가
pod 'MobWithAdSDK', '1.3.2'

```

### 2. 미디에이션을 위한 Adapter SDK 추가

MobWithAdSDK와 같은 source를 지정해 주셔야 합니다.  
미디에션을 위한 각 Adapter는 아래를 참고 바랍니다.

```
# AdFit Adapter
pod 'MobWithAdFitAdapter', '3.21.15.1.3.1'

# Admob Adapter
pod 'MobWithAdMobAdapter', '12.14.0.1.3.1'

# Cauly Adapter
pod 'MobWithCaulyAdapter', '3.1.22.1.3.1'

# DT Exchange Adapter
pod 'MobWithDTExchangeAdapter', '8.4.2.1.3.1'

# InMobi Adapter
pod 'MobWithInMobiAdapter', '11.1.0.1.3.1'

# LevelPlay Adapter
pod 'MobWithLevelPlayAdapter', '9.2.0.0.1.3.1'

# Pangle Adapter
pod 'MobWithPangleAdapter', '7.8.0.4.1.3.1'

# BidMad의 경우 아래와 같이 BidMad의 Adapter를 무조건 하나 이상 적용해 주셔야 합니다.  
# BidMad의 Adapter에 대해서는 수동 설치의 각 SDK 가이드 문서를 참고 바랍니다.
pod 'MobWithBidMadAdapter', '6.13.3.1.3.1'
pod 'BidmadAdmixerAdapter', '2.0.2.12.2'      

```

### Adapter의 버전 규칙
Adapter의 버전은 아래와 같은 규칙을 따릅니다. 
```
[미디에이션 대상 SDK의 버전].[Mobwith SDK의 버전]
```
MobWithAdFitAdapter의 버전을 예를 들면 아래와 같습니다.
```
# AdFit SDK의 3.21.15 버전과, Mobwith SDK의 1.3.1 버전에 최적화 되어 있음을 뜻합니다.
pod 'MobWithAdFitAdapter', '3.21.15.1.3.1'
```
각 Adapter들은 각각 지원하는 버전에 대해 Dependancy가 적용되어, 각 Adapter 설치시 자동으로 해당 버전의 SDK가 설치됩니다.  
만약 다른 버전의 SDK를 이미 사용중 또는 다른 광고 SDK를 통해 동일한 SDK를 사용중이라면 pod 설치시 충돌이 발생하거나 다른 버전의 SDK가 설치되며, 이때 SDK 버전에 따라 앱 실행시 오류가 발생 할 수 있으니 주의가 필요합니다.  
따라서 가급적 사용중인 버전을 일치시켜주는 것이 좋으며, 위 규칙에 따라 Adapter 버전을 일치시켜서 사용하시는 것을 권장 드립니다.  
만약 미디에이션 SDK에 대해 현재 지원하고 있지 않은 다른 버전의 지원이 필요한 경우 별도로 문의 바랍니다.

### 미디에이션 SDK 별 추가 설정
아래 수동 설치의 각 SDK별 가이드 문서를 참고하여 추가 설정 항목을 반영해 주셔야 합니다.


<br><br>

## 수동 설치
---
SDK 수동 설치시 아래 항목들을 모두 적용해 주셔야 합니다. 

### 기본 프레임워크
- [[여기](https://github.com/mobon/MobWithAdSDK_iOS)]에서 MobWithADSDKFramework.xcframework를 다운로드 받습니다.
- 다운로드 받은 Framwork를 앱 프로젝트의 General > Embeded Binaries 항목으로 끌어서 놓습니다.

### Adapter 프레임워크 설치
각 Adapter별 아래 다운로드 링크에 접속하여 필요한 프레임워크를 다운 받습니다.  
버전의 선택은 브랜치 선택 창에서 Tags탭을 참고 하시기 바랍니다.
참고 : AdFit, Cauly의 경우 각 버전에 맞는 SDK를 해당 링크를 통해 바로 다운받을 수 있으니 같이 다운로드 받으시면 됩니다. 
- LevelPlay Adapter : [[다운로드 링크](https://github.com/mobon/MobWithLevelPlayAdapter_iOS)]
- AdFit Adapter : [[다운로드 링크](https://github.com/mobon/MobWithAdFitAdapter_iOS)]
- Cauly Adapter : [[다운로드 링크](https://github.com/mobon/MobWithCaulyAdapter_iOS)]
- AdMob Adapter : [[다운로드 링크](https://github.com/mobon/MobWithAdMobAdapter_iOS)]
- Adop Bidmad Adapter : [[다운로드 링크](https://github.com/mobon/MobWithBidMadAdapter_iOS)]
- DTExchange Adapter : [[다운로드 링크](https://github.com/mobon/MobWithDTExchangeAdapter_iOS)]
- Pangle Adapter : [[다운로드 링크](https://github.com/mobon/MobWithPangleAdapter_iOS)]
- InMobi Adapter : [[다운로드 링크](https://github.com/mobon/MobWithInMobiAdapter_iOS)]

<br> 

다음으로 아래 SDK별 가이드 문서 링크를 참고하여 각 Adapter별 메인 프레임워크를 설치 합니다.  
- LevelPlay SDK : [[가이드 링크](https://docs.unity.com/en-us/grow/levelplay/sdk/ios)]
- AdFit SDK : [[가이드 링크](https://adfit.github.io/adfit-ios-sdk/documentation/adfitsdk/)]
- Cauly SDK : [[가이드 링크](https://cauly.gitbook.io/cauly/ios/import-sdk)]
- AdMob SDK : [[가이드 링크](https://developers.google.com/admob/ios/quick-start?hl=ko)]
- Adop Bidmad SDK : [[가이드 링크](https://github.com/bidmad/Bidmad-iOS?tab=readme-ov-file#bidmadsdk-installation-guide)]
- DTExchange SDK : [[가이드 링크](https://docs.digitalturbine.com/dt-exchange/publishers/sdk-configuration/integrating-the-ios-sdk)]
- Pangle SDK : [[가이드 링크](https://www.pangleglobal.com/integration/integrate-pangle-sdk-for-ios)]
- InMobi SDK : [[가이드 링크](https://support.inmobi.com/monetize/sdk-documentation/ios-guidelines/overview-ios-guidelines#option-1--integration-via-cocoapods)]


수동 설치시 반드시 [여기(Other Linker 설정)](/iOS/installation_other?id=other-linker-설정)을 참고하여 Other Linker 값을 수정해 주셔야 합니다.
