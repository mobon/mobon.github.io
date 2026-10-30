# History <!-- {docsify-ignore} -->

This page lists the version history of the Android SDK.

### 1.0.112 <span class="release-date">2026-10-30</span><span class="release-badge">Latest</span> <!-- {docsify-ignore} -->

- Added the in-app landing callback `onInAppLanding()`.
- Added the reward feature to the point banner HybridBridgeBanner.
- Added the SortList weight (`exlItlSeq`) parameter.
- Added the Appier SDK version parameter.
- Changed the Appier (Aistra) SDK dependency to optional (see the SDK Installation page).
- Updated the splash ad UI (bottom, full-screen, video).
- Changed the maven repository: SDK 1.0.112 or later requires the MobWith maven repository to be configured in the project-level `build.gradle` (see the SDK Installation page).

### 1.0.111 <span class="release-date">2026-10-22</span> <!-- {docsify-ignore} -->

- Added reward Affordance customization to MobwithBannerView and MobwithNativeAdView (`AffordanceStyle`).
- Added video ad serving to MobwithNativeAdView.

### 1.0.110 <span class="release-date">2026-10-16</span> <!-- {docsify-ignore} -->

- Added a `destroy()` function to release native ad resources.

### 1.0.109 <span class="release-date">2026-10-16</span> <!-- {docsify-ignore} -->

- Improved logic to prevent duplicate requests when loading native ads.
- Enhanced MediationManager lifecycle management and improved MediationManager.release().

### 1.0.108 <span class="release-date">2026-10-08</span> <!-- {docsify-ignore} -->

- Implement localization for interstitial/rewarded ads
- Fix rewarded banner bug

### 1.0.107 <span class="release-date">2026-10-02</span> <!-- {docsify-ignore} -->

- Fix HybridBannerBridge's bug

### 1.0.106 <span class="release-date">2026-10-01</span> <!-- {docsify-ignore} -->

- Added point banner functionality for standard banner ads and native ads
- Enhanced User-Agent
- Added support for Android API versions

### 1.0.105 <span class="release-date">2026-09-29</span> <!-- {docsify-ignore} -->

- ADID bug fix

### 1.0.104 <span class="release-date">2026-09-28</span> <!-- {docsify-ignore} -->

- SDK Resource Cleanup

### 1.0.103 <span class="release-date">2026-09-22</span> <!-- {docsify-ignore} -->

- Adpopcorn NAM ad integration
- Splash banner UI updated

### 1.0.102 <span class="release-date">2026-09-17</span> <!-- {docsify-ignore} -->

- Adpopcorn NAM ad integration
- Support for global inventory Native ad asset display policy
- Context type change

### 1.0.101 <span class="release-date">2026-09-03</span> <!-- {docsify-ignore} -->

- Adjust text size for interstitial & rewarded ads, and update close button text

### 1.0.100 <span class="release-date">2026-09-02</span> <!-- {docsify-ignore} -->

- bug fix

### 1.0.99 <span class="release-date">2026-09-02</span> <!-- {docsify-ignore} -->

- InterstitialAd & RewardedAd Close Button UI Changed

### 1.0.98 <span class="release-date">2026-09-02</span> <!-- {docsify-ignore} -->

- Added feature to set the scaleType for the NativeAd main image

### 1.0.97 <span class="release-date">2026-09-02</span> <!-- {docsify-ignore} -->

- Added AdPopcorn Naver mediation ad feature
- Fixed Mixer Video bug

### 1.0.96 <span class="release-date">2026-08-28</span> <!-- {docsify-ignore} -->

- HybridBannerBridge destroy bug fix

### 1.0.95 <span class="release-date">2026-08-25</span> <!-- {docsify-ignore} -->

- HybridBannerBridge bug fix

### 1.0.94 <span class="release-date">2026-08-20</span> <!-- {docsify-ignore} -->

- Added NativeAdView Kakao BizBoard Banner ad exposure feature
- Adjusted Banner ad close (X) button size
- Added URL Query Encoding (Carrier, Language) parameters

### 1.0.93 <span class="release-date">2026-08-14</span> <!-- {docsify-ignore} -->

- Update EndingBannerView's UI

### 1.0.92 <span class="release-date">2026-08-11</span> <!-- {docsify-ignore} -->

- bug fix

### 1.0.91 <span class="release-date">2026-08-05</span> <!-- {docsify-ignore} -->

- bug fix

### 1.0.90 <span class="release-date">2026-08-05</span> <!-- {docsify-ignore} -->

- Removed the banner close feature
- bug fix

### 1.0.89 <span class="release-date">2026-07-28</span> <!-- {docsify-ignore} -->

- Added the HybridBannerBridgeView script
- Modified the HybridBannerBridgeView webViewFinishLoad() function

### 1.0.88 <span class="release-date">2026-07-28</span> <!-- {docsify-ignore} -->

- Added SplashAd Container parameter
- Fixed HybridBannerBridgeView bug

### 1.0.87 <span class="release-date">2026-07-24</span> <!-- {docsify-ignore} -->

- Added new ad products (SplashAd, EndingBannerView, HybridBannerBridgeView)
- Optimized ad performance

### 1.0.86 <span class="release-date">2026-07-14</span> <!-- {docsify-ignore} -->

- Fixed freepass bug

### 1.0.84 <span class="release-date">2026-06-16</span> <!-- {docsify-ignore} -->

- Fixed reward ad Prepare bug
- ADID refresh logic

### 1.0.83 <span class="release-date">2026-06-01</span> <!-- {docsify-ignore} -->

- Added banner close button feature
- Added Applovin MAX impression/click statistics API

### 1.0.82 <span class="release-date">2026-05-14</span> <!-- {docsify-ignore} -->

