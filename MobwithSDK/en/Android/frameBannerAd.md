# Smart Frame Banner AD <!-- {docsify-ignore} -->

This page describes how to use MobwithFrameBannerView, a banner ad that places key assets provided by the advertiser in a fixed frame structure.

## FrameBannerView Native Container Setup

In addition to Sortlist FrameAD, FrameBannerView requires a native layout to display direct ads and network ads.<br>
Below is example code for setting up the native layout.

!> When using it, **set the background color to white**.

```xml
<ConstraintLayout
android:layout_width="wrap_content"
android:layout_height="wrap_content" >

    <FrameLayout
        android:id="@+id/mediaContainerView"
        android:layout_width="300dp"
        android:layout_height="220dp"
        android:background="#ff00ff00"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent">

    </FrameLayout>
  
    <ImageView
        android:id="@+id/imageViewLogo"
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
        android:id="@+id/textViewTitle"
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
        android:id="@+id/textViewDesc"
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
        android:id="@+id/buttonGo"
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
        android:id="@+id/infoViewLayout"
        android:layout_width="15dp"
        android:layout_height="15dp"
        android:background="#ffffccff"
        android:layout_marginTop="5dp"
        android:layout_marginRight="5dp"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" >

        <ImageView
            android:id="@+id/imageViewInfo"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </FrameLayout>

</ConstraintLayout>

```

## How to Load Ads

For each parameter, refer to [MobwithFrameBannerView Parameter Definitions](/Android/frameBannerAd?id=mobwithframebannerview-parameter-definitions-native-layout).

!> If the id of each View in adview_container cannot be identified properly, the ad may not be displayed correctly.

?> mediaContainerView must be composed of one of the GroupViews and must contain imageViewAD. We also recommend using a FrameLayout for the layout.<br>
This is because each external SDK that provides Native AD through mediation has different requirements.

```java
....
frameBannerView = new MobwithFrameBannerView(
                        context,
                        (FrameLayout) findViewById(R.id.adview_container),
                        R.layout.custom_native_ad_view,
                        R.id.mediaContainerView,    // We recommend using FrameLayout. (When using another Layout, media (image, video) ads may not be displayed.)
                        R.id.imageViewAD,
                        R.id.imageViewLogo,
                        R.id.textViewTitle,
                        R.id.textViewDesc,
                        R.id.buttonGo,
                        R.id.infoViewLayout,
                        R.id.imageViewInfo);

// You must provide the issued UNIT_ID value for each ad view.
frameBannerView.setUnitId(YOUR_UNIT_ID);
// Callback for the ad request
frameBannerView.setAdListener(new iBannerCallback() {
        @Override
        public void onLoadedAdInfo ( boolean result, String errorStr){
            if (result) {
              // Ad request succeeded
            } else {
              // Ad request failed
            }
        }
    
        @Override
        public void onAdClicked() {
             // Called when the ad is clicked
        }
});

// Setting for category targeting
frameBannerView.setMobwithAdCategoryModel(new MobwithAdCategoryModel("CompanyCode", "MajorCategory", "MiddleCategory", "MinorCategory"));
// Call the ad.
frameBannerView.loadAd();
....
```

## FrameBannerView Features

| Method | Description |
|---|---|
| `setUnitId(String unitId)` | Set the issued UnitId |
| `loadAd()` | Request an ad |
| `setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel)` | Category targeting ad feature |
| `performAdClicked()` | Trigger an ad click event |

## MobwithFrameBannerView Parameter Definitions (Native Layout)

| Parameter | Description |
|---|---|
| `context` | Context |
| `containerView` | The layout that contains each View for displaying the ad (if the ID of each View cannot be identified, the ad may not display correctly). |
| `mediaViewContainerID` | The layout ID of the ViewGroup that wraps the ImageView displaying the ad image.<br>Using a FrameLayout is recommended where possible.<br>Depending on the ViewGroup, media (image, video) ads may not be displayed, so be sure to check whether the ad is displayed. |
| `adImageViewID` | The layout ID of the ImageView that displays the ad image |
| `adLogoImageViewID` | The layout ID of the ImageView that displays the advertiser logo |
| `titleViewID` | The layout ID of the TextView that displays the ad title |
| `descriptionViewID` | The layout ID of the TextView that displays the ad description |
| `gotoSiteButtonID` | The layout ID of the TextView that displays the message for navigating to the ad site |
| `infoLogoViewContainerID` | The layout ID of the ViewGroup that wraps the ImageView displaying the ad Info Logo. Used for AppLovin mediation. |
| `infoLogoImageViewID` | The layout ID of the ImageView that displays the ad Info Logo |

## Sub-Layout Feature

This feature lets you apply different layouts to direct ads and network ads as needed.<br>
Usage is the same as above, but the parameters passed at creation are different. Below is an example.

```java
....
MobwithFrameBannerView mobwithFrameBannerView = new MobwithFrameBannerView(
        context,
        mUnitId,
        containerView,
        new NativeAdViewItemModel(
                R.layout.custom_native_ad_view,
                R.id.mediaContainerView,
                R.id.imageViewAD,
                R.id.imageViewLogo,
                R.id.textViewTitle,
                R.id.textViewDesc,
                R.id.buttonGo,
                R.id.infoViewLayout,
                R.id.imageViewInfo
        ),
        new NativeAdViewItemModel(
                R.layout.custom_native_ad_view_2,
                R.id.mediaContainerView,
                R.id.imageViewAD,
                R.id.imageViewLogo,
                R.id.textViewTitle,
                R.id.textViewDesc,
                R.id.buttonGo,
                R.id.infoViewLayout,
                R.id.imageViewInfo
        ));
mobwithFrameBannerView.setUnitId(YOUR_UNIT_ID);
// Setting for category targeting
mobwithFrameBannerView.setMobwithAdCategoryModel(new MobwithAdCategoryModel("CompanyCode", "MajorCategory", "MiddleCategory", "MinorCategory"));
// Callback for the ad request
mobwithFrameBannerView.setAdListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo ( boolean result, String errorStr){
    if (result) {
      // Ad request succeeded
    } else {
      // Ad request failed
    }
  }

  @Override
  public void onAdClicked() {
    // Called when the ad is clicked
  }
});
// Call the ad.
mobwithFrameBannerView.loadAd();
....
```
