# Native AD <!-- {docsify-ignore} -->

MobwithNativeAdView를 이용하여 앱에서 직접 구성한 레이아웃에 광고 데이터를 표시하는 방법을 안내합니다.

## Native Container 설정

MobwithNativeAdView는 사용자가 직접 레이아웃을 구성한 후 해당 뷰를 SDK에 전달하면, 각 View에 광고 데이터를 바인딩하는 역할을 수행하는 AdView입니다.<br>
사용자 정의(Custom) 네이티브 레이아웃 설정이 필요합니다. 아래는 네이티브 레이아웃을 구성하는 예시 코드입니다.

```xml
<ConstraintLayout
android:layout_width="wrap_content"
android:layout_height="wrap_content" >

    <FrameLayout
        android:id="@+id/mediaViewContainerID"
        android:layout_width="300dp"
        android:layout_height="220dp"
        android:background="#ff00ff00"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent">


<!--      영상 광고일 시 mediaViewContainerID를 사용하고 이미지 광고일 시 adImageViewID를 사용하기 때문에 내부에 구현을 권장합니다. -->
        <ImageView 
            android:id="@+id/adImageViewID"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />

    </FrameLayout>
  
    <ImageView
        android:id="@+id/adLogoImageViewID"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:background="#ffffccff"
        android:layout_marginTop="5dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toBottomOf="@id/mediaViewContainerID"
        app:layout_constraintBottom_toBottomOf="parent"
        tools:ignore="MissingConstraints"
        />

    <TextView
        android:id="@+id/titleViewID"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginLeft="5dp"
        android:layout_marginRight="5dp"
        android:maxLines="1"
        android:text="{ Title }"
        android:textColor="#ff00ff"
        android:textStyle="italic"
        app:layout_constraintLeft_toRightOf="@id/adLogoImageViewID"
        app:layout_constraintTop_toTopOf="@id/adLogoImageViewID"
        app:layout_constraintRight_toLeftOf="@id/gotoSiteButtonID"
        app:layout_constraintBottom_toTopOf="@id/descriptionViewID"
        />

    <TextView
        android:id="@+id/descriptionViewID"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:maxLines="1"
        android:text="{ Description }"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="@id/titleViewID"
        app:layout_constraintRight_toRightOf="@id/titleViewID"
        app:layout_constraintTop_toBottomOf="@id/titleViewID"
        />

    <Button
        android:id="@+id/gotoSiteButtonID"
        android:layout_width="60dp"
        android:layout_height="35dp"
        android:background="#ccffcc"
        android:text="바로가기"
        android:gravity="center"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="@id/adLogoImageViewID"
        />


    <FrameLayout
        android:id="@+id/infoLogoViewContainerID"
        android:layout_width="15dp"
        android:layout_height="15dp"
        android:background="#ffffccff"
        android:layout_marginTop="5dp"
        android:layout_marginRight="5dp"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" >

        <ImageView
            android:id="@+id/infoLogoImageViewID"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </FrameLayout>

</ConstraintLayout>

```

## 광고 로드 방법

위에서 설정한 레이아웃을 기준으로 Custom Native Layout에 표시될 데이터를 구성합니다. 각 파라미터는 [MobwithNativeAdView 파라미터 정의](/Android/nativeAd?id=mobwithnativeadview-파라미터-정의-native-layout)를 참고해 주세요.

!> adview_container 내 각 View의 id가 정상적으로 확인되지 않을 경우, 광고가 정상적으로 노출되지 않을 수 있습니다.

?> mediaViewContainerID는 반드시 GroupView 중 하나로 구성되어야 하며, adImageViewID를 포함하는 구조여야 합니다. 또한 레이아웃은 FrameLayout 사용을 권장합니다.<br>
미디에이션을 지원하는 외부 SDK 중 Native AD를 제공하는 각 SDK마다 요구하는 규격이 다르기 때문입니다.

