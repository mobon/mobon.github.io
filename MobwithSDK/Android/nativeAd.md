## Native AD <!-- {docsify-ignore} -->

MobwithNativeAdView는 사용자가 직접 레이아웃을 구성한 후, 해당 뷰를 SDK에 전달하면 각 View에 광고 데이터를 바인딩하는 역할을 수행하는 AdView입니다.

### Native Container 설정

사용자 정의(Custom) 네이티브 레이아웃 설정이 필요합니다.  
아래는 네이티브 레이아웃을 구성하는 예시 코드입니다.

```xml
<ConstraintLayout
android:layout_width="wrap_content"
android:layout_height="wrap_content" >

    <FrameLayout
        android:id="@+id/mediaContainerView"
        android:layout_width="300dp"
        android:layout_height="220dp"
        android:background="#ff00ff00"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent">

    </FrameLayout>
  
    <ImageView
        android:id="@+id/imageViewLogo"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:background="#ffffccff"
        android:layout_marginTop="5dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toBottomOf="@id/mediaContainerView"
        app:layout_constraintBottom_toBottomOf="parent"
        tools:ignore="MissingConstraints"
        />

    <TextView
        android:id="@+id/textViewTitle"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginLeft="5dp"
        android:layout_marginRight="5dp"
        android:maxLines="1"
        android:text="{ Title }"
        android:textColor="#ff00ff"
        android:textStyle="italic"
        app:layout_constraintLeft_toRightOf="@id/imageViewLogo"
        app:layout_constraintTop_toTopOf="@id/imageViewLogo"
        app:layout_constraintRight_toLeftOf="@id/buttonGo"
        app:layout_constraintBottom_toTopOf="@id/textViewDesc"
        />

    <TextView
        android:id="@+id/textViewDesc"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:maxLines="1"
        android:text="{ Description }"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="@id/textViewTitle"
        app:layout_constraintRight_toRightOf="@id/textViewTitle"
        app:layout_constraintTop_toBottomOf="@id/textViewTitle"
        />

    <Button
        android:id="@+id/buttonGo"
        android:layout_width="60dp"
        android:layout_height="35dp"
        android:background="#ccffcc"
        android:text="바로가기"
        android:gravity="center"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="@id/imageViewLogo"
        />


    <FrameLayout
        android:id="@+id/infoViewLayout"
        android:layout_width="15dp"
        android:layout_height="15dp"
        android:background="#ffffccff"
        android:layout_marginTop="5dp"
        android:layout_marginRight="5dp"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" >

        <ImageView
            android:id="@+id/imageViewInfo"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </FrameLayout>

</ConstraintLayout>

```

