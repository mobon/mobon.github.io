# HybridBannerBridge <!-- {docsify-ignore} -->

This page describes how to display ads on web pages in a hybrid app (WebView) using HybridBannerBridge.

## 1. Assign Ad Slots on the Web Page

Refer to the following to assign ad slots on the web page where ads will be displayed. The example below displays two ads on the web screen.

```html
<html>
    .... 
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="05" > </div>
    
    ....
    
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="02" > </div>
    ....

</html>
```

| Attribute | Description |
|---|---|
| `class` | Fixed as `mobwith-banner`. |
| `data-placement-id-ios` | The iOS placement number (Unit ID) assigned to the slot. |
| `data-placement-id-android` | The Android placement number (Unit ID) assigned to the slot. |
| `data-zone-type` | The ad type code to display. The ad type code is provided along with the placement number. |

## 2. Create the Bridge and Configure the WebView

Refer to the following to create a HybridBannerBridge and configure the WebView.

```java
public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private HybridBannerBridge bridge;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);

        bridge = HybridBannerBridge.attach(this, webView);
        bridge.setOnAdListener(new HybridBannerBridge.OnAdListener() {
            @Override
            public void onAdLoaded() {
                //Ad loaded successfully
            }

            @Override
            public void onAdLoadedFail(String msg) {
                //Ad failed to load
            }

            @Override
            public void onAdClicked(@NonNull String url) {
                //Ad clicked
            }
        });
        bridge.setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"));
        bridge.setCampaignCodes(Arrays.asList(
                "campaign1",
                "campaign2",
                "campaign3",
            ...
        ));

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                bridge.webViewFinishLoad(true);     //Pass true to start loading the ad immediately after the page finishes loading, or false to request the ad manually.
            }
        });

        webView.loadUrl("URL of the web page to load");
    }
}

```

## 3. Notify Page Load Completion

When the page finishes loading (at the WebView's `onPageFinished`), call the following function to load and display ads.<br>
When it is called, HybridBannerBridge detects the ad slots and handles ad loading and display automatically.

```java
bridge.webViewFinishLoad(true);     // Pass true to start loading ads immediately when the page finishes loading, or false to request ads manually.
```

?> Pass `true` to start loading ads immediately when the page finishes loading, or `false` to request ads manually. For manual requests, refer to [Manual Ad Request](/Android/hybridBannerBridge?id=manual-ad-request) below.

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

Set category as an array of strings to display ads matching the specified categories.

```java
bridge.setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"));
```

?> Please refer to the agreed specifications for category values.

### Setting Campaign Codes

Set campaignCodes as an array of strings to display ads for the specified campaigns.

```java
bridge.setCampaignCodes(Arrays.asList(
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
));

```

?> Please refer to the agreed specifications for campaign code values.

### In-App Landing Callback

When an in-app landing ad is clicked, the SDK passes the landing information through `onInAppLanding()` instead of opening a browser. Implement it in `HybridBannerBridge.OnAdListener` if you want your app to handle the screen transition itself with the received information. (SDK 1.0.112 or later)

```java
...
@Override
public void onInAppLanding(Map<String, String> inAppLandingData) {
    // In-app landing information is delivered - handle the screen transition in your app
}
...
```

?> `onInAppLanding()` has a default implementation, so omitting it does not cause a compile error. Implement it if you use in-app landing ads.
