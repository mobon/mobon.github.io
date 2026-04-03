## Banner AD <!-- {docsify-ignore} -->

### 배너 광고 뷰 정의
----
배너 광고의 컨테이너 역할을 하는 뷰를 레이아웃 XML 파일에 추가합니다.
광고를 표시할 배너 컨테이너(ViewGroup)는 FrameLayout 사용을 권장합니다.  
광고의 크기는 노출되는 광고에 따라 자동으로 조정되므로, 정상적인 표시를 위해 아래 가이드를 참고하여 레이아웃을 설정해 주세요.

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
배너 광고를 요청하려면 MobWithBannerView 설정이 필요합니다.  
각 광고 뷰에는 발급받은 UNIT_ID 값을 반드시 설정해야 합니다.  
아래는 BannerView를 설정하고 광고를 요청하는 예시 코드입니다.
```java
FrameLayout bannerContainer = findViewById(R.id.bannerContainer);
// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
MobWithBannerView banner = new MobwithBannerView(this)
                                      .setBannerUnitId(YOUR_UNIT_ID);

// 배너뷰의 리스너를 등록합니다.
banner.setAdListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorcode) {
    if (result) {
       // 배너 광고 로딩 완료 시 호출
       bannerContainer.removeAllViews();
       // 광고를 띄우고자 하는 layout 에 배너뷰를 삽입합니다.
       bannerContainer.addView(banner);
    } else {
      // 배너 광고 노출 실패 시 호출 - setInterval()을 통해 자동 갱신을 설정했어도 실패한 경우 갱신되지 않음.
      banner.destroyAd();
      banner = null;     
    }
  }

  @Override
  public void onAdClicked() {
      // 배너 광고 클릭 시 호출
  }
  
});

// 광고를 호출합니다.
banner.loadAd();
```
### 배너 광고 기능
| 메서드                                                             | Description           |
|:----------------------------------------------------------------|:----------------------|
| setBannerUnitId(String unitId)                                  | 발급 받은 UnitId 설정       |
| loadAd()                                                        | 광고 요청                 |
| showNextAd()                                                    | 다음 광고 요청              |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | 카테고리 타겟팅 광고 기능        |
| setInterval(Int second)                                         | 광고 새로고침 (파라미터는 초 단위)  |
| restart()                                                       | 광고 새로고침 재시작           |
| stop()                                                          | 광고 새로고침 중단            |
| destroy()                                                       | 광고 리소스 해제             |
| setUseHouseBanner(boolean isUse)                                | 하우스 배너 사용 여부          |
| MobwithSDK.getInstance().setFullScreenMode(bollean isUse)       | 직광고 풀스크린 사이즈 기능 사용 여부 |
| setAdScale(int heightDp)                                        | Script 광고 높이 조정 기능    |

### 광고 새로고침
----
```java
...
bannerView.setInterval(60); //60초마다 자동 갱신
...
```

해당 함수를 사용하면 배너 광고를 일정 시간 간격으로 자동 갱신할 수 있습니다.  
갱신 주기는 초(Second) 단위로 설정해야 하며, 최소값은 60초입니다.  
60초보다 작은 값을 입력할 경우 자동으로 60초로 적용됩니다.

단, 값을 0으로 설정하면 자동 갱신 기능이 비활성화됩니다.  
기본값은 0이며, 설정 후 최초 1회 광고를 로드해야 자동 갱신이 정상적으로 동작합니다.

또한, Banner 광고를 더 이상 사용하지 않을 경우 반드시 destroyAd() 함수를 호출해 주셔야 합니다.

```java
...
bannerView.destroyAd(); //더 이상 Banner 광고를 사용하지 않는 시점에 호출
...
```

아래 두 함수를 통해 광고 자동 갱신을 정지하거나 다시 시작할 수 있습니다.  
기본적으로는 뷰 내부에서 자동 갱신 여부를 관리하지만, 필요에 따라 명시적으로 제어할 때 사용할 수 있습니다.

단, setInterval()을 0으로 설정한 경우에는 자동 갱신이 비활성화되므로, 정지/재시작 기능이 동작하지 않습니다.

