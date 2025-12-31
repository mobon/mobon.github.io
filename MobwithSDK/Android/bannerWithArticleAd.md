## BannerWithArticle AD <!-- {docsify-ignore} -->
광고 및 컨텐츠가 제대로 표시되기 위해서는 반드시 해당 뷰의 높이가 100dp 이상이어야 합니다.  
가로 사이즈의 경우 해당 뷰가 추가되는 부모뷰의 사이즈를 따라갑니다.   
권장하는 뷰 사이즈는 360x100이며, 가로 사이즈의 경우 320 이상을 권장드립니다.  
사용 방법은 대체로 MobwithBannerView와 동일합니다.

### 광고 로드 방법
```java
LinearLayout banner_container = findViewById(R.id.banner_container);
// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
MobwithBannerWithArticleView banner = new MobwithBannerWithArticleView(this)
        .setBannerUnitId(YOUR_UNIT_ID)
        .setInterval(60);

// 배너뷰의 리스너를 등록합니다.
banner.setAdListener(new iBannerWithArticleCallback() {
    @Override
    public void onLoadedAdInfo(boolean result, String errorcode) {
        if (result) {
            //배너 광고 로딩 성공
            System.out.println("배너 광고로딩");

            // 광고를 띄우고자 하는 layout 에 배너뷰를 삽입합니다.
            banner_container.addView(banner);
        } else {
            System.out.println("광고실패 : " + errorcode);

            // 광고 로딩 실패시 동작 - setInterval()을 통해 자동 갱신을 설정했어도 실패한 경우 갱신되지 않음.
            banner.destroyAd();
            banner = null;
        }
    }

    @Override
    public void onAdClicked() {
        System.out.println("광고클릭");
    }

    @Override
    public void onArticleClicked(){
        System.out.println("기사클릭");
    }

});

// 광고를 호출합니다.
        banner.loadAd();
```