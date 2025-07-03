## Ending AD <!-- {docsify-ignore} -->
엔딩 광고 배너는 광고 종료버튼이 노출되는 광고 입니다.  
리스너를 통해 종료 이벤트를 받아서 처리할 수 있습니다.

### 광고 로드 방법
```java
EndingDialog endingDialog = new EndingDialog(this).setBackCancel(false).setUnitId(bannerUnitID_Interstitial).build();
endingDialog.setAdListener(new iInterstitialCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorStr) {
    new Handler(Looper.getMainLooper()).post(new Runnable() {
      @Override
      public void run() {
        if (result) {
          Toast.makeText(MainActivity.this, "광고 로드 성공(ENDING)", Toast.LENGTH_SHORT).show();
        }
      }
    });
  }

  @Override
  public void onClickEvent(Key.INTERSTITIAL_KEYCODE keyCode) {
    if (keyCode == Key.INTERSTITIAL_KEYCODE.CLOSE_AD) {
      //엔딩 - 닫음
    }
    else if (keyCode == Key.INTERSTITIAL_KEYCODE.ADCLICK) {
      //엔딩 - 광고 클릭
    }
    else if (keyCode == Key.INTERSTITIAL_KEYCODE.CLOSE_APP) {
      //엔딩 - 종료 버튼 클릭
      }
    }
    
    @Override
    public void onOpened() {
      //엔딩 광고 오픈
    }

    @Override
    public void onClosed() {
      //엔딩 광고 닫음
    }

    @Override
    public void onFailOpened() {
      //엔딩 광고 오픈 실패
    }
  });
```

### 광고 출력 방법
```java
endingDialog.show();
```

### Click Event KeyCode
| KeyCode  | Description               |
|:--------:|:--------------------------|
| CLOSE_AD | 광고창을 닫는 버튼을 눌렀을때 |
| ADCLICK  | 광고를 클릭한 경우          |
| CLOSE_APP| 앱 종료 버튼을 눌렀을때      |