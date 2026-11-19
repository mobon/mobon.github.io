# Adapter Compatibility <!-- {docsify-ignore} -->

This page provides version compatibility information for the MobWith mediation Adapters distributed via SPM.<br>
When you install an Adapter, compatible versions of the MobWith SDK and the mediation target SDK are installed with it.

## Adapter List <!-- {docsify-ignore} -->

| Adapter | Mediation Target SDK | Latest SPM Version |
|---|---|---|
| [MobWithAdFitAdapter](/iOS/adapter_compatibility?id=mobwithadfitadapter) | AdFit | 1.0.0 |
| MobWithAdMobAdapter | AdMob | Coming soon |
| MobWithCaulyAdapter | Cauly | Coming soon |
| MobWithDTExchangeAdapter | DT Exchange | Coming soon |
| MobWithInMobiAdapter | InMobi | Coming soon |
| MobWithLevelPlayAdapter | LevelPlay | Coming soon |
| MobWithPangleAdapter | Pangle | Coming soon |
| MobWithBidMadAdapter | ADOP BidMad | Coming soon |
| MobWithAdPopcornAdapter | AdPopcorn | Coming soon |

?> Other Adapters will be added to SPM gradually. If you need an Adapter that is not yet available via SPM, please wait for SPM support, or install the SDK and Adapters with [CocoaPods](/iOS/installation_base?id=install-using-cocoapods) for the time being. If you need support urgently, please contact us.

## How to Read the Table <!-- {docsify-ignore} -->

| Item | Description |
|---|---|
| Stable version | The version used to develop and verify the Adapter. We recommend using this version. |
| Supported range | The range of versions that can be installed with the Adapter under SPM's Up to Next Minor rule. |

?> SPM Adapters use their own versioning starting from 1.0.0. The [version rule](/iOS/installation_base?id=adapter-version-rule) for CocoaPods Adapters does not apply to SPM Adapters.

## MobWithAdFitAdapter

<div class="info-card">
  <div class="info-card-head">
    <p class="info-card-name"><span class="info-card-tag">SPM</span>AdFit Mediation Adapter</p>
    <span class="info-card-version">Latest 1.0.0</span>
  </div>
  <dl class="info-card-meta">
    <dt>SPM Package</dt><dd><code>https://github.com/mobon/MobWithAdFitAdapter_iOS</code></dd>
    <dt>Manual installation file</dt><dd><code>MobWithAdFitAdapter.xcframework.zip</code> (Releases, per version)</dd>
  </dl>
  <div class="info-card-links">
    <a class="info-card-main" href="https://github.com/mobon/MobWithAdFitAdapter_iOS/releases" target="_blank">Download from Releases</a>
    <a href="#/iOS/installation_base?id=install-using-swift-package-manager-spm">Install with SPM</a>
    <a href="#/iOS/installation_base?id=manual-installation">Install manually</a>
  </div>
</div>

| Adapter Version | Release Date | MobWith SDK | AdFit SDK | Minimum iOS |
|---|---|---|---|---|
| 1.0.0 | 2026-11-19 | Stable 1.3.39<br>Supported 1.3.39 or higher, below 1.4.0 | Stable 3.22.7<br>Supported 3.22.7 or higher, below 3.23.0 | 15.0 |

?> The last CocoaPods version is `3.21.24.1.3.34`. Later versions are distributed via SPM only.
