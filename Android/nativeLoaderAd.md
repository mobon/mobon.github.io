## Native Loader AD <!-- {docsify-ignore} -->
MobwithNativeAdLoader는 NativeAdView를 리스트 타입의 뷰에 노출하고자 할 때 적용 가능한 기능 입니다.

### 광고 로드 방법
먼저 광고를 불러오기 위해 MobwithNativeAdLoader를 생성 및 초기화를 진행해 줍니다.
```java
//MobwithNativeAdLoader 생성
String[] adUnitIDs = new String[] { "광고 Unit ID" };   //1개 이상의 Unit를 설정해 주어야 합니다.

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
    // 광고 클릭시
  }

});

//광고를 표시할 View 설정
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
이후 RecyclerView등 리스트 타입 View의 Adapter 클래스에서 다음과 같이 광고View를 받아와서 화면에 표시해 줍니다.
```java
@Override
public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
  
  if (position % 5 == 4) {

    // loadAD를 호출하면 이미 로드된 광고가 있거나 이미 생성된 뷰가 있는 경우 해당 View를 전달해 줍니다.
    ViewGroup adView = adLoader.loadAD(NativeAdLoaderTestActivity.this, position);
    

    // adLoader.isLoadedAd(position)을 호출하면 광고를 받아온 경우 true를 반환합니다. 해당 값을 확인후 뷰에 추가하는것을 권장드립니다.
    if (adView != null && adLoader.isLoadedAd(position) ) {
      holder.frameLayout.addView(adView);
    }
    ....
  }
  ...

}
...
```
더 자세한 사항은 Sample앱을 참고 하시기 바랍니다.