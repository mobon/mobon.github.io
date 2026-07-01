🌐 [한국어 가이드](/Android/bannerAd)

## Banner AD <!-- {docsify-ignore} -->

### Defining the Banner Ad View
----
Add a view that serves as the container for the banner ad to your layout XML file.  
We recommend using FrameLayout for the banner container (ViewGroup) where the ad will be displayed.  
Since the ad size is automatically adjusted based on the ad being shown, please configure your layout according to the guide below for proper display.  

```xml
....
<FrameLayout
  android:id="@+id/bannerContainer"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"  (Set the desired height value (dp) as needed.)
  />
....
```

### How to Load an Ad
----
To request a banner ad, you need to configure MobWithBannerView.  
The UNIT_ID issued to you must be set for each ad view.  
Below is an example of configuring a BannerView and requesting an ad.  
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
| setUseHouseBanner(boolean isUse)                                | Whether to use house banner          |
| MobwithSDK.getInstance().setFullScreenMode(bollean isUse)       | Whether to use the fullscreen size feature for direct ads |
| setAdScale(int heightDp)                                        | Script ad height adjustment feature    |

### Ad Refresh
----
```java
...
bannerView.setInterval(60); // Auto-refresh every 60 seconds
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
bannerView.destroyAd(); // Call this when you no longer use the Banner ad
...
```

The two functions below let you stop or restart ad auto-refresh.  
By default, whether to auto-refresh is managed internally by the view, but you can use these functions to control it explicitly when needed.  
However, if setInterval() is set to 0, auto-refresh is disabled, so the stop/restart functions will not work.  
Also, to use these functions properly, you must set the refresh interval with setInterval() and then load the ad at least once initially.  

```java
...
bannerView.restart(); // Restart ad auto-refresh
...
```

```java
...
bannerView.stop(); // Stop ad auto-refresh
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
bannerView.destroyAd(); // Call this when you no longer use the Banner ad
...
```

### House Banner Feature
----
If an ad is currently loading or no displayable ad is available, a house banner can be shown.  
You can configure whether to use the house banner via the setUseHouseBanner() function, which defaults to false.  
When using the house banner, unlike the previous example, the banner object created must be added to the View before the ad is received.
However, even when using the house banner, once an ad has been displayed at least once, the house banner will no longer be shown afterward.  
Please refer to the details below for usage instructions.
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

### Using FullScreen Banner
----
This can be used when you want to display a direct banner ad in a form that fills the entire screen.  
You can configure whether to use Full Screen banner mode via the MobwithSDK.getInstance().setFullScreenMode() function, which defaults to false.
Note: To use Full Screen Mode, you must directly set the height of the container view that holds the banner ad to your desired size.  
Please refer to the details below for usage instructions.

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

### Script Ad Ratio Adjustment Feature
For Script-type banner ads, the ad size is automatically adjusted to fit the specified Container size.  
Note: The height (dp) of the ContainerLayout must be set.

```java
banner.setAdScale(80);  // The height of the Script-type banner ad is set to fit an 80dp height.
```

### Banner Ad Close Feature
Support for the banner ad close feature is provided.  
When this listener is registered, a close button is added to the top-left corner of the banner.

```java
banner.setCloseBtn(new MobwithBannerView.OnCloseListener() {
    @Override
    public void onAdClosed() {
        // Ad close listener
    }
});
```