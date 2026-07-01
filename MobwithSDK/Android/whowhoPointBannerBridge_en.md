🌐 [한국어 가이드](/Android/whowhoPointBannerBridge)

## WhoWho Point Banner Bridge <!-- {docsify-ignore} -->
This implements the functionality needed to add the same ad as MobwithPointBannerView in a WebView-based hybrid app.  
Please refer to the instructions below for usage.

### How to Load the Ad
----

1. Create a MobwithWhoWhoPointBannerBridge object.

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

2. Set the User ID and Frame Element ID

```java
// The User ID is a user identifier value used to distinguish the target for point accrual.
mobwithPointBannerBridge.setUserID("{User Id}");

// The FrameElementId is the element id value of the position where the ad will be displayed within the web page.
mobwithPointBannerBridge.setFrameElementId("{Frame Element Id}");
```

3. Set the WebViewClient

```java
mWebView.setWebViewClient(new WebViewClient() {
  
  @Override
  public void onPageFinished(WebView view, String url) {
    super.onPageFinished(view, url);

    mobwithPointBannerBridge.onPageLoaded();
  }
  
});
```

4. Load the page

```java
mWebView.loadUrl(bannerUrl);
```

5. Call the destroy() function

You must call destroy() at the point when the WebView and Activity using MobwithWhoWhoPointBannerBridge are destroyed.  
Here, it is called at the point when the Activity is destroyed.

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    if (mobwithPointBannerBridge != null) {
        mobwithPointBannerBridge.destroy();
    }
}
```
