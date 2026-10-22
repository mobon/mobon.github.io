# Newsfeed AD <!-- {docsify-ignore} -->

MobwithArticleBannerView를 이용하여 한 줄 기사가 표시되는 텍스트형 배너를 표시하는 방법을 안내합니다.

!> 해당 뷰는 **높이 30dp**에 맞게 UI가 구현되어 있어, 지면의 높이가 30dp보다 작으면 화면에 UI가 제대로 표시되지 않을 수 있습니다.

## 광고 로드 방법

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
