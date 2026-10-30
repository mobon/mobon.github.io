# Interstitial AD <!-- {docsify-ignore} -->

This page describes how to display a full-screen interstitial ad using InterstitialDialog.

## How to Load Ads

Interstitial ads work by calling `show()` at the desired time after `load()` has completed successfully.<br>
To request an interstitial ad, you need to set up InterstitialDialog, and you must set the issued UNIT_ID value for each ad view. Below is example code that sets up InterstitialDialog and requests an ad.

```java
InterstitialDialog interstitialDialog = new InterstitialDialog(activity)    // You must pass the Activity context.    
        .setBackCancel(true)    // Whether to close when the back button is clicked
        .setUnitId("Ad Unit ID")    // Set the issued UnitId
        .build();
interstitialDialog.setAdListener(new iInterstitialCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorStr) {
    new Handler(Looper.getMainLooper()).post(new Runnable() {
      @Override
      public void run() {
            if (result) {
            // On ad load success
            } else {
            // On ad load failure
          }
        }
      });
  }

  @Override
  public void onClickEvent(Key.INTERSTITIAL_KEYCODE keyCode) {
    if (keyCode == Key.INTERSTITIAL_KEYCODE.CLOSE_AD) {
        // Interstitial closed
    }
    else if (keyCode == Key.INTERSTITIAL_KEYCODE.ADCLICK) {
        // Interstitial ad clicked
    }
  }


  @Override
  public void onOpened() {
      // Interstitial opened
  }

  @Override
  public void onClosed() {
      // Interstitial closed
  }              

  @Override
  public void onFailOpened() {
    // Interstitial banner ad failed to open
  }

});

// You must load the ad before calling show().
interstitialDialog.load();
```

## Showing Ads

If the ad has loaded successfully, you can display it on screen by calling the following.

```java
if (interstitialDialog.isLoaded()) {
    interstitialDialog.show();
}
```

## Interstitial Ad Features

| Method | Description |
|---|---|
| `setUnitId(String unitId)` | Set the issued UnitId |
| `load()` | Request an ad |
| `isLoaded()` | Whether the ad request succeeded |
| `show()` | Show the ad |
| `setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel)` | Category targeting ad feature |
| `setBackCancel(boolean isUse)` | Set whether the back button closes the ad |

## In-App Landing Callback

When an in-app landing ad is clicked, the SDK passes the landing information through `onInAppLanding()` instead of opening a browser. Implement it in `iInterstitialCallback` if you want your app to handle the screen transition itself with the received information. (SDK 1.0.112 or later)

```java
...
@Override
public void onInAppLanding(Map<String, String> inAppLandingData) {
    // In-app landing information is delivered - handle the screen transition in your app
}
...
```

?> `onInAppLanding()` has a default implementation, so omitting it does not cause a compile error. Implement it if you use in-app landing ads.

## Click Event KeyCode

| KeyCode | Description |
|---|---|
| `CLOSE_AD` | When the button that closes the ad window is pressed |
| `ADCLICK` | When the ad is clicked |
