# EndingBanner AD <!-- {docsify-ignore} -->

EndingBannerView를 이용하여 엔딩 배너 광고를 표시하는 방법을 안내합니다.

## EndingBannerView 정의

Ending Banner 광고의 컨테이너 역할을 하는 뷰를 레이아웃 XML 파일에 추가합니다.<br>
광고를 표시할 배너 컨테이너(ViewGroup)는 FrameLayout 사용을 권장합니다.

```xml
....
<FrameLayout
  android:id="@+id/bannerContainer"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  />
....
```

## 광고 로드 방법

EndingBannerView에는 발급받은 UNIT_ID 값을 반드시 설정해야 합니다. 아래는 EndingBannerView를 설정하고 광고를 요청하는 예시 코드입니다.

!> `iBannerCallback` 리스너의 `onLoadedAdInfo()` 콜백을 받았을 때(광고 로딩 완료 시점) **EndingBannerView를 Container에 추가**하시기 바랍니다.<br>
Dialog의 경우 Show 하기 전에 광고를 로드하여 Container에 추가하면 화면이 두 번 그려질 수 있습니다.

?> 광고 유형에 따라 광고 로딩이 완료되면 SDK가 EndingBannerView를 기존에 추가된 부모 뷰에서 제거하고 광고를 구성합니다.<br>
로드 전에 Container에 미리 추가하면 Container에서 제거될 수 있으므로, 위 안내대로 `onLoadedAdInfo()` 콜백에서 추가해 주세요.

```java
FrameLayout bannerContainer = findViewById(R.id.bannerContainer);
// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
EndingBannerView endingBannerView = new EndingBannerView(this)
                                      .setBannerUnitId(YOUR_UNIT_ID)
                                      .setCategory(Arrays.asList("A0001", "A0002", "A0003", "A0004"))
                                      .setCampaignCodes(Arrays.asList(
                                              "campaign1",
                                              "campaign2",
                                              "campaign3",
                                              ......));

// 배너뷰의 리스너를 등록합니다.
endingBannerView.setListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorcode) {
    if (result) {
       // 배너 광고 로딩 완료 시 호출
       bannerContainer.removeAllViews();
       // 광고를 띄우고자 하는 layout 에 배너뷰를 삽입합니다.
       bannerContainer.addView(endingBannerView);
    } else {
      // 배너 광고 로딩 실패 시 호출
        endingBannerView.destroy();
        endingBannerView = null;     
    }
  }

    @Override
    public void onAdClicked() {
        // 배너 광고 클릭 시 호출
    }
});

// 광고를 호출합니다.
endingBannerView.loadAd();
```

## 배너 광고 기능

| 메서드 | 설명 |
|---|---|
| `setBannerUnitId(String unitId)` | 발급받은 UnitId 설정 |
| `setListener(iBannerCallback listener)` | 광고 이벤트 리스너 설정 |
| `loadAd()` | 광고 요청 |
| `setCategory(List<String> categories)` | 카테고리 타겟팅 광고 기능 |
| `setCampaignCodes(List<String> campaignCodes)` | 타겟팅 캠페인 코드 설정 |
| `performAdClick()` | 광고 클릭 이벤트 전달 기능 |
| `destroy()` | 광고 리소스 해제 |

?> `loadAd()`는 광고를 로딩 중일 때 다시 호출하면 무시됩니다. 로딩이 끝나 `onLoadedAdInfo()` 콜백이 호출된 후에 다시 호출해 주세요.

## 인앱 랜딩 콜백

인앱 랜딩 광고를 클릭하면 SDK가 브라우저를 실행하지 않고 `onInAppLanding()`으로 랜딩 정보를 전달합니다. 앱에서 전달받은 정보로 직접 화면을 이동하려는 경우 `iBannerCallback`에 구현합니다. (SDK 1.0.112 이상)

```java
...
@Override
public void onInAppLanding(Map<String, String> inAppLandingData) {
    // 인앱 랜딩 정보 전달 - 앱에서 직접 화면 이동 처리
}
...
```

?> `onInAppLanding()`은 기본 구현이 제공되므로 구현하지 않아도 컴파일 오류가 발생하지 않습니다. 인앱 랜딩 광고를 사용하는 경우에는 구현이 필요합니다.

## 광고 카테고리 설정

category에 카테고리 값을 문자열 배열로 설정하여, 설정된 카테고리에 알맞은 광고를 표시할 수 있습니다.

```java
endingBannerView.setCategory(Arrays.asList(
     "A0001",
     "A0002",
     "A0003",
     "A0004",
...
));
```

## 광고 캠페인 코드 설정

campaignCodes에 캠페인 코드를 문자열 배열로 설정하여, 해당 캠페인의 광고를 표시할 수 있습니다.

```java
endingBannerView.setCampaignCodes(Arrays.asList(
    "03b7a807c94f4beeb4115a23b2a5c39a",
    "24f2e8051e044ddd867ba68ff467d8b0",
    "4b56b65279a94d059eba23ffaf0ad869",
    ...
));

```

?> 캠페인 코드 값은 협의된 내용을 참고하시기 바랍니다.

## 광고 리소스 해제

광고가 더 이상 필요하지 않은 경우, `destroy()` 함수를 호출하여 광고 리소스를 해제합니다.

```java
endingBannerView.destroy();
```

?> `destroy()`를 호출하면 설정한 리스너도 함께 해제되므로, 다시 사용하려면 `setListener()`를 다시 설정해야 합니다.