또한, 해당 함수들을 정상적으로 사용하려면 setInterval()로 갱신 주기를 설정한 후, 광고를 최초 1회 로드해야 합니다.

```java
...
bannerView.restart(); //광고 자동 갱신 다시 시작
...
```

```java
...
bannerView.stop(); //광고 자동 갱신 정지
...
```

#### *광고 새로고침 기능 주의사항
setInterval()을 통해 광고 자동 갱신 기능을 설정하더라도, 광고 수신에 실패할 경우 이후에는 자동 갱신이 동작하지 않을 수 있습니다.  
이 경우 loadAd()를 직접 다시 호출해야 광고를 정상적으로 다시 불러올 수 있으니 참고 바랍니다.

### 광고 리소스 해제
----
위 함수를 호출하면 광고 객체를 초기화할 수 있습니다.  
자동 갱신이 설정된 경우 해당 동작도 함께 중지됩니다.  
따라서 해당 배너뷰를 더 이상 사용하지 않을 때 호출하는 것을 권장합니다.

```java
...
bannerView.destroyAd(); //더 이상 Banner 광고를 사용하지 않는 시점에 호출
...
```

### 하우스 배너 기능
----
광고 로딩 중이거나 노출 가능한 광고가 없는 경우, 하우스 배너를 노출할 수 있습니다.  
setUseHouseBanner() 함수를 통해 하우스 배너 사용 여부를 설정할 수 있으며, 기본값은 false입니다.  
하우스 배너를 사용하는 경우에는 기존 예시와 달리, 광고 수신 이전에 생성된 배너 객체를 View에 먼저 추가해야 합니다.  

단, 하우스 배너를 사용하는 경우에도 광고가 한 번이라도 노출되면 이후에는 하우스 배너가 표시되지 않습니다.    
자세한 사용 방법은 아래 내용을 참고해 주세요.
```java
  MobWithBannerView banner = new MobwithBannerView(this)
                                 .setBannerUnitId(YOUR_UNIT_ID)
  //하우스 배너 사용 설정, 기본값은 false 입니다.
  banner.setUseHouseBanner(true);

  // 광고를 띄우고자 하는 layout 에 배너뷰를 삽입합니다.
  banner_container.addView(banner);

  // 배너뷰의 리스너를 등록합니다.
  banner.setAdListener(new iBannerCallback() {
    @Override
    public void onLoadedAdInfo(boolean result, String errorcode) {
      if (result) {
         // 배너 광고 로딩 완료 시 호출
      } else {
         // 배너 광고 로딩 실패 시 호출
      }
    }

    @Override
    public void onAdClicked() {
      // 배너 광고 클릭 시 호출
    }
    
  });

  // 광고를 호출합니다.
  banner.loadAd();
```

### FullScreen 배너 사용
----
배너 직광고 사용 중 화면을 꽉 채우는 형태로 표시하고 싶을 때 사용할 수 있습니다.  
MobwithSDK.getInstance().setFullScreenMode() 함수를 통해 Full Screen 배너 사용 여부를 설정할 수 있으며, 기본값은 false입니다.  

주의사항: Full Screen Mode를 사용하려면 배너 광고가 포함될 container view의 높이를 원하는 크기로 직접 설정해야 합니다.  
자세한 사용 방법은 아래 내용을 참고해 주세요.
   
```java
MobwithSDK.getInstance().setFullScreenMode(true);
```  

```xml
....
<FrameLayout
android:id="@+id/bannerContainer"
android:layout_width="match_parent"
android:layout_height="원하는 크기로 설정 (ex : 60dp)"
/>
....
```

### Script 광고 비율 조정 기능
Script형 배너 광고는 지정된 Container 크기에 맞춰 광고 크기가 자동으로 조절됩니다.  
주의사항: ContainerLayout의 높이(dp)를 필수로 설정해야 합니다.

```java
banner.setAdScale(80);  //80dp 높이에 맞춰 Script형 배너 광고의 높이가 설정됨.
```