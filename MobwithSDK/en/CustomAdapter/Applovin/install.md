# AppLovin MAX Adapter SDK Installation <!-- {docsify-ignore} -->

This guide explains how to install the SDKs required to serve MobWith ads through AppLovin MAX mediation.<br>
You need to install both the **MobWith SDK** and the **AppLovin MAX Adapter SDK**.

!> The AppLovin MAX Adapter participates in AppLovin MAX mediation as a 3rd party, so **the AppLovin MAX SDK must be installed in your project first**.<br>
If the AppLovin MAX SDK is not installed yet, refer to the [Android](https://support.axon.ai/en/max/android/overview/integration) / [iOS](https://support.axon.ai/en/max/ios/overview/integration) guides to install the AppLovin MAX SDK and configure ads first.

## 1. MobWith SDK Basic Setup <!-- {docsify-ignore} -->

The AppLovin MAX Adapter serves ads through the MobWith SDK, so the basic setup of the MobWith SDK is required first.

- Android : In the SDK Installation guide, add the repositories that match the MobWith SDK version you use from [Gradle Configuration](/Android/installation?id=gradle-configuration) and apply [Permissions](/Android/installation?id=permissions).<br>For the MobWith SDK dependency, use the settings in Step 2 below instead of the version in that guide.
- iOS : Install the MobWith SDK by referring to [Install Using CocoaPods](/iOS/installation_base?id=install-using-cocoapods) in the SDK Installation guide.

?> Mediation within the MobWith SDK itself (integration with other ad networks such as AdFit and BidMad) is a separate feature from the AppLovin MAX Adapter integration. Apply it only if agreed upon, by referring to each network's SDK section in the SDK Installation guide.

## 2. Add the AppLovin MAX Adapter SDK <!-- {docsify-ignore} -->

Add the dependencies below for each platform.<br>
On Android, add the AppLovin MAX Adapter, the AppLovin MAX SDK, and the MobWith SDK together. On iOS, add only the AppLovin MAX Adapter. (On iOS, the MobWith SDK is installed in Step 1.)

| Platform | Adapter Version | Minimum MobWith SDK Version |
|---|---|---|
| Android | 1.1.1 | 1.0.111 |
| iOS | 1.1.0 | 1.3.34 |

!> Starting with AppLovin MAX Adapter Android 1.1.1 / iOS 1.1.0, **the minimum required MobWith SDK version has been raised.**<br>
If you are using an older version of the MobWith SDK, update the MobWith SDK to the version above or later first, and then update the Adapter.

<!-- tabs:start -->

#### **Android**

Add the following to the `dependencies` block of your app module's `build.gradle(.kts)` file.

```kotlin
// AppLovin MAX Mediation Adapter
implementation("io.github.mobon:MobwithApplovinMediationAdapter:1.1.1")

// AppLovin MAX SDK
implementation("com.applovin:applovin-sdk:+@aar")

// MobWith SDK (minimum 1.0.111)
implementation("com.google.android.gms:play-services-ads:23.0.0")
implementation("com.google.android.gms:play-services-ads-identifier:17.1.0")
implementation("io.github.mobon:mobwithSDK:1.0.111")
implementation("com.github.Dimezis:BlurView:version-3.2.0")
```

#### **iOS**

Add the following to your project's `Podfile`, then run `pod install`.

```ruby
# CocoaPods source declarations (the order matters, otherwise pods may not be fetched correctly)

# Base repo
source 'https://cdn.cocoapods.org/'

# MobWith SDK repo
source 'https://github.com/mobon/MobwithAdSpecs.git'

# AppLovin MAX Adapter SDK
pod 'MobwithAppLovinMediationAdapter'
```

?> If you have already declared the CocoaPods sources while installing the MobWith SDK, you can skip them.

<!-- tabs:end -->

## 3. Verify the SDK Installation <!-- {docsify-ignore} -->

You can verify that the SDK has been installed correctly through the completion callback of the AppLovin MAX SDK initialization function.

!> The mediation setup in the AppLovin MAX admin console must be completed before verifying the installation. For setup instructions, refer to [Ad Configuration](/CustomAdapter/Applovin/loadAd.md).

<!-- tabs:start -->

#### **Android**

```java
AppLovinSdk.getInstance(activity).initialize(initConfigBuilder.build(), new AppLovinSdk.SdkInitializationListener() {
    @Override
    public void onSdkInitialized(AppLovinSdkConfiguration appLovinSdkConfiguration) {
        // Called when SDK initialization completes
    }
});
```

#### **iOS**

```swift
let initConfig = ALSdkInitializationConfiguration(sdkKey: AdIds.appKey) { builder in
    builder.mediationProvider = ALMediationProviderMAX
}

ALSdk.shared().initialize(with: initConfig) { config in
    self.isInited = true
}
```

<!-- tabs:end -->

## Notes <!-- {docsify-ignore} -->

The optimized AppLovin MAX SDK versions are as follows.

| Platform | AppLovin MAX SDK Version |
|---|---|
| Android | 13.6.3 |
| iOS | 13.6.0 |

---

**Next Step** : Set up mediation in the AppLovin MAX admin console in [Ad Configuration](/CustomAdapter/Applovin/loadAd.md).