```java
....
nativeAdView = new MobwithNativeAdView(
                        context,
                        YOUR_UNIT_ID,       //발급받은 광고 Unit Id
                        (FrameLayout) findViewById(R.id.adview_container),  //광고를 보여줄 ContainerView(ViewGroup) FrameLayout 사용 권장 
                        R.layout.custom_native_ad_view, //매체사에서 구현 한 Custom NativeAd 레이아웃 ID
                        R.id.mediaViewContainerID,    //광고 Image를 표시할 ImageView를 감싸는 ViewGroup ID (FrameLayout 사용 권장)
                        R.id.adImageViewID,
                        R.id.adLogoImageViewID,
                        R.id.titleViewID,
                        R.id.descriptionViewID,
                        R.id.gotoSiteButtonID,
                        R.id.infoLogoViewContainerID,
                        R.id.infoLogoImageViewID);

nativeAdView.setUnitId(YOUR_UNIT_ID);   // 각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
nativeAdView.setAdListener(new iBannerCallback() {
        @Override
        public void onLoadedAdInfo ( boolean result, String errorStr){
            if (result) {
                LogPrint.d("MobwithNativeAdView - Loaded AD Success");
            } else {
                LogPrint.d("MobwithNativeAdView - Loaded AD with error : " + errorStr);
            }
        }
    
        @Override
        public void onAdClicked() {
            LogPrint.d("MobwithNativeAdView - Ad Clicked");
        }
});

nativeAdView.loadAd();
....
```

## Native AD 기능

| 메서드 | 설명 |
|---|---|
| `setUnitId(String unitId)` | 발급받은 UnitId 설정 |
| `loadAd()` | 광고 요청 |
| `setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel)` | 카테고리 타겟팅 광고 기능 |
| `setCategory(List<String> categories)` | 카테고리 타겟팅 광고 기능 |
| `setUserKey(String userKey)` | 발급받은 UserKey 설정 |
| `setServiceId(String serviceId)` | 발급받은 ServiceId 설정 |
| `setMediaId(String mediaId)` | 발급받은 MediaId 설정 |
| `setAffordanceStyle(AffordanceStyle style)` | 리워드 Affordance 스타일 설정 (SDK 1.0.111 이상) |
| `setCampaignCodes(List<String> campaignCodes)` | 타겟팅 캠페인 코드 설정 |
| `performAdClicked()` | 광고 클릭 이벤트 발생 |
| `getMediationAdapter()` | 노출된 광고가 외부 SDK(미디에이션) 광고인지 여부 반환. `onLoadedAdInfo(boolean result, String errorStr)`의 `result`가 `true`일 때 사용해 주세요. (SDK 1.0.114 이상) |
| `setUseHouseBanner(boolean isUse)` | 하우스 배너 사용 여부 설정 (기본값 `false`, SDK 1.0.116 이상) |
| `destroy()` | 광고 뷰를 떼어내고 리소스를 해제. 해제 후 `loadAd()`를 다시 호출할 수 있음 (SDK 1.0.110 이상) |

## MobwithNativeAdView 파라미터 정의 (Native Layout)

