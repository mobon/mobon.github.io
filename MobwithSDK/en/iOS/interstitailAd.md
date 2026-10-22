# Interstitial AD <!-- {docsify-ignore} -->

This page describes how to display a full-screen interstitial ad using MobWithInterstitialAd.

!> **Deprecated** : `MobWithInterstitailAd` / `MobWithIntersitialAdDelegate` are deprecated as of SDK 1.3.34. Please use `MobWithInterstitialAd` / `MobWithInterstitialAdDelegate` instead. For details, see the [Migration Guide](/iOS/migration-guide.md).

## MobWithInterstitialAd

Create a MobWithInterstitialAd and call `loadAd()` to request an ad.

```swift
let interstitialAd = MobWithInterstitialAd.init()
interstitialAd.rootViewController = self
interstitialAd.adDelegate = self
interstitialAd.unitId = "{Unit ID}"

interstitialAd.loadAd()
```

For interstitial ads, loading the ad and displaying it are separated. After confirming that the ad is loaded, call `show()` to display it.

```swift
if interstitialAd.isLoaded() {
    interstitialAd.show()
}
```

| Method | Description |
|---|---|
| `loadAd()` | Loads the ad. To display the ad quickly, we recommend loading it in advance before the ad is actually displayed. |
| `isLoaded()` | Returns `true` if an ad is loaded, and `false` otherwise. If an ad is not loaded, calling `show()` will fail. |
| `show()` | Displays the interstitial ad on screen if a loaded ad exists. |

## MobWithInterstitialAdDelegate

This is the delegate that receives each event of MobWithInterstitialAd.<br>
The `interstitialAd` parameter of every callback is the object on which the event occurred.

!> **Deprecated** : The `mobWithIntersitialAd…` callback methods are deprecated as of SDK 1.3.34. Please use the `mobWithInterstitialAd…` methods instead. For details, see the [Migration Guide](/iOS/migration-guide.md).

| Callback | When it is called |
|---|---|
| `mobWithInterstitialAdDidReceived(_:)` | When an ad is received |
| `mobWithInterstitialAdDidFailToReceive(_:)` | When an ad could not be received |
| `mobWithInterstitialAdClicked(_:)` | When the ad is clicked |
| `mobWithInterstitialAdDidOpened(_:)` | When the ad is displayed on screen |
| `mobWithInterstitialAdDidOpenFailed(_:)` | When the ad fails to be displayed on screen |
| `mobWithInterstitialAdDidClosed(_:)` | When the displayed ad is closed |

```swift
extension ViewController: MobWithInterstitialAdDelegate {

    func mobWithInterstitialAdDidReceived(_ interstitialAd: MobWithInterstitialAd?) {
        // Ad received
    }

    func mobWithInterstitialAdDidFailToReceive(_ interstitialAd: MobWithInterstitialAd?) {
        // Ad reception failed
    }

    func mobWithInterstitialAdClicked(_ interstitialAd: MobWithInterstitialAd?) {
        // Ad clicked
    }

    func mobWithInterstitialAdDidOpened(_ interstitialAd: MobWithInterstitialAd?) {
        // Ad displayed
    }

    func mobWithInterstitialAdDidOpenFailed(_ interstitialAd: MobWithInterstitialAd?) {
        // Ad display failed
    }

    func mobWithInterstitialAdDidClosed(_ interstitialAd: MobWithInterstitialAd?) {
        // Ad closed
    }
}
```
