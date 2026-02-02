## Reward AD <!-- {docsify-ignore} -->
광고를 본 사용자에게 리워드를 지급하기 위한 광고 입니다.

### 광고 로드 방법

```java
//광고 객체 생성 시 Activity를 전달해주시는 걸 권장합니다.
MobwithRewardVideoDialog rewardVideoDialog = new MobwithRewardVideoDialog(this).setUnitId("YOUR_UNIT_ID").build();

// 콜백을 받기위한 Listener는 iRewardAdsCallback를 사용합니다.
rewardVideoDialog.setAdListener(new iRewardAdsCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorStr) {
      if (result) {
        // 광고 로딩 성공
      } 
      else {
        // 광고 로딩 실패
      }
  }

  @Override
  public void onAdClicked() {
    // 광고를 클릭한 경우
  }

  @Override
  public void onOpened() {
    // 로드된 광고가 화면에 표시된 경우
  }

  @Override
  public void onFailOpened() {
    // 로드된 광고를 화면에 표시하지 못한경우.
  }

  @Override
  public void onClosed() {
    // 광고 창을 닫은 경우
      LogPrint.d("RewardAdTestActivity", "onClosed");
      //만약 광고창이 닫혀도 MobwithRewardVideoDialog에 대한 Log가 남거나 Lifecycle이 동작할 때 아래 함수(distroy())를 호출해주세요.
      //rewardVideoDialog.distroy();
  }

  @Override
  public void onSkip() {
    // 광고를 끝까지 보지 않고 스킵한 경우
  }

  @Override
  public void onReward() {
    // 각 광고별로 리워드 조건을 충족한 경우
  }
});

// 광고 데이터를 로드합니다.
rewardVideoDialog.load();

// onLoadedAdInfo에서 result가 성공일 경우
// isLoaded() 함수를 통해 로드된 광고가 존재하는지 확인 할 수 있습니다.
if (rewardVideoDialog.isLoaded()) {
  rewardVideoDialog.show();   //화면에 광고를 표시합니다.
}
```