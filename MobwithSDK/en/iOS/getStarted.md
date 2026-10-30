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
| SPM | 1.3.35 | [Install Using SPM](/iOS/installation_base?id=install-using-swift-package-manager-spm) |
| CocoaPods | 1.3.35 | [Install Using CocoaPods](/iOS/installation_base?id=install-using-cocoapods) |

For the change history of each version, please refer to [History](/iOS/history.md).

!> Some important bugs have been fixed in versions 1.3.0 and above, so please set the **minimum version to 1.3.2 or higher**.

?> Starting from version 1.3.0, the integration with external SDKs required for mediation has been separated into dedicated Adapter SDKs. For details, please refer to [Add Adapter SDKs for Mediation](/iOS/installation_base?id=step-2add-adapter-sdks-for-mediation).

## Migration Notice

Some API names were changed in SDK 1.3.34. Existing code continues to work. For the changes and how to update your code, see the [Migration Guide](/iOS/migration-guide.md).

## Placement Number(Unit ID) / App Key

For the App Key and placement numbers required to use external mediation SDKs, please use the values provided to you separately.

!> Note that some App Keys and placement numbers may be affected by the app's Bundle ID, etc.

## Integration Steps

<div class="doc-flow">
  <div class="doc-flow-step"><span class="doc-flow-num">1</span><div><p class="doc-flow-title">Install the SDK</p><p class="doc-flow-desc">Add the SDK via SPM, CocoaPods, or manual installation</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">2</span><div><p class="doc-flow-title">Configure the Project</p><p class="doc-flow-desc">Project settings such as ATS, ATT, and Other Linker Flags</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">3</span><div><p class="doc-flow-title">Initialize the SDK</p><p class="doc-flow-desc">Initialize the MobWith SDK and mediation SDKs</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">4</span><div><p class="doc-flow-title">Implement Ads</p><p class="doc-flow-desc">Implement each ad format</p></div></div>
</div>

---

**Next Step** : Install the SDK in [SDK Installation](/iOS/installation_base.md).
