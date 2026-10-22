# SDK Installation <!-- {docsify-ignore} -->

MobWith SDK를 앱 프로젝트에 설치하는 방법을 안내합니다.<br>
SPM, CocoaPods, 수동 설치 중 한 가지 방식을 선택하여 설치합니다.

| 설치 방식 | 기본 프레임워크 | 미디에이션 Adapter |
|---|---|---|
| SPM | 지원 | 미지원 (수동 설치로 추가) |
| CocoaPods | 지원 | 지원 |
| 수동 설치 | 지원 | 지원 |

## SPM을 이용하여 설치 <!-- {docsify-ignore} -->

Swift Package Manager(SPM)는 현재 기본 프레임워크의 설치만 지원합니다.

?> SPM으로 SDK를 설치한 경우, 미디에이션을 위한 각 Adapter는 아래 [수동 설치](/iOS/installation_base?id=수동-설치)의 Adapter 프레임워크 설치를 참고하여 수동으로 설치해 주세요.

Package 추가에 사용할 Git 주소는 아래와 같습니다.

```text
https://github.com/mobon/MobWithAdSDK_SPM
```

#### <span class="step-label">STEP 1</span>패키지 추가

프로젝트 설정의 Packages에서 위 Git 주소를 입력하여 Package를 추가합니다.

![SPM 패키지 추가 화면](../../img/spm_add_package.png)

#### <span class="step-label">STEP 2</span>타깃에 프레임워크 포함 확인

Targets > Frameworks, Libraries, and Embedded Content에 MobWithADSDK 프레임워크가 포함되었는지 확인합니다.<br>
자동으로 포함되지 않았다면 **+** 버튼을 눌러 프레임워크를 추가합니다.

![타깃에 프레임워크가 포함된 화면](../../img/spm_add_to_target.png)

## CocoaPods를 이용하여 설치 <!-- {docsify-ignore} -->

!> 1.3.0 버전부터 CocoaPods 및 미디에이션을 위한 SDK 적용 방법이 변경되었습니다.<br>
특히 pod 이름이 기존 `MobWithAD`에서 **`MobWithAdSDK`로 변경**되었으니 주의 바랍니다.

#### <span class="step-label">STEP 1</span>MobWithAdSDK 설치

프로젝트의 `Podfile`에 `MobWithAdSDK`를 추가한 뒤 `pod install`을 실행합니다.<br>
아래는 1.3.34 버전을 지정해서 SDK를 설치하는 예시입니다.

```ruby
# CocoaPods 소스 지정 (순서에 따라 정상적으로 가져오지 못할 수 있으니 주의 바랍니다)

# 기본 Repo
source 'https://cdn.cocoapods.org/'

# MobWithAdSDK Repo
source 'https://github.com/mobon/MobwithAdSpecs.git'

# MobWithAdSDK 추가
pod 'MobWithAdSDK', '1.3.34'
```

#### <span class="step-label">STEP 2</span>미디에이션을 위한 Adapter SDK 추가

사용할 미디에이션 Adapter를 `Podfile`에 추가합니다. MobWithAdSDK와 같은 source를 지정해야 합니다.

```ruby
# AdFit Adapter
pod 'MobWithAdFitAdapter', '3.21.24.1.3.2'

# AdMob Adapter
pod 'MobWithAdMobAdapter', '12.14.0.1.3.21'
# AdMob SDK 12.6.X 버전을 사용하는 경우 아래를 적용하시면 됩니다.
# pod 'MobWithAdMobAdapter', '12.6.0.1.3.10'

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
pod 'MobWithBidMadAdapter', '6.13.6.1.3.21'
pod 'BidmadAdmixerAdapter', '2.0.2.12.2'

pod 'BidmadSDK/core', '= 6.13.6'             # 빌드 오류 대응

# AdPopcorn Adapter (for NAM)
pod 'MobWithAdPopcornAdapter', '3.3.2.1.3.26'
```

##### Adapter 버전 규칙

Adapter의 버전은 아래 규칙을 따릅니다.

```text
[미디에이션 대상 SDK의 버전].[MobWith SDK의 버전]
```

MobWithAdFitAdapter를 예로 들면 아래와 같습니다.

```ruby
# AdFit SDK 3.21.15 버전과 MobWith SDK 1.3.1 버전에 최적화되어 있음을 뜻합니다.
pod 'MobWithAdFitAdapter', '3.21.15.1.3.1'
```

각 Adapter에는 지원하는 SDK 버전의 의존성(Dependency)이 적용되어 있어, Adapter를 설치하면 해당 버전의 SDK가 자동으로 설치됩니다.<br>
다른 버전의 SDK를 이미 사용 중이거나 다른 광고 SDK를 통해 같은 SDK를 사용 중이라면, pod 설치 시 충돌이 발생하거나 다른 버전의 SDK가 설치될 수 있으며 SDK 버전에 따라 앱 실행 시 오류가 발생할 수 있습니다.<br>
따라서 위 규칙에 따라 사용 중인 SDK 버전과 Adapter 버전을 일치시켜 사용하는 것을 권장합니다.

