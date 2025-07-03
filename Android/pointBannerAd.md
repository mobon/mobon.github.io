## Point Banner AD <!-- {docsify-ignore} -->
해당 광고뷰는 광고 클릭시 리워드를 제공하기 위한 기능 및 UI가 추가된 배너뷰 입니다.     
리워드 제공에 대한 각 기능들은 직접 구현해 주셔야 하며, 현재는 클릭 또는 노출시 리워드 제공에 대한 기능만 고려된 관계로
리워드와 관련된 별도의 콜백은 제공되고 있지 않습니다.  
해당 부분은 광고 로딩 성공과 광고 클릭시 전달되는 콜백 이벤트를 활용하시면 됩니다.

### 광고 로드 방법
```java
LinearLayout banner_container = findViewById(R.id.banner_container);

// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
MobwithPointBannerView bannerView = new MobwithPointBannerView(this).setBannerUnitId(YOUR_UNIT_ID);                                            


//리워드 제공 가능 여부를 설정합니다.
//SDK에서는 관련 UI를 제어하는 부분만 담당하며, 실제 리워드 제공에 대해서는 아래 Listener에서 직접 처리해야 합니다.
//설정값은 다음과 같습니다
// - true  : 리워드를 제공할 수 있는 상태 
// - false : 리워드를 제공할 수 없는 상태 (이미 리워드를 받아간 경우, 리워드 제한등)
pointBannerView.setPointEnable(true);

pointBannerView.setAdListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorcode) {
      if (result) {
      //배너 광고 로딩 성공
      System.out.println("배너 광고로딩");
      
      //광고를 띄우고자 하는 layout에 배너뷰를 삽입합니다.
      banner_container.addView(bannerView);
    } 
    else {
      System.out.println("광고실패 : " + errorcode);

      // 광고 로딩 실패시 동작 - setInterval()을 통해 자동 갱신을 설정했어도 실패한 경우 갱신되지 않음.
      bannerView.destroyAd();
      bannerView = null;     
    }
  }

  @Override
  public void onAdClicked() {
      if(bannerView != null) {
          bannerView.setPointEnable(false);
      }
      
      ...
      //실제 리워드 제공을 위한 동작 구현.
      ...
  }

});

// 광고를 호출합니다.
bannerView.loadAd();
```