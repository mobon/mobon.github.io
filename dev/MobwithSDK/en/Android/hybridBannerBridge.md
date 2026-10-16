🌐 <a href="../ko/#/Android/hybridBannerBridge">한국어 가이드 보기 (View Korean Guide)</a>

## HybridBannerBridge <!-- {docsify-ignore} -->

### What is HybridBannerBridge?
----
A bridge for displaying ads in hybrid apps.

### Assigning Ad Slots to Display Ads on a Web Page
Refer to the following to assign the ad slot(s) that will display ads on the web page.
```html
<html>
    .... 
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="05" > </div>
    
    ....
    
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="02" > </div>
    ....

</html>
```

In the example above, the bridge is used to display 2 ads within the web page.

The class name of the div tag should always be set as follows:
```html
class="mobwith-banner"
```

Set data-placement-id-ios and data-placement-id-android to the placement ID assigned to that ad slot.
```html
data-placement-id-ios="{ Assigned ad placement ID (for iOS) }"
data-placement-id-android="{ Assigned ad placement ID (for Android) }"
```

Set data-zone-type to the type of ad to be displayed.  
The ad type code is provided along with the placement ID.
```html
data-zone-type="{ Ad type code }"
```


### WebView Setup and HybridBannerBridge Registration
Refer to the following to create a HybridBannerBridge and then configure the WebView.

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

        bridge = new HybridBannerBridge.attach(this, webView);
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

### Notifying Page Load Completion
When the page finishes loading (at the point of the WebView's onPageFinished), call the function below to load and display the actual ad.  
The parameter is the placementId of the WebPage where the ad will be placed.
※ Note: Manual ad request
Pass true to start loading the ad immediately after the page finishes loading, or false to request the ad manually.
```java
bridge.webViewFinishLoad(boolean shouldRequestAd);  //Pass true to start loading the ad immediately after the page finishes loading, or false to request the ad manually.
```
Once this function is called, HybridBannerBridge checks the ad slot and automatically handles ad loading and display.


### Manual ad request
You can request or refresh ads from the web page by calling 'window.MobwithBridge.refresh()' from JavaScript.  
The following example shows how to add a button that manually requests or refreshes ads when tapped.  

```swift
<button type="button" onclick="window.MobwithBridge && window.MobwithBridge.refresh();">
    Load Ad
</button>
```




### Ad Category Settings
Set category values as a string array to display ads matching the configured categories.
```java
bridge.setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"));
```
* For category values, please refer to the agreed-upon values.


### Ad Campaign Code Settings
Set campaignCodes values as a string array to display ads matching the configured campaign codes.
```java
bridge.setCampaignCodes(Arrays.asList(
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
));

```
* For campaign code values, please refer to the agreed-upon values.