| 파라미터 | 설명 |
|---|---|
| `context` | Context |
| `unitId` | 발급받은 광고 unit id |
| `containerView` | 광고를 표시할 각 View들을 담고 있는 레이아웃 (각 View의 ID를 확인하지 못하는 경우 광고가 제대로 표시되지 않을 수 있습니다.) |
| `mediaViewContainerID` | 광고 Image를 표시할 ImageView를 감싸는 ViewGroup 레이아웃 ID.<br>가급적 FrameLayout의 사용을 권장합니다.<br>ViewGroup에 따라 미디어(사진, 동영상) 광고가 노출되지 않을 수 있으니, 반드시 광고 노출 여부를 확인하시기 바랍니다. |
| `adImageViewID` | 광고 Image를 표시할 ImageView의 레이아웃 ID (사용하지 않을 시 -1로 세팅하시기 바랍니다.) |
| `adLogoImageViewID` | 광고주 로고를 표시할 ImageView의 레이아웃 ID (사용하지 않을 시 -1로 세팅하시기 바랍니다.) |
| `titleViewID` | 광고 Title을 표시할 TextView의 레이아웃 ID (사용하지 않을 시 -1로 세팅하시기 바랍니다.) |
| `descriptionViewID` | 광고에 대한 설명이 표시될 TextView의 레이아웃 ID (사용하지 않을 시 -1로 세팅하시기 바랍니다.) |
| `gotoSiteButtonID` | 광고 사이트 이동에 대한 메시지가 출력될 TextView의 레이아웃 ID (사용하지 않을 시 -1로 세팅하시기 바랍니다.) |
| `infoLogoViewContainerID` | 광고 Info Logo를 표시할 ImageView를 감싸는 ViewGroup 레이아웃 ID. AppLovin 미디에이션을 위해 사용합니다. (사용하지 않을 시 -1로 세팅하시기 바랍니다.) |
| `infoLogoImageViewID` | 광고 Info Logo를 표시할 ImageView의 레이아웃 ID (사용하지 않을 시 -1로 세팅하시기 바랍니다.) |

## 광고 클릭 버튼을 사용하지 못하는 경우

아래 메서드를 호출하여 광고를 클릭한 것과 동일한 효과를 줄 수 있습니다.

```java
....
nativeAdView.performAdClicked();
....
```

## 메인 광고 이미지 ScaleType 적용 기능

광고의 메인 이미지에 직접 ScaleType을 지정하기 위한 기능입니다. (이미지 깨짐 현상 방지)<br>
`true`로 설정하면 메인 이미지뷰(`R.id.adImageViewID`)에 사용자가 직접 지정한 ScaleType이 적용됩니다.

```java
....
nativeAdView.useImageViewScaleType(true);
....
```

## 하우스 배너 기능

?> SDK 1.0.116 이상에서 지원합니다.<br>
SDK 1.0.117부터 하우스 배너는 이미지 대신 아이콘과 문구로 표시됩니다.

광고 요청이 완료된 시점부터 실제 광고가 송출되기 전까지 하우스 배너를 표시하는 기능입니다. (기본값 `false`)<br>
`true`로 설정하면 광고를 표시하는 컨테이너에 하우스 배너(쿠팡 아이콘과 문구)가 표시되고, 실제 광고가 송출되면 사라집니다.<br>
`false`로 설정하면 이미 표시 중인 하우스 배너도 즉시 제거됩니다.

```java
....
nativeAdView.setUseHouseBanner(true);
....
```

!> 광고가 채워지지 않은 경우(노필/실패)에는 `onLoadedAdInfo`의 `result`가 `false`로 전달되며, 하우스 배너는 사라지지 않고 그대로 유지됩니다.

## 광고 해제

광고를 더 이상 사용하지 않는 시점에 `destroy()`를 호출하여 광고 뷰와 리소스를 해제합니다. 메인 스레드에서 호출해 주세요.

```java
@Override
protected void onDestroy() {
    if (nativeAdView != null) {
        nativeAdView.destroy();
    }
    super.onDestroy();
}
```

?> `destroy()` 호출 후에도 `loadAd()`를 다시 호출하여 광고를 불러올 수 있습니다.

## 서브 레이아웃 기능

필요에 따라 직광고와 네트워크 광고에 서로 다른 레이아웃을 적용할 수 있는 기능입니다.

| 파라미터 | 설명 |
|---|---|
| `directAdViewItemModel` | 직광고 Layout |
| `nativeAdViewItemModel` | 네트워크 광고 Layout |

사용 방법은 위와 동일하나, MobwithNativeAdView 생성 시 전달하는 파라미터가 다릅니다. 아래는 이에 대한 예시입니다.

