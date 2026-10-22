# Banner AD <!-- {docsify-ignore} -->

This page describes how to display a banner ad using MobWithAdView.

## Creating and Loading an Ad

Create a MobWithAdView, add it to the screen, and call `loadAd()` to request an ad.

```swift
let mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: 320, height: 50),
                                       type: .BANNER_320x50,
                                       bannerUnitId: "{Unit ID}")
self.view.addSubview(mobWithAdView)
mobWithAdView.loadAd()
```

## Banner Types and Sizes

| Type name | Size | Description |
|---|---|---|
| `.BANNER_320x50` | 320x50 | Displays a 320x50 banner. |
| `.BANNER_320x100` | 320x100 | Displays a 320x100 banner. |
| `.BANNER_300x250` | 300x250 | Displays a 300x250 banner. |

## Banner Size Setup

We recommend matching the size of the view that displays the ad to the size of the specified banner type, as shown below.

```swift
mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: 320, height: 50),
                                   type: .BANNER_320x50,
                                   bannerUnitId: "{Unit ID}")
```

?> If the view size differs from the banner type size, margins may appear.<br>
When `fillMode` is set, or when an AdFit Bizboard ad is displayed, the specified size may be used to the maximum regardless of the banner type.

### Display Options

| Property | Default | Description |
|---|---|---|
| `fillMode` | `false` | If set to `true`, the ad uses the specified size to the maximum. If the ratio of the actual ad differs from the ratio of the specified area, margins may appear in the remaining space, so we recommend matching the ratio where possible. |
| `fitToHeight` | `false` | If set to `true`, for some ad sources, the size is adjusted proportionally based on the height provided when creating the MobWithAdView. Margins may appear on the left and right depending on the parent View ratio. |
| `useCloseButton` | `false` | If set to `true`, a close button is displayed on the ad. When the close button is pressed, the `mobWithAdViewClose(_:)` callback is delivered, so we recommend handling it appropriately. |

```swift
mobWithAdView.fillMode = true
mobWithAdView.fitToHeight = true
mobWithAdView.useCloseButton = true
```

### AdFit Bizboard Margin Setting

Bizboard ads are implemented to allocate margins by default. If needed, set the margins as shown below before creating and loading the ad view.<br>
`import AdFitSDK` is required to use `BizBoardTemplate`. (See [SDK Initialization](/iOS/installation_init.md))

```swift
BizBoardTemplate.defaultEdgeInset = UIEdgeInsets.init(top: 0.0, left: 0.0, bottom: 0.0, right: 0.0)
```

## Ad Auto-Refresh

If you set the `interval` value, the banner ad is automatically refreshed at the set interval.

| Property | Default | Description |
|---|---|---|
| `interval` | `0` | Auto-refresh interval (seconds). It must be at least 60 seconds; if a value smaller than 60 is set, the ad refreshes every 60 seconds. Set it to 0 if you do not use auto-refresh. |

```swift
mobWithAdView.interval = 60
```

?> If a value is set in the admin page, that value takes precedence.

You can stop or restart auto-refresh with the following methods.

| Method | Description |
|---|---|
| `stop()` | Stops ad auto-refresh. |
| `restart()` | Restarts the stopped ad auto-refresh. |

```swift
mobWithAdView.stop()       // Stop ad auto-refresh
mobWithAdView.restart()    // Restart ad auto-refresh
```

## Enabling Reward Ads

?> Supported in SDK 1.3.32 or later.

When enabling the reward feature in an ad, you must configure the following values.<br>
Use the values assigned by the media platform for `mediaId` and `serviceId`. If values have already been provided, use them as received.

| Field | Description |
|---|---|
| `mediaId` | A unique identifier for the media platform or service. |
| `serviceId` | An identifier for the ad placement or service location within the media platform. It is a child value of `mediaId` and distinguishes multiple placements or locations within the same platform. |
| `userKey` | A value used to identify the user, such as a user ID. Set this to a unique value managed by the media platform. |

```swift
mobWithAdView.mediaId = "{Media ID}"
mobWithAdView.serviceId = "{Service ID}"
mobWithAdView.userKey = "{User Key}"
```

## MobWithADViewDelegate

The callback events of MobWithAdView are delivered via MobWithADViewDelegate.

| Callback | When it is called |
|---|---|
| `mobWithAdViewDidReceivedAd()` | When an ad is received successfully |
| `mobWithAdViewDidFailToReceiveAd()` | When an ad fails to be received |
| `mobWithAdViewClickedAd()` | When the ad is clicked |
| `mobWithAdViewClose(_ banner: MobWithAdView?)` | When the close button (`useCloseButton`) is used and the close button is pressed |

```swift
class ViewController: UIViewController {
    .....
    let mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: 320, height: 50),
                                           type: .BANNER_320x50,
                                           bannerUnitId: "{Unit ID}")
    mobWithAdView.adDelegate = self
    .....
}

extension ViewController: MobWithADViewDelegate {

    func mobWithAdViewDidReceivedAd() {
        // Ad received successfully
        print(#function)
    }

    func mobWithAdViewDidFailToReceiveAd() {
        // Ad reception failed
        print(#function)
    }

    func mobWithAdViewClickedAd() {
        // Ad clicked
        print(#function)
    }

    func mobWithAdViewClose(_ banner: MobWithAdView?) {
        // Close button pressed
        print(#function)
    }
}
```

## Releasing the Ad View

When the MobWithAdView is no longer needed, release its ad resources as follows.

```swift
mobWithAdView?.clearAdViews()
mobWithAdView = nil
```
