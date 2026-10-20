🌐 <a href="../en/#/iOS/migration-guide">View English Guide</a>


# API 이름 수정 및 마이그레이션 가이드

> MobWithADSDKFramework v1.3.x 에서 일부 API 이름의 오타가 수정되었습니다.
> 기존 코드와의 호환성은 완벽하게 유지되며, 점진적으로 새로운 이름으로 마이그레이션할 수 있습니다.

## 📌 변경 사항 요약

| 기존 (Deprecated) | 새 이름 (권장) | 변경 시기 |
|------------------|---------------|----------|
| `MobWithInterstitailAd` | `MobWithInterstitialAd` | v1.3.34 |
| `MobWithIntersitialAdDelegate` | `MobWithInterstitialAdDelegate` | v1.3.34 |
| `init(webVeiw:)` | `init(webView:)` | v1.3.34 |

---

## 🔄 마이그레이션 방법

### 1. MobWithInterstitialAd (전면 광고)

#### Swift

**기존 코드 (계속 작동함):**
```swift
import MobWithADSDKFramework

class ViewController: UIViewController {
    var interstitialAd: MobWithInterstitailAd?  // ⚠️ Deprecated 경고 표시
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        interstitialAd = MobWithInterstitailAd()
        interstitialAd?.rootViewController = self
        interstitialAd?.unitId = "YOUR_UNIT_ID"
        interstitialAd?.loadAd()
    }
}

extension ViewController: MobWithIntersitialAdDelegate {  // ⚠️ Deprecated 경고 표시
    func mobWithIntersitialAdDidReceived(_ interstitialAd: MobWithInterstitailAd?) {
        // 광고 수신 성공
    }
}
```

**권장 코드 (새 이름):**
```swift
import MobWithADSDKFramework

class ViewController: UIViewController {
    var interstitialAd: MobWithInterstitialAd?  // ✅ 올바른 철자
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        interstitialAd = MobWithInterstitialAd()
        interstitialAd?.rootViewController = self
        interstitialAd?.unitId = "YOUR_UNIT_ID"
        interstitialAd?.loadAd()
    }
}

extension ViewController: MobWithInterstitialAdDelegate {  // ✅ 올바른 철자
    func mobWithIntersitialAdDidReceived(_ interstitialAd: MobWithInterstitialAd?) {
        // 광고 수신 성공
    }
}
```

#### Objective-C

**기존 코드 (계속 작동함):**
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

**권장 코드 (새 이름):**
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

- (void)mobWithIntersitialAdDidReceived:(MobWithInterstitialAd *)interstitialAd {
    // 광고 수신 성공
}

@end
```

---

### 2. MMHybridBannerBridge 이니셜라이저

#### Swift

**기존 코드 (계속 작동함):**
```swift
let webView = WKWebView()
let bridge = MMHybridBannerBridge(webVeiw: webView)  // ⚠️ Deprecated 경고 (v1.3.34)
```

**권장 코드 (새 이름):**
```swift
let webView = WKWebView()
let bridge = MMHybridBannerBridge(webView: webView)  // ✅ 올바른 철자
```

---

## 📋 Delegate 메서드 변경사항

### MobWithInterstitialAdDelegate

모든 delegate 메서드의 파라미터 타입이 변경되었습니다:

| 메서드 | 기존 파라미터 타입 | 새 파라미터 타입 |
|--------|------------------|-----------------|
| `mobWithIntersitialAdClicked(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidReceived(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidFailToReceive(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidOpend(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidOpenFailed(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidClosed(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |

?> **참고:** 프로토콜 이름은 변경되었지만, 메서드 이름은 그대로 유지됩니다. 파라미터 타입만 변경하면 됩니다.

---

## ⚙️ Xcode에서 자동 수정하기

### Swift 프로젝트

1. Xcode에서 프로젝트를 빌드합니다 (`Cmd + B`)
2. Deprecated 경고가 표시되는 코드를 클릭합니다
3. 노란색 경고 아이콘을 클릭하거나 `Cmd + Option + Enter`를 누릅니다
4. **"Fix"** 버튼을 클릭하면 자동으로 수정됩니다


### 전체 프로젝트 일괄 수정

1. Xcode 메뉴: **Edit** → **Find** → **Find and Replace in Project...** (`Cmd + Shift + F`)
2. 찾을 내용 입력:
   - `MobWithInterstitailAd` → `MobWithInterstitialAd`
   - `MobWithIntersitialAdDelegate` → `MobWithInterstitialAdDelegate`
3. **Replace All**을 클릭하여 일괄 수정

---

## ❓ FAQ

### Q1. 기존 코드를 수정하지 않으면 어떻게 되나요?

**A:** 완벽하게 작동합니다. Deprecated 경고만 표시되며, 기능상 아무런 문제가 없습니다.

```swift
// ⚠️ 경고는 뜨지만 정상 작동
let ad = MobWithInterstitailAd()  
```

### Q2. 언제까지 기존 이름을 사용할 수 있나요?

**A:** 당분간 계속 사용 가능합니다. 완전히 제거가 되기전 별도로 안내될 예정 입니다.

### Q3. Objective-C 프로젝트에서도 경고가 표시되나요?

**A:** Objective-C에서는 deprecated 경고가 표시되지 않을 수 있습니다. 하지만 새로운 이름도 동일하게 사용 가능하므로, 가능한 한 빠른 시일 내에 마이그레이션하는 것을 권장합니다.

### Q4. 새 SDK 버전으로 업데이트하면 기존 앱이 깨지나요?

**A:** 절대 그렇지 않습니다. 100% 하위 호환성이 보장됩니다. 기존 코드는 수정 없이 그대로 작동합니다.

```swift
// ✅ 기존 코드 - 계속 작동
let oldAd = MobWithInterstitailAd()

// ✅ 새 코드 - 권장
let newAd = MobWithInterstitialAd()
```

### Q5. 왜 이름이 변경되었나요?

**A:** 클래스 및 프로토콜 이름의 철자 오류를 수정하기 위함입니다:
- `Interstitail` → `Interstitial` (올바른 영문 철자)
- `webVeiw` → `webView` (올바른 철자)

---

## 📅 변경 이력

### v1.3.x
- `MobWithInterstitialAd` 클래스 추가 (기존 `MobWithInterstitailAd` deprecated)
- `MobWithInterstitialAdDelegate` 프로토콜 추가 (기존 `MobWithIntersitialAdDelegate` deprecated)

### v1.3.34
- `MMHybridBannerBridge.init(webView:)` 추가 (기존 `init(webVeiw:)` deprecated)

---

## 💡 권장 마이그레이션 일정

| 우선순위 | 대상 | 권장 시기 |
|---------|------|----------|
| 🔴 높음 | 새로 개발하는 프로젝트 | 즉시 새 이름 사용 |
| 🟡 중간 | 활발히 개발 중인 기존 프로젝트 | 다음 업데이트 시 |
| 🟢 낮음 | 유지보수 모드 프로젝트 | 메이저 버전 업데이트 전까지 |

---


!> **중요:** 이 문서는 API 이름 변경에 대한 마이그레이션 가이드입니다. SDK의 기능이나 동작은 전혀 변경되지 않았습니다.
