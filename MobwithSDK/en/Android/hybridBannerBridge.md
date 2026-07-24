🌐 <a href="../ko/#/Android/hybridBannerBridge">한국어 가이드</a>

## HybridBannerBridge <!-- {docsify-ignore} -->

### Definition of HybridBannerBridge
----
This is a bridge for displaying ads in hybrid apps.

### Assigning Ad Slots to Display Ads on Web Pages
Refer below to assign ad slots on the web page where ads will be displayed.
```html
<html>
    .... 
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="05" > </div>
    
    ....
    
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="02" > </div>
    ....

</html>
```

The above example uses the bridge to display two ads within the web view.

The class name of the div tag should be fixed as below:
```html
class="mobwith-banner"
```

Set the data-placement-id-ios and data-placement-id-android attributes to the assigned ad unit IDs for the respective platforms:
```html
data-placement-id-ios="{ Your Ad Unit ID (iOS) }"
data-placement-id-android="{ Your Ad Unit ID (Android) }"
```

The data-zone-type attribute specifies the type of ad to be displayed.  
The ad type code is passed along with the ad unit ID.
```html
data-zone-type="{ Ad Type Code }"
```


### WebView Setup and Registering HybridBannerBridge
Refer below to create a HybridBannerBridge instance and configure the WebView.

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
                // Ad loaded successfully
            }

            @Override
            public void onAdLoadedFail(String msg) {
                // Ad failed to load
            }

            @Override
            public void onAdClicked(@NonNull String url) {
                // Ad clicked
            }
        });
        bridge.setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"));
        bridge.setCampaignCodes(Arrays.asList(
            "03b7a807c94f4beeb4115a23b2a5c39a",
            "24f2e8051e044ddd867ba68ff467d8b0",
            "4b56b65279a94d059eba23ffaf0ad869",
            ...
        ));

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                bridge.webViewFinishLoad();
            }
        });

        webView.loadUrl("{ Web Page URL }");
    }
}

```

### Notification of Page Load Completion
When the page load is complete (at WebView's onPageFinished event), call the following method to trigger actual ad loading and display.  
The parameter is the placement ID of the ad slot on the web page.

```java
bridge.webViewFinishLoad();
```
When this method is called, HybridBannerBridge automatically detects the ad slots, loads, and displays the ads accordingly.


### Setting Ad Categories
You can set the category values as a list of strings to display ads matching the specified categories.
```java
bridge.setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"));
```
* Please refer to the agreed documentation for valid category values.    


### Setting Campaign Codes
You can set campaign codes as a list of strings to display ads matching the specified campaigns.
```java
bridge.setCampaignCodes(Arrays.asList(
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
));

```
* Please refer to the agreed documentation for valid campaign code values.