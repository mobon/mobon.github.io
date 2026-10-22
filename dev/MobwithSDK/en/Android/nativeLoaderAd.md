# Native Loader AD <!-- {docsify-ignore} -->

This page describes how to display native ads in list-type views such as RecyclerView using MobwithNativeAdLoader.

## How to Load Ads

#### <span class="step-label">STEP 1</span>Create and initialize MobwithNativeAdLoader

To load ads, create MobwithNativeAdLoader and set the View for displaying ads.

```java
// Create MobwithNativeAdLoader
String[] adUnitIDs = new String[] { "Ad Unit ID" };   // You must set one or more Units.

MobwithNativeAdLoader adLoader = new MobwithNativeAdLoader(this, adUnitIDs);
adLoader.setAdListener(new iNativeBannerCallback() {

  @Override
  public void onLoadedAd(int index, boolean result, String errorStr) {
    if (result) {
      RecyclerView recyclerView = (RecyclerView)findViewById(R.id.recyclerView);
      recyclerView.getAdapter().notifyItemChanged(index);
    }
    ...
  }

  @Override
  public void onAdClicked(int index) {
    // On ad click
  }

});

// Set the View that will display the ad
adLoader.setNativeADView(this,
      R.layout.custom_native_ad_view,
      R.id.mediaContainerView,
      R.id.imageViewAD,
      R.id.imageViewLogo,
      R.id.textViewTitle,
      R.id.textViewDesc,
      R.id.buttonGo,
      R.id.infoViewLayout,
      R.id.imageViewInfo);

.......
```

#### <span class="step-label">STEP 2</span>Display ads in the list

In the Adapter class of a list-type View such as RecyclerView, get the ad View as shown below and display it on screen.

```java
@Override
public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
  
  if (position % 5 == 4) {

    // When loadAD is called, if there is an already-loaded ad or an already-created view, that View is returned.
    ViewGroup adView = adLoader.loadAD(NativeAdLoaderTestActivity.this, position);
    

    // Calling adLoader.isLoadedAd(position) returns true if the ad has been retrieved. We recommend checking this value before adding it to the view.
    if (adView != null && adLoader.isLoadedAd(position) ) {
      holder.frameLayout.addView(adView);
    }
    ....
  }
  ...

}
...
```

?> For more details, please refer to the Sample app.
