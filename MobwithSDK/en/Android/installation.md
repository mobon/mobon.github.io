# SDK Installation <!-- {docsify-ignore} -->

This page describes how to install the MobWith SDK in your Android app project.<br>
Apply the Gradle configuration and permissions, then add any mediation SDKs that have been agreed upon.

## Gradle Configuration

#### <span class="step-label">STEP 1</span>Add repositories

Add `mavenCentral()` and the jitpack repository to your project-level `build.gradle`.

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

#### <span class="step-label">STEP 2</span>Add dependencies

Add `com.google.android.gms:play-services-ads-identifier` and the latest version of the MobWith SDK to your app-level `build.gradle`.

```groovy
  dependencies {
    implementation 'com.google.android.gms:play-services-ads-identifier:17.0.0'
    implementation 'com.google.android.gms:play-services-ads:24.9.0'
    implementation 'io.github.mobon:mobwithSDK:1.0.110'
    implementation 'com.github.Dimezis:BlurView:version-3.2.0'
}
```

## Permissions

Add the internet permission to `AndroidManifest.xml`.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

##### Additional setup for Android 9 (Pie) and above

From targetSdkVersion 28 onward, unencrypted HTTP communication is blocked by default during network requests.<br>
From Android 9 (API 28), the default value of `usesCleartextTraffic` is `false`, which restricts HTTP communication.

For all mediation ads in the SDK to work correctly, you must allow HTTP communication. Set the `usesCleartextTraffic="true"` attribute on the `application` tag in `AndroidManifest.xml`.

```xml
<manifest ...>
<application
...
android:usesCleartextTraffic="true"
...>
</application>
</manifest>
```

## Adding Mediation SDKs

If you serve ads from other ad networks through mediation, add the SDKs of the networks you use by referring to the following.

### Adding the ADFIT SDK

