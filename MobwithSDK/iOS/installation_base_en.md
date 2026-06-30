🌐 [한국어 가이드](/iOS/installation_base)

## Install Using CocoaPods
---
Please note that, starting from version 1.3.0, the way CocoaPods and the SDKs for mediation are applied has changed.  
In particular, note that the pod name has changed from the previous 'MobWithAD' to 'MobWithAdSDK'.


### 1. Install MobWithAdSDK
Add 'MobWithAdSDK' to your project's Podfile.  
The example below installs the SDK by specifying version 1.3.8.
```
# CocoaPods source declarations. Note: the order matters, otherwise pods may not be fetched correctly.

# Base repo.
source 'https://cdn.cocoapods.org/'                   

# MobWithAdSDK repo.   
source 'https://github.com/mobon/MobwithAdSpecs.git'  

# Add MobWithAdSDK
pod 'MobWithAdSDK', '1.3.9'

```

### 2. Add Adapter SDKs for Mediation

You must specify the same source as MobWithAdSDK.  
Refer to the following for each mediation Adapter.

```
# AdFit Adapter
pod 'MobWithAdFitAdapter', '3.21.24.1.3.2'

# Admob Adapter
pod 'MobWithAdMobAdapter', '12.14.0.1.3.4'

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

# For BidMad, you must apply at least one of the BidMad Adapters as shown below.  
# For the BidMad Adapters, refer to each SDK's guide document in the Manual Installation section.
pod 'MobWithBidMadAdapter', '6.13.3.1.3.1'
pod 'BidmadAdmixerAdapter', '2.0.2.12.2'      

pod 'BidmadSDK/core', '= 6.13.3'             # Workaround for build errors

```

### Adapter Version Rule
Adapter versions follow the rule below. 
```
[Version of the mediation target SDK].[Version of the Mobwith SDK]
```
For example, for MobWithAdFitAdapter:
```
# This means it is optimized for AdFit SDK version 3.21.15 and Mobwith SDK version 1.3.1.
pod 'MobWithAdFitAdapter', '3.21.15.1.3.1'
```
Each Adapter has a dependency on the version it supports, so installing an Adapter automatically installs the corresponding SDK version.  
If you are already using a different version of the SDK, or using the same SDK through another ad SDK, a conflict may occur during pod installation or a different SDK version may be installed; depending on the SDK version this can cause errors when running the app, so caution is needed.  
Therefore, it is best to align the versions you use, and we recommend matching the Adapter versions according to the rule above.  
If you need support for a version of a mediation SDK that is not currently supported, please contact us separately.

### Additional Settings per Mediation SDK
Refer to each SDK's guide document in the Manual Installation section below and apply the additional settings.


### Handling Build Errors When Using BidMad
When you add BidMad's mediation Adapter, a version of the BidMad SDK different from the one added as a dependency in MobWithBidMadAdapter may be installed.
To prevent this, refer to the following to pin the build to a specific version, or align to the latest version where possible.   
If you cannot find a MobWithBidMadAdapter that supports the latest version of BidMad, please contact us.  

```
...

pod 'MobWithBidMadAdapter', '6.13.3.1.3.1'
pod 'BidmadAdmixerAdapter', '2.0.2.12.2'      
...

// Add at the end of the BidMad-related pod settings; we recommend matching it to the version of the mediation target SDK
pod 'BidmadSDK/core', '= 6.13.3'            

```

If you installed the pods before adding the content above, you must reset the pod-related content and reinstall for the change to take effect properly.  
(Delete the Pods folder, remove Podfile.lock, clear the contents of the DerivedData folder, etc.)


<br><br>

## Manual Installation
---
When installing the SDK manually, you must apply all of the items below. 

### Base Framework
- Download MobWithADSDKFramework.xcframework from [[here](https://github.com/mobon/MobWithAdSDK_iOS)].
- Drag and drop the downloaded framework onto the General > Embedded Binaries section of your app project.

### Installing Adapter Frameworks
Access each Adapter's download link below and download the framework you need.  
To choose a version, refer to the Tags tab in the branch selection menu.
Note: For AdFit and Cauly, you can download the SDK matching each version directly through the link, so download them together.
- LevelPlay Adapter : [[Download link](https://github.com/mobon/MobWithLevelPlayAdapter_iOS)]
- AdFit Adapter : [[Download link](https://github.com/mobon/MobWithAdFitAdapter_iOS)]
- Cauly Adapter : [[Download link](https://github.com/mobon/MobWithCaulyAdapter_iOS)]
- AdMob Adapter : [[Download link](https://github.com/mobon/MobWithAdMobAdapter_iOS)]
- Adop Bidmad Adapter : [[Download link](https://github.com/mobon/MobWithBidMadAdapter_iOS)]
- DTExchange Adapter : [[Download link](https://github.com/mobon/MobWithDTExchangeAdapter_iOS)]
- Pangle Adapter : [[Download link](https://github.com/mobon/MobWithPangleAdapter_iOS)]
- InMobi Adapter : [[Download link](https://github.com/mobon/MobWithInMobiAdapter_iOS)]

<br> 

Next, refer to the SDK guide document links below to install the main framework for each Adapter.  
- LevelPlay SDK : [[Guide link](https://docs.unity.com/en-us/grow/levelplay/sdk/ios)]
- AdFit SDK : [[Guide link](https://adfit.github.io/adfit-ios-sdk/documentation/adfitsdk/)]
- Cauly SDK : [[Guide link](https://cauly.gitbook.io/cauly/ios/import-sdk)]
- AdMob SDK : [[Guide link](https://developers.google.com/admob/ios/quick-start?hl=ko)]
- Adop Bidmad SDK : [[Guide link](https://github.com/bidmad/Bidmad-iOS?tab=readme-ov-file#bidmadsdk-installation-guide)]
- DTExchange SDK : [[Guide link](https://docs.digitalturbine.com/dt-exchange/publishers/sdk-configuration/integrating-the-ios-sdk)]
- Pangle SDK : [[Guide link](https://www.pangleglobal.com/integration/integrate-pangle-sdk-for-ios)]
- InMobi SDK : [[Guide link](https://support.inmobi.com/monetize/sdk-documentation/ios-guidelines/overview-ios-guidelines#option-1--integration-via-cocoapods)]


When installing manually, you must refer to [here (Other Linker setup)](/iOS/installation_other_en?id=other-linker-setup) and modify the Other Linker value.
