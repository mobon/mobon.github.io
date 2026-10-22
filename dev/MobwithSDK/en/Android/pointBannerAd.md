# PointBanner AD <!-- {docsify-ignore} -->

This page describes how to display a banner that includes features and UI for providing a reward when an ad is clicked, using MobwithPointBannerView.

?> The developer must implement the reward logic, which is currently designed around providing a reward when an ad is clicked or displayed.<br>
No dedicated reward callback is provided, so implement it using the callback events delivered when an ad loads successfully and when an ad is clicked.

## How to Load Ads

```java
LinearLayout banner_container = findViewById(R.id.banner_container);

// You must provide the issued UNIT_ID value for each ad view.
MobwithPointBannerView bannerView = new MobwithPointBannerView(this).setBannerUnitId(YOUR_UNIT_ID);                                            


// Set whether a reward can be provided.
// The SDK only handles controlling the related UI; the actual reward provisioning must be handled directly in the Listener below.
// The settings are as follows:
// - true  : a state where a reward can be provided
// - false : a state where a reward cannot be provided (e.g., reward already claimed, reward limit, etc.)
pointBannerView.setPointEnable(true);

pointBannerView.setAdListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorcode) {
      if (result) {
      // Banner ad loaded successfully
      System.out.println("Banner ad loading");
      // Insert the banner view into the layout where you want to display the ad.
      banner_container.addView(bannerView);
    } 
    else {
      System.out.println("Ad failed : " + errorcode);

      // Behavior on ad load failure - even if auto-refresh is set via setInterval(), it will not refresh if it fails.
      bannerView.destroyAd();
      bannerView = null;     
    }
  }

  @Override
  public void onAdClicked(int index, boolean isRewarded) {
      ...
      // Implement the actual behavior for providing the reward.
        bannerView.setRewarded(index);
      ...
  }

});

// Call the ad.
bannerView.loadAd();
```
