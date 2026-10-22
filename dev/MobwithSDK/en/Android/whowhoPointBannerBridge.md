# WhoWhoPointBannerBridge <!-- {docsify-ignore} -->

This page describes how to add the same ads as MobwithPointBannerView to WebView-based hybrid apps using MobwithWhoWhoPointBannerBridge.

## How to Load Ads

#### <span class="step-label">STEP 1</span>Create MobwithWhoWhoPointBannerBridge

Enable JavaScript in the WebView, then create a MobwithWhoWhoPointBannerBridge object.

```java
MobwithWhoWhoPointBannerBridge mobwithPointBannerBridge;
WebView mWebView;
.....

protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  .....
  
  WebSettings settings = mWebView.getSettings();
  // Set this option to true in the WebView to enable JavaScript.
  settings.setJavaScriptEnabled(true);

  // The Context requires an Activity Context.
  mobwithPointBannerBridge = new MobwithWhoWhoPointBannerBridge(this, mWebView);

  .....
}
```

#### <span class="step-label">STEP 2</span>Set the User ID and Frame Element ID

Set the User ID that identifies the user for point accrual, and the element id of the location in the web page where the ad will be displayed.

```java
// The User ID is a user identifier value used to distinguish the target for point accrual.
mobwithPointBannerBridge.setUserID("{User Id}");

// The FrameElementId is the element id value of the position where the ad will be displayed within the web page.
mobwithPointBannerBridge.setFrameElementId("{Frame Element Id}");
```

#### <span class="step-label">STEP 3</span>Set the WebViewClient

Set the WebViewClient so that `onPageLoaded()` is called when the page finishes loading.

```java
mWebView.setWebViewClient(new WebViewClient() {
  
  @Override
  public void onPageFinished(WebView view, String url) {
    super.onPageFinished(view, url);

    mobwithPointBannerBridge.onPageLoaded();
  }
  
});
```

#### <span class="step-label">STEP 4</span>Load the page

```java
mWebView.loadUrl(bannerUrl);
```

#### <span class="step-label">STEP 5</span>Call destroy()

You must call `destroy()` when the WebView and Activity using MobwithWhoWhoPointBannerBridge are destroyed. The example below calls it when the Activity is destroyed.

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    if (mobwithPointBannerBridge != null) {
        mobwithPointBannerBridge.destroy();
    }
}
```
