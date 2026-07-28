🌐 <a href="../ko/#/Android/splashAd">한국어 가이드 보기 (View Korean Guide)</a>

## Splash AD <!-- {docsify-ignore} -->

### What is a Splash Ad?
---- 
An ad object for displaying ads on the splash screen.

### How to Load an Ad
---- 
The UNIT_ID issued for MobwithSplashBannerView must be set.  
Below is example code for setting up MobwithSplashBannerView and requesting an ad.

```xml
You need to implement the layout that will display the splash ad. Below is example code.

...
<FrameLayout
    android:id="@+id/adContainer"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
/>
...

```

```java
// The UNIT_ID issued for each ad view must be set. This is required.
MobwithSplashBannerView splashBanner = new MobwithSplashBannerView(
        context,
        adContainer,  //Layout (ViewGroup) that will display the splash ad
        unitID, //Issued UNIT_ID
        true,  //Whether it is an interstitial-style ad (true: interstitial, false: bottom banner)
);

// Register the banner view's listener.
splashBanner.setAdListener(new MobwithSplashBannerView.OnSplashAdListener() {
    @Override
    public void onSplashAdDidReceived() {
        // Splash ad received; display it during the configured time, then move to the next screen
    }

    @Override
    public void onSplashAdFailToReceived(String message) {
        // Failed to receive splash ad; move to the next screen immediately
    }
});

// Request the ad.
splashBanner.loadAd();
```
### MobwithSplashBannerView Parameters

| Parameter                      | Description                                                         |
|:--------------------------|:--------------------------------------------------------------------|
| Context context           | The Activity Context from which the ad is served                                           |
| ViewGroup layoutContainer | Layout (ViewGroup) that will display the splash ad                                       |
| String unitId             | The issued UnitId                                                         |
| boolean isFullScreen      | Ad type setting (true: interstitial, false: bottom banner) |

### Banner Ad Features

| Method                                                              | Description                     |
|:-----------------------------------------------------------------|:--------------------------------|
| setBannerUnitId(String unitId)                                   | Set the issued UnitId                 |
| loadAd()                                                         | Request an ad                           |
| setAdListener(MobwithSplashBannerView.OnSplashListener listener) | Ad callback                     |
| setTimeOutSec(int seconds)                                       | Ad request timeout duration (seconds).  <br>If ad loading is not completed within this time, the ad load failure callback is delivered.               |
| setFadeDuration(long durationMs)                                       | Set fade in/out duration (ms)               |
| useFullScreenAd(boolean fullScreen)                          | Ad type setting (true: interstitial, false: bottom banner) |
| destroy()                                                        | Release ad resources                       |

### Using Full-Screen Mode
Setting useFullScreenAd to true enables full-screen mode. The default value is false.
* Depending on the ad size, full-screen size may not be displayed.
```java 
splashBanner.useFullScreenAd(true);
```

### Ad Request Timeout
You can set the ad request wait time.  
Enter the value in seconds; the default is 5 seconds.
```java
splashBanner.setTimeOutSec(5);
```

### SplashAdListener
Implement OnSplashListener to receive callbacks for each splash ad event.
See below for details.
```java
new MobwithSplashBannerView.OnSplashAdListener() {
    @Override
    public void onSplashAdDidReceived() {
        // Splash ad received; display it during the configured time, then move to the next screen
    }

    @Override
    public void onSplashAdFailToReceived(String message) {
        // Failed to receive splash ad; move to the next screen immediately
    }
}

```



### Releasing Ad Resources
----
Calling the function below resets the ad object.  
If auto-refresh is enabled, this action will also stop it.  
Therefore, it is recommended to call this when the banner view is no longer in use.

```java
...
splashBanner.destroyAd(); //Call when the Banner ad is no longer needed
...
```
