# Ending AD <!-- {docsify-ignore} -->

This page describes how to display an ending ad that includes an exit button using EndingDialog.

## How to Load Ads

The ending ad banner is an ad that includes an exit button.<br>
Once `load()` completes successfully, you can call `show()` at the desired time to display it, and you can receive and handle the exit event through the listener.

To request an ending ad, you need to set up EndingDialog, and you must set the issued UNIT_ID value for each ad view. Below is example code that sets up EndingDialog and requests an ad.

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

## Showing Ads

```java
if(endingDialog.isLoaded()){
    endingDialog.show();
}
```

## Ending Ad Features

| Method | Description |
|---|---|
| `setUnitId(String unitId)` | Set the issued UnitId |
| `load()` | Request an ad |
| `isLoaded()` | Whether the ad request succeeded |
| `show()` | Show the ad |
| `setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel)` | Category targeting ad feature |
| `close()` | Close the ad |
| `setBackCancel(boolean isUse)` | Set whether the back button closes the ad |

## Click Event KeyCode

| KeyCode | Description |
|---|---|
| `CLOSE_AD` | When the button that closes the ad window is pressed |
| `ADCLICK` | When the ad is clicked |
| `CLOSE_APP` | When the app exit button is pressed |
