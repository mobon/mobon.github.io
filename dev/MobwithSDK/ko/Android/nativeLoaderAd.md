# Native Loader AD <!-- {docsify-ignore} -->

MobwithNativeAdLoader를 이용하여 RecyclerView 같은 리스트 형태의 뷰에 네이티브 광고를 표시하는 방법을 안내합니다.

## 광고 로드 방법

#### <span class="step-label">STEP 1</span>MobwithNativeAdLoader 생성 및 초기화

광고를 불러오기 위해 MobwithNativeAdLoader를 생성하고, 광고를 표시할 View를 설정합니다.

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

#### <span class="step-label">STEP 2</span>리스트에 광고 표시

RecyclerView 등 리스트 형태 View의 Adapter 클래스에서 다음과 같이 광고 View를 받아와 화면에 표시합니다.

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

?> 더 자세한 사항은 Sample 앱을 참고하시기 바랍니다.
