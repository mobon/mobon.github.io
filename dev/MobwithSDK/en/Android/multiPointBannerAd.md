# MultiPointBanner AD <!-- {docsify-ignore} -->

This page describes how to display up to 5 point banner ads in a horizontal scroll using MobwithMultiPointBannerView.<br>
It provides the same features as MobwithPointBannerView in [PointBanner AD](/Android/pointBannerAd.md), but unlike the existing view that displays a single ad, it displays up to 5 ads.

?> Some features, such as whether points can be provided, are handled by internal SDK logic. If you need to change these features, please contact us separately.

## How to Load Ads

```java
LinearLayout banner_container = findViewById(R.id.banner_container);


MobwithMultiPointBannerView bannerView = new MobwithMultiPointBannerView(this)

// Ad IDs must be provided in array form as shown below, and up to 5 can be applied.
String[] bannerUnitIDs = new String[] { 
    "YOUR_UNIT_ID_1",
    "YOUR_UNIT_ID_2",
    "YOUR_UNIT_ID_3",
    "YOUR_UNIT_ID_4",
    "YOUR_UNIT_ID_5"
};
bannerView.setBannerUnitIds(bannerUnitIDs);

// Unlike before, add the ad view in advance.
banner_container.addView(bannerView);

pointBannerView.setAdListener(new iMultiPointBannerCallback() {

    @Override
    public void onLoadedAdInfo(boolean result, String errorStr) {
        // Whether the ad loaded successfully or failed is delivered here.
    }

    @Override
    public void onAdClicked(int index, boolean isRewarded) {
        // A message is delivered when the ad is clicked.
        // index : index of the clicked ad
        // isRewarded : whether the ad has already provided a reward; true if points have already been provided
        
        // Determine here whether to provide a reward, and after providing the reward, call the function below.
        pointBannerView.setRewarded(index);
    }
});


// Call the ad.
// Additionally, even if the reset criteria for whether points can be provided are met,
// if the function below is not called, the UI will not change, so please keep this in mind.
bannerView.loadAd();
```

## MultiPointBanner AD Features

| Method | Description |
|---|---|
| `setBannerUnitIds(String[] unitIds)` | Set the issued UnitIds (up to 5) |
| `loadAd()` | Request an ad |
| `restart()` | Restart ad refresh |
| `stop()` | Stop ad refresh |
| `destroyAd()` | Release ad resources |
| `setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel)` | Category targeting ad feature |
| `setRewarded(int index)` | Notify the SDK that points have been paid for the banner at the given index |
