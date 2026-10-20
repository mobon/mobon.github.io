🌐 <a href="../ko/#/iOS/migration-guide">한국어 가이드</a>


# API Naming Changes and Migration Guide

> Some API names in MobWithADSDKFramework have been corrected for typos as of v1.3.x.
> Full backward compatibility is maintained, and you can migrate to the new names gradually.

## 📌 Changes Summary

| Previous (Deprecated) | New Name (Recommended) | Changed Since |
|----------------------|------------------------|---------------|
| `MobWithInterstitailAd` | `MobWithInterstitialAd` | v1.3.34 |
| `MobWithIntersitialAdDelegate` | `MobWithInterstitialAdDelegate` | v1.3.34 |
| `init(webVeiw:)` | `init(webView:)` | v1.3.34 |

---

## 🔄 Migration Steps

### 1. MobWithInterstitialAd (Interstitial Ad)

#### Swift

**Existing Code (Still Works):**
```swift
import MobWithADSDKFramework

class ViewController: UIViewController {
    var interstitialAd: MobWithInterstitailAd?  // ⚠️ Deprecated warning
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        interstitialAd = MobWithInterstitailAd()
        interstitialAd?.rootViewController = self
        interstitialAd?.unitId = "YOUR_UNIT_ID"
        interstitialAd?.loadAd()
    }
}

extension ViewController: MobWithIntersitialAdDelegate {  // ⚠️ Deprecated warning
    func mobWithIntersitialAdDidReceived(_ interstitialAd: MobWithInterstitailAd?) {
        // Ad received successfully
    }
}
```

**Recommended Code (New Name):**
```swift
import MobWithADSDKFramework

class ViewController: UIViewController {
    var interstitialAd: MobWithInterstitialAd?  // ✅ Correct spelling
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        interstitialAd = MobWithInterstitialAd()
        interstitialAd?.rootViewController = self
        interstitialAd?.unitId = "YOUR_UNIT_ID"
        interstitialAd?.loadAd()
    }
}

extension ViewController: MobWithInterstitialAdDelegate {  // ✅ Correct spelling
    func mobWithIntersitialAdDidReceived(_ interstitialAd: MobWithInterstitialAd?) {
        // Ad received successfully
    }
}
```

#### Objective-C

**Existing Code (Still Works):**
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
    // Ad received successfully
}

@end
```

**Recommended Code (New Name):**
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
    // Ad received successfully
}

@end
```

---

### 2. MMHybridBannerBridge Initializer

#### Swift

**Existing Code (Still Works):**
```swift
let webView = WKWebView()
let bridge = MMHybridBannerBridge(webVeiw: webView)  // ⚠️ Deprecated (v1.3.34)
```

**Recommended Code (New Name):**
```swift
let webView = WKWebView()
let bridge = MMHybridBannerBridge(webView: webView)  // ✅ Correct spelling
```

---

## 📋 Delegate Method Changes

### MobWithInterstitialAdDelegate

All delegate method parameter types have been updated:

| Method | Previous Parameter Type | New Parameter Type |
|--------|------------------------|-------------------|
| `mobWithIntersitialAdClicked(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidReceived(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidFailToReceive(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidOpend(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidOpenFailed(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |
| `mobWithIntersitialAdDidClosed(_:)` | `MobWithInterstitailAd?` | `MobWithInterstitialAd?` |

?> **Note:** Protocol names have changed, but method names remain the same. Only parameter types need to be updated.

---

## ⚙️ Auto-Fix in Xcode

### Swift Projects

1. Build your project in Xcode (`Cmd + B`)
2. Click on the code showing deprecated warnings
3. Click the yellow warning icon or press `Cmd + Option + Enter`
4. Click the **"Fix"** button to automatically update


### Bulk Replace Across Project

1. Xcode menu: **Edit** → **Find** → **Find and Replace in Project...** (`Cmd + Shift + F`)
2. Enter search terms:
   - `MobWithInterstitailAd` → `MobWithInterstitialAd`
   - `MobWithIntersitialAdDelegate` → `MobWithInterstitialAdDelegate`
3. Click **Replace All** to update all occurrences

---

## ❓ FAQ

### Q1. What happens if I don't update my existing code?

**A:** It works perfectly. You'll only see deprecation warnings, but there are no functional issues.

```swift
// ⚠️ Shows warning but works fine
let ad = MobWithInterstitailAd()  
```

### Q2. How long can I use the old names?

**A:** They will continue to work for the foreseeable future. The old names won't be removed until a major version update (v2.0.0).

### Q3. Will I see warnings in Objective-C projects too?

**A:** Deprecation warnings may not appear in Objective-C. However, since the new names work identically, we recommend migrating as soon as convenient.

### Q4. Will updating the SDK break my existing app?

**A:** Absolutely not. 100% backward compatibility is guaranteed. Your existing code will work without any modifications.

```swift
// ✅ Old code - still works
let oldAd = MobWithInterstitailAd()

// ✅ New code - recommended
let newAd = MobWithInterstitialAd()
```

### Q5. Why were the names changed?

**A:** To correct spelling errors in class and protocol names:
- `Interstitail` → `Interstitial` (correct English spelling)
- `webVeiw` → `webView` (correct spelling)

---

## 📅 Version History

### v1.3.34
- Added `MobWithInterstitialAd` class (deprecated `MobWithInterstitailAd`)
- Added `MobWithInterstitialAdDelegate` protocol (deprecated `MobWithIntersitialAdDelegate`)
- Added `MMHybridBannerBridge.init(webView:)` (deprecated `init(webVeiw:)`)

---

## 💡 Recommended Migration Timeline

| Priority | Target | Recommended Timing |
|----------|--------|-------------------|
| 🔴 High | New projects under development | Use new names immediately |
| 🟡 Medium | Active existing projects | Next update cycle |
| 🟢 Low | Maintenance-mode projects | Before major version update |

---

!> **Important:** This document is a migration guide for API naming changes. SDK functionality and behavior remain completely unchanged.
