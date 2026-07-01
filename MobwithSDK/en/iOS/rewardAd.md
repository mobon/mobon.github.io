🌐 <a href="../ko/#/iOS/rewardAd">한국어 가이드</a>

## Reward AD <!-- {docsify-ignore} -->


## MobWithRewardAd
---
You can display a reward ad on screen using MobWithRewardAd.  
Through this ad, you can show ads to users and provide rewards.  
Please refer to the example below for the usage of MobWithRewardAd.



```swift
let rewardAd = MobWithRewardAd.init()
rewardAd.rootViewController = self
rewardAd.adDelegate = self
rewardAd.unitId = "{Unit ID}"

rewardAd.loadAd()
```

### loadAd()
Loads the ad.  
For interstitial banners, loading the ad and displaying it on screen are separated, and for fast display of the ad, we recommend loading the ad in advance before the point at which the ad is actually displayed.

### isLoaded()
Checks whether an ad is loaded in the object.  
Returns true if an ad is loaded, and false otherwise.  
If an ad is not loaded, calling show() will fail.

### show()
If there is a loaded ad, displays the interstitial banner on screen.  
Whether an ad is loaded can be checked via the isLoaded() function.









## MobWithRewardAdDelegate
---
This is the delegate that can receive each event of MobWithRewardAd.  
Please refer to the following for the description of each callback function.

### mobWithRewardAdDidReceived(_ rewardAd: MobWithRewardAd?)
Called when an ad is received.  
After receiving this message, you must call the show() function for the ad to be displayed.  
rewardAd is the object on which this event was called.

### mobWithRewardAdDidFailToReceive(_ rewardAd: MobWithRewardAd?)
Called when an ad could not be received.  
rewardAd is the object on which this event was called.

###  mobWithRewardAdClicked(_ rewardAd: MobWithRewardAd?)
Called when the ad is clicked.  
rewardAd is the object on which this event was called.

### mobWithRewardAdDidOpend(_ rewardAd: MobWithRewardAd?) 
Called when the ad is displayed on screen.  
rewardAd is the object on which this event was called.

### mobWithRewardAdDidOpenFailed(_ rewardAd: MobWithRewardAd?)
Called when the ad failed to be displayed on screen.  
rewardAd is the object on which this event was called.  

### mobWithRewardAdClosed(_ rewardAd: MobWithRewardAd?)
Called when an open ad is closed.  
rewardAd is the object on which this event was called.

### mobWithRewardAdCanReward(_ rewardAd: MobWithRewardAd?) 
Called when the reward provision condition is met.  
rewardAd is the object on which this event was called.
