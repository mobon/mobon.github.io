🌐 <a href="../ko/#/Android/multiPointBannerAd">한국어 가이드</a>

## Multi Point Banner AD <!-- {docsify-ignore} -->
This ad provides the same functionality as MobwithPointBannerView, but unlike the existing view that displays only a single ad, it is a BannerView that exposes up to 5 ads in a horizontally scrollable form.  

However, some features such as whether points can be provided are handled by the SDK's internal logic.  
If you need to change this behavior, please contact us separately.

### How to Load the Ad
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

### Multi Point Banner AD Features
| Method                                                          | Description                        |
|:----------------------------------------------------------------|:-----------------------------------|
| setBannerUnitIds(String[] unitIds)                              | Set the issued UnitIds (up to 5 can be applied) |
| loadAd()                                                        | Request the ad                     |
| restart()                                                       | Restart ad refresh                 |
| stop()                                                          | Stop ad refresh                    |
| destroyAd()                                                     | Release ad resources               |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | Category targeting ad feature      |
| setRewarded(int index)                                          | Notify the SDK that points have been granted for the banner at a specific index |
