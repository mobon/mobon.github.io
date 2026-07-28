🌐 <a href="../kr/#/Android/nativeAd">한국어 가이드 보기 (View Korean Guide)</a>

## Native AD <!-- {docsify-ignore} -->

### Native Container Setup
----
MobwithNativeAdView is an AdView that binds ad data to each view after the user builds their own layout and passes that view to the SDK.

A custom native layout configuration is required.  
Below is example code for building a native layout.

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

### How to Load an Ad
----
- Based on the layout configured above, build the data to be displayed in the Custom Native Layout.
([See MobwithNativeAdView Parameter Definitions](#mobwithnativeadview-parameter-definitions))
- If the IDs of each View within the adview_container are not correctly resolved, the ad may not display properly.
- mediaContainerView must be one of the GroupView types and must contain imageViewAD.  
  Using FrameLayout for this layout is recommended.  
  This is because each external SDK that supports Native AD via mediation has different requirements for this structure.

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

### Native AD Features
| Method                                                             | Description                        |
|:----------------------------------------------------------------|:-----------------------------------|
| setUnitId(String unitId)                                        | Set the issued UnitId       |
| loadAd()                                                        | Request an ad                              |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | Category-targeted ad feature                     |
| setCategory(List<String> categories)                            | Category-targeted ad feature  |
| setCampaignCodes(List<String> campaignCodes)                    | Set targeting campaign codes   |
| performAdClicked()                                              | Trigger an ad click event |

### MobwithNativeAdView Parameter Definitions (Native Layout)

|         Parameter          | Description                                                                                                                                                |
|:-----------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
|         context         | Context                                                                                                                                                    |
|         unitId          | The issued ad unit ID                                                                                                                                           |
|      containerView      | The layout containing the views that will display the ad. (If the IDs of these views cannot be resolved, the ad may not display correctly.)                                                                            |
|  mediaViewContainerID   | The ViewGroup layout ID wrapping the ImageView that displays the ad image. <br>Using FrameLayout is recommended.<br>Depending on the ViewGroup used, media (photo, video) ads may not display, so be sure to verify ad display. |
|      adImageViewID      | The layout ID of the ImageView that displays the ad image. (Set to -1 if not used.)                                                                                               |
|    adLogoImageViewID    | The layout ID of the ImageView that displays the advertiser's logo. (Set to -1 if not used.)                                                                                                 |
|       titleViewID       | The layout ID of the TextView that displays the ad title. (Set to -1 if not used.)                                                                                                |
|    descriptionViewID    | The layout ID of the TextView that displays the ad description. (Set to -1 if not used.)                                                                                               |
|    gotoSiteButtonID     | The layout ID of the TextView that displays the message for navigating to the ad site. (Set to -1 if not used.)                                                                                       |
| infoLogoViewContainerID | The ViewGroup layout ID wrapping the ImageView that displays the ad info logo. Used for AppLovin mediation. (Set to -1 if not used.)                                                   |
|   infoLogoImageViewID   | The layout ID of the ImageView that displays the ad info logo. (Set to -1 if not used.)                                                                                           |

### When the Ad Click Button Cannot Be Used
----
```java
....
nativeAdView.performAdClicked();
....
```

Calling the method above can produce the same effect as clicking the ad.

### Sub-Layout Feature
----
- This feature allows different layouts to be applied to direct ads and network ads as needed.   

  | Parameter                                           | Description       |
  |:----------------------------------------------------|:------------------|
  | directAdViewItemModel                               | Direct ad layout        |
  | nativeAdViewItemModel                               | Network ad layout     |
- Usage is the same as above, but the parameters passed when creating MobwithNativeAdView differ.  
  Below is an example of this.
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
