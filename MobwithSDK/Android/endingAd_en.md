🌐 [한국어 가이드](/Android/endingAd)

## Ending AD <!-- {docsify-ignore} -->

### How to Load an Ad
----
The ending ad banner is an ad type that includes an exit button.
Once the ad's load() completes successfully, you can call show() at the desired point to display it.
Additionally, you can receive and handle close events through the listener.

To request an ending ad, you need to configure `EndingDialog`.
The `UNIT_ID` issued to you must be set for each ad view.
Below is an example of configuring `EndingDialog` and requesting an ad.

```java
EndingDialog endingDialog = new EndingDialog(activity)      // You must pass the Activity context.
        .setBackCancel(false)                   // Whether to close on back button press
        .setUnitId(bannerUnitID_Interstitial)   // Set the issued UnitId
        .build();

endingDialog.setAdListener(new iInterstitialCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorStr) {
    new Handler(Looper.getMainLooper()).post(new Runnable() {
      @Override
      public void run() {
        if (result) {
            // When ad loading succeeds
        } else {
            // When ad loading fails
        }
      }
    });
  }

  @Override
  public void onClickEvent(Key.INTERSTITIAL_KEYCODE keyCode) {
    if (keyCode == Key.INTERSTITIAL_KEYCODE.CLOSE_AD) {
      // Ending - closed
    }
    else if (keyCode == Key.INTERSTITIAL_KEYCODE.ADCLICK) {
      // Ending - ad clicked
    }
    else if (keyCode == Key.INTERSTITIAL_KEYCODE.CLOSE_APP) {
      // Ending - close button clicked
      }
    }
    
    @Override
    public void onOpened() {
      // Ending ad opened
    }

    @Override
    public void onClosed() {
      // Ending ad closed
    }

    @Override
    public void onFailOpened() {
      // Ending ad failed to open
    }
  });
// The ad must be loaded before calling show().
endingDialog.load();
```

### Displaying the Ad
----
```java
if(endingDialog.isLoaded()){
    endingDialog.show();
}
```

### Ending Ad Features
| Method                                                       | Description           |
|:------------------------------------------------------------|:-----------------------|
| setUnitId(String unitId)                                  | Set the issued UnitId       |
| load()                                                        | Request an ad                 |
| isLoaded()                                                        | Whether the ad request succeeded           |
| show()                                                        | Display the ad                 |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | Category targeting ad feature        |
| close()                                                 | Close the ad                 |
| setBackCancel(boolean isUse)                          | Set whether the back button closes the ad   |

### Click Event KeyCode
| KeyCode  | Description               |
|:--------:|:--------------------------|
| CLOSE_AD | When the close button on the ad window is pressed |
| ADCLICK  | When the ad is clicked          |
| CLOSE_APP| When the app exit button is pressed      |