- Optimized Frame Ad UI
- Updated Bidmad SDK to the latest version

### 1.0.81 <span class="release-date">2026-05-06</span> <!-- {docsify-ignore} -->

- Mixer parallel delivery feature
- Optimized interstitial banner UI

### 1.0.80 <span class="release-date">2026-04-21</span> <!-- {docsify-ignore} -->

- Improved interstitial and reward banner UI

### 1.0.79 <span class="release-date">2026-02-10</span> <!-- {docsify-ignore} -->

- Removed RewardAdDialog Back click event

### 1.0.78 <span class="release-date">2026-02-04</span> <!-- {docsify-ignore} -->

- Fixed Script ad (Toast) click functionality

### 1.0.77 <span class="release-date">2026-02-04</span> <!-- {docsify-ignore} -->

- Removed Script ad Chrome system logs
- Fixed Script ad intermittent display issue (fixed script ad ratio control feature bug)

### 1.0.76 <span class="release-date">2026-02-02</span> <!-- {docsify-ignore} -->

- Added HuHu Freepass video ad delivery feature
- Removed reward banner Count feature
- Removed ScriptAdapter logs

### 1.0.75 <span class="release-date">2026-01-28</span> <!-- {docsify-ignore} -->

- Bug fix (Inmobi)

### 1.0.74 <span class="release-date">2026-01-21</span> <!-- {docsify-ignore} -->

- Added Script ad ratio adjustment feature
- Added Cauly SDK (Banner)

### 1.0.73 <span class="release-date">2026-01-15</span> <!-- {docsify-ignore} -->

- Added Admob mediation SDK

### 1.0.72 <span class="release-date">2026-01-13</span> <!-- {docsify-ignore} -->

- Bug fix

### 1.0.71 <span class="release-date">2026-01-12</span> <!-- {docsify-ignore} -->

- Bug fix

### 1.0.70 <span class="release-date">2026-01-08</span> <!-- {docsify-ignore} -->

- Added Smart Frame Banner AD feature

### 1.0.69 <span class="release-date">2025-12-31</span> <!-- {docsify-ignore} -->

- Enhanced Script ad
- Added BannerWithArticle Article click event

### 1.0.68 <span class="release-date">2025-12-04</span> <!-- {docsify-ignore} -->

- Bug fix

### 1.0.67 <span class="release-date">2025-11-12</span> <!-- {docsify-ignore} -->

- Bug fix (fixed Inmobi Init error, fixed DTExchange error)

### 1.0.66 <span class="release-date">2025-11-12</span> <!-- {docsify-ignore} -->

- Bug fix (Adfit AdInfoIcon support)

### 1.0.65 <span class="release-date">2025-11-11</span> <!-- {docsify-ignore} -->

- Bug fix (WHOWHO)

### 1.0.64 <span class="release-date">2025-10-28</span> <!-- {docsify-ignore} -->

- Bug fix (AdFit)

### 1.0.63 <span class="release-date">2025-10-15</span> <!-- {docsify-ignore} -->

- Added new SDK (Inmobi)
- Bug fix (AdFit)

### 1.0.62 <span class="release-date">2025-09-24</span> <!-- {docsify-ignore} -->

- Added AdFit NativeAdView feature
- Code cleanup and optimization

### 1.0.61 <span class="release-date">2025-09-11</span> <!-- {docsify-ignore} -->

- Bug fix

### 1.0.60 <span class="release-date">2025-09-11</span> <!-- {docsify-ignore} -->

- Added NativeAdView sub-layout feature
- Code cleanup and optimization

### 1.0.59 <span class="release-date">2025-08-19</span> <!-- {docsify-ignore} -->

- Added new ad SDK (DT Exchange)
- Handled destroy exception during reward ad
- Feature cleanup and optimization

### 1.0.58 <span class="release-date">2025-07-28</span> <!-- {docsify-ignore} -->

- Fixed Impression/Click Tracker issue
- Added SDK info to API Header (SDK version, OS, publisher app version)

### 1.0.57 <span class="release-date">2025-07-15</span> <!-- {docsify-ignore} -->

- Fixed Passback setAGHeaders Context Null logic

### 1.0.56 <span class="release-date">2025-07-15</span> <!-- {docsify-ignore} -->

- Added script ad networks (Mezzomedia, Across, NHN)
- Android 15 support (sample UI fixes)
- Feature cleanup and optimization

### 1.0.55 <span class="release-date">2025-06-26</span> <!-- {docsify-ignore} -->

- Android 15 Edge-to-Edge (fixed overlap between status bar and interstitial/reward ads)

### 1.0.54 <span class="release-date">2025-06-24</span> <!-- {docsify-ignore} -->

- Fixed intermittent NullPointerException in AdapterObject

### 1.0.53 <span class="release-date">2025-06-23</span> <!-- {docsify-ignore} -->

- MBC Banner support (added FullScreenMode)
- Fixed overlap with Android 15 status bar area

### 1.0.52 <span class="release-date">2025-06-18</span> <!-- {docsify-ignore} -->

- Smart Score SDK bug fix
- Removed duplicate onOpened calls
- Fixed RewardAdTestActivity logs appearing from other SDKs

### 1.0.51 <span class="release-date">2025-06-12</span> <!-- {docsify-ignore} -->

- Added Impression/Click Tracker
- Fixed Pangle Native ad not displaying
- Added Close event for interstitial and ending ads

### 1.0.50 <span class="release-date">2025-06-09</span> <!-- {docsify-ignore} -->

- Integrated Pangle SDK
- Improved LevelPlay Init logic

### 1.0.49 <span class="release-date">2025-04-18</span> <!-- {docsify-ignore} -->

- Added Smart Ad (category targeting) feature
