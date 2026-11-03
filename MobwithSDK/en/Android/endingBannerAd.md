# EndingBanner AD <!-- {docsify-ignore} -->

This page describes how to display an ending banner ad using EndingBannerView.

## Defining the EndingBannerView

Add a view that serves as the container for the Ending Banner ad to your layout XML file.<br>
We recommend using a FrameLayout for the banner container (ViewGroup) that displays the ad.

```xml
....
<FrameLayout
    android:id="@+id/bannerContainer"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
/>
    ....
```

## How to Load Ads

You must set the issued UNIT_ID value for EndingBannerView. Below is example code that sets up EndingBannerView and requests an ad.

!> **Add the EndingBannerView to the Container** when you receive the `onLoadedAdInfo()` callback of the `iBannerCallback` listener (when the ad has finished loading).<br>
For a Dialog, if you load the ad and add it to the Container before showing it, the screen may be drawn twice.

?> Depending on the ad type, once the ad has finished loading, the SDK removes the EndingBannerView from the parent view it was previously added to and builds the ad.<br>
If you add it to the Container before loading, it may be removed from the Container, so add it in the `onLoadedAdInfo()` callback as described above.

```java
FrameLayout bannerContainer = findViewById(R.id.bannerContainer);
// You must provide the issued UNIT_ID value for each ad view.
EndingBannerView endingBannerView = new EndingBannerView(this)
                                      .setBannerUnitId(YOUR_UNIT_ID)
                                      .setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"))
                                      .setCampaignCodes(Arrays.asList(
                                              "campaign1",
                                              "campaign2",
                                              "campaign3",
                                              ......));

// Register the listener for the banner view.
endingBannerView.setListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorcode) {
    if (result) {
       // Called when the banner ad has finished loading
       bannerContainer.removeAllViews();
       // Add the banner view to the layout where you want to display the ad
       bannerContainer.addView(endingBannerView);
    } else {
      // Called when the banner ad fails to load
        endingBannerView.destroy();
        endingBannerView = null;
    }
  }

    @Override
    public void onAdClicked() {
        // Called when the banner ad is clicked
    }
});

// Request the ad.
endingBannerView.loadAd();
```

## Banner Ad Features

| Method | Description |
|---|---|
| `setBannerUnitId(String unitId)` | Set the issued UnitId |
| `setListener(iBannerCallback listener)` | Set the ad event listener |
| `loadAd()` | Request an ad |
| `setCategory(List<String> categories)` | Category targeting ad feature |
| `setCampaignCodes(List<String> campaignCodes)` | Set targeting campaign codes |
| `performAdClick()` | Deliver an ad click event |
| `destroy()` | Release ad resources |

?> If you call `loadAd()` while an ad is loading, the call is ignored. Call it again after loading finishes and the `onLoadedAdInfo()` callback has been invoked.

## In-App Landing Callback

When an in-app landing ad is clicked, the SDK passes the landing information through `onInAppLanding()` instead of opening a browser. Implement it in `iBannerCallback` if you want your app to handle the screen transition itself with the received information. (SDK 1.0.112 or later)

```java
...
@Override
public void onInAppLanding(Map<String, String> inAppLandingData) {
    // In-app landing information is delivered - handle the screen transition in your app
}
...
```

?> `onInAppLanding()` has a default implementation, so omitting it does not cause a compile error. Implement it if you use in-app landing ads.

## Setting Ad Categories

Set category as an array of strings to display ads matching the specified categories.

```java
endingBannerView.setCategory(Arrays.asList(
     "A0001",
     "A0002",
     "A0003",
     "A0004",
...
));
```

## Setting Campaign Codes

Set campaignCodes as an array of strings to display ads for the specified campaigns.

```java
endingBannerView.setCampaignCodes(Arrays.asList(
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
));

```

?> Please refer to the agreed specifications for campaign code values.

## Releasing Ad Resources

When the ad is no longer needed, call the `destroy()` function to release ad resources.

```java
endingBannerView.destroy();
```

?> Calling `destroy()` also releases the listener you set, so you must set it again with `setListener()` before reusing the view.
