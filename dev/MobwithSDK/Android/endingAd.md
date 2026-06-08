## Ending AD <!-- {docsify-ignore} -->

### 광고 로드 방법
----
엔딩 광고 배너는 종료 버튼이 포함된 형태의 광고입니다.  
광고 load()가 성공적으로 완료되면, 원하는 시점에 show()를 호출하여 노출할 수 있습니다.  
또한, 리스너를 통해 종료 이벤트를 전달받아 처리할 수 있습니다.   

엔딩 광고를 요청하려면 EndingDialog 설정이 필요합니다.  
각 광고 뷰에는 발급받은 UNIT_ID 값을 반드시 설정해야 합니다.  
아래는 EndingDialog 설정하고 광고를 요청하는 예시 코드입니다.

```java
EndingDialog endingDialog = new EndingDialog(activity)      //Activity context를 전달해주셔야 합니다.
        .setBackCancel(false)                   //뒤로가기 버튼 클릭시 종료 여부
        .setUnitId(bannerUnitID_Interstitial)   //발급받은 UnitId 설정
        .build();

endingDialog.setAdListener(new iInterstitialCallback() {
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
//광고 show() 이전에 광고를 로드 해야합니다.
endingDialog.load();
```

### 광고 송출
----
```java
if(endingDialog.isLoaded()){
    endingDialog.show();
}
```

### 엔딩 광고 기능
| 메서드                                                       | Description           |
|:----------------------------------------------------------|:----------------------|
| setUnitId(String unitId)                                  | 발급 받은 UnitId 설정       |
| load()                                                        | 광고 요청                 |
| isLoaded()                                                        | 광고 요청 성공 여부           |
| show()                                                        | 광고 송출                 |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | 카테고리 타겟팅 광고 기능        |
| close()                                                 | 광고 닫기                 |
| setBackCancel(boolean isUse)                          | 뒤로가기 버튼 광고 닫기 여부 설정   |

### Click Event KeyCode
| KeyCode  | Description               |
|:--------:|:--------------------------|
| CLOSE_AD | 광고창을 닫는 버튼을 눌렀을때 |
| ADCLICK  | 광고를 클릭한 경우          |
| CLOSE_APP| 앱 종료 버튼을 눌렀을때      |