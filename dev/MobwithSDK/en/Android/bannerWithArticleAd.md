# BannerWithArticle AD <!-- {docsify-ignore} -->

This page describes how to display a banner ad together with article content using MobwithBannerWithArticleView.<br>
Usage is the same as MobwithBannerView, so refer to [Banner AD](/Android/bannerAd.md) for details.

## Setting the Banner Ad View Size

We recommend using a FrameLayout for the banner container (ViewGroup) that displays the ad.<br>
The size of the ad is adjusted automatically depending on the ad being displayed, so please refer to the guide below to set up the layout for proper display.

| Item | Value |
|---|---|
| Height | At least 100dp (required for the ad and content to display properly) |
| Width | Follows the size of the parent view the view is added to (320dp or more recommended) |
| Recommended view size | 360x100 |

```xml
....
<FrameLayout
  android:id="@+id/bannerContainer"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  />
....
```

## How to Load Ads

To request a banner ad, you need to set up MobwithBannerWithArticleView.<br>
You must set the issued UNIT_ID value for each ad view. Below is example code that sets up MobwithBannerWithArticleView and requests an ad.

```java
FrameLayout bannerContainer = findViewById(R.id.bannerContainer);
// The UNIT_ID issued for each ad view must be set.
MobwithBannerWithArticleView banner = new MobwithBannerWithArticleView(this)
        .setBannerUnitId(YOUR_UNIT_ID);

// Register the listener for the banner view.
banner.setAdListener(new iBannerWithArticleCallback() {
    @Override
    public void onLoadedAdInfo(boolean result, String errorcode) {
        if (result) {
            // Banner ad loaded successfully
            bannerContainer.removeAllViews();
            // Insert the banner view into the layout where you want the ad to appear.
            bannerContainer.addView(banner);
        } else {
            // Behavior when ad loading fails - even if auto-refresh is set via setInterval(), it will not refresh if loading fails.
            banner.destroyAd();
            banner = null;
        }
    }

    @Override
    public void onAdClicked() {
        // Called when the ad is clicked
    }

    @Override
    public void onArticleClicked(){
        // Called when the article is clicked
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
| `setInterval(Int second)` | Ad refresh (parameter in seconds) |
| `restart()` | Restart ad refresh |
| `stop()` | Stop ad refresh |
| `destroy()` | Release ad resources |

## Ad Refresh

Using `setInterval()`, you can automatically refresh banner ads at a fixed interval.

```java
...
banner.setInterval(60); // Auto-refresh every 60 seconds
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
banner.restart(); // Restart ad auto-refresh
...
banner.stop(); // Stop ad auto-refresh
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
banner.destroyAd(); // Call this when you no longer use the Banner ad
...
```

!> When you no longer use the Banner ad, **you must call the `destroyAd()` function**.
