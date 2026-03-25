## BannerWithArticle AD <!-- {docsify-ignore} -->
광고 및 콘텐츠가 정상적으로 표시되기 위해서는 해당 뷰의 높이가 최소 100dp 이상이어야 합니다.  
가로 사이즈는 해당 뷰가 추가되는 부모 뷰의 크기를 따릅니다.

권장 뷰 사이즈는 360x100이며, 가로 사이즈는 320dp 이상을 권장합니다.  
사용 방법은 MobwithBannerView와 동일하니, 자세한 내용은 [MobwithBannerView](Android/bannerAd.md)를 참고해 주세요.

### 배너 광고뷰의 크기 설정
광고를 표시할 배너 컨테이너(ViewGroup)는 FrameLayout 사용을 권장합니다.  
광고의 크기는 노출되는 광고에 따라 자동으로 조정되므로,  
정상적인 표시를 위해 아래 가이드를 참고하여 레이아웃을 설정해 주세요.
```xml
....
<FrameLayout
  android:id="@+id/bannerContainer"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  />
....
```

### 광고 로드 방법
배너 광고를 요청하려면 MobwithBannerWithArticleView 설정이 필요합니다.  
각 광고 뷰에는 발급받은 UNIT_ID 값을 반드시 설정해야 합니다.  
아래는 MobwithBannerWithArticleView를 설정하고 광고를 요청하는 예시 코드입니다.
```java
FrameLayout bannerContainer = findViewById(R.id.bannerContainer);
// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
MobwithBannerWithArticleView banner = new MobwithBannerWithArticleView(this)
        .setBannerUnitId(YOUR_UNIT_ID);

// 배너뷰의 리스너를 등록합니다.
banner.setAdListener(new iBannerWithArticleCallback() {
    @Override
    public void onLoadedAdInfo(boolean result, String errorcode) {
        if (result) {
            //배너 광고 로딩 성공
            bannerContainer.removeAllViews();
            // 광고를 띄우고자 하는 layout 에 배너뷰를 삽입합니다.
            bannerContainer.addView(banner);
        } else {
            // 광고 로딩 실패시 동작 - setInterval()을 통해 자동 갱신을 설정했어도 실패한 경우 갱신되지 않음.
            banner.destroyAd();
            banner = null;
        }
    }

    @Override
    public void onAdClicked() {
        // 광고 클릭 시 호출
    }

    @Override
    public void onArticleClicked(){
        // 기사 클릭 시 호출
    }

});

// 광고를 호출합니다.
banner.loadAd();
```

### 1) setInterval()
해당 함수를 사용하면 배너 광고를 일정 시간 간격으로 자동 갱신할 수 있습니다.  
갱신 주기는 초(Second) 단위로 설정해야 하며, 최소값은 60초입니다.  
60초보다 작은 값을 입력할 경우 자동으로 60초로 적용됩니다.

단, 값을 0으로 설정하면 자동 갱신 기능이 비활성화됩니다.  
기본값은 0이며, 설정 후 최초 1회 광고를 로드해야 자동 갱신이 정상적으로 동작합니다.

또한, Banner 광고를 더 이상 사용하지 않을 경우 반드시 destroyAd() 함수를 호출해 주셔야 합니다.
```java
...
banner.setInterval(60); //60초마다 자동 갱신
...
```