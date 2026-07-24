🌐 <a href="../ko/#/Android/endingBannerAd">한국어 가이드</a>

## Ending Banner AD <!-- {docsify-ignore} -->

### Definition of EndingBannerView
----
Add the view that acts as a container for the Ending Banner ad to your layout XML file.  
It is recommended to use a FrameLayout as the banner container (ViewGroup) where the ad will be displayed.

```xml
....
<FrameLayout
    android:id="@+id/bannerContainer"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
/>
    ....
```

### How to Load Ads
---- 
You must set the issued UNIT_ID value for EndingBannerView.  
Below is an example code for setting up EndingBannerView and requesting an ad.

**Important implementation note for EndingBannerView**  
When you receive the onLoadedAdInfo() callback from the iEndingBannerCallback listener (which indicates the ad has finished loading), add the EndingBannerView to the container.  
If you load the ad and add it to the container before showing a Dialog, the screen may be rendered twice.

```java
FrameLayout bannerContainer = findViewById(R.id.bannerContainer);
// You must set the issued UNIT_ID value for each ad view.
MobWithEndingBannerView endingBannerView = new MobWithEndingBannerView(this)
        .setBannerUnitId("Your Ad Unit ID");

// Register the listener for the banner view.
endingBannerView.setAdListener(new iEndingBannerCallback() {
    @Override
    public void onLoadedAdInfo(boolean result, String errorcode) {
        if (result) {
            // Called when the banner ad has finished loading
            bannerContainer.removeAllViews();
            // Add the banner view to the layout where you want to display the ad
            bannerContainer.addView(endingBannerView);
        } else {
            // Called when banner ad display fails - even if automatic refresh is set via setInterval(), it will not refresh after failure.
            endingBannerView.destroyAd();
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

### Banner Ad Features
| Method                                        | Description             |
|:-----------------------------------------------|:------------------------|
| setBannerUnitId(String unitId)                | Set the issued UnitId   |
| loadAd()                                      | Request an ad           |
| setCategory(List<String> categories)          | Set category targeting for ads |
| setCampaignCodes(List<String> campaignCodes)  | Set targeting campaign codes |
| performAdClick()                              | Trigger the ad click event |
| destroy()                                     | Release ad resources    |

### Setting Ad Categories
You can set the category values as a string array to display ads that match the specified categories.
```java
endingBannerView.setCategory(Arrays.asList(
     "A0001",
     "A0002",
     "A0003",
     "A0004",
...
));
```


### Setting Campaign Codes
You can set campaign codes as a string array to display ads that match the specified campaigns.
```java
endingBannerView.setCampaignCodes(Arrays.asList(
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
));

```
* Please refer to the agreed terms for the campaign code values.


### Destroy the Ad Object
When the ad is no longer needed, call the destroy() function to release the ad resources.
```java
endingBannerView.destroy();
```
