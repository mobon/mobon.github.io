# Splash AD <!-- {docsify-ignore} -->

This page describes how to display an ad on the splash screen using MobwithSplashBannerView.

## How to Load Ads

#### <span class="step-label">STEP 1</span>Implement the layout

Implement the Layout where the splash ad will be displayed. Below is example code.

```xml
...
<FrameLayout
    android:id="@+id/adContainer"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
/>
...
```

#### <span class="step-label">STEP 2</span>Create and request the ad

You must set the issued UNIT_ID value for MobwithSplashBannerView. Below is example code that sets up MobwithSplashBannerView and requests an ad.

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

## MobwithSplashBannerView Parameters

| Parameter | Description |
|---|---|
| `Context context` | The Activity Context where the ad will be displayed |
| `ViewGroup layoutContainer` | The layout (ViewGroup) where the splash ad will be displayed |
| `String unitId` | The issued UnitId |

## Banner Ad Features

| Method | Description |
|---|---|
| `setBannerUnitId(String unitId)` | Set the issued UnitId |
| `loadAd()` | Request an ad |
| `setAdListener(MobwithSplashBannerView.OnSplashListener listener)` | Ad callback |
| `setTimeOutSec(int seconds)` | Ad request timeout (seconds).<br>If the ad does not finish loading within this time, the ad load failure callback is delivered. |
| `setFadeDuration(long durationMs)` | Set the fade in/out duration (ms) |
| `destroy()` | Release ad resources |

## Ad Request Timeout

You can set the waiting time for the ad request. Enter the value in seconds; the default is 5 seconds.

```java
splashBanner.setTimeOutSec(5);
```

## SplashAdListener

Implement OnSplashListener to receive callbacks for each splash ad event.

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

## Releasing Ad Resources

Calling the function below initializes the ad object. If auto-refresh is set, it is also stopped.<br>
Therefore, we recommend calling it when the banner view is no longer used.

```java
...
splashBanner.destroyAd(); //Call when the Banner ad is no longer needed
...
```
