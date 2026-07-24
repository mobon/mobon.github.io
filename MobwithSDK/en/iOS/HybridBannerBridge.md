🌐 <a href="../ko/#/iOS/HybridBannerBridge">한국어 가이드</a>


## MMHybridBannerBridge  <!-- {docsify-ignore} -->

This bridge is for displaying ads in hybrid apps.

### Assign ad slots to display ads on the web page
Refer to the following to assign ad slots on the web page where ads will be displayed.
```html
<html>
    .... 
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="05" > </div>
    
    ....
    
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="02" > </div>
    ....

</html>

```
The above example shows how to display two ads on the web screen using the bridge.

The class name of the div tag should be fixed as follows:
```html
class="mobwith-banner"
```

Specify the assigned ad unit IDs for the corresponding ad slots in data-placement-id-ios and data-placement-id-android.
```html
data-placement-id-ios="{ Your Ad Unit ID (iOS) }"
data-placement-id-android="{ Your Ad Unit ID (Android) }"
```

Specify the ad type code to display in data-zone-type.  
The ad type code is passed along with the ad unit ID.
```html
data-zone-type="{ Ad Type Code }"
```



### WebView setup and MMHybridBannerBridge registration
Refer to the following to create an MMHybridBannerBridge instance and configure the WebView.

```swift
class ViewController: UIViewController {
    var webView: WKWebView!
    var bridge: MMHybridBannerBridge? = nil
        
    override func viewDidLoad() {
        super.viewDidLoad()
        
        ....

        bridge = MMHybridBannerBridge(webVeiw: webView)
        bridge.category = [
            "A0001",
            "A0002",
            "A0003",
            "A0004",
            ...
        ]
        bridge.campaignCodes = [
            "03b7a807c94f4beeb4115a23b2a5c39a",
            "24f2e8051e044ddd867ba68ff467d8b0",
            "4b56b65279a94d059eba23ffaf0ad869",
            ...
        ]

        // Register the bridge. It automatically handles landing page navigation and other events such as ad clicks.
        webView.configuration.userContentController.add(self, name: bridge?.bridgeName ?? "")
        bridge?.requestAd(placementId: "{ Your Ad Unit ID }")
        
        webView.navigationDelegate = self
        if let url = URL(string: "{ Web Page URL }") {
            let request = URLRequest(url: url)
            webView.load(request)
        }

        ...
    }
}

...


extension ViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // Notify when page loading is complete
        bridge?.webViewFinishLoad(webView)
    }
}

```


### Notification when page loading is complete
When the page finishes loading, call the following function to load and display ads.  
The webView parameter must be the same WebView instance that was passed when creating the MMHybridBannerBridge.

```swift
bridge?.webViewFinishLoad(webView)
```
When this function is called, MMHybridBannerBridge automatically detects ad slots and handles ad loading and display.



### Handling ad events
When receiving the 'userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage)' callback, call the 'handleBridgeMessage()' function.  
Return true if the callback is handled internally.
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

### Setting ad categories
Set the category property as an array of strings to display ads matching the specified categories.
```swift
bridge.category = [
    "A0001",
    "A0002",
    "A0003",
    "A0004",
    ...
]
```
* Please refer to the agreed specifications for category values.


### Setting campaign codes
Set the campaignCodes property as an array of strings to display ads matching the specified campaigns.
```swift
bridge.campaignCodes = [
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
]
```
* Please refer to the agreed specifications for campaign code values.


### MMHybridBannerBridgeDelegate
Implement this delegate to receive various event callbacks from ads displayed through the hybrid bridge.

```swift
extension ViewController: MMHybridBannerBridgeDelegate {
    
    func mobWithHybridBannerBridgeAdClicked(_ bridge: MMHybridBannerBridge?) {
        print(#function)
    }

    func mobWithHybridBannerBridgeAdLoadFailed(_ bridge: MMHybridBannerBridge?) {
        print(#function)
    }
}
```

### mobWithHybridBannerBridgeAdClicked(_ bridge: MMHybridBannerBridge?)                                
Called when an ad is clicked.  
You can use the true return value from 'bridge?.handleBridgeMessage(message)' in the 'Handling ad events' section, or handle it via this callback.


### mobWithHybridBannerBridgeAdLoadFailed(_ bridge: MMHybridBannerBridge?)                                
Called when ad loading fails.