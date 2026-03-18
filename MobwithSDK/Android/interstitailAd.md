## Interstitial AD <!-- {docsify-ignore} -->
전면 광고는 광고 load가 성공적으로 완료되면 원하는 시점에 노출(show) 하는 프로세스로 진행됩니다.  
광고 로딩을 성공한 경우 아래와 같이 호출하여 광고를 화면에 출력할 수 있습니다.

### 광고 로드 방법
```java
InterstitialDialog interstitialDialog = new InterstitialDialog(this)
        .setBackCancel(true)    //뒤로가기 버튼 클릭시 종료 여부
        .setUnitId("광고 Unit ID")    //발급받은 UnitId 설정
        .build();
interstitialDialog.setAdListener(new iInterstitialCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorStr) {
    new Handler(Looper.getMainLooper()).post(new Runnable() {
      @Override
      public void run() {
            if (result) {
            //광고 로드 성공 시
            Toast.makeText(MainActivity.this, "광고 로드 성공(FULL)", Toast.LENGTH_SHORT).show();
            } else {
            //광고 로드 실패 시
            Toast.makeText(MainActivity.this, "광고 로드 실패(FULL)", Toast.LENGTH_SHORT).show();
          }
        }
      });
  }

  @Override
  public void onClickEvent(Key.INTERSTITIAL_KEYCODE keyCode) {
    if (keyCode == Key.INTERSTITIAL_KEYCODE.CLOSE_AD) {
      System.out.println("전면 닫음(FULL)");
    }
    else if (keyCode == Key.INTERSTITIAL_KEYCODE.ADCLICK) {
      System.out.println("전면 광고 클릭(FULL)");
    }
  }


  @Override
  public void onOpened() {
    System.out.println("전면 오픈(FULL)");
  }

  @Override
  public void onClosed() {
    System.out.println("전면 닫음(FULL)");
  }              

  @Override
  public void onFailOpened() {
    //전면 배너 광고 오픈 실패
  }

});

//광고 show() 이전에 광고를 로드 해야합니다.
interstitialDialog.load();
```

### 광고 출력 방법
```java
if (interstitialDialog.isLoaded()) {
    interstitialDialog.show();
}
```
 
### 전면배너 광고 사이즈 별 타입
| Size  | Type Constant            | Description                     |
|:-----:|:-------------------------|---------------------------------|
| RANDOM | INTERSTITIAL_TYPE.RANDOM | 전체 사이즈와, 모달 사이즈가 랜덤으로 나오는 타입    |
| NORMAL | INTERSTITIAL_TYPE.MODAL  | 모달 사이즈의 전면 배너 광고 (화면을 꽉 채우지 않음) |
| FULL   | INTERSTITIAL_TYPE.FULL   | 전체화면을 꽉 채우는 형태의 전면 배너 광고        |

### Click Event KeyCode
| KeyCode  | Description               |
|:--------:|:--------------------------|
| CLOSE_AD | 광고창을 닫는 버튼을 눌렀을때 |
| ADCLICK  | 광고를 클릭한 경우          |