?> 현재 지원하지 않는 버전의 미디에이션 SDK 지원이 필요한 경우 별도로 문의 바랍니다.

##### 미디에이션 SDK별 추가 설정

아래 [수동 설치](/iOS/installation_base?id=수동-설치)의 SDK별 가이드 문서를 참고하여 추가 설정 항목을 반영해 주셔야 합니다.

##### BidMad 사용 시 빌드 오류 대응

BidMad의 미디에이션용 Adapter를 추가하면, MobWithBidMadAdapter에서 의존성으로 추가해 둔 BidMad SDK와 다른 버전이 설치될 수 있습니다.<br>
이를 방지하기 위해 아래를 참고하여 특정 버전으로 고정하거나, 가급적 최신 버전으로 맞추시기 바랍니다.<br>
BidMad의 최신 버전을 지원하는 MobWithBidMadAdapter가 확인되지 않는 경우 문의 바랍니다.

```ruby
...

pod 'MobWithBidMadAdapter', '6.13.6.1.3.21'
pod 'BidmadAdmixerAdapter', '2.0.2.12.2'
...

# pod에서 BidMad 관련 설정 마지막 부분에 추가, 미디에이션 대상 SDK의 버전과 동일하게 맞추는 것을 추천
pod 'BidmadSDK/core', '= 6.13.6'
```

?> 위 내용을 추가하기 전에 pod를 설치했다면, pod 관련 내용을 초기화한 뒤 다시 설치해야 정상적으로 반영됩니다.<br>
(Pods 폴더 삭제, Podfile.lock 제거, DerivedData 폴더 내용 삭제 등)

## 수동 설치 <!-- {docsify-ignore} -->

SDK를 수동으로 설치하는 경우 아래 항목을 모두 적용해 주셔야 합니다.

!> 수동 설치 시 반드시 [Other Linker 설정](/iOS/installation_other?id=other-linker-설정)을 참고하여 **Other Linker Flags 값을 수정**해 주셔야 합니다.

#### <span class="step-label">STEP 1</span>기본 프레임워크 설치

[MobWithAdSDK_iOS](https://github.com/mobon/MobWithAdSDK_iOS)에서 `MobWithADSDKFramework.xcframework`를 다운로드합니다.<br>
다운로드한 Framework를 앱 프로젝트의 General > Embedded Binaries 항목으로 끌어다 놓습니다.

#### <span class="step-label">STEP 2</span>Adapter 프레임워크 설치

아래 Adapter 다운로드 링크에서 필요한 프레임워크를 다운로드한 뒤, SDK 설치 가이드를 참고하여 각 Adapter의 메인 SDK를 설치합니다.<br>
버전은 다운로드 페이지의 브랜치 선택 창에서 Tags 탭을 참고하시기 바랍니다.

| Adapter | Adapter 다운로드 | SDK 설치 가이드 |
|---|---|---|
| LevelPlay | [MobWithLevelPlayAdapter_iOS](https://github.com/mobon/MobWithLevelPlayAdapter_iOS) | [LevelPlay SDK](https://docs.unity.com/en-us/grow/levelplay/sdk/ios) |
| AdFit | [MobWithAdFitAdapter_iOS](https://github.com/mobon/MobWithAdFitAdapter_iOS) | [AdFit SDK](https://adfit.github.io/adfit-ios-sdk/documentation/adfitsdk/) |
| Cauly | [MobWithCaulyAdapter_iOS](https://github.com/mobon/MobWithCaulyAdapter_iOS) | [Cauly SDK](https://cauly.gitbook.io/cauly/ios/import-sdk) |
| AdMob | [MobWithAdMobAdapter_iOS](https://github.com/mobon/MobWithAdMobAdapter_iOS) | [AdMob SDK](https://developers.google.com/admob/ios/quick-start?hl=ko) |
| ADOP BidMad | [MobWithBidMadAdapter_iOS](https://github.com/mobon/MobWithBidMadAdapter_iOS) | [BidMad SDK](https://github.com/bidmad/Bidmad-iOS?tab=readme-ov-file#bidmadsdk-installation-guide) |
| DT Exchange | [MobWithDTExchangeAdapter_iOS](https://github.com/mobon/MobWithDTExchangeAdapter_iOS) | [DT Exchange SDK](https://docs.digitalturbine.com/dt-exchange/publishers/sdk-configuration/integrating-the-ios-sdk) |
| Pangle | [MobWithPangleAdapter_iOS](https://github.com/mobon/MobWithPangleAdapter_iOS) | [Pangle SDK](https://www.pangleglobal.com/integration/integrate-pangle-sdk-for-ios) |
| InMobi | [MobWithInMobiAdapter_iOS](https://github.com/mobon/MobWithInMobiAdapter_iOS) | [InMobi SDK](https://support.inmobi.com/monetize/sdk-documentation/ios-guidelines/overview-ios-guidelines#option-1--integration-via-cocoapods) |

?> AdFit, Cauly는 Adapter 다운로드 페이지에서 각 버전에 맞는 SDK도 함께 다운로드할 수 있습니다.

---

**다음 단계** : [Project Configuration](/iOS/installation_other.md)에서 프로젝트 설정을 진행합니다.
