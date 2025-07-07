## FreePass AD <!-- {docsify-ignore} -->
해당 광고뷰는 광고 클릭시 일정기간동안 광고를 보여주지 않도록 하는 상품에 대응하는 AdView 입니다.  
실제 광고 미노출 기간에 대한 처리는 직접 진행해 주셔야하며, 이에 대해 필요한 기능을 제공 합니다.

### 광고 로드 방법
```java
LinearLayout banner_container = findViewById(R.id.banner_container);
// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
MobwithFreePassAdView bannerView = new MobwithFreePassAdView(this)
                                              .setBannerUnitId(YOUR_UNIT_ID);                                            

// 광고 매체 이름을 지정 합니다.
//현재 기본값으로 '후후'가 적용되어 있으며, 해당값 지정시 광고뷰 상단의 '##와 함께하는 광고 프리패스'에서 '##'부분이 변경됩니다.
freePassAdView.setMcName("{광고 매체 이름}");

// 광고 매체 로고 이미지를 적용합니다.
// 광고부 좌측 상단에 로고 이미지가 표시되며, 높이값은 10dp로 고정됩니다. 
// 현재 기본값으로 후후 로고가 적용되어 있으므로, 별도로 지정하지 않으면 후후로고가 표시됩니다.
freePassAdView.setMcLogoImage(getResources().getDrawable(com.mobwith.sdk.R.drawable.logo_whowho));


//프리패스 배너뷰의 Listener를 등록합니다.  MobWithBannerView와 달리 iFreePassBannerCallback을 등록해주셔야 합니다.
freePassAdView.setAdListener(new iFreePassBannerCallback() {
    @Override
    public void onLoadedAdInfo(boolean result, String errorStr) {
        System.out.println("[MobwithFreePassAdViewTest] onLoadedAdInfo :  "  +result);
        if (result) {
            // 광고 로딩 성공
            updateUI(() -> {
                if (freePassAdView.getParent() == null) {
                    banner_container.addView(freePassAdView);
                }
            });
        }
        else {
            // 광고 로딩 실패
            clearAdView();
        }
    }

    @Override
    public void onAdClicked(Date startLandingDate) {
        // 광고 클릭시 호출됨. 광고 클릭 시점의 시간을 전달해 준다.
        updateLastClickedTime();
    }
});

// 광고를 호출합니다.
bannerView.loadAd();
```
광고 클릭시 onAdClicked() 함수를 통해 광고 클릭 시간을 전달해주며, 해당 값을 사용하여 광고 미노출 시간을 제어하시면 됩니다.  
만약, 광고 클릭 시간을 별도로 확인이 필요한 경우 아래 함수를 통해 확인 가능 합니다.  
```java
Date clickedTime = MobwithFreePassAdView.getLastAdClickedTime(this)
```