## Banner AD <!-- {docsify-ignore} -->

### 광고 로드 방법
```java
LinearLayout banner_container = findViewById(R.id.banner_container);
// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
MobWithBannerView banner = new MobwithBannerView(this)
                                      .setBannerUnitId(YOUR_UNIT_ID)
                                      .setInterval(60);

//스크립트 광고의 사이즈를 조절하는 기능입니다. (선택사항)
//사용중인 Container의 Height dp 값을 입력하면 비율에 맞게 광고 크기가 설정됩니다.
banner.setAdScale(80);

// 배너뷰의 리스너를 등록합니다.
banner.setAdListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo(boolean result, String errorcode) {
    if (result) {
      //배너 광고 로딩 성공
      System.out.println("배너 광고로딩");
      
      // 광고를 띄우고자 하는 layout 에 배너뷰를 삽입합니다.
      banner_container.addView(banner);
    } else {
      System.out.println("광고실패 : " + errorcode);

      // 광고 로딩 실패시 동작 - setInterval()을 통해 자동 갱신을 설정했어도 실패한 경우 갱신되지 않음.
      banner.destroyAd();
      banner = null;     
    }
  }

  @Override
  public void onAdClicked() {
    System.out.println("광고클릭");
  }
  
});

// 광고를 호출합니다.
banner.loadAd();
```

## 광고뷰의 크기 설정 <!-- {docsify-ignore} -->
광고의 크기는 노출되는 광고의 크기에 따라 자동으로 변경됩니다.  
따라서 광고를 표시할 뷰의 레이아웃을 아래를 참고하여 설정을 해주어야 광고가 이상없이 출력됩니다.
```xml
....
<LinearLayout
  android:id="@+id/banner_container"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  android:layout_alignParentBottom="true"
  android:layout_centerHorizontal="true"
  android:gravity="center"
  android:orientation="vertical"
  />
....
```

### 1) setInterval()
   해당 함수를 통해 배너 광고를 일정 시간마다 자동으로 갱신되도록 할 수 있습니다.  
   설정되는 값은 '초(Second)'단위로 설정해 주셔야 하며, 최소값은 60초로 60보다 작은 값을 설정하는 경우 60으로 설정 됩니다.  
   다만, 0으로 설정하는 경우 0으로 설정이 되며, 자동 갱신 기능이 동작하지 않습니다.  
   기본 값은 0이며, 설정후 광고를 처음 한번 로딩시켜야 동작합니다.  

### 2) stop(), restart()
   위 두 함수를 통해 광고 자동 갱신을 정지/재시작 할 수 있습니다.  
   특정 상황에 따라 뷰 내에서 직접 광고의 자동갱신 여부를 결정하고 있지만, 명시적으로 자동 갱신 여부를 결정할때 사용하면 됩니다.  
   setInterval()에서 0으로 설정한 경우 자동 갱신 정지/재시작은 동작하지 않습니다.  
   해당 함수들의 호출 및 동작은 setInterval()을 통해 광고 갱신이 되도록 설정 한뒤 광고를 처음 한번 로딩을 해주어야 합니다.  

### 3) 광고 수신 실패시
   setInterval()을 통해 광고 자동 갱신 기능을 설정 하였어도 광고 수신을 실패한 경우 이후 부터는 광고가 자동으로 갱신되지 않으니 주의 바랍니다.  
   해당 상황 발생시 직접 loadAd()를 다시 호출해줘야 광고를 다시 불러올수 있으니 참고 하시면 됩니다.

### 4) destroyAd()
   본 함수를 호출하여 광고 객체들을 초기화 시켜줄 수 있습니다.  
   자동 갱신등이 설정된 경우 동작을 멈추게 됩니다.  
   따라서 해당 배너뷰를 사용하지 않게 되는 경우 호출는 것을 권장 드립니다.

### 5) 하우스 배너 사용
   광고 로딩중 또는 광고가 없는 경우 하우스 배너를 노출 할 수 있습니다.  
   setUseHouseBanner() 함수를 이용하여 하우스 배너 사용여부를 결정할 수 있으며, 기본값은 false 입니다.  
   하우스 배너를 노출하는 경우 위 예시들과는 달리 광고 수신을 하기 전, 생성된 배너 객체를 View에 추가하실 필요가 있습니다. 자세한 사용법은 아래를 참고 바랍니다.

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
        //배너 광고 로딩 성공
        System.out.println("배너 광고로딩");

      } else {
        System.out.println("광고실패 : " + errorcode);
        // 광고 로딩 실패시 동작
      }
    }

    @Override
    public void onAdClicked() {
      System.out.println("광고클릭");
    }
    
  });

  // 광고를 호출합니다.
  banner.loadAd();
```
참고로, 하우스 배너를 사용 하더라도 경우 한번 이라도 광고가 노출된 경우 하우스 배너는 표시 되지않습니다.

### 6) FullScreen 배너 사용
   배너 광고 사용 중 배너 크기를 꽉 채우고 싶을 때 사용할 수 있습니다.  
   MobwithSDK.getInstance().setFullScreenMode() 함수를 이용하여 Full Screen 배너 사용여부를 결정할 수 있으며, 기본값은 false 입니다.  
   주의사항 : FullScreenMode를 사용하기 위해선 배너 광고가 들어갈 container view의 높이를 원하는 크기로 커스텀 해야합니다. 자세한 사용법은 아래를 참고 바랍니다.
   
```java
MobwithSDK.getInstance().setFullScreenMode(true); //true : Full Screen Model
```  

```xml
....
<LinearLayout
android:id="@+id/banner_container"
android:layout_width="match_parent"
android:layout_height="원하는 크기로 설정 (ex : 60dp)"
android:layout_alignParentBottom="true"
android:layout_centerHorizontal="true"
android:gravity="center"
android:orientation="vertical"
/>
....
```

### 7) Script 광고 비율 조정 기능
Script형 배너 광고 사용 중 사용자가 정한 Container 크기에 맞춰서 광고 사이즈를 조절하는 기능 
주의사항 : ContainerLayout의 높이값(dp)를 지정해주세요.

```java
banner.setAdScale(80);  //80dp 높이에 맞춰 Script형 배너 광고의 높이가 설정됨.
```