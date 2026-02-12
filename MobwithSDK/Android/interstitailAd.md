## Interstitial AD <!-- {docsify-ignore} -->
전면배너는 광고를 로딩후 로딩이 완료된 시점 이후에 광고를 표시하여야 합니다.  
아래 예시에서는 광고를 로딩하는 부분까지만 소개된 것 입니다.  
광고 로딩을 성공한 경우 아래와 같이 호출하여 광고를 화면에 출력할 수 있습니다.

### 광고 로드 방법
```java
InterstitialDialog interstitialDialog = new InterstitialDialog(this).setBackCancel(true).setType(Key.INTERSTITIAL_TYPE.FULL).setUnitId("광고 Unit ID").build();
interstitialDialog.setAdListener(new iInterstitialCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorStr) {
    new Handler(Looper.getMainLooper()).post(new Runnable() {
      @Override
      public void run() {
        if (result) {
          Toast.makeText(MainActivity.this, "광고 로드 성공(FULL)", Toast.LENGTH_SHORT).show();
          } else {
            //TODO:광고 로드 실패 시 처리 (NO AD 등)
            Toast.makeText(MainActivity.this, "광고 로드 실패(FULL)", Toast.LENGTH_SHORT).show();
          }
        }
      });
  }

  @Override
  public void onClickEvent(Key.INTERSTITIAL_KEYCODE keyCode) {
    if (keyCode == Key.INTERSTITIAL_KEYCODE.CLOSE_AD) {
      System.out.println("전면 닫음(FULL)");
      interstitialFullDialog.load();
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

interstitialDialog.load();
```

### 광고 출력 방법
```java
interstitialDialog.show();
```

### 전면배너 광고 사이즈 별 타입

| Size  | Type Constant             | Description                                     |
|:-----:|:--------------------------|-------------------------------------------------|
| NORMAL | INTERSTITIAL_TYPE.NORMAL | 일반 사이즈의 전면 배너 광고 (화면을 꽉 채우지 않음)   |
| FULL   | INTERSTITIAL_TYPE.FULL   | 전체화면을 꽉 채우는 형태의 전면 배너 광고            |

### Click Event KeyCode
| KeyCode  | Description               |
|:--------:|:--------------------------|
| CLOSE_AD | 광고창을 닫는 버튼을 눌렀을때 |
| ADCLICK  | 광고를 클릭한 경우          |