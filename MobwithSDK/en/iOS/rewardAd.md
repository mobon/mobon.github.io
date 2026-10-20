# Reward AD <!-- {docsify-ignore} -->

This page describes how to use MobWithRewardAd to show an ad to the user and provide a reward.

## MobWithRewardAd

Create a MobWithRewardAd and call `loadAd()` to request an ad.

```swift
let rewardAd = MobWithRewardAd.init()
rewardAd.rootViewController = self
rewardAd.adDelegate = self
rewardAd.unitId = "{Unit ID}"

rewardAd.loadAd()
```

For reward ads, loading the ad and displaying it are separated. After confirming that the ad is loaded, call `show()` to display it.

```swift
if rewardAd.isLoaded() {
    rewardAd.show()
}
```

| Method | Description |
|---|---|
| `loadAd()` | Loads the ad. To display the ad quickly, we recommend loading it in advance before the ad is actually displayed. |
| `isLoaded()` | Returns `true` if an ad is loaded, and `false` otherwise. If an ad is not loaded, calling `show()` will fail. |
| `show()` | Displays the reward ad on screen if a loaded ad exists. |

## MobWithRewardAdDelegate

This is the delegate that receives each event of MobWithRewardAd.<br>
The `rewardAd` parameter of every callback is the object on which the event occurred.

| Callback | When it is called |
|---|---|
| `mobWithRewardAdDidReceived(_:)` | When an ad is received. You must then call `show()` for the ad to be displayed. |
| `mobWithRewardAdDidFailToReceive(_:)` | When an ad could not be received |
| `mobWithRewardAdClicked(_:)` | When the ad is clicked |
| `mobWithRewardAdDidOpend(_:)` | When the ad is displayed on screen |
| `mobWithRewardAdDidOpenFailed(_:)` | When the ad fails to be displayed on screen |
| `mobWithRewardAdClosed(_:)` | When the displayed ad is closed |
| `mobWithRewardAdCanReward(_:)` | When the reward condition is met |

?> Grant the user's reward when you receive the `mobWithRewardAdCanReward(_:)` callback.

```swift
extension ViewController: MobWithRewardAdDelegate {

    func mobWithRewardAdDidReceived(_ rewardAd: MobWithRewardAd?) {
        // Ad received
    }

    func mobWithRewardAdDidFailToReceive(_ rewardAd: MobWithRewardAd?) {
        // Ad reception failed
    }

    func mobWithRewardAdClicked(_ rewardAd: MobWithRewardAd?) {
        // Ad clicked
    }

    func mobWithRewardAdDidOpend(_ rewardAd: MobWithRewardAd?) {
        // Ad displayed
    }

    func mobWithRewardAdDidOpenFailed(_ rewardAd: MobWithRewardAd?) {
        // Ad display failed
    }

    func mobWithRewardAdClosed(_ rewardAd: MobWithRewardAd?) {
        // Ad closed
    }

    func mobWithRewardAdCanReward(_ rewardAd: MobWithRewardAd?) {
        // Grant the reward
    }
}
```
