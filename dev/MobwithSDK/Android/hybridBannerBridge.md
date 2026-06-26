## HybridBannerBridge <!-- {docsify-ignore} -->

### HybridBannerBridge 정의
----
하이브리드 앱에 광고를 표시하기 위한 브릿지 입니다.

### 웹 페이지에 광고를 표시할 지면 할당
아래를 참고하여 웹 페이지에 광고를 표시할 지면을 할당 합니다.
```html
<html>
    .... 
    <div class="mobwith-banner" data-placement-id="1001">
    
    ....
    
    <div class="mobwith-banner" data-placement-id="1002">
    ....

</html>

```

위에서는 브릿지를 이용하여 웹 화면내 광고를 2개를 표시하게 됩니다.

div 태그의 class명은 아래와 같이 고정으로 지정해 주시면 됩니다.
```html
class="mobwith-banner"
```

data-placement-id에는 해당 지면 위치에 할당받은 지면번호를 지정 합니다.
```html
data-placement-id="{ 할당받은 광고 지면번호 }"
```

### 웹뷰 설정 및 HybridBannerBridge 등록
아래를 참고하여 HybridBannerBridge를 생성후, 웹뷰를 설정을 진행 합니다.

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

        webView.loadUrl("로딩할 웹 페이지 주소");
    }
}

```

### 페이지 로딩 완료의 알림
페이지 로딩이 완료(Webview의 onPageFinished 시점)되면 실제 광고 로드 및 표시를 위해 아래 함수를 호출 해 줍니다.  
파라미터는 광고를 배치 할 WebPage의 placementId를 입력합니다.

```java
bridge.webViewFinishLoad();
```
위 함수가 호출되면 HybridBannerBridge에서 광고 지면을 확인하여, 광고 로딩 및 표시를 자동으로 처리 해 줍니다.


### 광고 카테고리 설정
category에 카테고리 값을 문자열 배열로 설정하여 설정된 카테고리에 알맞는 광고를 표시할 수 있습니다.
```java
bridge.setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"));
```
* 카테고리 값의 경우 협의된 내용을 참고 하시기 바랍니다.    


### 광고 캠페인 코드 설정
campaignCodes 카테고리 값을 문자열 배열로 설정하여 설정된 카테고리에 알맞는 광고를 표시할 수 있습니다.
```java
bridge.setCampaignCodes(Arrays.asList(
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
));

```
* 캠페인 코드 값의 경우 협의된 내용을 참고 하시기 바랍니다.