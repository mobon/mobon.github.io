🌐 <a href="../ko/#/iOS/installation_other">한국어 가이드</a>

## Handling ATS (App Transport Security)
---
Since iOS 9, ATS (App Transport Security) is enabled by default, and only encrypted HTTPS communication is allowed.  
The MobWithAD SDK is implemented to work correctly even with ATS enabled, but advertiser pages shown through ads may not support HTTPS.  
Therefore, please apply the following to your app project's Info.plist file.  
You are not strictly required to apply this for security reasons, but note that some ads may not display correctly if it is not applied.

```swift
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```


## Set "Always Embed Swift Standard Libraries" to Yes
---
In your app Target's Build Settings, set the "Always Embed Swift Standard Libraries" value to Yes.  


## Applying the ATT (App Tracking Transparency) Framework
---
Apps targeting iOS 14 must apply the ATT Framework in order to obtain the IDFA identifier.

### Updating Info.plist
You must add a message that informs the user why the app is requesting permission to track the user or device.  
```swift
<key> NSUserTrackingUsageDescription </key>
<string> Your data is used to deliver personalized ads. </string>
```

### Applying ATTrackingManager Code
From version 1.2.7, you must request permission to use the IDFA value yourself. Refer to the code below for this part. 
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


## Other Linker Setup
---
Occasionally, even when configured correctly, an error may occur where the framework settings are not applied properly.<br>
In such cases, you must add flags to Build Settings -> Other Linker Flags.  
The values that typically need to be added are as follows.

```swift
  $(inherited)
  -ObjC
  -all_Load
```
Here, '$(inherited)' means inheriting the parent project's settings, and it is set by default for new projects.
For older projects, or if it was modified manually, this value may be missing, which can cause the app build to fail.

## Objective-C Projects
---
The MobWithAD SDK is developed in Swift. To use the MobWithAD SDK in an Objective-C-based project, you must embed the Swift Standard libraries.  
In your app project's build settings, set the "Always Embed Swift Standard Libraries" item to Yes.  
