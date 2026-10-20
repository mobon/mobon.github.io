# WhoWhoPointBannerBridge <!-- {docsify-ignore} -->

MobwithWhoWhoPointBannerBridge를 이용하여 웹뷰 기반의 하이브리드 앱에 MobwithPointBannerView와 동일한 광고를 추가하는 방법을 안내합니다.

## 광고 로드 방법

#### <span class="step-label">STEP 1</span>MobwithWhoWhoPointBannerBridge 생성

WebView에서 JavaScript를 사용하도록 설정한 뒤 MobwithWhoWhoPointBannerBridge 객체를 생성합니다.

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

#### <span class="step-label">STEP 2</span>User ID 및 Frame Element ID 설정

포인트 적립 대상을 구분하기 위한 User ID와, 웹 페이지 내에서 광고가 표시될 위치의 element id를 설정합니다.

```java
// User ID는 포인트 적립 대상을 구분하기 위한 사용자 구분값 입니다.
mobwithPointBannerBridge.setUserID("{User Id}");

// FrameElementId는 웹 페이지 내에서 광고가 표시될 위치의 element id 값 입니다.
mobwithPointBannerBridge.setFrameElementId("{Frame Element Id}");
```

#### <span class="step-label">STEP 3</span>WebViewClient 설정

페이지 로딩이 완료되면 `onPageLoaded()`를 호출하도록 WebViewClient를 설정합니다.

```java
mWebView.setWebViewClient(new WebViewClient() {
  
  @Override
  public void onPageFinished(WebView view, String url) {
    super.onPageFinished(view, url);

    mobwithPointBannerBridge.onPageLoaded();
  }
  
});
```

#### <span class="step-label">STEP 4</span>페이지 로딩

```java
mWebView.loadUrl(bannerUrl);
```

#### <span class="step-label">STEP 5</span>destroy() 호출

MobwithWhoWhoPointBannerBridge를 사용하는 WebView 및 Activity가 파괴되는 시점에 `destroy()`를 호출해 주셔야 합니다. 아래 예시는 Activity가 Destroy되는 시점에 호출합니다.

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    if (mobwithPointBannerBridge != null) {
        mobwithPointBannerBridge.destroy();
    }
}
```
