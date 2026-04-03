## Interstitial AD <!-- {docsify-ignore} -->

### 광고 로드 방법
----
전면 광고는 광고 load()가 성공적으로 완료된 이후, 원하는 시점에 show()를 호출하여 노출하는 방식으로 동작합니다.  
광고 로드에 성공한 경우, 아래와 같이 호출하여 광고를 화면에 표시할 수 있습니다.  

전면 광고를 요청하려면 InterstitialDialog 설정이 필요합니다.  
각 광고 뷰에는 발급받은 UNIT_ID 값을 반드시 설정해야 합니다.  
아래는 InterstitialDialog 설정하고 광고를 요청하는 예시 코드입니다.
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
            } else {
            //광고 로드 실패 시
          }
        }
      });
  }

  @Override
  public void onClickEvent(Key.INTERSTITIAL_KEYCODE keyCode) {
    if (keyCode == Key.INTERSTITIAL_KEYCODE.CLOSE_AD) {
        // 전면 닫음
    }
    else if (keyCode == Key.INTERSTITIAL_KEYCODE.ADCLICK) {
        // 전면 광고 클릭
    }
  }


  @Override
  public void onOpened() {
      // 전면 오픈
  }

  @Override
  public void onClosed() {
      // 전면 닫음
  }              

  @Override
  public void onFailOpened() {
    //전면 배너 광고 오픈 실패
  }

});

//광고 show() 이전에 광고를 로드 해야합니다.
interstitialDialog.load();
```

### 전면 광고 기능
| 메서드                                                       | Description           |
|:----------------------------------------------------------|:----------------------|
| setUnitId(String unitId)                                  | 발급 받은 UnitId 설정       |
| load()                                                        | 광고 요청                 |
| isLoaded()                                                        | 광고 요청 성공 여부           |
| show()                                                        | 광고 송출                 |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | 카테고리 타겟팅 광고 기능        |
| close()                                                 | 광고 닫기                 |
| setBackCancel(boolean isUse)                          | 뒤로가기 버튼 광고 닫기 여부 설정   |

### 광고 송출
----
```java
if (interstitialDialog.isLoaded()) {
    interstitialDialog.show();
}
```
 
### 전면배너 광고 사이즈 별 타입
|  Size  | Type Constant            | Description                     |
|:------:|:-------------------------|---------------------------------|
| RANDOM | INTERSTITIAL_TYPE.RANDOM | 전체 사이즈와, 모달 사이즈가 랜덤으로 나오는 타입    |
| MODAL  | INTERSTITIAL_TYPE.MODAL  | 모달 사이즈의 전면 배너 광고 (화면을 꽉 채우지 않음) |
|  FULL  | INTERSTITIAL_TYPE.FULL   | 전체화면을 꽉 채우는 형태의 전면 배너 광고        |

### Click Event KeyCode
| KeyCode  | Description               |
|:--------:|:--------------------------|
| CLOSE_AD | 광고창을 닫는 버튼을 눌렀을때 |
| ADCLICK  | 광고를 클릭한 경우          |