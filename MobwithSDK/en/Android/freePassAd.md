# FreePass AD <!-- {docsify-ignore} -->

This page describes how to use MobwithFreePassAdView to support products that hide ads for a certain period after an ad is clicked.

?> The developer must implement the control of the actual ad-free period, and the SDK provides the features needed for this.

## How to Load Ads

```java
LinearLayout banner_container = findViewById(R.id.banner_container);
// You must provide the issued UNIT_ID value for each ad view.
MobwithFreePassAdView bannerView = new MobwithFreePassAdView(context)
                                              .setBannerUnitId(YOUR_UNIT_ID);                                            

// Specify the ad media name.
// Currently the default value is 'WhoWho'. When this value is set, the '##' part in the displayed text '##와 함께하는 광고 프리패스' (Ad FreePass together with ##) at the top of the ad view is changed.
freePassAdView.setMcName("{Ad media name}");

// Apply the ad media logo image.
// The logo image is displayed at the top left of the ad area, and its height is fixed at 10dp. 
// Currently the WhoWho logo is applied by default, so if you do not set one separately, the WhoWho logo will be displayed.
freePassAdView.setMcLogoImage(getResources().getDrawable(com.mobwith.sdk.R.drawable.logo_whowho));


// Register the Listener for the FreePass banner view. Unlike MobWithBannerView, you must register iFreePassBannerCallback.
freePassAdView.setAdListener(new iFreePassBannerCallback() {
    @Override
    public void onLoadedAdInfo(boolean result, String errorStr) {
        System.out.println("[MobwithFreePassAdViewTest] onLoadedAdInfo :  "  +result);
        if (result) {
            // Ad loaded successfully
            updateUI(() -> {
                if (freePassAdView.getParent() == null) {
                    banner_container.addView(freePassAdView);
                }
            });
        }
        else {
            // Ad load failed
            clearAdView();
        }
    }

    @Override
    public void onAdClicked(Date startLandingDate) {
        // Called when the ad is clicked. Delivers the time at the moment of the ad click.
        updateLastClickedTime();
    }
});

// Call the ad.
bannerView.loadAd();
```

## FreePassAdView Features

| Method | Description |
|---|---|
| `setBannerUnitId(String unitId)` | Set the issued UnitId |
| `setMcLogoImage(Drawable logoImage)` | Set the media logo image displayed on the ad |
| `loadAd()` | Request an ad |
| `destroyAd()` | Release ad resources |
| `setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel)` | Category targeting ad feature |
| `MobwithFreePassAdView.getLastAdClickedTime(Context context)` | Last ad click time |

## Ad Click Settings

When an ad is clicked, the click time is delivered through the `onAdClicked()` callback. You can use this value to control the ad-free period.<br>
If you need to check the ad click time separately, you can retrieve it with the function below.

```java
Date clickedTime = MobwithFreePassAdView.getLastAdClickedTime(context);
```
