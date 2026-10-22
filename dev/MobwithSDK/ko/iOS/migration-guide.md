# Migration Guide <!-- {docsify-ignore} -->

API 이름 수정에 따른 마이그레이션 방법을 안내합니다.

?> MobWithADSDKFramework v1.3.34에서 일부 API 이름의 오타가 수정되었습니다.<br>
기존 코드와의 호환성은 그대로 유지되며, 점진적으로 새로운 이름으로 마이그레이션할 수 있습니다.

## 변경 사항 요약

| 기존 (Deprecated) | 새 이름 (권장) | 변경 시기 |
|---|---|---|
| `MobWithInterstitailAd` | `MobWithInterstitialAd` | v1.3.34 |
| `MobWithIntersitialAdDelegate` | `MobWithInterstitialAdDelegate` | v1.3.34 |
| `mobWithIntersitialAd…` delegate 메서드 (6개) | `mobWithInterstitialAd…` | v1.3.34 |
| `init(webVeiw:)` | `init(webView:)` | v1.3.34 |

## 마이그레이션 방법

### 1. MobWithInterstitialAd (전면 광고)

<!-- tabs:start -->

#### **Swift**

**기존 코드 (계속 작동함)**

```swift
import MobWithADSDKFramework

class ViewController: UIViewController {
    var interstitialAd: MobWithInterstitailAd?  // Deprecated 경고 표시

    override func viewDidLoad() {
        super.viewDidLoad()

        interstitialAd = MobWithInterstitailAd()
        interstitialAd?.rootViewController = self
        interstitialAd?.unitId = "YOUR_UNIT_ID"
        interstitialAd?.loadAd()
    }
}

extension ViewController: MobWithIntersitialAdDelegate {  // Deprecated 경고 표시
    func mobWithIntersitialAdDidReceived(_ interstitialAd: MobWithInterstitailAd?) {  // Deprecated 경고 표시
        // 광고 수신 성공
    }
}
```

**권장 코드 (새 이름)**

```swift
import MobWithADSDKFramework

class ViewController: UIViewController {
    var interstitialAd: MobWithInterstitialAd?  // 올바른 철자

    override func viewDidLoad() {
        super.viewDidLoad()

        interstitialAd = MobWithInterstitialAd()
        interstitialAd?.rootViewController = self
        interstitialAd?.unitId = "YOUR_UNIT_ID"
        interstitialAd?.loadAd()
    }
}

extension ViewController: MobWithInterstitialAdDelegate {  // 올바른 철자
    func mobWithInterstitialAdDidReceived(_ interstitialAd: MobWithInterstitialAd?) {
        // 광고 수신 성공
    }
}
```

#### **Objective-C**

**기존 코드 (계속 작동함)**

```objc
#import <MobWithADSDKFramework/MobWithADSDKFramework.h>

@interface ViewController () <MobWithIntersitialAdDelegate>
@property (nonatomic, strong) MobWithInterstitailAd *interstitialAd;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.interstitialAd = [[MobWithInterstitailAd alloc] init];
    self.interstitialAd.rootViewController = self;
    self.interstitialAd.unitId = @"YOUR_UNIT_ID";
    [self.interstitialAd loadAd];
}

- (void)mobWithIntersitialAdDidReceived:(MobWithInterstitailAd *)interstitialAd {
    // 광고 수신 성공
}

@end
```

**권장 코드 (새 이름)**

```objc
#import <MobWithADSDKFramework/MobWithADSDKFramework.h>

@interface ViewController () <MobWithInterstitialAdDelegate>
@property (nonatomic, strong) MobWithInterstitialAd *interstitialAd;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.interstitialAd = [[MobWithInterstitialAd alloc] init];
    self.interstitialAd.rootViewController = self;
    self.interstitialAd.unitId = @"YOUR_UNIT_ID";
    [self.interstitialAd loadAd];
}

- (void)mobWithInterstitialAdDidReceived:(MobWithInterstitialAd *)interstitialAd {
    // 광고 수신 성공
}

@end
```

<!-- tabs:end -->

### 2. MMHybridBannerBridge 이니셜라이저

**기존 코드 (계속 작동함)**

```swift
let webView = WKWebView()
let bridge = MMHybridBannerBridge(webVeiw: webView)  // Deprecated 경고 (v1.3.34)
```

**권장 코드 (새 이름)**

```swift
let webView = WKWebView()
let bridge = MMHybridBannerBridge(webView: webView)  // 올바른 철자
```

## Delegate 메서드 변경 사항

### MobWithInterstitialAdDelegate

SDK 1.3.34부터 delegate 메서드 이름의 오타가 수정되었습니다. 파라미터 타입은 모두 `MobWithInterstitialAd?`를 사용합니다.

