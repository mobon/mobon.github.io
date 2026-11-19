# Project Configuration <!-- {docsify-ignore} -->

SDK 설치 후 앱 프로젝트에 적용해야 하는 설정을 안내합니다.

## ATS(App Transport Security) 처리 <!-- {docsify-ignore} -->

iOS 9부터 ATS(App Transport Security) 기능이 기본으로 활성화되어 있으며, 암호화된 HTTPS 방식의 통신만 허용됩니다.<br>
MobWithAD SDK는 ATS 활성화 상태에서도 정상적으로 동작하도록 구현되어 있으나, 광고를 통해 노출되는 광고주 페이지는 HTTPS 방식을 지원하지 않을 수도 있습니다.<br>
따라서 아래 내용을 앱 프로젝트의 `Info.plist` 파일에 적용해 주시기 바랍니다.

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

?> 보안상의 이유로 반드시 적용할 필요는 없으나, 적용하지 않으면 일부 광고가 제대로 표시되지 않을 수 있습니다.

## Always Embed Swift Standard Libraries 설정 <!-- {docsify-ignore} -->

앱 Target의 Build Settings에서 Always Embed Swift Standard Libraries 값을 **Yes**로 설정합니다.

## ATT(App Tracking Transparency) framework 적용 <!-- {docsify-ignore} -->

iOS 14 이상을 타깃으로 하는 앱은 IDFA 식별자를 얻기 위해 ATT Framework를 반드시 적용해야 합니다.

#### <span class="step-label">STEP 1</span>Info.plist 업데이트

앱이 사용자 또는 기기를 추적하기 위해 데이터 권한을 요청하는 이유를 사용자에게 알리는 메시지를 `Info.plist`에 추가합니다.

```xml
<key>NSUserTrackingUsageDescription</key>
<string>맞춤형 광고 제공을 위해 사용자의 데이터가 사용됩니다.</string>
```

#### <span class="step-label">STEP 2</span>ATTrackingManager 코드 적용

SDK 1.2.7 이상에서는 IDFA 값 사용을 위한 권한 요청을 앱에서 직접 진행해 주셔야 합니다. 아래 코드를 참고하시면 됩니다.

```swift
if #available(iOS 14, *) {
    ATTrackingManager.requestTrackingAuthorization { (status) in
        if status == .authorized {
            mobWithAdView.loadAd()
        }
    }
}
else {
    mobWithAdView.loadAd()
}
```

## Other Linker 설정 <!-- {docsify-ignore} -->

SDK 설치 방식에 따라 앱 Target의 Build Settings > Other Linker Flags에 플래그를 추가해야 합니다.<br>
플래그가 없으면 빌드는 되더라도 프레임워크가 앱에 제대로 포함되지 않을 수 있습니다.

| 설치 방식 | 추가할 값 |
|---|---|
| SPM | **`-ObjC`** |
| CocoaPods | **`$(inherited)`** (나머지 플래그는 CocoaPods가 설정) |
| 수동 설치 | **`-ObjC`** |

Build Settings 탭에서 All을 선택하고 검색창에 `Other Linker Flags`를 입력하면 항목을 찾을 수 있습니다. 값을 더블클릭한 뒤 **+** 버튼을 눌러 한 줄씩 추가합니다.

```text
-ObjC
```

!> CocoaPods로 설치한 경우 Other Linker Flags에 **`$(inherited)`가 반드시 있어야** 합니다.<br>
`$(inherited)`는 상위 설정(Project 설정, xcconfig 등)의 값을 이어받는 값으로, CocoaPods는 이 값을 통해 필요한 플래그를 적용합니다. 이 값이 없으면 링크 오류가 발생할 수 있습니다.

?> SPM·수동 설치에서는 `$(inherited)`가 없어도 되지만, 이미 있다면 그대로 두시기 바랍니다.<br>
설정 후에도 링크 오류가 발생한다면 `$(inherited)`나 `-all_load`를 함께 추가해 보시기 바랍니다.

## Objective-C 프로젝트 <!-- {docsify-ignore} -->

MobWithAD SDK는 Swift 기반으로 개발되었습니다. Objective-C 기반 프로젝트에서 사용하려면 Swift Standard 라이브러리를 Embed해야 하므로, 위 [Always Embed Swift Standard Libraries 설정](/iOS/installation_other?id=always-embed-swift-standard-libraries-설정)을 반드시 적용해 주세요.

---

**다음 단계** : [SDK Initialization](/iOS/installation_init.md)에서 SDK를 초기화합니다.
