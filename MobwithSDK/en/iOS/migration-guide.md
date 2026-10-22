# Migration Guide <!-- {docsify-ignore} -->

This page describes how to migrate following the API name corrections.

?> Some API names in MobWithADSDKFramework v1.3.34 have been corrected for typos.<br>
Backward compatibility is maintained, and you can migrate to the new names gradually.

## Changes Summary

| Previous (Deprecated) | New Name (Recommended) | Changed Since |
|---|---|---|
| `MobWithInterstitailAd` | `MobWithInterstitialAd` | v1.3.34 |
| `MobWithIntersitialAdDelegate` | `MobWithInterstitialAdDelegate` | v1.3.34 |
| `mobWithIntersitialAd…` delegate methods (6) | `mobWithInterstitialAd…` | v1.3.34 |
| `init(webVeiw:)` | `init(webView:)` | v1.3.34 |

## Migration Steps

### 1. MobWithInterstitialAd (Interstitial Ad)

<!-- tabs:start -->

#### **Swift**

**Existing Code (Still Works)**

```swift
import MobWithADSDKFramework

class ViewController: UIViewController {
    var interstitialAd: MobWithInterstitailAd?  // Deprecated warning

    override func viewDidLoad() {
        super.viewDidLoad()

        interstitialAd = MobWithInterstitailAd()
        interstitialAd?.rootViewController = self
        interstitialAd?.unitId = "YOUR_UNIT_ID"
        interstitialAd?.loadAd()
    }
}

extension ViewController: MobWithIntersitialAdDelegate {  // Deprecated warning
    func mobWithIntersitialAdDidReceived(_ interstitialAd: MobWithInterstitailAd?) {  // Deprecated warning
        // Ad received successfully
    }
}
```

**Recommended Code (New Name)**

```swift
import MobWithADSDKFramework

class ViewController: UIViewController {
    var interstitialAd: MobWithInterstitialAd?  // Correct spelling

    override func viewDidLoad() {
        super.viewDidLoad()

        interstitialAd = MobWithInterstitialAd()
        interstitialAd?.rootViewController = self
        interstitialAd?.unitId = "YOUR_UNIT_ID"
        interstitialAd?.loadAd()
    }
}

extension ViewController: MobWithInterstitialAdDelegate {  // Correct spelling
    func mobWithInterstitialAdDidReceived(_ interstitialAd: MobWithInterstitialAd?) {
        // Ad received successfully
    }
}
```

#### **Objective-C**

**Existing Code (Still Works)**

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

**Recommended Code (New Name)**

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
    // Ad received successfully
}

@end
```

<!-- tabs:end -->

### 2. MMHybridBannerBridge Initializer

**Existing Code (Still Works)**

```swift
let webView = WKWebView()
let bridge = MMHybridBannerBridge(webVeiw: webView)  // Deprecated (v1.3.34)
```

**Recommended Code (New Name)**

```swift
let webView = WKWebView()
let bridge = MMHybridBannerBridge(webView: webView)  // Correct spelling
```

## Delegate Method Changes

### MobWithInterstitialAdDelegate

As of SDK 1.3.34, typos in the delegate method names have been corrected. All methods use `MobWithInterstitialAd?` as the parameter type.

| Previous (Deprecated) | New Name (Recommended) |
|---|---|
| `mobWithIntersitialAdClicked(_:)` | `mobWithInterstitialAdClicked(_:)` |
| `mobWithIntersitialAdDidReceived(_:)` | `mobWithInterstitialAdDidReceived(_:)` |
| `mobWithIntersitialAdDidFailToReceive(_:)` | `mobWithInterstitialAdDidFailToReceive(_:)` |
| `mobWithIntersitialAdDidOpend(_:)` | `mobWithInterstitialAdDidOpened(_:)` |
| `mobWithIntersitialAdDidOpenFailed(_:)` | `mobWithInterstitialAdDidOpenFailed(_:)` |
| `mobWithIntersitialAdDidClosed(_:)` | `mobWithInterstitialAdDidClosed(_:)` |

?> In addition to `Intersitial`, the spelling `Opend` → `Opened` has also been corrected in `DidOpend`.

!> Do not implement both the previous and the new method for the same event. The SDK handles this internally, but unexpected issues may occur. Please replace the previous methods with the new ones.

## Auto-Fix in Xcode

### Swift Projects

1. Build your project in Xcode. (`Cmd + B`)
2. Click the code showing the deprecation warning.
3. Click the yellow warning icon or press `Cmd + Option + Enter`.
4. Click the **Fix** button to update the code automatically.

### Bulk Replace Across the Project

1. In the Xcode menu, select Edit > Find > Find and Replace in Project... (`Cmd + Shift + F`)
2. Enter the text to find and replace in the following order.
   - `MobWithInterstitailAd` → `MobWithInterstitialAd`
   - `MobWithIntersitialAdDelegate` → `MobWithInterstitialAdDelegate`
   - `mobWithIntersitialAdDidOpend` → `mobWithInterstitialAdDidOpened`
   - `mobWithIntersitialAd` → `mobWithInterstitialAd`
3. Click **Replace All** to update all occurrences.

## FAQ

### Q1. What happens if I don't update my existing code?

It works normally. Only deprecation warnings are shown, and there are no functional issues. For delegate methods, if the new name is not implemented, the method with the previous name is still called.

```swift
// Shows a warning but works fine
let ad = MobWithInterstitailAd()
```

### Q2. How long can I use the old names?

You can continue to use them for now. You will be notified separately before they are completely removed.

### Q3. Will I see warnings in Objective-C projects too?

Deprecation warnings may not appear in Objective-C. Since the new names can be used in the same way, we recommend migrating as soon as possible.

### Q4. Will updating the SDK break my existing app?

No. Backward compatibility is maintained, so your existing code works without any modifications.

```swift
// Old code - still works
let oldAd = MobWithInterstitailAd()

// New code - recommended
let newAd = MobWithInterstitialAd()
```

### Q5. Why were the names changed?

To correct spelling errors in class and protocol names.

- `Interstitail` → `Interstitial` (correct English spelling)
- `Intersitial` → `Interstitial` (delegate protocol and methods)
- `Opend` → `Opened`
- `webVeiw` → `webView` (correct spelling)

## Version History

### v1.3.34

- Added `MobWithInterstitialAd` class (deprecated `MobWithInterstitailAd`)
- Added `MobWithInterstitialAdDelegate` protocol (deprecated `MobWithIntersitialAdDelegate`)
- Corrected the delegate method names of `MobWithInterstitialAdDelegate` to `mobWithInterstitialAd…` (deprecated `mobWithIntersitialAd…`)
- Added `MMHybridBannerBridge.init(webView:)` (deprecated `init(webVeiw:)`)

## Recommended Migration Timeline

| Priority | Target | Recommended Timing |
|---|---|---|
| High | New projects under development | Use the new names immediately |
| Medium | Actively developed existing projects | At the next update |
| Low | Projects in maintenance mode | Before the next major version update |

?> This document describes API name changes only. SDK functionality and behavior have not changed.
