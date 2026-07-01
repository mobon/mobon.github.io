🌐 <a href="../ko/#/Android/nativeLoaderAd">한국어 가이드</a>

## Native Loader AD <!-- {docsify-ignore} -->
MobwithNativeAdLoader is a feature you can apply when you want to display a NativeAdView in a list-type view.

### How to Load the Ad
----
First, create and initialize a MobwithNativeAdLoader to load the ad.
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
Then, in the Adapter class of a list-type View such as RecyclerView, retrieve the ad View and display it on screen as shown below.
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
For more details, please refer to the Sample app.
