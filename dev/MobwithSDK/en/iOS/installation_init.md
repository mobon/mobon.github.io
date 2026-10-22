# SDK Initialization <!-- {docsify-ignore} -->

This page describes how to import the framework and initialize the SDK.<br>
In addition to initializing the MobWith SDK, you must also initialize the mediation SDKs you use.

## 1. Import the Framework <!-- {docsify-ignore} -->

Before using the SDK, import the framework as shown below.<br>
For the AdFit SDK, you only need to add it if you require AdFit-specific settings such as Bizboard ad margins.

```swift
// Add the MobWithAD SDK
import MobWithADSDKFramework

// Apply only if you are configuring margins for Bizboard usage through the AdFit SDK.
import AdFitSDK
```

## 2. Initialize the MobWith SDK <!-- {docsify-ignore} -->

Before using the SDK, initialize it as shown below.

```swift
MobWithADSDK.standard.initSDK()
```

?> We recommend initializing as early as possible when the app starts.

## 3. Initialize Mediation SDKs <!-- {docsify-ignore} -->

Mediation SDKs are divided into those initialized directly in code and those that require settings in `Info.plist`.<br>
You may skip the initialization of any mediation SDK you do not use.

##### SDKs initialized in code

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

// Initialize the AdPopcorn Adapter SDK (for NAM)
MobWithADSDK.standard.setAdPopcornAppKey("{provided AdPopcorn AppKey}")

// Enter the App ID issued when registering on the App Store. Required when using the Cauly Adapter SDK.
MobWithADSDK.standard.appId = "{App Store App ID}"
```

!> When using the Cauly Adapter SDK, **you must set `appId`**.

For the App Store App ID, refer to the app URL such as `https://apps.apple.com/kr/app/id{App Store ID}`, or check the Apple ID value under App Information > General Information for the app in [App Store Connect](https://appstoreconnect.apple.com/).

##### SDKs that require Info.plist settings

| SDK | Setting | Guide |
|---|---|---|
| ADOP BidMad | Set AppDomain, AppKey, etc. in the app's `Info.plist` | [BidMad SDK Interface Guide](https://github.com/bidmad/Bidmad-iOS?tab=readme-ov-file#bidmadsdk-interface-guide) |
| Google AdMob | Set the Application ID in the app's `Info.plist` | [Update your Info.plist (AdMob)](https://developers.google.com/admob/ios/quick-start?hl=ko#update_your_infoplist) |

If you also use the ADOP BidMad SDK, you only need to apply the AdMob Application ID setting described in the BidMad guide.

!> When using ADOP BidMad or AdMob mediation, **the app may fail to run** if the Application ID is not set or an incorrect value is entered.

---

**Next Step** : Check how to implement each ad format in [Ad formats](/iOS/usage.md).
