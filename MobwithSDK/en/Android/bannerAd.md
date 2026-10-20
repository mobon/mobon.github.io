# Banner AD <!-- {docsify-ignore} -->

This page describes how to display a banner ad using MobwithBannerView.

## Defining the Banner Ad View

Add a view that serves as the container for the banner ad to your layout XML file.<br>
We recommend using a FrameLayout for the banner container (ViewGroup) that displays the ad.<br>
The size of the ad is adjusted automatically depending on the ad being displayed, so please refer to the guide below to set up the layout for proper display.

```xml
....
<FrameLayout
  android:id="@+id/bannerContainer"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"  (Set the desired height (dp) as needed.)
  />
....
```

## How to Load Ads

To request a banner ad, you need to set up MobWithBannerView.<br>
You must set the issued UNIT_ID value for each ad view. Below is example code that sets up a BannerView and requests an ad.

```java
FrameLayout bannerContainer = findViewById(R.id.bannerContainer);
// The UNIT_ID issued for each ad view must be set.
MobWithBannerView banner = new MobwithBannerView(this)
        .setBannerUnitId(YOUR_UNIT_ID);

// Register the listener for the banner view.
banner.setAdListener(new iBannerCallback() {
    @Override
    public void onLoadedAdInfo(boolean result, String errorcode) {
        if (result) {
            // Called when the banner ad has finished loading
            bannerContainer.removeAllViews();
            // Insert the banner view into the layout where you want the ad to appear.
            bannerContainer.addView(banner);
        } else {
            // Called when the banner ad fails to display - even if auto-refresh is set via setInterval(), it will not refresh if loading fails.
            banner.destroyAd();
            banner = null;
        }
    }

    @Override
    public void onAdClicked() {
        // Called when the banner ad is clicked
    }

});

// Request the ad.
banner.loadAd();
```

## Banner Ad Features

| Method | Description |
|---|---|
| `setBannerUnitId(String unitId)` | Set the issued UnitId |
| `loadAd()` | Request an ad |
| `showNextAd()` | Request the next ad |
| `setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel)` | Category targeting ad feature |
| `setUserKey(String userKey)` | Set the issued UserKey |
| `setServiceId(String serviceId)` | Set the issued ServiceId |
| `setMediaId(String mediaId)` | Set the issued MediaId |
| `setInterval(Int second)` | Ad refresh (parameter in seconds) |
| `restart()` | Restart ad refresh |
| `stop()` | Stop ad refresh |
| `destroy()` | Release ad resources |
| `setUseHouseBanner(boolean isUse)` | Whether to use the house banner |
| `MobwithSDK.getInstance().setFullScreenMode(bollean isUse)` | Whether to use the full-screen size feature for direct ads |
| `setAdScale(int heightDp)` | Script ad height adjustment feature |

## Ad Refresh

Using `setInterval()`, you can automatically refresh banner ads at a fixed interval.

```java
...
bannerView.setInterval(60); // Auto-refresh every 60 seconds
...
```

| Item | Value |
|---|---|
| Unit | Seconds |
| Minimum | 60 seconds (values smaller than 60 are automatically applied as 60 seconds) |
| Default | 0 (setting it to 0 disables auto-refresh) |

?> You must load the ad once after setting the interval for auto-refresh to work properly.

You can stop or restart ad auto-refresh using the two functions below.<br>
By default, the view manages auto-refresh internally, but you can use these when you need to control it explicitly.

```java
...
bannerView.restart(); // Restart ad auto-refresh
...
bannerView.stop(); // Stop ad auto-refresh
...
```

?> If `setInterval()` is set to 0, auto-refresh is disabled, so the stop/restart functions do not work.<br>
To use the stop/restart functions properly, set the refresh interval with `setInterval()` and then load the ad once.

!> Even if you set auto-refresh with `setInterval()`, auto-refresh may stop working after an ad fails to be received.<br>
In this case, you must call `loadAd()` again yourself to reload the ad properly.

## Releasing Ad Resources

Calling the function below initializes the ad object. If auto-refresh is set, it is also stopped.

```java
...
bannerView.destroyAd(); // Call this when you no longer use the Banner ad
...
```

!> When you no longer use the Banner ad, **you must call the `destroyAd()` function**.

## House Banner Feature

While an ad is loading or when there is no ad available to display, a house banner can be displayed.<br>
You can set whether to use the house banner via `setUseHouseBanner()`, and the default value is `false`.<br>
When using the house banner, unlike the previous example, you must add the banner object to the View before the ad is received.

?> Even when using the house banner, once an ad has been displayed at least once, the house banner is no longer displayed afterward.

```java
    MobWithBannerView banner = new MobwithBannerView(this)
        .setBannerUnitId(YOUR_UNIT_ID)
// Enable house banner usage, default is false.
  banner.setUseHouseBanner(true);

// Insert the banner view into the layout where you want the ad to appear.
  banner_container.addView(banner);

// Register the listener for the banner view.
  banner.setAdListener(new iBannerCallback() {
    @Override
    public void onLoadedAdInfo(boolean result, String errorcode) {
        if (result) {
            // Called when the banner ad has finished loading
        } else {
            // Called when the banner ad fails to load
        }
    }

    @Override
    public void onAdClicked() {
        // Called when the banner ad is clicked
    }

});

        // Request the ad.
banner.loadAd();
```

## Using the FullScreen Banner

You can use this when you want to display a banner direct ad so that it fills the screen.<br>
You can set whether to use the Full Screen banner via `MobwithSDK.getInstance().setFullScreenMode()`, and the default value is `false`.

!> To use Full Screen Mode, you must **set the height of the container view** that will contain the banner ad to the desired size yourself.

```java
MobwithSDK.getInstance().setFullScreenMode(true);
```

```xml
....
<FrameLayout
    android:id="@+id/bannerContainer"
    android:layout_width="match_parent"
    android:layout_height="Set to your desired size (e.g.: 60dp)"
/>
....
```

## Script Ad Ratio Adjustment

For Script-type banner ads, the ad size is adjusted automatically to fit the specified Container size.

!> You **must set the height (dp)** of the ContainerLayout.

```java
banner.setAdScale(80);  // The height of the Script-type banner ad is set to fit an 80dp height.
```

## Banner Ad Close Feature

The banner ad close feature is supported. When you register this listener, a close button is added to the top-left of the banner.

```java
banner.setCloseBtn(new MobwithBannerView.OnCloseListener() {
    @Override
    public void onAdClosed() {
        // Ad close listener
    }
});
```

## Reward Banner Feature

When using the reward banner feature, you must set the UserKey, ServiceId, and MediaId issued by the operations team.

!> If **any one of UserKey, ServiceId, or MediaId is missing, the reward will not be paid.**

| Parameter | Description |
|---|---|
| `userKey` | A unique identifier that distinguishes the user |
| `mediaId` | A unique identifier that distinguishes the media (service) |
| `serviceId` | An identifier that distinguishes the location/service where the ad is displayed within the media |

```java
banner.setUserKey("Set the UserKey");
banner.setServiceId("Set the ServiceId");
banner.setMediaId("Set the MediaId");
```
