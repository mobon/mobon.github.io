# Project Configuration <!-- {docsify-ignore} -->

This page describes the settings you need to apply to your app project after installing the SDK.

## Handling ATS (App Transport Security) <!-- {docsify-ignore} -->

Since iOS 9, ATS (App Transport Security) is enabled by default, and only encrypted HTTPS communication is allowed.<br>
The MobWithAD SDK is implemented to work correctly even with ATS enabled, but advertiser pages shown through ads may not support HTTPS.<br>
Therefore, please apply the following to your app project's `Info.plist` file.

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

?> You are not strictly required to apply this for security reasons, but some ads may not display correctly if it is not applied.

## Always Embed Swift Standard Libraries Setting <!-- {docsify-ignore} -->

In your app Target's Build Settings, set Always Embed Swift Standard Libraries to **Yes**.

## Applying the ATT (App Tracking Transparency) Framework <!-- {docsify-ignore} -->

Apps targeting iOS 14 or later must apply the ATT Framework in order to obtain the IDFA identifier.

#### <span class="step-label">STEP 1</span>Update Info.plist

Add a message to `Info.plist` that informs the user why the app is requesting permission to track the user or device.

```xml
<key>NSUserTrackingUsageDescription</key>
<string>Your data is used to deliver personalized ads.</string>
```

#### <span class="step-label">STEP 2</span>Apply the ATTrackingManager code

In SDK 1.2.7 or later, your app must request permission to use the IDFA value itself. Refer to the code below.

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

## Other Linker Setup <!-- {docsify-ignore} -->

Depending on how you install the SDK, you need to add flags to Build Settings > Other Linker Flags of your app target.<br>
Without these flags, the framework may not be included in the app correctly even if the build succeeds.

| Installation Method | Values to Add |
|---|---|
| SPM | **`-ObjC`** |
| CocoaPods | **`$(inherited)`** (other flags are set by CocoaPods) |
| Manual Installation | **`-ObjC`** |

In the Build Settings tab, select All and enter `Other Linker Flags` in the search field to find the setting. Double-click the value, then click the **+** button to add each value on its own line.

```text
-ObjC
```

!> If you installed with CocoaPods, Other Linker Flags **must include `$(inherited)`**.<br>
`$(inherited)` inherits values from higher-level settings (project settings, xcconfig, etc.), and CocoaPods applies the flags it needs through this value. Without it, link errors may occur.

?> For SPM and manual installation, `$(inherited)` is not required, but if it is already there, please leave it as is.<br>
If link errors still occur after setup, try adding `$(inherited)` or `-all_load` as well.

## Objective-C Projects <!-- {docsify-ignore} -->

The MobWithAD SDK is developed in Swift. To use it in an Objective-C-based project, you must embed the Swift Standard libraries, so be sure to apply the [Always Embed Swift Standard Libraries Setting](/iOS/installation_other?id=always-embed-swift-standard-libraries-setting) above.

---

**Next Step** : Initialize the SDK in [SDK Initialization](/iOS/installation_init.md).
