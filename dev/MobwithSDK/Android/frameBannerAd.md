## Frame Banner AD <!-- {docsify-ignore} -->

### FrameBannerView Native Container 설정
----

MobwithFrameBannerView는 광고주로부터 제공받은 주요 에셋들을 배치하여 노출하는 형태의 광고입니다.  
지정된 프레임 구조로 구성된 배너 광고입니다.   

FrameBannerView는 Sortlist의 FrameAD 외에 직광고 및 네트워크 광고를 노출하기 위해 네이티브 레이아웃 설정이 필요합니다.  
아래는 네이티브 레이아웃을 설정하는 예시 코드입니다.   

##### 체크사항: 사용 시 배경색을 흰색으로 설정해 주세요.

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
----
adview_container 내 각 View의 id가 정상적으로 확인되지 않을 경우, 광고가 정상적으로 노출되지 않을 수 있습니다.  
mediaContainerView는 반드시 GroupView 중 하나로 구성되어야 하며, imageViewAD를 포함하는 구조여야 합니다.  
또한, 레이아웃은 FrameLayout 사용을 권장합니다.  
이는 미디에이션을 지원하는 외부 SDK 중 Native AD를 제공하는 각 SDK마다 요구하는 규격이 상이하기 때문입니다.  
([MobwithFrameBannerView 파라미터 정의 참조](#MobwithFrameBannerView-파라미터-정의))

```java
....
frameBannerView = new MobwithFrameBannerView(
                        context,
                        (FrameLayout) findViewById(R.id.adview_container),
                        R.layout.custom_native_ad_view,
                        R.id.mediaContainerView,    //FrameLayout 사용을 권장합니다. (다른 Layout을 사용 시 미디어(사진, 동영상) 광고가 노출 되지 않을 수 있습니다.)
                        R.id.imageViewAD,
                        R.id.imageViewLogo,
                        R.id.textViewTitle,
                        R.id.textViewDesc,
                        R.id.buttonGo,
                        R.id.infoViewLayout,
                        R.id.imageViewInfo);

//각 광고 뷰 당 발급받은 UNIT_ID 값을 필수로 넣어주어야 합니다.
frameBannerView.setUnitId(YOUR_UNIT_ID);
//광고 요청에 대한 콜백
frameBannerView.setAdListener(new iBannerCallback() {
        @Override
        public void onLoadedAdInfo ( boolean result, String errorStr){
            if (result) {
              // 광고 요청 성공
            } else {
              // 광고 요청 실패
            }
        }
    
        @Override
        public void onAdClicked() {
             // 광고 클릭 시 호출
        }
});

//카테고리 타겟팅을 위한 설정
frameBannerView.setMobwithAdCategoryModel(new MobwithAdCategoryModel("업체코드", "카테고리 대분류", "카테고리 중분류", "카테고리 소분류"));
// 광고를 호출합니다.
frameBannerView.loadAd();
....
```

### FrameBannerView 기능
| 메서드                                                       | Description          |
|:----------------------------------------------------------|:---------------------|
| setUnitId(String unitId)                                  | 발급 받은 UnitId 설정      |
| loadAd()                                                        | 광고 요청                |
| setMobwithAdCategoryModel(MobwithAdCategoryModel categoryModel) | 카테고리 타겟팅 광고 기능       |
| performAdClicked()                                        | 광고 클릭 이벤트 발생    |

### MobwithFrameBannerView 파라미터 정의 (Native Layout)

|         파라미터 명          | Description                                                                                                                                                |
|:-----------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
|         context         | Context                                                                                                                                                    |
|      containerView      | 광고를 표시할 각 View들을 담고있는 레이아웃 (기타 각 View의 ID를 확인하지 못하게 되는경우 광고가 제대로 표시되지 않을 수 있다.)                                                                            |
|  mediaViewContainerID   | 광고 Image를 표시할 ImageView를 감싸는 ViewGroup 레이아웃 ID. <br>가급적 FrameLayout의 사용을 권장합니다.<br>ViewGroup에 따라 미디어(사진, 동영상) 광고가 노출되지 않을 수 있으니, 반드시 광고 노출 여부를 확인하시기 바랍니다. |
|      adImageViewID      | 광고 Image를 표시할 ImageView의 레이아웃 ID                                                                                                                           |
|    adLogoImageViewID    | 광고주 로고를 표시할 ImageView의 레이아웃 ID                                                                                                                             |
|       titleViewID       | 광고 Title을 표시할 TextView의 레이아웃 ID                                                                                                                            |
|    descriptionViewID    | 광고에 대한 설명이 표시될 TextView의 레이아웃 ID                                                                                                                           |
|    gotoSiteButtonID     | 광고 사이트 이동에 대한 메세지가 출력될 TextView의 레이아웃 ID                                                                                                                   |
| infoLogoViewContainerID | 광고 Info Logo를 표시할 ImageView를 감싸는 ViewGroup 레이아웃 ID. AppLovin 미디에이션을 위해 사용한다.                                                                               |
|   infoLogoImageViewID   | 광고 Info Logo를 표시할 ImageView의 레이아웃 ID                                                                                                                       |

### 서브 레이아웃 기능
----
필요에 따라 직광고와 네트워크 광고에 서로 다른 레이아웃을 적용할 수 있는 기능입니다.  
사용 방법은 위와 동일하나, MobwithNativeAdView 생성 시 전달하는 파라미터가 상이합니다.  
아래는 이에 대한 예시입니다.
```java
....
MobwithFrameBannerView mobwithFrameBannerView = new MobwithFrameBannerView(
        context,
        mUnitId,
        containerView,
        new NativeAdViewItemModel(
                R.layout.custom_native_ad_view,
                R.id.mediaContainerView,
                R.id.imageViewAD,
                R.id.imageViewLogo,
                R.id.textViewTitle,
                R.id.textViewDesc,
                R.id.buttonGo,
                R.id.infoViewLayout,
                R.id.imageViewInfo
        ),
        new NativeAdViewItemModel(
                R.layout.custom_native_ad_view_2,
                R.id.mediaContainerView,
                R.id.imageViewAD,
                R.id.imageViewLogo,
                R.id.textViewTitle,
                R.id.textViewDesc,
                R.id.buttonGo,
                R.id.infoViewLayout,
                R.id.imageViewInfo
        ));
mobwithFrameBannerView.setUnitId(YOUR_UNIT_ID);
//카테고리 타겟팅을 위한 설정
mobwithFrameBannerView.setMobwithAdCategoryModel(new MobwithAdCategoryModel("업체코드", "카테고리 대분류", "카테고리 중분류", "카테고리 소분류"));
//광고 요청에 대한 콜백
mobwithFrameBannerView.setAdListener(new iBannerCallback() {
  @Override
  public void onLoadedAdInfo ( boolean result, String errorStr){
    if (result) {
      //광고 요청 성공
    } else {
      //광고 요청 실패
    }
  }

  @Override
  public void onAdClicked() {
    // 광고 클릭 시 호출
  }
});
// 광고를 호출합니다.
mobwithFrameBannerView.loadAd();
....
```