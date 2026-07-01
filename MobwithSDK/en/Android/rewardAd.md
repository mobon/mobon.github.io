🌐 <a href="../ko/#/Android/rewardAd">한국어 가이드</a>

## Reward AD <!-- {docsify-ignore} -->

### How to Load the Ad
This ad is used to grant a reward to users who watch the ad.   
Reward ads work by displaying (show) the ad at the desired time once the ad load has completed successfully.
----
```java
// We recommend passing an Activity when creating the ad object.
MobwithRewardVideoDialog rewardVideoDialog = new MobwithRewardVideoDialog(activity)     // You must pass the Activity context.
                .setUnitId("YOUR_UNIT_ID")  // Set the issued ad UnitId
                .build();

// Use iRewardAdsCallback as the Listener to receive callbacks.
rewardVideoDialog.setAdListener(new iRewardAdsCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorStr) {
      if (result) {
          // Ad loaded successfully
          Toast.makeText(MainActivity.this, "Ad load success (REWARD)", Toast.LENGTH_SHORT).show();
      } else {
          // Ad load failed
          Toast.makeText(MainActivity.this, "Ad load failed (REWARD)", Toast.LENGTH_SHORT).show();
      }
  }

  @Override
  public void onAdClicked() {
    // When the ad is clicked
  }

  @Override
  public void onOpened() {
    // When the loaded ad is displayed on screen
  }

  @Override
  public void onFailOpened() {
    // When the loaded ad fails to display on screen.
  }

  @Override
  public void onClosed() {
        // When the ad window is closed
        // If logs for MobwithRewardVideoDialog remain or the Lifecycle runs even after the ad window is closed, please call the function below (distroy()).
        rewardVideoDialog.distroy();
  }

  @Override
  public void onSkip() {
    // When the ad is skipped without watching it to the end
  }

  @Override
  public void onReward() {
    // When the reward condition for each ad is met
  }
});

// You must load the ad before calling show().
rewardVideoDialog.load();
```
### Displaying the Ad
----
```java
// When result is success in onLoadedAdInfo
// You can check whether a loaded ad exists via the isLoaded() function.
if (rewardVideoDialog.isLoaded()) {
    rewardVideoDialog.show();
}
```

### Reward Ad Features
| Method                                                          | Description           |
|:----------------------------------------------------------------|:----------------------|
| setUnitId(String unitId)                                        | Set the issued UnitId |
| load()                                                          | Request the ad        |
| isLoaded()                                                      | Whether the ad request succeeded |
| show()                                                          | Display the ad        |
| destroy()                                                       | Release ad resources  |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | Category targeting ad feature |
| close()                                                         | Close the ad          |
