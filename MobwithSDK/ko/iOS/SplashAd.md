# Splash AD <!-- {docsify-ignore} -->

MMSplashAd를 이용하여 스플래시 화면에 광고를 표시하는 방법을 안내합니다.

## 광고 생성

MMSplashAd를 생성하고 delegate를 설정합니다.

```swift
let splashAd = MMSplashAd(viewController: self, unitId: "{전달받은 광고 지면번호}", rootView: self.view)
splashAd.delegate = self
splashAd.timeOutSec = 5

splashAd.loadAd()
```

| 파라미터 | 필수 | 설명 |
|---|---|---|
| `viewController` | 필수 | 광고가 표시될 ViewController를 전달합니다. `rootView`가 설정되지 않으면 전달받은 ViewController의 메인 view에 스플래시 광고를 표시하며, 광고가 표시되는 부분에 다른 뷰가 있으면 가려질 수 있습니다. |
| `unitId` | 필수 | 광고에서 사용할 지면번호를 전달합니다. |
| `rootView` | 선택 | SplashAd가 표시될 뷰를 전달합니다. View 크기는 해당 ViewController의 메인 View와 동일한 크기로 전달하는 것을 권장합니다. 앱 로고 등 광고로 가려지지 않기를 원하는 뷰가 있는 경우 사용을 권장합니다. |

!> `rootView`로 전달한 View의 크기 및 위치에 따라 광고가 제대로 표시되지 않을 수 있으니 주의 바랍니다.

## 광고 요청

`loadAd()`를 호출하여 광고를 로드합니다.

```swift
splashAd.loadAd()
```

광고 요청 대기 시간을 설정할 수 있습니다. 지정된 시간 내에 광고 응답을 받지 못하면 광고 로드 실패 콜백이 전달됩니다.

| 속성 | 기본값 | 설명 |
|---|---|---|
| `timeOutSec` | `5` | 광고 요청 타임아웃(초)입니다. |

```swift
splashAd.timeOutSec = 5
```

## 광고 객체 제거

`destroy()`를 호출하여 현재 광고 객체를 제거합니다.

```swift
splashAd.destroy()
```

!> 광고 로딩 중에 `destroy()`를 호출하면, 이후 광고 수신에 성공하더라도 이벤트 콜백이 전달되지 않습니다.

## MMSplashAdDelegate

MMSplashAdDelegate를 구현하여 스플래시 광고의 각 이벤트 콜백을 전달받을 수 있습니다.

| 콜백 | 호출 시점 |
|---|---|
| `mobWithSplashAdDidReceived()` | 스플래시 광고를 수신한 경우 |
| `mobWithSplashAdFailToReceived()` | 스플래시 광고 수신에 실패한 경우 |

```swift
extension SplashViewController: MMSplashAdDelegate {

    public func mobWithSplashAdDidReceived() {
        // 스플래시 광고를 수신함
    }

    public func mobWithSplashAdFailToReceived() {
        // 스플래시 광고 수신 실패
    }
}
```

## 전체 예제

광고 로딩 및 콜백 이벤트 처리는 아래를 참고 바랍니다.

?> 광고 로딩에 성공하면 일정 시간 대기한 뒤 다음 화면으로 이동하시기 바랍니다.

```swift
class SplashViewController: UIViewController {

    var splashAd: MMSplashAd?

    override func viewDidLoad() {
        super.viewDidLoad()

        splashAd = MMSplashAd.init(viewController: self, unitId: "{광고 지면번호}")
        splashAd?.delegate = self
        splashAd?.timeOutSec = 5

        splashAd?.loadAd()
    }

    func openNextVC() {
        // 다음 화면 이동 기능 구현
    }
}

extension SplashViewController: MMSplashAdDelegate {

    func mobWithSplashAdDidReceived() {
        // 광고 로딩 성공. 3초 추가 대기 후 화면 이동
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) { [weak self] in
            self?.openNextVC()
        }
    }

    func mobWithSplashAdFailToReceived() {
        // 광고 로딩 실패. 즉시 다음 화면으로 이동
        openNextVC()
    }
}
```
