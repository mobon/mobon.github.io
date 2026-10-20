# Smart AD <!-- {docsify-ignore} -->

This page describes how to use smart ads (category targeting) through category mapping.<br>
When using smart ads, you must set the category via `setMobwithAdCategoryModel()`.

## How to Load Ads

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
