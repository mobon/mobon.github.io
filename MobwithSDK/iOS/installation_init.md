## 프레임워크 Import
---
SDK를 사용하기전 아래와 같이 프레임워크를 Import합니다.  
AdFitSDK의 경우 비즈보드 광고를 사용하는 경우 여백 등 AdFit 전용 설정이 필요한 경우에만 추가하셔도 됩니다.

```swift
// MobWithAD SDK 추가
import MobWithADSDKFramework		

// AdFit SDK를 통해 비즈보드 사용시 여백 설정을 하시는 경우에만 적용하시면 됩니다.
import AdFitSDK
```


## SDK 초기화
---
SDK 사용전 아래와 같이 초기화가 필요합니다.  

### Mobwith SDK 초기화
```swift
MobWithADSDK.standard.initSDK()
```

### 미디에이션 SDK 초기화
미디에이션하는 SDK의 경우 코드 상에서 직접 초기화 하는 경우와 info.plist에 설정을 해주셔야 하는 경우로 나뉩니다.
미디에이션 SDK의 경우 사용하지 않는 SDK가 있다면 해당 SDK의 초기화 과정은 생략하셔도 됩니다.

#### 코드상에서 초기화하는 경우
아래를 참고하셔서 필요한 항목만 적용하시면 됩니다.
```swift
// LevelPlay Adapter SDK 초기화
MobWithADSDK.standard.setLevelPlaySDKAppKey("{전달받은 LevelPlay AppKey}")  

// Pangle Adapter SDK 초기화
MobWithADSDK.standard.setPangleAppId(appId: "{전달받은 Pangle App ID}")     

// DT Exchange Adapter SDK 초기화
MobWithADSDK.standard.setDTExchangeAppID(appId: "{전달받은 DT Exchange App ID}")    

// InMobi Adapter SDK 초기화
MobWithADSDK.standard.setInMobiAccountId(accountId: "{전달받은 InMobi Account ID}") 

// 앱스토어 등록시 발급된 App ID 입력, Cauly Adapter SDK 사용시 필수로 적용하셔야 합니다.
MobWithADSDK.standard.appId = "{App Store App ID}"    
```


#### info.plist에 초기화 관련 정보 입력이 필요한 경우
* ADOP BidMad SDK를 사용하시는 경우 앱의 info.plist에 AppDomain과 AppKey등을 설정해 주셔야 합니다.  
  자세한 사항은 [[여기](https://github.com/bidmad/Bidmad-iOS?tab=readme-ov-file#bidmadsdk-interface-guide)] 를 참고하시기 바랍니다.

* Google AdMob SDK를 사용하시는 경우 앱의 info.plist에 Application ID를 넣어 주셔야 합니다.  
  자세한 사항은 [[여기](https://developers.google.com/admob/ios/quick-start?hl=ko#update_your_infoplist)]를 참고하시기 바랍니다.  
  만약, ADOP BidMad SDK를 같이 사용하는 경우, 위 ADOP BidMad SDK의 AdMob Application ID를 설정하는 부분을 참고하셔서 해당 설정만 해주셔도 됩니다.
* ADOP BidMad 또는 AdMob 미디에이션 사용시, Application ID를 설정하지 않거나 잘못된 값이 들어간 경우 앱이 실행되지 않을 수 있으니 주의 바랍니다.

#### 기타
* 가급적 앱 실행 초기에 초기화 하는 것을 권장드립니다.  
* AppStore App Id의 경우 https://apps.apple.com/kr/app/id{App Store ID} 와 같은 url을 참고하시거나,
  [AppstoreConnect](https://appstoreconnect.apple.com/)에서 해당 앱의 앱정보 -> 일반정보 -> Apple ID 값을 넣어 주시면 됩니다.

