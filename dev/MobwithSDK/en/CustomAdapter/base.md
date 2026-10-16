# Custom Adapter <!-- {docsify-ignore} -->

This guide explains how to serve MobWith ads through the mediation of the ad SDK you already use.

## What is the Custom Adapter SDK

The Custom Adapter SDK connects MobWith ads to your app through the mediation of the ad SDK you already use, without calling the MobWith SDK directly from your app.<br>
Once you add the MobWith SDK and the Custom Adapter SDK to your app, MobWith ads are also served in your existing ad placements.

## How to Apply

<div class="doc-flow">
  <div class="doc-flow-step"><span class="doc-flow-num">1</span><div><p class="doc-flow-title">Install SDKs</p><p class="doc-flow-desc">Add the MobWith SDK and Adapter SDK to your app</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">2</span><div><p class="doc-flow-title">Configure the Console</p><p class="doc-flow-desc">Set up mediation in the ad SDK's admin console</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">3</span><div><p class="doc-flow-title">Serve Ads</p><p class="doc-flow-desc">MobWith ads are served in your existing ad placements</p></div></div>
</div>

If you already serve ads through an ad SDK, you do not need to develop any additional app code for ad serving.

## Supported Adapters

<div class="doc-list">
  <div class="doc-list-item">
    <div class="doc-list-info">
      <p class="doc-list-title">AdMob</p>
      <p class="doc-list-desc">Serves MobWith ads through AdMob mediation.</p>
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
      <p class="doc-list-desc">Serves MobWith ads through AppLovin MAX mediation.</p>
    </div>
    <div class="doc-list-links">
      <a class="doc-list-main" href="#/CustomAdapter/Applovin/install">SDK Installation</a>
      <a href="#/CustomAdapter/Applovin/loadAd">Ad Configuration</a>
      <a href="#/CustomAdapter/Applovin/history">History</a>
    </div>
  </div>
</div>
