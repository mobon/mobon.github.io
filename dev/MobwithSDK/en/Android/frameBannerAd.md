🌐 <a href="../ko/#/Android/frameBannerAd">한국어 가이드</a>

## Frame Banner AD <!-- {docsify-ignore} -->

### FrameBannerView Native Container Setup
----

MobwithFrameBannerView is an ad that displays the key assets provided by the advertiser arranged in a layout.  
It is a banner ad composed of a specified frame structure.   

In addition to Sortlist's FrameAD, FrameBannerView requires a native layout setup in order to display direct ads and network ads.  
Below is example code for setting up the native layout.   

##### Note: When using this, please set the background color to white.

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

### How to Load the Ad
----
If the id of each View within adview_container is not correctly recognized, the ad may not display correctly.  
mediaContainerView must be composed of one of the GroupViews and must have a structure that includes imageViewAD.  
Also, we recommend using FrameLayout for the layout.  
This is because the required specifications differ for each external SDK that provides Native AD among those supporting mediation.  
([See MobwithFrameBannerView parameter definitions](#mobwithframebannerview-parameter-definitions-native-layout))

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

### FrameBannerView Features
| Method                                                          | Description          |
|:----------------------------------------------------------------|:---------------------|
| setUnitId(String unitId)                                        | Set the issued UnitId |
| loadAd()                                                        | Request the ad       |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | Category targeting ad feature |
| performAdClicked()                                              | Trigger an ad click event |

### MobwithFrameBannerView Parameter Definitions (Native Layout)

|       Parameter Name    | Description                                                                                                                                                |
|:-----------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
|         context         | Context                                                                                                                                                    |
|      containerView      | The layout containing each View that will display the ad. (If the ID of each View cannot be recognized, the ad may not display correctly.)                  |
|  mediaViewContainerID   | The ViewGroup layout ID wrapping the ImageView that will display the ad Image. <br>We recommend using FrameLayout where possible.<br>Depending on the ViewGroup, media (image, video) ads may not be displayed, so be sure to verify whether the ad is displayed. |
|      adImageViewID      | The layout ID of the ImageView that will display the ad Image                                                                                              |
|    adLogoImageViewID    | The layout ID of the ImageView that will display the advertiser logo                                                                                       |
|       titleViewID       | The layout ID of the TextView that will display the ad Title                                                                                               |
|    descriptionViewID    | The layout ID of the TextView that will display the ad description                                                                                         |
|    gotoSiteButtonID     | The layout ID of the TextView that will display the message for navigating to the ad site                                                                  |
| infoLogoViewContainerID | The ViewGroup layout ID wrapping the ImageView that will display the ad Info Logo. Used for AppLovin mediation.                                             |
|   infoLogoImageViewID   | The layout ID of the ImageView that will display the ad Info Logo                                                                                          |

### Sub Layout Feature
----
This feature allows you to apply different layouts to direct ads and network ads as needed.  
The usage is the same as above, but the parameters passed when creating MobwithNativeAdView differ.  
Below is an example of this.
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
