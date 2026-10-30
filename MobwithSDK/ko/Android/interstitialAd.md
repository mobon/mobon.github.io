# Interstitial AD <!-- {docsify-ignore} -->

InterstitialDialog를 이용하여 화면 전체에 전면 광고를 표시하는 방법을 안내합니다.

## 광고 로드 방법

전면 광고는 `load()`가 성공적으로 완료된 이후, 원하는 시점에 `show()`를 호출하여 노출하는 방식으로 동작합니다.<br>
전면 광고를 요청하려면 InterstitialDialog 설정이 필요하며, 각 광고 뷰에는 발급받은 UNIT_ID 값을 반드시 설정해야 합니다. 아래는 InterstitialDialog를 설정하고 광고를 요청하는 예시 코드입니다.

```java
InterstitialDialog interstitialDialog = new InterstitialDialog(activity)    //Activity context를 전달해주셔야 합니다.    
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

## 광고 송출

광고 로드에 성공한 경우, 아래와 같이 호출하여 광고를 화면에 표시할 수 있습니다.

```java
if (interstitialDialog.isLoaded()) {
    interstitialDialog.show();
}
```

## 전면 광고 기능

| 메서드 | 설명 |
|---|---|
| `setUnitId(String unitId)` | 발급받은 UnitId 설정 |
| `load()` | 광고 요청 |
| `isLoaded()` | 광고 요청 성공 여부 |
| `show()` | 광고 송출 |
| `setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel)` | 카테고리 타겟팅 광고 기능 |
| `setBackCancel(boolean isUse)` | 뒤로가기 버튼 광고 닫기 여부 설정 |

## 인앱 랜딩 콜백

인앱 랜딩 광고를 클릭하면 SDK가 브라우저를 실행하지 않고 `onInAppLanding()`으로 랜딩 정보를 전달합니다. 앱에서 전달받은 정보로 직접 화면을 이동하려는 경우 `iInterstitialCallback`에 구현합니다. (SDK 1.0.112 이상)

```java
...
@Override
public void onInAppLanding(Map<String, String> inAppLandingData) {
    // 인앱 랜딩 정보 전달 - 앱에서 직접 화면 이동 처리
}
...
```

?> `onInAppLanding()`은 기본 구현이 제공되므로 구현하지 않아도 컴파일 오류가 발생하지 않습니다. 인앱 랜딩 광고를 사용하는 경우에는 구현이 필요합니다.

## Click Event KeyCode

| KeyCode | 설명 |
|---|---|
| `CLOSE_AD` | 광고창을 닫는 버튼을 눌렀을 때 |
| `ADCLICK` | 광고를 클릭한 경우 |
