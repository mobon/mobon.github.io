🌐 <a href="../ko/#/Android/newsfeedAd">한국어 가이드</a>


## Newsfeed Banner AD <!-- {docsify-ignore} -->
This is a text-type banner view that displays a single-line article.  
This view is implemented with a UI that fits a height value of 30dp. If the height of the placement is smaller than 30dp, the UI may not display correctly on the screen.

### How to Load the Ad
----
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
