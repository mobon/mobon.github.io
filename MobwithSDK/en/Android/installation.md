🌐 <a href="../ko/#/Android/installation">한국어 가이드</a>

# Installation

## Gradle Configuration

- Add `mavenCentral()` to your project-level `build.gradle`.  

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
```
- Add `com.google.android.gms:play-services-ads-identifier` and the latest version of the MobWith SDK to your app-level `build.gradle`.  

```groovy
dependencies {
    implementation 'com.google.android.gms:play-services-ads-identifier:17.0.0'
    implementation 'io.github.mobon:mobwithSDK:1.0.84'
    implementation 'com.github.Dimezis:BlurView:version-3.2.0'
}
```

## Permissions

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

**Additional setup for Android 9 (Pie) and above**  
From targetSdkVersion 28 onward, unencrypted HTTP communication is blocked by default during network requests.  

For all mediation ads in the SDK to work correctly, you must allow HTTP communication. Configure it as follows.  

- Set the `usesCleartextTraffic="true"` attribute on the `application` tag in `AndroidManifest.xml`.  
- From Android 9 (API 28), the default value of this attribute is `false`, which restricts HTTP communication.

```xml
<manifest ...>
<application
...
android:usesCleartextTraffic="true"
...>
</application>
</manifest>
```

## Adding the ADFIT SDK
- To serve AdFit ads, refer to the link below.  
  [Go to the AdFit SDK](https://github.com/adfit/adfit-android-sdk)  
- The MobWith SDK is optimized for <span style="color:#FFFFFF; font-weight:bold;">AdFit SDK (com.kakao.adfit:ads-base:3.21.10)</span>.
- Depending on your situation, you may need to additionally apply a different version or type of SDK than the library specified in the guide (com.kakao.adfit:ads-base:3.21.10).  
(You will be notified separately if this applies.)
- When using the NativeAdView feature, you must use a <span style="color:#FFFFFF; font-weight:bold;">FrameLayout</span> for R.id.mediaContainerView.  
(Because the parent class of MediaView is FrameLayout, this ensures media (image, video) ads are displayed correctly.)

## Adding the ADOP BidMad SDK
- To serve ADOP ads, refer to the link below.  
  [Go to the ADOP BidMad SDK](https://github.com/bidmad/Bidmad-Android/blob/master/README.md#1-SDK-%EC%84%B8%ED%8C%85)  
- The MobWith SDK is optimized for <span style="color:#FFFFFF; font-weight:bold;">ADOP BidMad SDK version 3.25.**</span>.  
- You only need to refer to the SDK setup section; apply values that require configuration, such as API keys, based on what was agreed upon.
- Note  
When using ad SDKs other than ADOP BidMad, library conflicts may occur, so please refer to the following.  
&nbsp;- "com.adop.sdk.adapter:adfit:{version}"       // Must be removed when using AdFit ads due to overlapping libraries.  
&nbsp;- "com.adop.sdk.adapter:pangle:{version}"    // Must be removed when using Pangle ads due to overlapping libraries.  
&nbsp;- "com.adop.sdk.partners:admobbidding:{version}" // Must be removed when using Pangle ads due to overlapping libraries.

## Adding the Coupang SDK
- Gradle configuration 
1.  First, refer to the following to add the repository for fetching the Coupang SDK to your project-level Gradle.

```groovy
buildscript {
  ...
  repositories {
      ...
      maven { url "https://raw.githubusercontent.com/coupang-ads-sdk/android/main" }
      ...
  }
}
...
allprojects {
  repositories {
      ...
      maven { url "https://raw.githubusercontent.com/coupang-ads-sdk/android/main" }
      ...
  }
}
```
 2. Next, implement the Coupang SDK in your app-level Gradle file as shown below.  

```groovy
implementation 'com.coupang:ads:1.3.0'
```

- In `manifests.xml`, add `meta-data` inside the `application` tag as shown below. For the value to enter, refer to the Coupang Sub ID provided with this guide.  

```xml
  <application>
    ....
    <meta-data android:name="coupang_ads_sub_id"
          android:value="{provided Coupang Sub ID}"/>
    ....
  </application>
```

- Proguard configuration  
  When using Proguard, add the exception rules below.  

```groovy
  -keep interface com.coupang.ads.dto.DTO
  -keep class * implements com.coupang.ads.dto.DTO { *; }
