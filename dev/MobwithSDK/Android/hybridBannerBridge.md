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

### 웹뷰 설정 및 MWHybridBannerBridge 등록
아래를 참고하여 MWHybridBannerBridge를 생성후, 웹뷰를 설정을 진행 합니다.

```java
public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private MWHybridBannerBridge bridge;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);

        bridge = new MWHybridBannerBridge(webView);
        bridge.setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"));

        webView.addJavascriptInterface(bridge, bridge.getBridgeName());

        bridge.requestAd("{할당 받은 광고 지면번호}");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                bridge.webViewFinishLoad(view);
            }
        });

        webView.loadUrl("로딩할 웹 페이지 주소");
    }
}

```

### 페이지 로딩 완료의 알림
페이지 로딩이 완료되면 실제 광고 로드 및 표시를 위해 아래 함수를 호출 해 줍니다.  
이때 파라메터로 전달하는 webView는 MWHybridBannerBridge를 생성할때 전달한 webview와 동일한 객체여야 합니다.

```java
bridge.webViewFinishLoad(webView);
```
위 함수가 호출되면 MWHybridBannerBridge에서 광고 지면을 확인하여, 광고 로딩 및 표시를 자동으로 처리 해 줍니다.

### 광고 미리 로딩
requestAd(placementId)를 호출하여 광고를 미리 로딩 할 수 있습니다.  
웹 페이지상에서 지정한 지면번호를 확인하여 일치하는 경우 해당 지면에 미리 로딩한 광고를 보여주게 됩니다.

```java
bridge.requestAd("{할당 받은 광고 지면번호}");
```

### 광고 카테고리 설정
category에 카테고리 값을 문자열 배열로 설정하여 설정된 카테고리에 알맞는 광고를 표시할 수 있습니다.
```java
bridge.setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"));
```
* 카테고리 값의 경우 협의된 내용을 참고 하시기 바랍니다.    