```java
....
nativeAdView = new MobwithNativeAdView(
                        context,
                        YOUR_UNIT_ID,
                        (FrameLayout) findViewById(R.id.adview_container),
                        new NativeAdViewItemModel(  //직광고 native layout
                            R.layout.custom_native_ad_view,
                            R.id.mediaViewContainerID,    //FrameLayout 사용을 권장합니다. (다른 Layout을 사용 시 미디어(사진, 동영상) 광고가 노출 되지 않을 수 있습니다.)
                            R.id.adImageViewID,
                            R.id.adLogoImageViewID,
                            R.id.titleViewID,
                            R.id.descriptionViewID,
                            R.id.gotoSiteButtonID,
                            R.id.infoLogoViewContainerID,
                            R.id.infoLogoImageViewID
                        ),
                        new NativeAdViewItemModel(  //네트워크 광고 native layout
                            R.layout.custom_native_ad_view_2,
                            R.id.mediaViewContainerID,    //FrameLayout 사용을 권장합니다. (다른 Layout을 사용 시 미디어(사진, 동영상) 광고가 노출 되지 않을 수 있습니다.)
                            R.id.adImageViewID,
                            R.id.adLogoImageViewID,
                            R.id.titleViewID,
                            R.id.descriptionViewID,
                            R.id.gotoSiteButtonID,
                            R.id.infoLogoViewContainerID,
                            R.id.infoLogoImageViewID
                        )
);
nativeAdView.setUnitId(YOUR_UNIT_ID);
nativeAdView.setAdListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo ( boolean result, String errorStr){
    if (result) {
      LogPrint.d("MobwithNativeAdView - Loaded AD Success");
    } else {
      LogPrint.d("MobwithNativeAdView - Loaded AD with error : " + errorStr);
    }
  }

  @Override
  public void onAdClicked() {
    LogPrint.d("MobwithNativeAdView - Ad Clicked");
  }
});
nativeAdView.loadAd();
....
```

## 리워드 배너 기능

리워드 배너 기능 사용 시 운영팀에서 발급받은 UserKey, ServiceId, MediaId를 반드시 설정해야 합니다.

!> UserKey, ServiceId, MediaId 중 **하나라도 누락되면 리워드가 지급되지 않습니다.**

| 파라미터 | 설명 |
|---|---|
| `userKey` | 사용자를 구분하는 고유 식별값 |
| `mediaId` | 매체(서비스)를 구분하는 고유 식별값 |
| `serviceId` | 매체 내에서 광고가 노출되는 위치·서비스를 구분하는 식별값 |

```java
nativeAdView.setUserKey("발급받은 UserKey");
nativeAdView.setServiceId("발급받은 ServiceId");
nativeAdView.setMediaId("발급받은 MediaId");
```

### 리워드 Affordance 커스텀

?> SDK 1.0.111 이상에서 지원합니다.

리워드 배너에 표시되는 Affordance의 스타일을 변경할 수 있습니다. 표시 조건과 메서드는 [Banner AD의 리워드 Affordance 커스텀](/Android/bannerAd?id=리워드-affordance-커스텀)을 참고해 주세요.

```java
nativeAdView.setAffordanceStyle(AffordanceStyle.builder()
        .position(AffordanceView.Position.BOTTOM_LEFT)
        .sizeDp(36f)
        .textSizeDp(12f)
        .textColor(Color.BLACK)
        .backgroundColor(Color.BLUE)
        .marginDp(8)
        .build());
```

?> 변경한 설정은 광고를 다시 로드(`loadAd()`)해야 반영됩니다.


### 외부 SDK(미디에이션) 광고 여부 반환
?> SDK 1.0.114 이상에서 지원합니다.

송출 된 광고가 외부 SDK(미디에이션) 광고인지 여부 반환   
```java
getMediationAdapter() //true : 외부 SDK(미디에이션) 광고, false : Json 광고
```

!>주의사항 : onLoadedAdInfo(boolean result, String errorcode)의 `result`가 `true`일 때 호출해 주세요.