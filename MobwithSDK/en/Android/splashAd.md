🌐 <a href="../ko/#/Android/splashAd">한국어 가이드</a>

## Splash AD <!-- {docsify-ignore} -->

### Definition of Splash Ad
---- 
This is an ad object for displaying ads on a splash screen.  
It displays ads over the Activity and supports two types: full-screen and bottom banner.

### How to Load Ads
---- 
You must set the UNIT_ID value issued for MobwithSplashBannerView.  
Below is an example code that sets up MobwithSplashBannerView and requests an ad.

```java
// You must provide the issued UNIT_ID for each ad view.
MobwithSplashBannerView splashBanner = new MobwithSplashBannerView(
        activity,
        unitID, // Your Ad Unit ID
        true,  // Whether it is a full-screen ad (true: full-screen, false: bottom banner)
);

// Register the listener for the banner view.
splashBanner.setAdListener(new MobwithSplashBannerView.OnSplashListener() {
    @Override
    public void onSplashAdDidReceived() {
        // Splash ad received. Display according to operation time, then move to the next screen.
    }

    @Override
    public void onSplashAdFailToReceived() {
        // Splash ad failed to receive. Immediately move to the next screen.
    }
});

// Request the ad.
splashBanner.loadAd();
```

### Banner Ad Features

| Method                                                           | Description                                      |
|:-----------------------------------------------------------------|:------------------------------------------------|
| setBannerUnitId(String unitId)                                   | Set the issued UnitId                            |
| loadAd()                                                         | Request an ad                                   |
| setAdListener(MobwithSplashBannerView.OnSplashListener listener) | Ad callback                                    |
| setTimeOutSec(int seconds)                                       | Ad request timeout time (seconds).  <br>If the ad loading is not completed within this time, the ad loading failure callback is delivered. |
| useFullScreenAd(boolean fullScreen)                             | Set ad type (true: full-screen, false: bottom banner) |
| destroy()                                                        | Release ad resources                            |

### Using Full-Screen Mode
Setting useFullScreenAd to true enables full-screen mode. The default value is false.  
* Depending on the ad size, full-screen size may not be displayed.
```java 
splashBanner.useFullScreenAd(true);
```

### Ad Request Timeout
You can set the waiting time for ad requests.  
Enter in seconds, and the default value is 5 seconds.
```java
splashBanner.setTimeOutSec(5);
```

### SplashAdListener
Implement OnSplashListener to receive callbacks for each event of the splash ad.  
For more details, please refer below.
```java
new MobwithSplashBannerView.OnSplashAdListener() {
    @Override
    public void onSplashAdDidReceived() {
        // Splash ad received. Display according to operation time, then move to the next screen.
    }

    @Override
    public void onSplashAdFailToReceived(String message) {
        // Splash ad failed to receive. Immediately move to the next screen.
    }
}

```



### Releasing Ad Resources
----
Calling the function above will initialize the ad object.  
If auto-refresh is set, that operation will also stop simultaneously.  
Therefore, it is recommended to call this when you no longer use the banner view.

```java
...
splashBanner.destroy(); // Call when no longer using Banner ads
...
```