## Smart AD (카테고리 타겟팅) <!-- {docsify-ignore} -->
카테고리 매핑을 통한 스마트 광고를 사용하시는 경우 setMobwithAdCategoryModel()를 통해서 카테고리 설정이 필요합니다.

### Smart AD 지원 가능한 Ad
- MobwithBannerView
- MobwithBannerWithArticleView
- MobwithFreePassAdView
- MobwithNativeAdView
- EndingDialog
- InterstitialDialog

### 광고 로드 방법
```java
MobwithBannerView, MobwithBannerWithArticleView, MobwithFreePassAdView, MobwithNativeAdView, EndingDialog, InterstitialDialog
/**
  업체코드 : 업체코드 값
  대분류코드 : 카테고리 분류 (대)
  중분류코드 : 카테고리 분류 (중)
  소분류코드 : 카테고리 분류 (소)
*/
MobwithAdCategoryModel model = new MobwithAdCategoryModel("업체코드", "대분류코드", "중분류코드", "소분류코드")
MobwithBannerView banner = new MobwithBannerView(this)
    .setBannerUnitId("YOUR_UNIT_ID")
     //카테고리 데이터를 설정합니다.
    .setMobwithAdCategoryModel(model);
```

### 주의 사항
Proguard를 적용하는 경우 proguard configuration 파일 수정이 필요합니다.  
자세한 구현 내용은 샘플 프로젝트의 proguard.cfg  파일 또는 proguard-rules.pro 참고해 주세요.