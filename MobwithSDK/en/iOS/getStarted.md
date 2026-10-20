🌐 <a href="../ko/#/iOS/getStarted">한국어 가이드</a>

# Getting Started <!-- {docsify-ignore} -->

This page describes the supported environment, latest version, and integration steps for adding the MobWithAD SDK to your iOS app.

## Supported Environment

| Item | Requirement |
|---|---|
| Deployment Target | iOS 15.6 or higher |
| Xcode | Latest version (Xcode 26.0 / Swift 5.3) |

?> The MobWithAD SDK was developed in Swift. To use it in a Swift-based project, please be sure to use the latest version of Xcode.<br>
For Objective-C projects, please refer to the additional settings in [Project Configuration](/iOS/installation_other?id=objective-c-projects).

## Latest Version

| Installation Method | Latest Version | How to Install |
|---|---|---|
| SPM | 1.3.33 | [Install Using SPM](/iOS/installation_base?id=install-using-swift-package-manager-spm) |
| CocoaPods | 1.3.33 | [Install Using CocoaPods](/iOS/installation_base?id=install-using-cocoapods) |

For the change history of each version, please refer to [History](/iOS/history.md).

!> Some important bugs have been fixed in versions 1.3.0 and above, so please set the **minimum version to 1.3.2 or higher**.

?> Starting from version 1.3.0, the integration with external SDKs required for mediation has been separated into dedicated Adapter SDKs. For details, please refer to [Add Adapter SDKs for Mediation](/iOS/installation_base?id=_2-add-adapter-sdks-for-mediation).

## Placement Number(Unit ID) / App Key

For the App Key and placement numbers required to use external mediation SDKs, please use the values provided to you separately.

!> Note that some App Keys and placement numbers may be affected by the app's Bundle ID, etc.

---

**Next Step** : Install the SDK in [SDK Installation](/iOS/installation_base.md).
