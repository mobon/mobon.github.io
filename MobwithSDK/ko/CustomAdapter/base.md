# Custom Adapter <!-- {docsify-ignore} -->

사용 중인 광고 SDK의 미디에이션을 통해 MobWith 광고를 송출하는 방법을 안내합니다.

## Custom Adapter SDK란

Custom Adapter SDK는 앱에서 MobWith SDK를 직접 호출하지 않고, 사용 중인 광고 SDK의 미디에이션을 통해 MobWith 광고가 송출되도록 연결하는 SDK입니다.<br>
앱에 MobWith SDK와 Custom Adapter SDK를 추가하면 기존 광고 지면에 MobWith 광고가 함께 송출됩니다.

## 적용 방법

<div class="doc-flow">
  <div class="doc-flow-step"><span class="doc-flow-num">1</span><div><p class="doc-flow-title">SDK 설치</p><p class="doc-flow-desc">앱에 MobWith SDK와 Adapter SDK 추가</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">2</span><div><p class="doc-flow-title">관리자 콘솔 설정</p><p class="doc-flow-desc">광고 SDK 관리자 콘솔에서 미디에이션 설정</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">3</span><div><p class="doc-flow-title">광고 송출</p><p class="doc-flow-desc">기존 광고 지면에 MobWith 광고 송출</p></div></div>
</div>

이미 광고 SDK로 광고를 송출하고 있다면, 광고 송출을 위한 앱 코드는 추가로 개발하지 않아도 됩니다.

## 지원 Adapter

<div class="doc-list">
  <div class="doc-list-item">
    <div class="doc-list-info">
      <p class="doc-list-title">AdMob</p>
      <p class="doc-list-desc">AdMob 미디에이션을 통해 MobWith 광고를 송출합니다.</p>
    </div>
    <div class="doc-list-links">
      <a class="doc-list-main" href="#/CustomAdapter/AdMob/install">SDK Installation</a>
      <a href="#/CustomAdapter/AdMob/loadAd">Ad Configuration</a>
      <a href="#/CustomAdapter/AdMob/history">History</a>
    </div>
  </div>
  <div class="doc-list-item">
    <div class="doc-list-info">
      <p class="doc-list-title">AppLovin MAX</p>
      <p class="doc-list-desc">AppLovin MAX 미디에이션을 통해 MobWith 광고를 송출합니다.</p>
    </div>
    <div class="doc-list-links">
      <a class="doc-list-main" href="#/CustomAdapter/Applovin/install">SDK Installation</a>
      <a href="#/CustomAdapter/Applovin/loadAd">Ad Configuration</a>
      <a href="#/CustomAdapter/Applovin/history_android">History (Android)</a>
      <a href="#/CustomAdapter/Applovin/history_ios">History (iOS)</a>
    </div>
  </div>
</div>