| 기존 (Deprecated) | 새 이름 (권장) |
|---|---|
| `mobWithIntersitialAdClicked(_:)` | `mobWithInterstitialAdClicked(_:)` |
| `mobWithIntersitialAdDidReceived(_:)` | `mobWithInterstitialAdDidReceived(_:)` |
| `mobWithIntersitialAdDidFailToReceive(_:)` | `mobWithInterstitialAdDidFailToReceive(_:)` |
| `mobWithIntersitialAdDidOpend(_:)` | `mobWithInterstitialAdDidOpened(_:)` |
| `mobWithIntersitialAdDidOpenFailed(_:)` | `mobWithInterstitialAdDidOpenFailed(_:)` |
| `mobWithIntersitialAdDidClosed(_:)` | `mobWithInterstitialAdDidClosed(_:)` |

?> `DidOpend`는 `Intersitial` 외에 `Opend` → `Opened` 철자도 함께 수정되었습니다.

!> 같은 이벤트에 기존 메서드와 새 메서드를 함께 구현하지 마세요. SDK 내부에서 처리하지만 예상하지 못한 문제가 생길 수 있습니다. 기존 메서드는 새 메서드로 바꿔 주세요.

## Xcode에서 자동 수정하기

### Swift 프로젝트

1. Xcode에서 프로젝트를 빌드합니다. (`Cmd + B`)
2. Deprecated 경고가 표시되는 코드를 클릭합니다.
3. 노란색 경고 아이콘을 클릭하거나 `Cmd + Option + Enter`를 누릅니다.
4. **Fix** 버튼을 누르면 자동으로 수정됩니다.

### 전체 프로젝트 일괄 수정

1. Xcode 메뉴에서 Edit > Find > Find and Replace in Project...를 선택합니다. (`Cmd + Shift + F`)
2. 찾을 내용과 바꿀 내용을 아래 순서대로 입력합니다.
   - `MobWithInterstitailAd` → `MobWithInterstitialAd`
   - `MobWithIntersitialAdDelegate` → `MobWithInterstitialAdDelegate`
   - `mobWithIntersitialAdDidOpend` → `mobWithInterstitialAdDidOpened`
   - `mobWithIntersitialAd` → `mobWithInterstitialAd`
3. **Replace All**을 눌러 일괄 수정합니다.

## FAQ

### Q1. 기존 코드를 수정하지 않으면 어떻게 되나요?

정상적으로 동작합니다. Deprecated 경고만 표시되며, 기능상 문제는 없습니다. delegate 메서드도 새 이름으로 구현되어 있지 않으면 기존 이름의 메서드가 그대로 호출됩니다.

```swift
// 경고는 뜨지만 정상 작동
let ad = MobWithInterstitailAd()
```

### Q2. 언제까지 기존 이름을 사용할 수 있나요?

당분간 계속 사용할 수 있습니다. 완전히 제거되기 전에 별도로 안내할 예정입니다.

### Q3. Objective-C 프로젝트에서도 경고가 표시되나요?

Objective-C에서는 deprecated 경고가 표시되지 않을 수 있습니다. 새로운 이름도 동일하게 사용할 수 있으므로, 가능한 한 빨리 마이그레이션하는 것을 권장합니다.

### Q4. 새 SDK 버전으로 업데이트하면 기존 앱이 깨지나요?

아니요. 하위 호환성이 유지되므로 기존 코드는 수정 없이 그대로 동작합니다.

```swift
// 기존 코드 - 계속 작동
let oldAd = MobWithInterstitailAd()

// 새 코드 - 권장
let newAd = MobWithInterstitialAd()
```

### Q5. 왜 이름이 변경되었나요?

클래스 및 프로토콜 이름의 철자 오류를 수정하기 위해서입니다.

- `Interstitail` → `Interstitial` (올바른 영문 철자)
- `Intersitial` → `Interstitial` (delegate 프로토콜·메서드)
- `Opend` → `Opened`
- `webVeiw` → `webView` (올바른 철자)

## 변경 이력

### v1.3.34

- `MobWithInterstitialAd` 클래스 추가 (기존 `MobWithInterstitailAd` deprecated)
- `MobWithInterstitialAdDelegate` 프로토콜 추가 (기존 `MobWithIntersitialAdDelegate` deprecated)
- `MobWithInterstitialAdDelegate`의 delegate 메서드 이름을 `mobWithInterstitialAd…`로 수정 (기존 `mobWithIntersitialAd…` deprecated)
- `MMHybridBannerBridge.init(webView:)` 추가 (기존 `init(webVeiw:)` deprecated)

## 권장 마이그레이션 일정

| 우선순위 | 대상 | 권장 시기 |
|---|---|---|
| 높음 | 새로 개발하는 프로젝트 | 즉시 새 이름 사용 |
| 중간 | 활발히 개발 중인 기존 프로젝트 | 다음 업데이트 시 |
| 낮음 | 유지보수 모드 프로젝트 | 메이저 버전 업데이트 전까지 |

?> 이 문서는 API 이름 변경에 대한 안내이며, SDK의 기능과 동작은 변경되지 않았습니다.
