# Newsfeed AD <!-- {docsify-ignore} -->

This page describes how to display a text banner showing a one-line article using MobwithArticleBannerView.

!> The UI of this view is implemented for a **height of 30dp**, so if the placement height is smaller than 30dp, the UI may not be displayed properly.

## How to Load Ads

```java
MobwithArticleBannerView adArticleBannerView =  new MobwithArticleBannerView(this)
adArticleBannerView.setAdListener(new iArticleBannerCallback() {

            @Override
            public void onLoadedArticles(boolean result, String errorStr) {
                System.out.println("[MobwithArticleBannerView] onLoadedArticles() : "  +result);
            }

            @Override
            public void onArticleClicked() {
                System.out.println("[MobwithArticleBannerView] onArticleClicked()");
            }

        });
banner_container.addView(adArticleBannerView);

adArticleBannerView.loadAd();
```
