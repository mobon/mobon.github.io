🌐 [한국어 가이드](/Android/pointBannerAd)

## Point Banner AD <!-- {docsify-ignore} -->
This ad view is a banner view that includes functionality and UI for providing rewards when the ad is clicked.  

The logic related to providing rewards must be implemented by the developer directly. Currently, it is designed based on a scenario where rewards are provided upon ad click or impression.
No separate reward-specific callback is provided.  

Please implement the related processing using the callback events delivered upon successful ad load and ad click.

### How to Load the Ad
----
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