### 광고 로드 방법 
- 위에서 설정한 레이아웃을 기준으로, Custom Native Layout에 표시될 데이터를 구성합니다.
([MobwithNativeAdView 파라미터 정의 참조](#mobwithnativeadview-파라미터-정의))
- adview_container 내 각 View의 id가 정상적으로 확인되지 않을 경우, 광고가 정상적으로 노출되지 않을 수 있습니다
- mediaContainerView는 반드시 GroupView 중 하나로 구성되어야 하며, imageViewAD를 포함하는 구조여야 합니다.  
  또한, 레이아웃은 FrameLayout 사용을 권장합니다.  
  이는 미디에이션을 지원하는 외부 SDK 중 Native AD를 제공하는 각 SDK마다 요구하는 규격이 상이하기 때문입니다.

```java
....
nativeAdView = new MobwithNativeAdView(
                        context,
                        YOUR_UNIT_ID,       //발급받은 광고 Unit Id
                        (FrameLayout) findViewById(R.id.adview_container),  //광고를 보여줄 ContainerView(ViewGroup) FrameLayout 사용 권장 
                        R.layout.custom_native_ad_view, //구현 한 Custom Native Ad 레이아웃 ID
                        R.id.mediaContainerView,    //광고 Image를 표시할 ImageView를 감싸는 ViewGroup ID (FrameLayout 사용 권장)
                        R.id.imageViewAD,
                        R.id.imageViewLogo,
                        R.id.textViewTitle,
                        R.id.textViewDesc,
                        R.id.buttonGo,
                        R.id.infoViewLayout,
                        R.id.imageViewInfo);

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

### MobwithNativeAdView 파라미터 정의

|         파라미터 명          | Description                                                                                                                                                |
|:-----------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
|         context         | Context                                                                                                                                                    |
|         unitId          | 발급 받은 광고 unit id                                                                                                                                           |
|      containerView      | 광고를 표시할 각 View들을 담고있는 레이아웃 (기타 각 View의 ID를 확인하지 못하게 되는경우 광고가 제대로 표시되지 않을 수 있다.)                                                                            |
|  mediaViewContainerID   | 광고 Image를 표시할 ImageView를 감싸는 ViewGroup 레이아웃 ID. <br>가급적 FrameLayout의 사용을 권장합니다.<br>ViewGroup에 따라 미디어(사진, 동영상) 광고가 노출되지 않을 수 있으니, 반드시 광고 노출 여부를 확인하시기 바랍니다. |
|      adImageViewID      | 광고 Image를 표시할 ImageView의 레이아웃 ID                                                                                                                           |
|    adLogoImageViewID    | 광고주 로고를 표시할 ImageView의 레이아웃 ID                                                                                                                             |
|       titleViewID       | 광고 Title을 표시할 TextView의 레이아웃 ID                                                                                                                            |
|    descriptionViewID    | 광고에 대한 설명이 표시될 TextView의 레이아웃 ID                                                                                                                           |
|    gotoSiteButtonID     | 광고 사이트 이동에 대한 메세지가 출력될 TextView의 레이아웃 ID                                                                                                                   |
| infoLogoViewContainerID | 광고 Info Logo를 표시할 ImageView를 감싸는 ViewGroup 레이아웃 ID. AppLovin 미디에이션을 위해 사용한다.                                                                               |
|   infoLogoImageViewID   | 광고 Info Logo를 표시할 ImageView의 레이아웃 ID                                                                                                                       |

### 광고 클릭 버튼을 사용하지 못하는 경우 
```java
....
nativeAdView.performAdClicked();
....
```

위 메소드를 호출하여 광고를 클릭한 것과 동일한 효과를 줄 수 있습니다.

### 서브 레이아웃 기능
- 필요에 따라 직광고와 네트워크 광고에 서로 다른 레이아웃을 적용할 수 있는 기능입니다.
- 사용 방법은 위와 동일하나, MobwithNativeAdView 생성 시 전달하는 파라미터가 다릅니다.  
  아래는 이에 대한 예시입니다.
```java
....
nativeAdView = new MobwithNativeAdView(
                        context,
                        YOUR_UNIT_ID,
                        (FrameLayout) findViewById(R.id.adview_container),
                        new NativeAdViewItemModel(  //직광고 native layout
                            R.layout.custom_native_ad_view,
                            R.id.mediaContainerView,    //FrameLayout 사용을 권장합니다. (다른 Layout을 사용 시 미디어(사진, 동영상) 광고가 노출 되지 않을 수 있습니다.)
                            R.id.imageViewAD,
                            R.id.imageViewLogo,
                            R.id.textViewTitle,
                            R.id.textViewDesc,
                            R.id.buttonGo,
                            R.id.infoViewLayout,
                            R.id.imageViewInfo
                        ),
                        new NativeAdViewItemModel(  //네트워크 광고 native layout
                            R.layout.custom_native_ad_view_2,
                            R.id.mediaContainerView,    //FrameLayout 사용을 권장합니다. (다른 Layout을 사용 시 미디어(사진, 동영상) 광고가 노출 되지 않을 수 있습니다.)
                            R.id.imageViewAD,
                            R.id.imageViewLogo,
                            R.id.textViewTitle,
                            R.id.textViewDesc,
                            R.id.buttonGo,
                            R.id.infoViewLayout,
                            R.id.imageViewInfo
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