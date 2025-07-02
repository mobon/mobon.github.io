## ATS(App Transport Security) 처리
---
iOS 9부터 ATS(App Transport Security) 기능이 기본적으로 활성화 되어 있으며, 암호화된 HTTPS 방식의 통신만 허용됩니다.  
MobWithAD SDK는 ATS 활성화 상태에서도 정상적으로 동작하도록 구현되어 있으나, 광고를 통해 노출되는 광고주 페이지는 HTTPS 방식을 지원하지 않을 수도 있습니다.  
따라서 아래의 사항을 앱 프로젝트의 Info.plist 파일에 적용하여 주시기 바랍니다.  

```swift
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```


## Always Embed Swift Standard Libraries 값을 Yes로 설정
---
앱 Target의 Build Settings 항목에서 Always Embed Swift Standard Libraries값을 Yes로 설정해 줍니다.  


## ATT(App Tracking Transparency) framework 적용
---
iOS14 타겟팅된 앱은 IDFA 식별자를 얻기 위해서는 ATT Framework를 반드시 적용해야 합니다.

### Info.plist 업데이트
앱이 사용자 또는 장치를 추적하기 위해 데이터 권한을 요청하는 이유를 사용자에게 알리는 메세지를 추가해야 합니다.  
```swift
<key> NSUserTrackingUsageDescription </key>
<string> 맞춤형 광고 제공을 위해 사용자의 데이터가 사용됩니다. </string>
```

### ATTrackingManager 코드 적용
1.2.7버전 부터는 IDFA값의 사용을 위한 권한 요청을 직접 진행해 주셔야 합니다. 해당 부분은 아래 코드를 참조 하시면 됩니다. 
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


## Other Linker 설정
---
간혹 정상적으로 설정을 하더라도 프레임워크에 대한 설정이 제대로 반영되지 않는 오류가 발생할 수 있습니다.<br>
이러한 경우 BuildSetting -> Other Link에 플래그를 추가해 주어야 합니다.  
대표적으로 추가해야 할 값은 아래와 같습니다.

```swift
  $(inherited)
  -ObjC
  -all_Load
```


## Objective-C 프로젝트
---
MobWithAD SDK는 Swift 기반으로 개발되었습니다. Objective-C 기반의 프로젝트에서 MobWithAD SDK를 사용하기 위해서는 Swift Standard 라이브러리들을 Embed 시켜주어야 합니다.  
앱 프로젝트의 빌드 세팅에서 Always Embed Swift Standard Libraries 항목을 Yes로 설정해주세요.  