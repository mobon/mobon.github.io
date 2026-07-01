🌐 [한국어 가이드](/Android/smartAd)

## Smart AD (Category Targeting) <!-- {docsify-ignore} -->
If you use smart ads through category mapping, you need to configure the category via setMobwithAdCategoryModel().

### How to Load the Ad
----
```java
/**
  Company Code : Company code value
  Major Category Code : Category classification (major)
  Middle Category Code : Category classification (middle)
  Minor Category Code : Category classification (minor)
*/
MobwithAdCategoryModel model = new MobwithAdCategoryModel("CompanyCode", "MajorCategoryCode", "MiddleCategoryCode", "MinorCategoryCode")
MobwithBannerView banner = new MobwithBannerView(this)
    .setBannerUnitId("YOUR_UNIT_ID")
     //Set the category data.
    .setMobwithAdCategoryModel(model);
```
