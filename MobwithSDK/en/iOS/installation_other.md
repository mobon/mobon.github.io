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

Even when configured correctly, an error may occur where the framework settings are not applied properly.<br>
In such cases, add flags to Build Settings > Other Linker Flags. The values that typically need to be added are as follows.

```text
$(inherited)
-ObjC
-all_load
```

`$(inherited)` means inheriting the parent project's settings, and it is set by default for new projects.<br>
For older projects, or projects modified manually, this value may be missing, which can cause the app build to fail.

## Objective-C Projects <!-- {docsify-ignore} -->

The MobWithAD SDK is developed in Swift. To use it in an Objective-C-based project, you must embed the Swift Standard libraries, so be sure to apply the [Always Embed Swift Standard Libraries Setting](/iOS/installation_other?id=always-embed-swift-standard-libraries-setting) above.

---

**Next Step** : Initialize the SDK in [SDK Initialization](/iOS/installation_init.md).
