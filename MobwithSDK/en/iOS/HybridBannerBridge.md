# HybridBannerBridge <!-- {docsify-ignore} -->

This page describes how to display ads on web pages in a hybrid app (WKWebView) using MMHybridBannerBridge.

!> **Deprecated** : `init(webVeiw:)` of `MMHybridBannerBridge` is deprecated as of SDK 1.3.34. Please use `init(webView:)` instead. For details, see the [Migration Guide](/iOS/migration-guide.md).

## 1. Assign Ad Slots on the Web Page

Refer to the following to assign ad slots on the web page where ads will be displayed. The example below displays two ads on the web screen.

```html
<html>
    ....
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="05" data-media-id="media_id" data-service-id="service_id"> </div>

    ....

    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="02" data-media-id="media_id" data-service-id="service_id"> </div>
    ....

</html>
```

| Attribute | Description |
|---|---|
| `class` | Fixed as `mobwith-banner`. |
| `data-placement-id-ios` | The iOS placement number (Unit ID) assigned to the slot. |
| `data-placement-id-android` | The Android placement number (Unit ID) assigned to the slot. |
| `data-zone-type` | The ad type code to display. The ad type code is provided along with the placement number. |
| `data-media-id` | A unique identifier for the media platform or service. Specify the agreed value when using the reward ad feature. It can be omitted if you do not use it. |
| `data-service-id` | An identifier for the ad placement or service location within the media platform. Specify the agreed value when using the reward ad feature. It can be omitted if you do not use it. |

?> `data-media-id` and `data-service-id` are supported in SDK 1.3.34 or later.

## 2. Create the Bridge and Configure the WebView

Refer to the following to create an MMHybridBannerBridge and configure the WebView.

```swift
class ViewController: UIViewController {
    var webView: WKWebView!
    var bridge: MMHybridBannerBridge? = nil

    override func viewDidLoad() {
        super.viewDidLoad()

        ....

        bridge = MMHybridBannerBridge(webView: webView)
        bridge?.category = [
            "A0001",
            "A0002",
            "A0003",
            "A0004",
            ...
        ]
        bridge?.campaignCodes = [
            "03b7a807c94f4beeb4115a23b2a5c39a",
            "24f2e8051e044ddd867ba68ff467d8b0",
            "4b56b65279a94d059eba23ffaf0ad869",
            ...
        ]
        bridge?.adDelegate = self // Register MMHybridBannerBridgeDelegate

        // Register the bridge. It handles landing page navigation and other events such as ad clicks on its own.
        webView.configuration.userContentController.add(self, name: bridge?.bridgeName ?? "")

        webView.navigationDelegate = self
        if let url = URL(string: "{Web Page URL}") {
            let request = URLRequest(url: url)
            webView.load(request)
        }

        ...
    }
}

...

extension ViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // Notify that page loading is complete
        bridge?.webViewFinishLoad(webView, isLoadAd: true)
    }
}
```

## 3. Notify Page Load Completion

When the page finishes loading, call the following function to load and display ads.<br>
When it is called, MMHybridBannerBridge detects the ad slots and handles ad loading and display automatically.

```swift
// Start loading ads right after the page finishes loading
bridge?.webViewFinishLoad(webView)

// Request ads manually
bridge?.webViewFinishLoad(webView, isLoadAd: false)
```

!> The `webView` passed as a parameter must be **the same object** as the webView passed when creating the MMHybridBannerBridge.

?> If you set `isLoadAd` to `false` so that ads are not loaded immediately, or if the actual page load completion timing differs from when `didFinish` is called, request ads separately by referring to [Manual Ad Request](/iOS/HybridBannerBridge?id=manual-ad-request) below.

## 4. Handle Ad Events

When you receive the `userContentController(_:didReceive:)` callback, call `handleBridgeMessage()`.<br>
It returns `true` if the bridge handled the message internally.

```swift
extension ViewController: WKScriptMessageHandler {

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if bridge?.handleBridgeMessage(message) == true {
            return
        }

        if message.name == "mobwithPointBannerBridge" {
            if let messageBody = message.body as? [String: Any] {
                // Handle message
                handleBridgeMessage(messageBody)
            }
        }
    }
}
```

## Ad Options

### Manual Ad Request

You can request or refresh ads from the web page by calling `window.MobwithBridge.refresh()` in JavaScript.<br>
The following example refreshes ads when a separate button is tapped.

```html
<button type="button" onclick="window.MobwithBridge && window.MobwithBridge.refresh();">
    Load Ad
</button>
```

### Setting Ad Categories

Set `category` as an array of strings to display ads matching the specified categories.

```swift
bridge?.category = [
    "A0001",
    "A0002",
    "A0003",
    "A0004",
    ...
]
```

?> Please refer to the agreed specifications for category values.

### Setting Campaign Codes

Set `campaignCodes` as an array of strings to display ads for the specified campaigns.

```swift
bridge?.campaignCodes = [
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
]
```

?> Please refer to the agreed specifications for campaign code values.

## Releasing Ads

Call `destroy()` to remove the currently loaded ads and release associated resources.<br>
We recommend calling it when the created MMHybridBannerBridge is no longer needed.

```swift
bridge?.destroy()
```

## MMHybridBannerBridgeDelegate

Implement this delegate to receive event callbacks from ads displayed through the hybrid bridge.

| Callback | When it is called |
|---|---|
| `mobWithHybridBannerBridgeAdClicked(_ bridge: MMHybridBannerBridge?)` | When an ad is clicked. You can determine this either from the `true` result of `handleBridgeMessage(message)` in [Handle Ad Events](/iOS/HybridBannerBridge?id=_4-handle-ad-events) or from this callback. |
| `mobWithHybridBannerBridgeAdLoadFailed(_ bridge: MMHybridBannerBridge?, zoneId: String, zoneType: String)` | When ad loading fails. `zoneId` is the placement number that failed to load and `zoneType` is the ad type code. If a value cannot be determined, an empty string is passed. |
| `mobwithAdViewOpenInAppLanding(ad:params:)` | When an in-app landing ad is clicked (SDK 1.3.35 or later). See [In-App Landing](/iOS/banner?id=in-app-landing) |

```swift
extension ViewController: MMHybridBannerBridgeDelegate {

    func mobWithHybridBannerBridgeAdClicked(_ bridge: MMHybridBannerBridge?) {
        print(#function)
    }

    func mobWithHybridBannerBridgeAdLoadFailed(_ bridge: MMHybridBannerBridge?, zoneId: String, zoneType: String) {
        print(#function)
    }

    func mobwithAdViewOpenInAppLanding(ad: AnyObject, params: Dictionary<String, String>) {
        // In-app landing ad clicked (SDK 1.3.35 or later)
        print(#function)
    }
}
```
