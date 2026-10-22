# Splash AD <!-- {docsify-ignore} -->

This page describes how to display an ad on the splash screen using MMSplashAd.

## Creating an Ad

Create an MMSplashAd and set its delegate.

```swift
let splashAd = MMSplashAd(viewController: self, unitId: "{Unit ID}", rootView: self.view)
splashAd.delegate = self
splashAd.timeOutSec = 5

splashAd.loadAd()
```

| Parameter | Required | Description |
|---|---|---|
| `viewController` | Required | Pass the ViewController where the ad will be displayed. If `rootView` is not set, the splash ad is displayed on the main view of the passed ViewController, and it may be covered if other views overlap the ad area. |
| `unitId` | Required | Pass the placement number (Unit ID) to be used for the ad. |
| `rootView` | Optional | Pass the view where the SplashAd will be displayed. We recommend passing a view of the same size as the ViewController's main view. Recommended if you have views, such as an app logo, that should not be covered by the ad. |

!> The ad may not display correctly depending on the size and position of the view passed as `rootView`.

## Requesting an Ad

Call `loadAd()` to load the ad.

```swift
splashAd.loadAd()
```

You can set the waiting time for the ad request. If no ad response is received within the specified time, the ad load failure callback is delivered.

| Property | Default | Description |
|---|---|---|
| `timeOutSec` | `5` | Ad request timeout (seconds). |

```swift
splashAd.timeOutSec = 5
```

## Removing the Ad Object

Call `destroy()` to remove the current ad object.

```swift
splashAd.destroy()
```

!> If you call `destroy()` while the ad is loading, event callbacks are not delivered even if the ad is received successfully afterward.

## MMSplashAdDelegate

Implement MMSplashAdDelegate to receive callbacks for each splash ad event.

| Callback | When it is called |
|---|---|
| `mobWithSplashAdDidReceived()` | When the splash ad is received |
| `mobWithSplashAdFailToReceived()` | When the splash ad fails to be received |

```swift
extension SplashViewController: MMSplashAdDelegate {

    public func mobWithSplashAdDidReceived() {
        // Splash ad received
    }

    public func mobWithSplashAdFailToReceived() {
        // Failed to receive splash ad
    }
}
```

## Full Example

Refer to the following for ad loading and callback event handling.

?> After the ad loads successfully, wait for a certain period before moving to the next screen.

```swift
class SplashViewController: UIViewController {

    var splashAd: MMSplashAd?

    override func viewDidLoad() {
        super.viewDidLoad()

        splashAd = MMSplashAd.init(viewController: self, unitId: "{Unit ID}")
        splashAd?.delegate = self
        splashAd?.timeOutSec = 5

        splashAd?.loadAd()
    }

    func openNextVC() {
        // Implement navigation to the next screen
    }
}

extension SplashViewController: MMSplashAdDelegate {

    func mobWithSplashAdDidReceived() {
        // Ad loaded successfully. Wait an additional 3 seconds before moving to the next screen
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) { [weak self] in
            self?.openNextVC()
        }
    }

    func mobWithSplashAdFailToReceived() {
        // Ad load failed. Immediately move to the next screen
        openNextVC()
    }
}
```
