🌐 <a href="../ko/#/CustomAdapter/Applovin/install">한국어 가이드</a>

# AppLovin MAX 3rd Party Adapter SDK Installation

This guide explains how to use the AppLovin MAX 3rd Party Adapter.  
Please install both of the SDKs described below.


### 1. Install MobWithAdSDK
Refer to the links below to add the MobWith AD SDK to your project.  
For each platform, apply the mediation-related additions according to what was agreed upon.
- Android : [[Guide document link](/Android/installation_en.md)]
- iOS : [[Guide document link](/iOS/installation_base_en.md)]


### 2. Add the AppLovin MAX 3rd-Party Adapter SDK
Refer to the platform-specific sections below to add the 3rd-Party Adapter.

#### Android
```
implementation("io.github.mobon:MobwithApplovinMediationAdapter:1.0.1")
```


#### iOS  
If you already configured the CocoaPods source declarations during the MobWith SDK installation above, you can ignore that part.
```
# CocoaPods source declarations. Note: the order matters, otherwise pods may not be fetched correctly.

# Base repo.
source 'https://cdn.cocoapods.org/'                   

# MobWithAdSDK repo.   
source 'https://github.com/mobon/MobwithAdSpecs.git'  

# Add the AppLovin MAX 3rd-Party Adapter SDK
pod 'MobwithAppLovinMediationAdapter'
```



### 3. Verify the SDK Installation
You can verify that the SDK was installed correctly through the callback of the AppLovin MAX initialization function.  
Refer to the platform-specific content below to confirm that the SDK is installed properly.  
Note that the mediation configuration must first be completed in the AppLovin MAX admin console.  

#### Android
Initialize using the initialization function below.
```
AppLovinSdk.getInstance(activity).initialize(initConfigBuilder.build(), new AppLovinSdk.SdkInitializationListener() {
            @Override
            public void onSdkInitialized(AppLovinSdkConfiguration appLovinSdkConfiguration) {
                // Called when the SDK setup completes
            }
        });
```

#### iOS
```
let initConfig = ALSdkInitializationConfiguration(sdkKey: AdIds.appKey) { builder in
            builder.mediationProvider = ALMediationProviderMAX
        }
        
        ALSdk.shared().initialize(with: initConfig) { config in
            self.isInited = true
        }
```


### 4. Notes
* The 3rd Party Adapter participates as a 3rd party within AppLovin MAX SDK mediation, so the AppLovin MAX SDK must already be installed in your project.  
* If you have not installed the AppLovin MAX SDK, use the platform-specific links below to install the AppLovin MAX SDK and configure your ad units.  
  * Android : [Go to the AppLovin MAX Android guide](https://support.axon.ai/en/max/android/overview/integration)
  * iOS : [Go to the AppLovin MAX iOS guide](https://support.axon.ai/en/max/ios/overview/integration)

* The optimized AppLovin MAX SDK versions are as follows.
  * Android : 13.6.3
  * iOS : 13.6.0