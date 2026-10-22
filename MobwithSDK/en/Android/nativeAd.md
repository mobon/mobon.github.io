# Native AD <!-- {docsify-ignore} -->

This page describes how to display ad data in a layout you build yourself using MobwithNativeAdView.

## Native Container Setup

MobwithNativeAdView is an AdView that, after you build a layout yourself and pass it to the SDK, binds ad data to each View.<br>
A custom native layout is required. Below is example code for building a native layout.

```xml
<ConstraintLayout
android:layout_width="wrap_content"
android:layout_height="wrap_content" >

    <FrameLayout
        android:id="@+id/mediaViewContainerID"
        android:layout_width="300dp"
        android:layout_height="220dp"
        android:background="#ff00ff00"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent">


<!--      Since mediaViewContainerID is used for video ads and adImageViewID is used for image ads, it is recommended to implement it inside this container. -->
        <ImageView 
            android:id="@+id/adImageViewID"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />

    </FrameLayout>
  
    <ImageView
        android:id="@+id/adLogoImageViewID"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:background="#ffffccff"
        android:layout_marginTop="5dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toBottomOf="@id/mediaContainerView"
        app:layout_constraintBottom_toBottomOf="parent"
        tools:ignore="MissingConstraints"
        />

    <TextView
        android:id="@+id/titleViewID"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginLeft="5dp"
        android:layout_marginRight="5dp"
        android:maxLines="1"
        android:text="{ Title }"
        android:textColor="#ff00ff"
        android:textStyle="italic"
        app:layout_constraintLeft_toRightOf="@id/imageViewLogo"
        app:layout_constraintTop_toTopOf="@id/imageViewLogo"
        app:layout_constraintRight_toLeftOf="@id/buttonGo"
        app:layout_constraintBottom_toTopOf="@id/textViewDesc"
        />

    <TextView
        android:id="@+id/descriptionViewID"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:maxLines="1"
        android:text="{ Description }"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="@id/textViewTitle"
        app:layout_constraintRight_toRightOf="@id/textViewTitle"
        app:layout_constraintTop_toBottomOf="@id/textViewTitle"
        />

    <Button
        android:id="@+id/gotoSiteButtonID"
        android:layout_width="60dp"
        android:layout_height="35dp"
        android:background="#ccffcc"
        android:text="Go"
        android:gravity="center"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="@id/imageViewLogo"
        />


    <FrameLayout
        android:id="@+id/infoLogoViewContainerID"
        android:layout_width="15dp"
        android:layout_height="15dp"
        android:background="#ffffccff"
        android:layout_marginTop="5dp"
        android:layout_marginRight="5dp"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" >

        <ImageView
            android:id="@+id/infoLogoImageViewID"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </FrameLayout>

</ConstraintLayout>

```

## How to Load Ads

Configure the data to be displayed in the Custom Native Layout based on the layout set above. For each parameter, refer to [MobwithNativeAdView Parameter Definitions](/Android/nativeAd?id=mobwithnativeadview-parameter-definitions-native-layout).

!> If the id of each View in adview_container cannot be identified properly, the ad may not be displayed correctly.

?> mediaContainerView must be composed of one of the GroupViews and must contain imageViewAD. We also recommend using a FrameLayout for the layout.<br>
This is because each external SDK that provides Native AD through mediation has different requirements.

```java
....
nativeAdView = new MobwithNativeAdView(
                        context,
                        YOUR_UNIT_ID,       //Issued ad Unit Id
                        (FrameLayout) findViewById(R.id.adview_container),  //ContainerView (ViewGroup) that will display the ad; FrameLayout is recommended 
                        R.layout.custom_native_ad_view, //Custom NativeAd layout ID implemented by the publisher
                        R.id.mediaContainerView,    //ViewGroup ID wrapping the ImageView that displays the ad image (FrameLayout recommended)
                        R.id.imageViewAD,
                        R.id.imageViewLogo,
                        R.id.textViewTitle,
                        R.id.textViewDesc,
                        R.id.buttonGo,
                        R.id.infoViewLayout,
                        R.id.imageViewInfo);

nativeAdView.setUnitId(YOUR_UNIT_ID);   // The UNIT_ID issued for each ad view must be set. This is required.
nativeAdView.setAdListener(new iBannerCallback() {
        @Override
        public void onLoadedAdInfo ( boolean result, String errorStr){
            if (result) {
                LogPrint.d("MobwithNativeAdView - Loaded AD Success");
            } else {
                LogPrint.d("MobwithNativeAdView - Loaded AD with error : " + errorStr);
            }
        }
    
        @Override
        public void onAdClicked() {
            LogPrint.d("MobwithNativeAdView - Ad Clicked");
        }
});

nativeAdView.loadAd();
....
```

## Native AD Features

| Method | Description |
|---|---|
| `setUnitId(String unitId)` | Set the issued UnitId |
| `loadAd()` | Request an ad |
| `setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel)` | Category targeting ad feature |
| `setCategory(List<String> categories)` | Category targeting ad feature |
| `setUserKey(String userKey)` | Set the issued UserKey |
| `setServiceId(String serviceId)` | Set the issued ServiceId |
| `setMediaId(String mediaId)` | Set the issued MediaId |
| `setAffordanceStyle(AffordanceStyle style)` | Set the reward Affordance style (SDK 1.0.111 or later) |
| `setCampaignCodes(List<String> campaignCodes)` | Set targeting campaign codes |
| `performAdClicked()` | Trigger an ad click event |

