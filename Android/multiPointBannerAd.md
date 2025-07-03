## Multi Point Banner AD <!-- {docsify-ignore} -->
기능은 MobwithPointBannerView와 동일하나, 하나의 광고만 표시하던 MobwithPointBannerView와 달리,  
최대 5개의 광고를 좌우 스크롤하여 표시해주는 BannerView 입니다.   
다만, 포인트 제공 가능 여부등 일부 기능의 경우 SDK 자체적으로 처리해주는 부분이 있으며,  
해당 부분의 변경이 필요하신 경우 별도로 문의를 해주셔야 합니다.

### 광고 로드 방법
```java
LinearLayout banner_container = findViewById(R.id.banner_container);


MobwithMultiPointBannerView bannerView = new MobwithMultiPointBannerView(this)

// 광고 ID의 경우 아래와 같이 배열의 형태로 넣어주셔야하며, 최대 5개까지 적용 가능 합니다.
String[] bannerUnitIDs = new String[] { 
    "YOUR_UNIT_ID_1",
    "YOUR_UNIT_ID_2",
    "YOUR_UNIT_ID_3",
    "YOUR_UNIT_ID_4",
    "YOUR_UNIT_ID_5"
};
bannerView.setBannerUnitIds(bannerUnitIDs);

// 기존과는 다르게 광고View를 미리 추가해 줍니다.
banner_container.addView(bannerView);

pointBannerView.setAdListener(new iMultiPointBannerCallback() {

    @Override
    public void onLoadedAdInfo(boolean result, String errorStr) {
        // 광고 로딩 성공/실패 여부가 여기에 전달 됩니다.
    }

    @Override
    public void onAdClicked(int index, boolean isRewarded) {
        // 광고를 클릭한 경우 메세지가 전달 됩니다.
        // index : 클릭된 광고의 index
        // isRewarded : 이미 리워드를 제공한 광고인지 여부, 이미 포인트가 제공된 광고인 경우 true
        
        // 여기에서 리워드 제공 여부 판단, 리워드를 제공한 이후 아래 함수 호출.
        pointBannerView.setRewarded(index);
    }
});


// 광고를 호출합니다.
// 추가로, 포인트 제공 가능 여부의 리셋 기준을 만족하더라도 
// 아래 함수가 호출되지 않으면 UI가 변경되지 않으니 해당 부분 참고 바랍니다.
bannerView.loadAd();
```