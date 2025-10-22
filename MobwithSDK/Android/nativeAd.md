## Native AD <!-- {docsify-ignore} -->

MobwithNativeAdView는 사용자가 직접 뷰를 설정하고,  
설정된 뷰를 SDK에서 전달받아 각각의 View에 광고 데이터를 설정해주는 기능만 담당하는 AdView입니다.

### 광고 로드 방법 
([MobwithNativeAdView 파라미터 정의 참조](#mobwithnativeadview-파라미터-정의))

```java
....
nativeAdView = new MobwithNativeAdView(
                        this,
                        YOUR_UNIT_ID,
                        (FrameLayout) findViewById(R.id.adview_container),
                        R.layout.custom_native_ad_view,
                        R.id.mediaContainerView,    //FrameLayout 사용을 권장합니다. (다른 Layout을 사용 시 미디어(사진, 동영상) 광고가 노출 되지 않을 수 있습니다.)
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

- adview_container에서 아래 각 View의 id를 확인하지 못하게 되는 경우 광고가 제대로 표시되지 않을 수 있으니 주의하시기 바랍니다.

- 위 예시에서 mediaContainerView는 GroupView중 하나 여야 하며, imageViewAD를 포함하고 있는 구조 입니다.  
  가급적 FrameLayout의 사용을 권장합니다.  
미디에이션을 지원하는 외부 SDK중 Native AD를 제공하는 SDK 마다 서로 다른 규격을 요구하는 부분 때문이니 주의 바랍니다.

### MobwithNativeAdView 파라미터 정의

|         파라미터 명          | Description                                                                                                                                                |
|:-----------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
|         context         | Context                                                                                                                                                    |
|         unitId          | 발급 받은 광고 unit id                                                                                                                                           |
|      containerView      | 광고를 표시할 각 View들을 담고있는 레이아웃 (기타 각 View의 ID를 확인하지 못하게 되는경우 광고가 제대로 표시되지 않을 수 있다.)                                                                            |
|  mediaViewContainerID   | 광고 Image를 표시할 ImageView를 감싸는 ViewGroup 레이아웃 ID. <br>가급적 FrameLayout의 사용을 권장합니다.<br>ViewGroup에 따라 미디어(사진, 동영상) 광고가 노출되지 않을 수 있으니, 반드시 광고 노출 여부를 확인하시기 바랍니다. |
|      adImageViewID      | 광고 Image를 표시할 ImageView의 레이아웃 ID                                                                                                                           |
|    adLogoImageViewID    | 광고주 로고를 표시할 ImageView의 레이아웃 ID                                                                                                                             |
|       titleViewID       | 광고 Title을 표시할 TextView의 레이아웃 ID                                                                                                                            |
|    descriptionViewID    | 광고에 대한 설명이 표시될 TextView의 레이아웃 ID                                                                                                                           |
|    gotoSiteButtonID     | 광고 사이트 이동에 대한 메세지가 출력될 TextView의 레이아웃 ID                                                                                                                   |
| infoLogoViewContainerID | 광고 Info Logo를 표시할 ImageView를 감싸는 ViewGroup 레이아웃 ID. AppLovin 미디에이션을 위해 사용한다.                                                                               |
|   infoLogoImageViewID   | 광고 Info Logo를 표시할 ImageView의 레이아웃 ID                                                                                                                       |

### 광고 클릭 버튼을 사용하지 못하는 경우 
```java
....
nativeAdView.performAdClicked();
....
```

위 메소드를 호출하여 광고를 클릭한 것과 동일한 효과를 줄 수 있습니다.

### 서브 레이아웃 기능
- 필요에 따라 직광고의 layout과 네트워크 광고의 layout을 다르게 쓰기 위한 기능입니다.
- 사용법은 위와 동일하지만 MobwithNativeAdView 생성 시 파라미터가 다릅니다. 아래는 예시 입니다.
```java
....
nativeAdView = new MobwithNativeAdView(
                        this,
                        YOUR_UNIT_ID,
                        (FrameLayout) findViewById(R.id.adview_container),
                        new NativeAdViewItemModel(  //직광고 native layout
                            R.layout.custom_native_ad_view,
                            R.id.mediaContainerView,    //FrameLayout 사용을 권장합니다. (다른 Layout을 사용 시 미디어(사진, 동영상) 광고가 노출 되지 않을 수 있습니다.)
                            R.id.imageViewAD,
                            R.id.imageViewLogo,
                            R.id.textViewTitle,
                            R.id.textViewDesc,
                            R.id.buttonGo,
                            R.id.infoViewLayout,
                            R.id.imageViewInfo
                        ),
                        new NativeAdViewItemModel(  //네트워크 광고 native layout
                            R.layout.custom_native_ad_view_2,
                            R.id.mediaContainerView,    //FrameLayout 사용을 권장합니다. (다른 Layout을 사용 시 미디어(사진, 동영상) 광고가 노출 되지 않을 수 있습니다.)
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