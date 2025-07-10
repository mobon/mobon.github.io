## WhoWho Point Banner Bridge <!-- {docsify-ignore} -->
웹뷰 기반의 하이브리드 앱에서 MobwithPointBannerView와 동일한 광고를 추가하기 위해 필요한 기능이 구현되어 있습니다.  
사용 방법은 아래를 참고하시면 됩니다.

### 광고 로드 방법

1. MobwithWhoWhoPointBannerBridge 객체를 생성합니다.

```java
MobwithWhoWhoPointBannerBridge mobwithPointBannerBridge;
WebView mWebView;
.....

protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  .....
  
  WebSettings settings = mWebView.getSettings();
  //JavaScript 사용을 위해 webview에서 해당 옵션을 true로 설정해 줍니다.
  settings.setJavaScriptEnabled(true);

  //Context는 Activity Context를 필요로 합니다.
  mobwithPointBannerBridge = new MobwithWhoWhoPointBannerBridge(this, mWebView);

  .....
}
```

2. User ID 및 Frame Element ID 설정

```java
// User ID는 포인트 적립 대상을 구분하기 위한 사용자 구분값 입니다.
mobwithPointBannerBridge.setUserID("{User Id}");

// FrameElementId는 웹 페이지 내에서 광고가 표시될 위치의 element id 값 입니다.
mobwithPointBannerBridge.setFrameElementId("{Frame Element Id}");
```

3. WebViewClient 설정

```java
mWebView.setWebViewClient(new WebViewClient() {
  
  @Override
  public void onPageFinished(WebView view, String url) {
    super.onPageFinished(view, url);

    mobwithPointBannerBridge.onPageLoaded();
  }
  
});
```

4. 페이지 로딩

```java
mWebView.loadUrl(bannerUrl);
```

5. destroy() 함수 호출

MobwithWhoWhoPointBannerBridge를 사용하는 WebView 및 Activity가 파괴되는 시점에 destroy() 를 호출해 주셔야 합니다.  
여기에서는 Activity가 Destroy되는 시점에 호출하고 있습니다.

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    if (mobwithPointBannerBridge != null) {
        mobwithPointBannerBridge.destroy();
    }
}
```