# HybridBannerBridge <!-- {docsify-ignore} -->

MMHybridBannerBridge를 이용하여 하이브리드 앱(WKWebView)의 웹 페이지에 광고를 표시하는 방법을 안내합니다.

!> **Deprecated** : `MMHybridBannerBridge`의 `init(webVeiw:)`는 SDK 1.3.34부터 deprecated 되었습니다. 대신 `init(webView:)`를 사용해 주세요. 자세한 내용은 [Migration Guide](/iOS/migration-guide.md)를 참고 바랍니다.

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

아래를 참고하여 MMHybridBannerBridge를 생성한 뒤 웹뷰 설정을 진행합니다.

```swift
class ViewController: UIViewController {
    var webView: WKWebView!
    var bridge: MMHybridBannerBridge? = nil

    override func viewDidLoad() {
        super.viewDidLoad()

        ....

        bridge = MMHybridBannerBridge(webView: webView)
        bridge?.category = [
            "A0001",
            "A0002",
            "A0003",
            "A0004",
            ...
        ]
        bridge?.campaignCodes = [
            "03b7a807c94f4beeb4115a23b2a5c39a",
            "24f2e8051e044ddd867ba68ff467d8b0",
            "4b56b65279a94d059eba23ffaf0ad869",
            ...
        ]
        bridge?.adDelegate = self // MMHybridBannerBridgeDelegate 등록

        // 브릿지를 등록합니다. 광고 클릭 등의 이벤트 발생 시 자체적으로 랜딩 페이지 이동 등을 처리합니다.
        webView.configuration.userContentController.add(self, name: bridge?.bridgeName ?? "")

        webView.navigationDelegate = self
        if let url = URL(string: "{로딩할 웹 페이지 주소}") {
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
        bridge?.webViewFinishLoad(webView, isLoadAd: true)
    }
}
```

## 3. 페이지 로딩 완료 알림

페이지 로딩이 완료되면 실제 광고 로드 및 표시를 위해 아래 함수를 호출합니다.<br>
호출되면 MMHybridBannerBridge가 광고 지면을 확인하여 광고 로딩 및 표시를 자동으로 처리합니다.

```swift
// 페이지 로딩이 끝난 뒤 바로 광고 로딩을 시작하는 경우
bridge?.webViewFinishLoad(webView)

// 광고를 수동으로 요청하는 경우
bridge?.webViewFinishLoad(webView, isLoadAd: false)
```

!> 파라미터로 전달하는 `webView`는 MMHybridBannerBridge를 생성할 때 전달한 webView와 **동일한 객체**여야 합니다.

?> `isLoadAd`를 `false`로 설정해 바로 광고를 로드하지 않거나, 실제 페이지 로딩 완료 시점과 `didFinish`가 호출되는 시점이 다른 경우에는 아래 [광고 수동 요청](/iOS/HybridBannerBridge?id=광고-수동-요청)을 참고하여 별도로 광고를 요청해 주셔야 합니다.

## 4. 광고 이벤트 처리

`userContentController(_:didReceive:)` 콜백을 수신하면 `handleBridgeMessage()` 함수를 호출합니다.<br>
브릿지가 내부적으로 해당 메시지를 처리한 경우 `true`를 반환합니다.

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

`category`에 카테고리 값을 문자열 배열로 설정하여, 설정된 카테고리에 알맞은 광고를 표시할 수 있습니다.

```swift
bridge?.category = [
    "A0001",
    "A0002",
    "A0003",
    "A0004",
    ...
]
```

?> 카테고리 값은 협의된 내용을 참고하시기 바랍니다.

### 광고 캠페인 코드 설정

`campaignCodes`에 캠페인 코드를 문자열 배열로 설정하여, 해당 캠페인의 광고를 표시할 수 있습니다.

```swift
bridge?.campaignCodes = [
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
]
```

?> 캠페인 코드 값은 협의된 내용을 참고하시기 바랍니다.

## 광고 해제

`destroy()`를 호출하여 현재 로드된 광고를 제거하고 연결된 리소스를 해제할 수 있습니다.<br>
생성된 MMHybridBannerBridge를 더 이상 사용하지 않는 경우 호출하는 것을 권장합니다.

```swift
bridge?.destroy()
```

## MMHybridBannerBridgeDelegate

하이브리드 브릿지를 통해 노출된 광고의 이벤트 콜백을 전달받으려는 경우 적용합니다.

| 콜백 | 호출 시점 |
|---|---|
| `mobWithHybridBannerBridgeAdClicked(_ bridge: MMHybridBannerBridge?)` | 광고를 클릭한 경우. [광고 이벤트 처리](/iOS/HybridBannerBridge?id=_4-광고-이벤트-처리)의 `handleBridgeMessage(message)` 결과값(`true`)으로 판단해도 되고, 이 콜백으로 판단해도 됩니다. |
| `mobWithHybridBannerBridgeAdLoadFailed(_ bridge: MMHybridBannerBridge?)` | 광고 로드에 실패한 경우 |

```swift
extension ViewController: MMHybridBannerBridgeDelegate {

    func mobWithHybridBannerBridgeAdClicked(_ bridge: MMHybridBannerBridge?) {
        print(#function)
    }

    func mobWithHybridBannerBridgeAdLoadFailed(_ bridge: MMHybridBannerBridge?) {
        print(#function)
    }
}
```
