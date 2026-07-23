


## MMHybridBannerBridge  <!-- {docsify-ignore} -->

하이브리드 앱에 광고를 표시하기 위한 브릿지 입니다.

### 웹 페이지에 광고를 표시할 지면 할당
아래를 참고하여 웹 페이지에 광고를 표시할 지면을 할당 합니다.
```html
<html>
    .... 
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="anndroid_zone_id" data-zone-type="05" > </div>
    
    ....
    
    <div class="mobwith-banner" data-placement-id-ios="ios_zone_id" data-placement-id-android="anndroid_zone_id" data-zone-type="02" > </div>
    ....

</html>

```
위에서는 브릿지를 이용하여 웹 화면내 광고를 2개를 표시하게 됩니다.

div 태그의 class명은 아래와 같이 고정으로 지정해 주시면 됩니다.
```html
class="mobwith-banner"
```

data-placement-id-ios와 data-placement-id-android에는 해당 지면 위치에 할당받은 지면번호를 지정 합니다.
```html
data-placement-id-ios="{ 할당받은 광고 지면번호 (iOS용) }"
data-placement-id-android="{ 할당받은 광고 지면번호 (Android용) }"
```

data-zone-type에는 노출할 광고 타입을 지정 합니다.  
광고 타입 코드는 지면번호와 함께 전달 됩니다.
```html
data-zone-type="{ 광고 타입 코드 }"
```



### 웹뷰 설정 및 MMHybridBannerBridge 등록
아래를 참고하여 MMHybridBannerBridge를 생성후, 웹뷰를 설정을 진행 합니다.

```swift
class ViewController: UIViewController {
    var webView: WKWebView!
    var bridge: MMHybridBannerBridge? = nil
        
    override func viewDidLoad() {
        super.viewDidLoad()
        
        ....

        bridge = MMHybridBannerBridge(webVeiw: webView)
        bridge.category = [
            "A0001",
            "A0002",
            "A0003",
            "A0004",
            ...
        ]
        bridge.campaignCodes = [
            "03b7a807c94f4beeb4115a23b2a5c39a",
            "24f2e8051e044ddd867ba68ff467d8b0",
            "4b56b65279a94d059eba23ffaf0ad869",
            ...
        ]

        // 브릿지를 등록해 줍니다.  광고 클릭등의 이벤트 발생시 자체적으로 랜딩페이지 이동 등을 처리해 줍니다.
        webView.configuration.userContentController.add(self, name: bridge?.bridgeName ?? "")
        bridge?.requestAd(placementId: "{할당 받은 광고 지면번호}")
        
        webView.navigationDelegate = self
        if let url = URL(string: "로딩할 웹 페이지 주소") {
            let request = URLRequest(url: url)
            webView.load(request)
        }

        ...
    }
}

...


extension ViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // 페이지 로딩 완료 알림
        bridge?.webViewFinishLoad(webView)
    }
}

```


### 페이지 로딩 완료의 알림
페이지 로딩이 완료되면 실제 광고 로드 및 표시를 위해 아래 함수를 호출 해 줍니다.  
이때 파라메터로 전달하는 webView는 MMHybridBannerBridge를 생성할때 전달한 webview와 동일한 객체여야 합니다.

```swift
bridge?.webViewFinishLoad(webView)
```
위 함수가 호출되면 MMHybridBannerBridge에서 광고 지면을 확인하여, 광고 로딩 및 표시를 자동으로 처리 해 줍니다.



### 광고 이벤트 처리
'userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage)' 콜백을 수신하면, 
'handleBridgeMessage()' 함수를 호출 해 줍니다.  
만약 내부적으로 해당 콜벡을 처리하게 되면 true를 넘겨줍니다.
```swift

extension ViewController: WKScriptMessageHandler {
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if bridge?.handleBridgeMessage(message) == true {
            return
        }
        
        if message.name == "mobwithPointBannerBridge" {
            if let messageBody = message.body as? [String: Any] {
                // 메시지 처리
                handleBridgeMessage(messageBody)
            }
        }
    }
    
    
}

```

### 광고 카테고리 설정
category에 카테고리 값을 문자열 배열로 설정하여 설정된 카테고리에 알맞는 광고를 표시할 수 있습니다.
```swift
bridge.category = [
    "A0001",
    "A0002",
    "A0003",
    "A0004",
    ...
]
```
* 카테고리 값의 경우 협의된 내용을 참고 하시기 바랍니다.


### 광고 캠페인 코드 설정
campaignCodes 카테고리 값을 문자열 배열로 설정하여 설정된 카테고리에 알맞는 광고를 표시할 수 있습니다.
```swift
bridge.campaignCodes = [
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
]
```
* 캠페인 코드 값의 경우 협의된 내용을 참고 하시기 바랍니다.


### MMHybridBannerBridgeDelegate
하이브리드 브릿지를 통해 노출된 광고에서 발생하는 각종 이벤트 콜백을 전달 받고자 하시는 경우 적용하시면 됩니다.

```swift
extension ViewController: MMHybridBannerBridgeDelegate {
    
    func mobWithHybridBannerBridgeAdClicked(_ bridge: MMHybridBannerBridge?) {
        print("#function")
    }
}
```

### mobWithHybridBannerBridgeAdClicked(_ bridge: MMHybridBannerBridge?)                                
광고를 클릭한 경우 전달 됩니다.
위 '광고 이벤트 처리' 항목에서 'bridge?.handleBridgeMessage(message)'의 결과값이 true인 경우를 활용하셔도 되나,
위 콜백 함수를 통하여 판단하셔도 됩니다.