To serve AdFit ads, refer to the [AdFit SDK](https://github.com/adfit/adfit-android-sdk) guide.

- The MobWith SDK is optimized for **AdFit SDK (`com.kakao.adfit:ads-base:3.21.10`)**.
- Depending on your situation, you may need to additionally apply a different version or type of SDK than the library specified in the guide (`com.kakao.adfit:ads-base:3.21.10`). (You will be notified separately if this applies.)

!> When using the NativeAdView feature, you must use a **FrameLayout** for `R.id.mediaContainerView`.<br>
(Because the parent class of MediaView is FrameLayout, this ensures media (image, video) ads are displayed correctly.)

### Adding the ADOP BidMad SDK

To serve ADOP ads, refer to the [ADOP BidMad SDK](https://github.com/bidmad/Bidmad-Android/blob/master/README.md#1-SDK-%EC%84%B8%ED%8C%85) guide.

- The MobWith SDK is optimized for **ADOP BidMad SDK version 3.25.\*\***.
- The following are the ADOP Adapters configured in the MobWith SDK. Use them as a reference, and apply values that require configuration, such as API keys, based on what was agreed upon.

```groovy
implementation 'ad.helper.openbidding:admob-obh:3.25.0'
implementation 'com.adop.sdk:bidmad-androidx:3.25.0'
implementation 'com.adop.sdk.adapter:admob:24.4.0.0'
implementation 'com.adop.sdk.adapter:adpie:1.13.6.0'
implementation 'com.adop.sdk.adapter:adpopcorn:3.8.2.0'
implementation 'com.adop.sdk.adapter:criteo:6.0.0.2'
implementation 'com.adop.sdk.adapter:fyber:8.3.7.0'
implementation 'com.adop.sdk.adapter:pubmatic:2.7.1.4'
implementation 'com.adop.sdk.adapter:unityads:4.15.0.0'
implementation 'com.adop.sdk.adapter:vungle:7.5.0.0'
```

!> Using ad SDKs other than ADOP BidMad together may cause library conflicts. Remove the following libraries when using the corresponding ads.

| Library | When to remove |
|---|---|
| `com.adop.sdk.adapter:adfit:{version}` | When using AdFit ads (overlapping libraries) |
| `com.adop.sdk.adapter:pangle:{version}` | When using Pangle ads (overlapping libraries) |
| `com.adop.sdk.partners:admobbidding:{version}` | When using Pangle ads (overlapping libraries) |

### Adding the Coupang SDK

#### <span class="step-label">STEP 1</span>Add the repository

Add the repository for fetching the Coupang SDK to your project-level Gradle.

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

#### <span class="step-label">STEP 2</span>Add the dependency

Add the Coupang SDK to your app-level Gradle file.

```groovy
implementation 'com.coupang:ads:1.3.0'
```

#### <span class="step-label">STEP 3</span>Configure the Manifest

Add meta-data inside the `application` tag in `AndroidManifest.xml`. Enter the Coupang Sub ID provided with this guide.

```xml
  <application>
    ....
    <meta-data android:name="coupang_ads_sub_id"
          android:value="{provided Coupang Sub ID}"/>
    ....
  </application>
```

#### <span class="step-label">STEP 4</span>Configure Proguard

If you use Proguard, you must add the following exception rules.

```text
  -keep interface com.coupang.ads.dto.DTO
  -keep class * implements com.coupang.ads.dto.DTO { *; }
```

!> The Context passed when creating ad Views must **inherit from or implement LifecycleOwner**.<br>
In most cases, this is not an issue for objects that inherit from AndroidX's ComponentActivity.

?> Interstitial banners are displayed only in the sizes supported by the Coupang SDK, regardless of the size option.

### Adding the Unity Ads SDK

To serve Unity Ads, refer to the SDK integration requirements and installation sections of the [Unity Ads SDK](https://docs.unity.com/grow/ko-kr/ads/android-sdk) guide. (Optimized for version 4.7.0.)

##### Set the GameID

To mediate the Unity Ads SDK, you must set the GameID as shown below before loading ads.

```java
MobwithSDK.getInstance().setUnityGameId(this,"{ provided GameId }");
```

### Adding the IronSource(LevelPlay) SDK

To serve IronSource(LevelPlay) ads, refer to the Getting started and Android SDK Integration sections of the [IronSource(LevelPlay) SDK](https://developers.is.com/ironsource-mobile/android/getting-started-android/) guide. (Optimized for version 8.4.0.)

```groovy
implementation 'com.ironsource.sdk:mediationsdk:9.2.0'
implementation 'com.ironsource:adqualitysdk:7.26.2'
```

##### Set the AppKey

To mediate the IronSource(LevelPlay) SDK, you must set the AppKey as shown below before loading ads.

```java
MobwithSDK.getInstance().setLevelPlayAppKey(this,"{ provided AppKey }");
```

### Adding the Pangle SDK

To serve Pangle ads, refer to the [Pangle SDK](https://www.pangleglobal.com/kr/integration/integrate-pangle-sdk-for-android) guide. (Optimized for version 7.1.0.4.)

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

##### Set the AppKey

To mediate the Pangle SDK, you must set the AppKey as shown below before loading ads.

```java
MobwithSDK.getInstance().setPangleAppKey("provided AppKey");
```

!> Library conflicts may occur when using external mediation. If the following libraries are implemented, they will cause conflicts, so please remove them.

```groovy
implementation 'com.ironsource.sdk:mediationsdk:9.2.0'
implementation 'com.ironsource:adqualitysdk:7.26.2'
```

If the dependencies of an implemented library include Pangle-related libraries, conflicts may occur, so please consult with us.

##### How to check for library conflicts

1. In Android Studio > Terminal, enter `.\gradlew app:dependencies --configuration debugRuntimeClasspath`.
2. In the resulting log, keywords such as `(*)`, `->`, `conflict`, and `requested` indicate duplicates.
3. Remove the duplicated implementation.

### Adding the DT Exchange SDK

To serve DT Exchange ads, refer to the [DT Exchange SDK](https://developer.digitalturbine.com/hc/en-us/articles/360010822437-Integrating-the-Android-SDK) guide.

##### Set the AppKey

To mediate the DT Exchange SDK, you must set the AppKey as shown below before loading ads.

```java
MobwithSDK.getInstance().setDTExChangeAppKey("provided AppKey");
```

##### build.gradle configuration

You must implement the DT Exchange SDK in `build.gradle`. (Optimized for `com.fyber:marketplace-sdk:8.3.8`.)

```groovy
implementation 'com.coupang:ads:1.3.0'
```

### Adding the Inmobi SDK

To serve Inmobi ads, refer to the [Inmobi SDK](https://support.inmobi.com/monetize/getting-started) guide.

```groovy
implementation 'com.inmobi.monetization:inmobi-ads-kotlin:11.3.0'
implementation 'com.google.android.gms:play-services-location:21.3.0'
implementation 'androidx.browser:browser:1.10.0'
```

##### Set the AppKey

To mediate the Inmobi SDK, you must set the AppKey as shown below before loading ads.

```java
MobwithSDK.getInstance().setInMobiAppKey("provided AppKey"); 
```

!> When using the NativeAdView feature, you must use a **FrameLayout** for `R.id.mediaContainerView` so that media (image, video) ads are served smoothly. (This is because the parent class of MediaView is FrameLayout.)

##### build.gradle configuration

You must implement the Inmobi SDK in `build.gradle`.<br>
(Optimized for `com.unity3d.ads-mediation:inmobi-adapter:4.3.29` and `com.inmobi.monetization:inmobi-ads-kotlin:10.8.2`.)

```groovy
implementation 'com.ironsource.sdk:mediationsdk:9.2.0'
implementation 'com.ironsource:adqualitysdk:7.26.2'
```

### Adding the Cauly SDK

To serve Cauly ads, refer to the [Cauly SDK](https://cauly.gitbook.io/cauly/android/project-build-setting) guide.

##### build.gradle configuration

You must implement the Cauly SDK in `build.gradle`. (Optimized for `com.fsn.cauly:cauly-sdk:3.5.41`.)

```groovy
allprojects {
  repositories {
      maven { url 'https://cauly.github.io/cauly-sdk-android-maven/maven-repo' }     
  }
}
```

```groovy
implementation 'com.coupang:ads:1.3.0'
```

### Adding the AdPopcorn SDK

To serve AdPopcorn ads, refer to the [AdPopcorn SDK](https://adpopcornssp.gitbook.io/ssp-sdk/sdk/android/undefined) guide.

##### Manifest configuration

Add the issued AdPopcorn APP Key to the Manifest.

```xml
  <application>
  ...
  <meta-data android:name="adpopcorn_ssp_app_key" android:value="Enter_your_app_key_here"/>
  
  <meta-data
          android:name="com.naver.gfpsdk.PUBLISHER_CD"
          android:value="Please enter a certified nam_publisher_cd."/>
  ...
  </application>
```

##### build.gradle configuration

You must implement the AdPopcorn SDK in `build.gradle`. (Optimized for `com.igaworks.ssp:IgawAdPopcornSSP:3.11.1`.)

```groovy
implementation ('com.igaworks.ssp:IgawAdPopcornSSP:3.11.1')
implementation platform('com.naver.gfpsdk:nam-bom:8.17.0')
implementation ('com.naver.gfpsdk:nam-core')
implementation ('com.naver.gfpsdk.mediation:nam-nda')
```

### Adding the ADMANAGER SDK

To serve ADMANAGER ads, refer to the [ADMANAGER SDK](https://developers.google.com/ad-manager/mobile-ads-sdk/android/quick-start?hl=ko) guide.

##### Manifest configuration

You need to add Manifest attributes to serve ADMANAGER ads.

```xml
<manifest>
  <application>
    <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="Your APP_ID"/>

    <meta-data android:name="com.google.android.gms.ads.AD_MANAGER_APP"
            android:value="true" />
  </application>
</manifest>
```

##### build.gradle configuration

```groovy
    implementation("com.google.android.gms:play-services-ads:24.9.0")
```

### Adding the Admob Mediation SDK

To serve Admob Mediation ads, refer to the [Admob SDK](https://developers.google.com/admob/android/choose-networks?hl=ko) guide.

##### build.gradle configuration

You must implement the Admob SDK in `build.gradle`. (Optimized for `com.google.android.gms:play-services-ads:24.9.0`.)

```groovy
    implementation("com.google.android.gms:play-services-ads:24.9.0")
```

##### Manifest configuration

```xml
<manifest>
  <application>
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="SAMPLE_APP_ID"/>
  </application>
  </manifest>
```

---

**Next Step** : Check how to implement each ad format in [Ad formats](/Android/usage.md).
