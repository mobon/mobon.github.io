🌐 <a href="../ko/#/Android/bannerWithArticleAd">한국어 가이드</a>

## BannerWithArticle AD <!-- {docsify-ignore} -->

### Setting the Size of the Banner Ad View
----
We recommend using FrameLayout for the banner container (ViewGroup) where the ad will be displayed.  

Since the ad size is automatically adjusted based on the ad being shown, please configure your layout according to the guide below for proper display.
Additionally, for the ad and content to be displayed correctly, the height of the view must be at least 100dp.  

The width follows the size of the parent view to which this view is added.  
The recommended view size is 360x100, and a width of 320dp or more is recommended.  

The usage is the same as MobwithBannerView, so please refer to [MobwithBannerView](Android/bannerAd_en) for more details.
```xml
....
<FrameLayout
  android:id="@+id/bannerContainer"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  />
....
```

### How to Load an Ad
----
To request a banner ad, you need to configure MobwithBannerWithArticleView.  

The UNIT_ID issued to you must be set for each ad view.  

Below is an example of configuring MobwithBannerWithArticleView and requesting an ad.  
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

### Banner Ad Features
| Method                                                             | Description           |
|:----------------------------------------------------------------|:----------------------|
| setBannerUnitId(String unitId)                                  | Set the issued UnitId       |
| loadAd()                                                        | Request an ad                 |
| showNextAd()                                                    | Request the next ad              |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | Category targeting ad feature        |
| setInterval(Int second)                                         | Ad refresh interval (parameter in seconds)  |
| restart()                                                       | Restart ad refresh           |
| stop()                                                          | Stop ad refresh            |
| destroy()                                                       | Release ad resources             |

### Ad Refresh
----
```java
...
banner.setInterval(60); // Auto-refresh every 60 seconds
...
```
Using this function, you can automatically refresh the banner ad at fixed time intervals.  
The refresh interval must be set in seconds, with a minimum value of 60 seconds.  

If a value smaller than 60 seconds is entered, it will automatically be applied as 60 seconds.  
However, setting the value to 0 disables the auto-refresh feature.  

The default value is 0, and after configuring it, the ad must be loaded once initially for auto-refresh to work correctly.  
Additionally, if you no longer plan to use the Banner ad, you must call the destroyAd() function.  

```java
...
banner.destroyAd(); // Call this when you no longer use the Banner ad
...
```

The two functions below let you stop or restart ad auto-refresh.

By default, whether to auto-refresh is managed internally by the view, but you can use these functions to control it explicitly when needed.  
However, if setInterval() is set to 0, auto-refresh is disabled, so the stop/restart functions will not work.  
Also, to use these functions properly, you must set the refresh interval with setInterval() and then load the ad at least once initially.

```java
...
banner.restart(); // Restart ad auto-refresh
...
```

```java
...
banner.stop(); // Stop ad auto-refresh
...
```

#### *Notes on the Ad Refresh Feature
Even if you configure the ad auto-refresh feature via setInterval(), if ad reception fails, auto-refresh may not work afterward.

In this case, please note that you need to directly call loadAd() again to properly reload the ad.


### Releasing Ad Resources
----
Calling the function above will reset the ad object.

If auto-refresh is configured, that behavior will also be stopped together.

Therefore, it is recommended to call this when you no longer plan to use the relevant banner view.

```java
...
banner.destroyAd(); // Call this when you no longer use the Banner ad
...
```