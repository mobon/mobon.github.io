## Native AD <!-- {docsify-ignore} -->
MobwithNativeAdView는 사용자가 직접 뷰를 설정하고,  
설정된 뷰를 SDK에서 전달받아 각각의 View에 광고 데이터를 설정해주는 기능만 담당하는 AdView입니다.

### 광고 로드 방법
```java
....
nativeAdView = new MobwithNativeAdView(this,
                YOUR_UNIT_ID,
                (FrameLayout) findViewById(R.id.adview_container),
                R.layout.custom_native_ad_view,
                R.id.mediaContainerView,
                R.id.imageViewAD,
                R.id.imageViewLogo,
                R.id.textViewTitle,
                R.id.textViewDesc,
                R.id.buttonGo,
                R.id.infoViewLayout,
                R.id.imageViewInfo);

// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
nativeAdView.setUnitId(YOUR_UNIT_ID);

nativeAdView.setAdListener(new iBannerCallback() {
            @Override
            public void onLoadedAdInfo(boolean result, String errorStr) {
                if (result) {
                    LogPrint.d("MobwithNativeAdView - Loaded AD Success");
                }
                else {
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
- adview_container에서 아래 각 View의 id를 확인하지 못하게 되는 경우 광고가 제대로 표시되지 않을 수 있으니 주의하시기 바랍니다.

- 위 예시에서 mediaContainerView는 GroupView중 하나여야 하며, imageViewAD를 포함하고 있는 구조 입니다.
미디에이션을 지원하는 외부 SDK중 Native AD를 제공하는 SDK 마다 서로 다른 규격을 요구하는 부분 때문이니 주의 바랍니다.

### 광고 클릭 버튼을 사용하지 못하는 경우
```java
....
nativeAdView.performAdClicked();
....
```
위 메소드를 호출하여 광고를 클릭한 것과 동일한 효과를 줄 수 있습니다.
