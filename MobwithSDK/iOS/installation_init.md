## 프레임워크 Import
---
SDK를 사용하기전 아래와 같이 프레임워크를 Import합니다.  
AdFitSDK의 경우 비즈보드 광고를 사용하는 경우 여백 등 AdFit 전용 설정이 필요한 경우에만 추가하셔도 됩니다.

```swift
import MobWithADSDKFramework		// MobWithAD SDK 추가
import AdFitSDK                     // AdFitSDK 추가 (비즈보드를 사용하는 경우, 여백 설정을 위해 필요합니다)
```


## SDK 초기화
---
SDK 사용전 아래와 같이 한차례 초기화가 필요합니다.  
미디에이션하는 SDK의 키 값들의 경우 사용하지 않는 SDK가 있다면 반드시 적용하실 필요는 없습니다.   

```swift
MobWithADSDK.standard.initSDK()                                           // 쿠팡 SDK를 사용하지 않는 경우
MobWithADSDK.standard.initSDK(coupangSubId: "{전달받은 쿠팡 Sub ID}")        // 쿠팡 SDK를 사용하는 경우

MobWithADSDK.standard.setUnityGameId(gameId: "{전달받은 Unity Game ID}")    // 유니티 SDK를 사용하는 경우에만 설정
MobWithADSDK.standard.setLevelPlaySDKAppKey("{전달받은 LevelPlay AppKey}")  // LevelPlay SDK를 사용하는 경우에만 설정
MobWithADSDK.standard.setPangleAppId(appId: "{전달받은 Pangle App ID}")     // Pangle SDK를 사용하는 경우에만 설정
MobWithADSDK.standard.setDTExchangeAppID(appId: "{전달받은 DT Exchange App ID}")    // DT Exchange SDK를 사용하는 경우에만 설정
MobWithADSDK.standard.setInMobiAccountId(accountId: "{전달받은 InMobi Account ID}") // InMobi SDK를 사용하는 경우에만 설정
```
* 가급적 앱 실행 초기에 초기화 하는 것을 권장드립니다.  
* initSDK() 만 필수로 적용해 주시면 됩니다.
* 미디에이션 하기로 결정한 광고라도 위에서 키값을 적용하지 않은 경우 광고가 표시되지 않을 수 있습니다.
* ADOP BidMad SDK를 사용하시는 경우 앱의 info.plist에 AppDomain과 AppKey를 설정해야 합니다.  
  자세한 사항은 [[여기](https://github.com/bidmad/Bidmad-iOS?tab=readme-ov-file#bidmadsdk-interface-guide)] 를 참고하시기 바랍니다.