## Ending Banner AD <!-- {docsify-ignore} -->

### EndingBannerView 정의
----
Ending Banner 광고의 컨테이너 역할을 하는 뷰를 레이아웃 XML 파일에 추가합니다.
광고를 표시할 배너 컨테이너(ViewGroup)는 FrameLayout 사용을 권장합니다.

```xml
....
<FrameLayout
  android:id="@+id/bannerContainer"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"  (필요에 따라 원하는 높이값(dp)을 설정하여 사용하시기 바랍니다.)
  />
....
```

### 광고 로드 방법
---- 
EndingBannerView는 발급받은 UNIT_ID 값을 반드시 설정해야 합니다.  
아래는 EndingBannerView를 설정하고 광고를 요청하는 예시 코드입니다.
```java
FrameLayout bannerContainer = findViewById(R.id.bannerContainer);
// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
MobWithEndingBannerView endingBannerView = new MobWithEndingBannerView(this)
                                      .setBannerUnitId(YOUR_UNIT_ID);

// 배너뷰의 리스너를 등록합니다.
endingBannerView.setAdListener(new iEndingBannerCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorcode) {
    if (result) {
       // 배너 광고 로딩 완료 시 호출
       bannerContainer.removeAllViews();
       // 광고를 띄우고자 하는 layout 에 배너뷰를 삽입합니다.
       bannerContainer.addView(endingBannerView);
    } else {
      // 배너 광고 노출 실패 시 호출 - setInterval()을 통해 자동 갱신을 설정했어도 실패한 경우 갱신되지 않음.
        endingBannerView.destroyAd();
        endingBannerView = null;     
    }
  }
});

// 광고를 호출합니다.
endingBannerView.loadAd();
```

### 배너 광고 기능
| 메서드                            | Description     |
|:-------------------------------|:----------------|
| setBannerUnitId(String unitId) | 발급 받은 UnitId 설정 |
| loadAd()                       | 광고 요청           |
| performClick()                 | 광고 클릭 이벤트       |
| destroy()                      | 광고 리소스 해제       |

### 광고 클릭 이벤트
광고 클릭 이벤트를 처리하고 싶은 부분에서 호출합니다.
```java
endingBannerView.performClick();
```

### 광고 리소스 해제
광고가 더 이상 필요하지 않은 경우, destroy() 함수를 호출하여 광고 리소스를 해제 합니다.
```java
endingBannerView.destroyAd();
```