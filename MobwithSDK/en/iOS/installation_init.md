🌐 <a href="../ko/#/iOS/installation_init">한국어 가이드</a>

## Importing the Framework
---
Before using the SDK, import the framework as shown below.  
For the AdFit SDK, you only need to add it if you use Bizboard ads and require AdFit-specific settings such as margins.

```swift
// Add the MobWithAD SDK
import MobWithADSDKFramework		

// Apply only if you are configuring margins for Bizboard usage through the AdFit SDK.
import AdFitSDK
```


## SDK Initialization
---
Before using the SDK, initialization is required as shown below.  

### Initializing the MobWith SDK
```swift
MobWithADSDK.standard.initSDK()
```

### Initializing Mediation SDKs
Mediation SDKs are divided into those initialized directly in code and those that require settings in info.plist.
For mediation SDKs, you may skip the initialization process for any SDK you do not use.

#### When Initializing in Code
Refer to the following and apply only the items you need.
```swift
// Initialize the LevelPlay Adapter SDK
MobWithADSDK.standard.setLevelPlaySDKAppKey("{provided LevelPlay AppKey}")  

// Initialize the Pangle Adapter SDK
MobWithADSDK.standard.setPangleAppId(appId: "{provided Pangle App ID}")     

// Initialize the DT Exchange Adapter SDK
MobWithADSDK.standard.setDTExchangeAppID(appId: "{provided DT Exchange App ID}")    

// Initialize the InMobi Adapter SDK
MobWithADSDK.standard.setInMobiAccountId(accountId: "{provided InMobi Account ID}") 

// Enter the App ID issued when registering on the App Store. Required when using the Cauly Adapter SDK.
MobWithADSDK.standard.appId = "{App Store App ID}"    
```


#### When Initialization Info Must Be Entered in info.plist
* If you use the ADOP BidMad SDK, you must set the AppDomain, AppKey, etc. in the app's info.plist.  
  For details, refer to [[here](https://github.com/bidmad/Bidmad-iOS?tab=readme-ov-file#bidmadsdk-interface-guide)].

* If you use the Google AdMob SDK, you must enter the Application ID in the app's info.plist.  
  For details, refer to [[here](https://developers.google.com/admob/ios/quick-start?hl=ko#update_your_infoplist)].  
  If you are also using the ADOP BidMad SDK, refer to the part above about setting the AdMob Application ID within the ADOP BidMad SDK, and you only need to do that setting.
* When using ADOP BidMad or AdMob mediation, the app may fail to run if the Application ID is not set or an incorrect value is entered, so please be careful.

#### Other
* We recommend initializing as early as possible when the app starts.  
* For the AppStore App Id, refer to a URL such as https://apps.apple.com/kr/app/id{App Store ID}, or
  enter the Apple ID value found under App Info -> General Information -> Apple ID for the app in [AppstoreConnect](https://appstoreconnect.apple.com/).
