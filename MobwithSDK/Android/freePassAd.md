## FreePass AD <!-- {docsify-ignore} -->
해당 광고뷰는 광고 클릭 시 일정 기간 동안 광고를 노출하지 않는 상품을 지원하기 위한 AdView입니다.  
실제 광고 미노출 기간에 대한 제어는 개발자가 직접 구현해야 하며, 이를 위한 필요한 기능을 제공합니다.

### 광고 로드 방법
```java
LinearLayout banner_container = findViewById(R.id.banner_container);
// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
MobwithFreePassAdView bannerView = new MobwithFreePassAdView(context)
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
### 광고 클릭 설정
광고 클릭 시 onAdClicked() 콜백을 통해 광고 클릭 시간이 전달됩니다.  
해당 값을 활용하여 광고 미노출 기간을 제어할 수 있습니다.  

또한, 광고 클릭 시간을 별도로 확인해야 하는 경우에는 아래 함수를 통해 조회할 수 있습니다.  
```java
Date clickedTime = MobwithFreePassAdView.getLastAdClickedTime(context);
```