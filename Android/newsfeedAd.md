## Newsfeed Banner AD <!-- {docsify-ignore} -->
한줄 기사가 표시되는 텍스트형 배너 뷰 입니다.  
해당 뷰의 경우 높이값 30dp에 맞게 UI가 구현되어 있으며, 해당 지면의 높이값이 30dp 보다 작은 경우 화면에 UI가 제대로 표시되지 않을 수 있습니다.

### 광고 로드 방법
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