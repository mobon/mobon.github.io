## Splash AD <!-- {docsify-ignore} -->

### 스플래시 광고 정의
---- 
스플래시 화면에 광고를 표시하기 위한 광고 객체 입니다.
Activity 위에 광고를 표시하며, 전면 형식과 하단 배너 형식 두 가지를 지원합니다.

### 광고 로드 방법
---- 
MobwithSplashBanner에는 발급받은 UNIT_ID 값을 반드시 설정해야 합니다.  
아래는 MobwithSplashBanner를 설정하고 광고를 요청하는 예시 코드입니다.

```java
// 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
MobwithSplashBanner splashBanner = new MobwithSplashBanner(activity,
        unitID, //발급받은 UNIT_ID
        true,  //전면형 광고 여부 (true:전면, false:하단 배너)
        3      //광고 요청 대기 시간(기본값: 5초)
);

// 배너뷰의 리스너를 등록합니다.
splashBanner.setAdListener(new MobwithSplashBanner.OnSplashListener() {
    @Override
    public void onSplashAdDidReceived() {
        // 스플래시 광고를 수신함 운영 시간에 맞춰 노출 후 다음 화면으로 이동
    }

    @Override
    public void onSplashAdFailToReceived() {
        // 스플래시 광고 수신 실패 즉시 다음 화면으로 이동
    }
});

// 광고를 호출합니다.
splashBanner.loadAd();
```

### 배너 광고 기능

| 메서드                                                              | Description                     |
|:-----------------------------------------------------------------|:--------------------------------|
| setBannerUnitId(String unitId)                                   | 발급 받은 UnitId 설정                 |
| loadAd()                                                         | 광고 요청                           |
| setAdListener(MobwithSplashBanner.OnSplashListener listener) | 광고 Callback                     |
| setCategory(List<String> categories)                             | 카테고리 타겟팅 광고 기능                  |
| setTimeOutSec(int seconds)                                       | 광고 요청 타임아웃 시간 (초)               |
| useFullScreenAd(boolean fullScreen)                          | 광고 타입 설정 (true:전면, false:하단 배너) |
| destroy()                                                        | 광고 리소스 해제                       |`

### 전체 화면 모드 사용
useFullScreenAd를 true로 설정하면 전체화면 모드를 사용하게 됩니다.  기본값은 false 입니다.
* 광고 사이즈에 따라 전체화면 사이즈를 표시하지 않을 수도 있습니다.
```java
splashBanner.useFullScreenAd(true);
```

### 광고 요청 타임아웃
광고 요청 대기 시간을 설정할 수 있습니다.  
초 단위로 입력하시면 되며, 기본값은 5초 입니다.
```java
splashBanner.setTimeOutSec(5);
```

### SplashAdListener
OnSplashListener 구현하여 스플래시 광고의 각 이벤트에 대한 콜백을 전달 받을 수 있습니다.
자세한 내용은 아래를 참고 바랍니다.
```java
new MobwithSplashBanner.OnSplashAdListener() {
    @Override
    public void onSplashAdDidReceived() {
        // 스플래시 광고를 수신함 운영 시간에 맞춰 노출 후 다음 화면으로 이동
    }

    @Override
    public void onSplashAdFailToReceived() {
        // 스플래시 광고 수신 실패 즉시 다음 화면으로 이동
    }
}

```

### 광고 카테고리 설정
category에 카테고리 값을 문자열 배열로 설정하여 설정된 카테고리에 알맞는 광고를 표시할 수 있습니다.
```java
splashBanner.setCategory(Arrays.asList(
     "A0001",
     "A0002",
     "A0003",
     "A0004",
     ...
));
```
* 카테고리 값의 경우 협의된 내용을 참고 하시기 바랍니다.

### 광고 리소스 해제
----
위 함수를 호출하면 광고 객체를 초기화할 수 있습니다.  
자동 갱신이 설정된 경우 해당 동작도 함께 중지됩니다.  
따라서 해당 배너뷰를 더 이상 사용하지 않을 때 호출하는 것을 권장합니다.

```java
...
splashBanner.destroyAd(); //더 이상 Banner 광고를 사용하지 않는 시점에 호출
...
```