## MobwithNativeAdView Parameter Definitions (Native Layout)

| Parameter | Description |
|---|---|
| `context` | Context |
| `unitId` | The issued ad unit id |
| `containerView` | The layout that contains each View for displaying the ad (if the ID of each View cannot be identified, the ad may not display correctly). |
| `mediaViewContainerID` | The layout ID of the ViewGroup that wraps the ImageView displaying the ad image.<br>Using a FrameLayout is recommended where possible.<br>Depending on the ViewGroup, media (image, video) ads may not be displayed, so be sure to check whether the ad is displayed. |
| `adImageViewID` | The layout ID of the ImageView that displays the ad image (set to -1 if not used). |
| `adLogoImageViewID` | The layout ID of the ImageView that displays the advertiser logo (set to -1 if not used). |
| `titleViewID` | The layout ID of the TextView that displays the ad title (set to -1 if not used). |
| `descriptionViewID` | The layout ID of the TextView that displays the ad description (set to -1 if not used). |
| `gotoSiteButtonID` | The layout ID of the TextView that displays the message for navigating to the ad site (set to -1 if not used). |
| `infoLogoViewContainerID` | The layout ID of the ViewGroup that wraps the ImageView displaying the ad Info Logo. Used for AppLovin mediation (set to -1 if not used). |
| `infoLogoImageViewID` | The layout ID of the ImageView that displays the ad Info Logo (set to -1 if not used). |

## When the Ad Click Button Cannot Be Used

Calling the method below produces the same effect as clicking the ad.

```java
....
nativeAdView.performAdClicked();
....
```

## Main Ad Image ScaleType

This feature lets you directly specify the ScaleType for the main ad image (prevents image distortion).<br>
When set to `true`, the ScaleType you specify is applied to the main image view (`R.id.imageViewAd`).

```java
....
nativeAdView.useImageViewScaleType(true);
....
```

## Sub-Layout Feature

This feature lets you apply different layouts to direct ads and network ads as needed.

| Parameter | Description |
|---|---|
| `directAdViewItemModel` | Direct ad layout |
| `nativeAdViewItemModel` | Network ad layout |

Usage is the same as above, but the parameters passed when creating MobwithNativeAdView are different. Below is an example.

```java
....
nativeAdView = new MobwithNativeAdView(
                        context,
                        YOUR_UNIT_ID,
                        (FrameLayout) findViewById(R.id.adview_container),
                        new NativeAdViewItemModel(  //Direct ad native layout
                            R.layout.custom_native_ad_view,
                            R.id.mediaContainerView,    //FrameLayout is recommended. (Media (photo, video) ads may not display if a different layout is used.)
                            R.id.imageViewAD,
                            R.id.imageViewLogo,
                            R.id.textViewTitle,
                            R.id.textViewDesc,
                            R.id.buttonGo,
                            R.id.infoViewLayout,
                            R.id.imageViewInfo
                        ),
                        new NativeAdViewItemModel(  //Network ad native layout
                            R.layout.custom_native_ad_view_2,
                            R.id.mediaContainerView,    //FrameLayout is recommended. (Media (photo, video) ads may not display if a different layout is used.)
                            R.id.imageViewAD,
                            R.id.imageViewLogo,
                            R.id.textViewTitle,
                            R.id.textViewDesc,
                            R.id.buttonGo,
                            R.id.infoViewLayout,
                            R.id.imageViewInfo
                        )
);
nativeAdView.setUnitId(YOUR_UNIT_ID);
nativeAdView.setAdListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo ( boolean result, String errorStr){
    if (result) {
      LogPrint.d("MobwithNativeAdView - Loaded AD Success");
    } else {
      LogPrint.d("MobwithNativeAdView - Loaded AD with error : " + errorStr);
    }
  }

  @Override
  public void onAdClicked() {
    LogPrint.d("MobwithNativeAdView - Ad Clicked");
  }
});
nativeAdView.loadAd();
....
```

## Reward Banner Feature

When using the reward banner feature, you must set the UserKey, ServiceId, and MediaId issued by the operations team.

!> If **any one of UserKey, ServiceId, or MediaId is missing, the reward will not be paid.**

| Parameter | Description |
|---|---|
| `userKey` | A unique identifier that distinguishes the user |
| `mediaId` | A unique identifier that distinguishes the media (service) |
| `serviceId` | An identifier that distinguishes the location/service where the ad is displayed within the media |

```java
nativeAdView.setUserKey("Issued UserKey");
nativeAdView.setServiceId("Issued ServiceId");
nativeAdView.setMediaId("Issued MediaId");
```

### Customizing the Reward Affordance

?> Supported in SDK 1.0.111 or later.

You can change the style of the Affordance displayed on reward banners. For display conditions and methods, see [Customizing the Reward Affordance in Banner AD](/Android/bannerAd?id=customizing-the-reward-affordance).

```java
nativeAdView.setAffordanceStyle(AffordanceStyle.builder()
        .position(AffordanceView.Position.BOTTOM_LEFT)
        .sizeDp(36f)
        .textSizeDp(12f)
        .textColor(Color.BLACK)
        .backgroundColor(Color.BLUE)
        .marginDp(8)
        .build());
```

?> Changes take effect after the ad is loaded again (`loadAd()`).
