🌐 [한국어 가이드](/Android/interstitialAd)

## Interstitial AD <!-- {docsify-ignore} -->

### How to Load the Ad
----
Interstitial ads work by calling show() at the desired time after the ad load() has completed successfully.  
If the ad loads successfully, you can display it on screen by calling it as shown below.  

To request an interstitial ad, you need to configure the InterstitialDialog.  
You must set the issued UNIT_ID value for each ad view.  
Below is example code for configuring the InterstitialDialog and requesting the ad.
```java
InterstitialDialog interstitialDialog = new InterstitialDialog(activity)    // You must pass the Activity context.    
        .setBackCancel(true)    // Whether to close when the back button is clicked
        .setUnitId("Ad Unit ID")    // Set the issued UnitId
        .build();
interstitialDialog.setAdListener(new iInterstitialCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorStr) {
    new Handler(Looper.getMainLooper()).post(new Runnable() {
      @Override
      public void run() {
            if (result) {
            // On ad load success
            } else {
            // On ad load failure
          }
        }
      });
  }

  @Override
  public void onClickEvent(Key.INTERSTITIAL_KEYCODE keyCode) {
    if (keyCode == Key.INTERSTITIAL_KEYCODE.CLOSE_AD) {
        // Interstitial closed
    }
    else if (keyCode == Key.INTERSTITIAL_KEYCODE.ADCLICK) {
        // Interstitial ad clicked
    }
  }


  @Override
  public void onOpened() {
      // Interstitial opened
  }

  @Override
  public void onClosed() {
      // Interstitial closed
  }              

  @Override
  public void onFailOpened() {
    // Interstitial banner ad failed to open
  }

});

// You must load the ad before calling show().
interstitialDialog.load();
```

### Displaying the Ad
----
```java
if (interstitialDialog.isLoaded()) {
    interstitialDialog.show();
}
```

### Interstitial Ad Features
| Method                                                          | Description           |
|:----------------------------------------------------------------|:----------------------|
| setUnitId(String unitId)                                        | Set the issued UnitId |
| load()                                                          | Request the ad        |
| isLoaded()                                                      | Whether the ad request succeeded |
| show()                                                          | Display the ad        |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | Category targeting ad feature |
| close()                                                         | Close the ad          |
| setBackCancel(boolean isUse)                                    | Set whether to close the ad with the back button |

### Click Event KeyCode
| KeyCode  | Description               |
|:--------:|:--------------------------|
| CLOSE_AD | When the button to close the ad window is pressed |
| ADCLICK  | When the ad is clicked    |
