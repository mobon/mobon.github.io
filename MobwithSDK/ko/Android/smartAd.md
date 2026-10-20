# Smart AD <!-- {docsify-ignore} -->

카테고리 매핑을 통한 스마트 광고(카테고리 타겟팅)의 사용 방법을 안내합니다.<br>
스마트 광고를 사용하는 경우 `setMobwithAdCategoryModel()`을 통해 카테고리를 설정해야 합니다.

## 광고 로드 방법

```java
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
