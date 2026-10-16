🌐 <a href="../ko/#/iOS/interstitailAd">한국어 가이드</a>


## Interstitial AD <!-- {docsify-ignore} -->


## MobWithInterstitialAd
---
You can display an interstitial banner on screen using MobWithInterstitialAd.  
Please refer to the example below for the usage of MobWithInterstitialAd.

> The previous names `MobWithInterstitailAd` / `MobWithIntersitialAdDelegate` are deprecated but remain usable for now. Please use the new names below for new integrations.  
> For details, see the [Migration Guide](/iOS/migration-guide.md).

```swift

let interstitialAd = MobWithInterstitialAd.init()
interstitialAd.rootViewController = self
interstitialAd.adDelegate = self
interstitialAd.unitId = "{Unit ID}"

interstitialAd.loadAd()
```

### loadAd()
Loads the ad.  
For interstitial banners, loading the ad and displaying it on screen are separated, and for fast display of the ad, we recommend loading the ad in advance before the point at which the ad is actually displayed.

### isLoaded()
Checks whether an ad is loaded in the object.  
Returns true if an ad is loaded, and false otherwise.  
If an ad is not loaded, calling show() will fail.

### show()
If there is a loaded ad, displays the interstitialAd on screen.  
Whether an ad is loaded can be checked via the isLoaded() function.

<br>
<br>


## MobWithInterstitialAdDelegate
---
This is the delegate that can receive each event of MobWithInterstitialAd.  
Please refer to the following for the description of each callback function.

?> The protocol name has changed, but the callback method names (`mobWithIntersitialAd...`) remain the same.

### mobWithIntersitialAdDidReceived(_ interstitialAd: MobWithInterstitialAd?)
Called when an ad is received.  
interstitialAd is the object on which this event was called.

### mobWithIntersitialAdDidFailToReceive(_ interstitialAd: MobWithInterstitialAd?)
Called when an ad could not be received.  
interstitialAd is the object on which this event was called.

### mobWithIntersitialAdClicked(_ interstitialAd: MobWithInterstitialAd?)
Called when the ad is clicked.  
interstitialAd is the object on which this event was called.

### mobWithIntersitialAdDidOpend(_ interstitialAd: MobWithInterstitialAd?)
Called when the ad is displayed on screen.  
interstitialAd is the object on which this event was called.

### mobWithIntersitialAdDidOpenFailed(_ interstitialAd: MobWithInterstitialAd?)
Called when the ad fails to be displayed on screen.  
interstitialAd is the object on which this event was called.

### mobWithIntersitialAdDidClosed(_ interstitialAd: MobWithInterstitialAd?)
Called when an open ad is closed.  
interstitialAd is the object on which this event was called.