```
- Cautions and notes
  - The Context passed when creating ad Views must extend or implement LifecycleOwner. 
  - In most cases, objects that extend AndroidX's ComponentActivity will not have any issues. 
  - For full-screen (interstitial) banners, the ad is rendered only in the sizes supported by the Coupang SDK, regardless of the size option.

## Adding the Unity Ads SDK
- To serve Unity Ads, refer to the link below. (Optimized for version 4.7.0.)  
  [Go to the Unity Ads SDK](https://docs.unity.com/grow/ko-kr/ads/android-sdk)
- Refer to the SDK integration requirements and the section on installing the Unity Ads SDK.
- GameID configuration  
  To mediate the Unity Ads SDK, you must set the GameID before loading ads, as shown below.

```java
MobwithSDK.getInstance().setUnityGameId(this,"{ provided GameId }");
```

## Adding the IronSource (LevelPlay) SDK
- To serve IronSource (LevelPlay) ads, refer to the link below. (Optimized for version 8.4.0.)
[Go to the IronSource (LevelPlay) SDK](https://developers.is.com/ironsource-mobile/android/getting-started-android/)

```groovy
implementation 'com.ironsource.sdk:mediationsdk:9.2.0'
implementation 'com.ironsource:adqualitysdk:7.26.2'
```
- Refer to the "Getting started" and "Android SDK Integration" sections.
- AppKey configuration  
To mediate the IronSource (LevelPlay) SDK, you must set the AppKey before loading ads, as shown below.

```java
MobwithSDK.getInstance().setLevelPlayAppKey(this,"{ provided AppKey }");
```

## Adding the Pangle SDK
- To serve Pangle ads, refer to the link below. (Optimized for version 7.1.0.4.)  
[Go to the Pangle SDK](https://www.pangleglobal.com/kr/integration/integrate-pangle-sdk-for-android)  

```groovy
allprojects {
    repositories {
        maven {
            url 'https://artifact.bytedance.com/repository/pangle'
        }

    }
}
implementation 'com.pangle.global:pag-sdk:7.8.5.2'
```
- AppKey configuration  
To mediate the Pangle SDK, you must set the AppKey before loading ads, as shown below.

```java
MobwithSDK.getInstance().setPangleAppKey("provided AppKey");
```
- Caution: When using external mediation, conflicts between libraries may occur. If the mediation libraries below are implemented, they will cause conflicts, so please remove them.

```groovy
implementation 'com.adop.sdk.adapter:pangle:5.2.1.1.3'
implementation 'com.adop.sdk.partners:admobbidding:1.0.2'
```
If the dependencies of an implemented library include Pangle-related libraries, conflicts may occur, so please coordinate with us regarding this.

- How to check for library conflicts
1. Android Studio -> Terminal -> enter `.\gradlew app:dependencies --configuration debugRuntimeClasspath`
2. In the result log, keywords such as "(*)", "->", "conflict", and "requested" indicate duplicates.
3. Remove the duplicated implementation.


## Adding the DT Exchange SDK
- To serve DT Exchange ads, refer to the link below.  
[Go to the DT Exchange SDK](https://developer.digitalturbine.com/hc/en-us/articles/360010822437-Integrating-the-Android-SDK)  

- AppKey configuration  
  To mediate the DT Exchange SDK, you must set the AppKey before loading ads, as shown below.

```java
MobwithSDK.getInstance().setDTExChangeAppKey("provided AppKey");
```
- build.gradle configuration  
  You must implement the DT Exchange SDK in build.gradle. (Optimized for com.fyber:marketplace-sdk:8.3.8.)

```groovy
implementation 'com.fyber:marketplace-sdk:8.4.5'
```

## Adding the InMobi SDK
- To serve InMobi ads, refer to the link below.  
  [Go to the InMobi SDK](https://support.inmobi.com/monetize/getting-started)

```groovy
implementation 'com.inmobi.monetization:inmobi-ads-kotlin:11.3.0'
implementation 'com.google.android.gms:play-services-location:21.3.0'
implementation 'androidx.browser:browser:1.10.0'
```
- AppKey configuration  
  To mediate the InMobi SDK, you must set the AppKey before loading ads, as shown below.
- When using the NativeAdView feature, you must use a <span style="color:#FFFFFF; font-weight:bold;">FrameLayout</span> for R.id.mediaContainerView so that media (image, video) ads are served smoothly. (Because the parent class of MediaView is FrameLayout.)

```java
MobwithSDK.getInstance().setInMobiAppKey("provided AppKey"); 
```
- build.gradle configuration  
  You must implement the InMobi SDK in build.gradle.  
(Optimized for com.unity3d.ads-mediation:inmobi-adapter:4.3.29 and com.inmobi.monetization:inmobi-ads-kotlin:10.8.2.)

```groovy
implementation 'com.unity3d.ads-mediation:inmobi-adapter:4.3.29'
implementation 'com.inmobi.monetization:inmobi-ads-kotlin:10.8.2'
```

## Adding the Cauly SDK
- To serve Cauly ads, refer to the link below.  
  [Go to the Cauly SDK](https://cauly.gitbook.io/cauly/android/project-build-setting)

- build.gradle configuration  
  You must implement the Cauly SDK in build.gradle.
  (Optimized for com.fsn.cauly:cauly-sdk:3.5.41.)

```groovy
allprojects {
  repositories {
      maven { url 'https://cauly.github.io/cauly-sdk-android-maven/maven-repo' }     
  }
}
```

```groovy
implementation 'com.fsn.cauly:cauly-sdk:3.5.41'
```

## Adding the AdMob Mediation SDK
- To serve AdMob Mediation ads, refer to the link below.
  [Go to the AdMob SDK guide](https://developers.google.com/admob/android/choose-networks?hl=ko&_gl=1*d0p0ke*_up*MQ..*_ga*MTY4MTA1NTI2OC4xNzY4NDQxMDE0*_ga_SM8HXJ53K2*czE3Njg0NDEwMTQkbzEkZzAkdDE3Njg0NDEwMTQkajYwJGwwJGgw)
- build.gradle configuration  
  You must implement the AdMob SDK in build.gradle.
  (Optimized for com.google.android.gms:play-services-ads:24.9.0.)
```groovy
  implementation("com.google.android.gms:play-services-ads:24.9.0")
```
- Manifest configuration
```xml
<manifest>
  <application>
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="SAMPLE_APP_ID"/>
  </application>
  </manifest>
```
