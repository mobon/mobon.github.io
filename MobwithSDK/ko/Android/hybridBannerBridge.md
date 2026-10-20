# HybridBannerBridge <!-- {docsify-ignore} -->

HybridBannerBridge를 이용하여 하이브리드 앱(WebView)의 웹 페이지에 광고를 표시하는 방법을 안내합니다.

## 1. 웹 페이지에 광고 지면 할당

아래를 참고하여 웹 페이지에 광고를 표시할 지면을 할당합니다. 아래 예시는 웹 화면 안에 광고 2개를 표시합니다.

```html
<html>
    .... 
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="05" > </div>
    
    ....
    
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="android_zone_id" data-zone-type="02" > </div>
    ....

</html>
```

| 속성 | 설명 |
|---|---|
| `class` | `mobwith-banner`로 고정하여 지정합니다. |
| `data-placement-id-ios` | 해당 지면 위치에 할당받은 iOS용 광고 지면번호를 지정합니다. |
| `data-placement-id-android` | 해당 지면 위치에 할당받은 Android용 광고 지면번호를 지정합니다. |
| `data-zone-type` | 노출할 광고 타입 코드를 지정합니다. 광고 타입 코드는 지면번호와 함께 전달됩니다. |

## 2. 브릿지 생성 및 웹뷰 설정

아래를 참고하여 HybridBannerBridge를 생성한 뒤 웹뷰 설정을 진행합니다.

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
                //광고 로딩 성공
            }

            @Override
            public void onAdLoadedFail(String msg) {
                //광고 로딩 실패
            }

            @Override
            public void onAdClicked(@NonNull String url) {
                //광고 클릭
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
                bridge.webViewFinishLoad(true); //페이지 로딩이 완료되면 즉시 광고 로딩을 시작하려면 true를, 광고를 수동으로 요청하려면 false를 파라미터로 전달합니다.
            }
        });

        webView.loadUrl("로딩할 웹 페이지 주소");
    }
}

```

## 3. 페이지 로딩 완료 알림

페이지 로딩이 완료되면(WebView의 `onPageFinished` 시점) 실제 광고 로드 및 표시를 위해 아래 함수를 호출합니다.<br>
파라미터는 광고를 배치할 WebPage의 placementId를 입력합니다.<br>
호출되면 HybridBannerBridge가 광고 지면을 확인하여 광고 로딩 및 표시를 자동으로 처리합니다.

```java
bridge.webViewFinishLoad(true);     //페이지 로딩이 완료되면 즉시 광고 로딩을 시작하려면 true를, 광고를 수동으로 요청하려면 false를 파라미터로 전달합니다.
```

?> 페이지 로딩이 완료되면 즉시 광고 로딩을 시작하려면 `true`를, 광고를 수동으로 요청하려면 `false`를 파라미터로 전달합니다. 수동 요청은 아래 [광고 수동 요청](/Android/hybridBannerBridge?id=광고-수동-요청)을 참고해 주세요.

## 광고 옵션

### 광고 수동 요청

웹 페이지에서 JavaScript `window.MobwithBridge.refresh()`를 이용하여 광고를 요청하거나 갱신할 수 있습니다.<br>
아래는 별도의 버튼을 눌러 광고를 갱신하는 예시입니다.

```html
<button type="button" onclick="window.MobwithBridge && window.MobwithBridge.refresh();">
    Load Ad
</button>
```

### 광고 카테고리 설정

category에 카테고리 값을 문자열 배열로 설정하여, 설정된 카테고리에 알맞은 광고를 표시할 수 있습니다.

```java
bridge.setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"));
```

?> 카테고리 값은 협의된 내용을 참고하시기 바랍니다.

### 광고 캠페인 코드 설정

campaignCodes에 캠페인 코드를 문자열 배열로 설정하여, 해당 캠페인의 광고를 표시할 수 있습니다.

```java
bridge.setCampaignCodes(Arrays.asList(
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
));

```

?> 캠페인 코드 값은 협의된 내용을 참고하시기 바랍니다.
