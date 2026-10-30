# SDK Installation <!-- {docsify-ignore} -->

MobWith SDK를 Android 앱 프로젝트에 설치하는 방법을 안내합니다.<br>
Gradle 설정과 권한 설정을 적용한 뒤, 협의된 미디에이션 SDK가 있다면 함께 추가합니다.

## Gradle 설정

#### <span class="step-label">STEP 1</span>저장소 추가

project 단위 `build.gradle`에 저장소를 추가합니다. 사용하는 SDK 버전에 따라 설정이 다릅니다.

##### SDK 1.0.112 이상

`buildscript`와 `allprojects`에 MobWith maven 저장소를 추가합니다. 이 저장소에서는 `io.github.mobon` 그룹만 가져오도록 `includeGroup`을 지정합니다.

```groovy
buildscript {
    repositories {
        maven {
            url 'https://img.mobwithad.com/ad/imgfile/maven-repo'
            content {
                includeGroup 'io.github.mobon'
            }
        }
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
        maven {
            url 'https://img.mobwithad.com/ad/imgfile/maven-repo'
            content {
                includeGroup 'io.github.mobon'
            }
        }
    }
}
```

##### SDK 1.0.111 이하

`mavenCentral()`과 jitpack 저장소를 추가합니다.

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

#### <span class="step-label">STEP 2</span>의존성 추가

app 단위 `build.gradle`에 `com.google.android.gms:play-services-ads-identifier`와 최신 버전의 MobWith SDK를 추가합니다.

```groovy
dependencies {
    implementation 'com.google.android.gms:play-services-ads-identifier:17.0.0'
    implementation 'com.google.android.gms:play-services-ads:24.9.0'
    implementation 'io.github.mobon:mobwithSDK:1.0.112'
    implementation 'com.github.Dimezis:BlurView:version-3.2.0'
}
```

## 권한 설정

`AndroidManifest.xml`에 인터넷 권한을 추가합니다.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

##### Android 9 (Pie) 업데이트에 따른 추가 설정

targetSdkVersion 28 이상부터는 네트워크 통신 시 암호화되지 않은 HTTP 통신이 기본적으로 차단됩니다.<br>
Android 9(API 28)부터 `usesCleartextTraffic`의 기본값은 `false`로, HTTP 통신이 제한됩니다.

SDK 내 모든 미디에이션 광고가 정상적으로 동작하려면 HTTP 통신을 허용해야 합니다. `AndroidManifest.xml`의 `application` 태그에 `usesCleartextTraffic="true"` 속성을 설정합니다.

```xml
<manifest ...>
<application
...
android:usesCleartextTraffic="true"
...>
</application>
</manifest>
```

## Appier SDK 추가 (선택)

SDK 1.0.112부터 Appier(Aistra) SDK는 MobWith SDK에 포함되어 있지 않습니다. Appier를 사용하는 경우 app 단위 `build.gradle`에 아래 의존성을 추가합니다.

```groovy
dependencies {
    implementation 'com.appier:aistra-android:2.0.0'
}
```

## 미디에이션 SDK 추가

미디에이션을 통해 다른 광고 네트워크의 광고를 송출하는 경우, 사용하는 네트워크의 SDK를 아래를 참고하여 추가합니다.

### ADFIT SDK 추가

AdFit 광고를 송출하려면 [AdFit SDK](https://github.com/adfit/adfit-android-sdk) 가이드를 참고해 주세요.

- MobWithSDK는 **AdFit SDK(`com.kakao.adfit:ads-base:3.21.10`)** 버전에 최적화되어 있습니다.
- 상황에 따라 가이드에 명시된 라이브러리(`com.kakao.adfit:ads-base:3.21.10`)가 아닌 다른 버전 또는 타입의 SDK를 추가로 적용해야 할 수 있습니다. (해당되는 경우 별도로 안내됩니다.)

!> NativeAdView 기능 사용 시, `R.id.mediaContainerView`에는 반드시 **FrameLayout**을 사용해야 합니다.<br>
(MediaView의 상위 클래스가 FrameLayout이기 때문에, 미디어(이미지, 동영상) 광고가 정상적으로 노출됩니다.)

### ADOP BidMad SDK 추가

ADOP 광고를 송출하려면 [ADOP BidMad SDK](https://github.com/bidmad/Bidmad-Android/blob/master/README.md#1-SDK-%EC%84%B8%ED%8C%85) 가이드를 참고해 주세요.

- MobWithSDK는 **ADOP BidMad SDK 3.25.\*\* 버전**에 최적화되어 있습니다.
- 아래는 MobWith SDK에 설정된 ADOP Adapter입니다. 설정 시 참고하시면 되며, API 키 등 설정해야 하는 값은 협의된 내용을 토대로 적용하시면 됩니다.

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

!> ADOP BidMad 이외의 다른 광고 SDK를 함께 사용하면 라이브러리 충돌이 발생할 수 있습니다. 아래 라이브러리는 해당 광고 사용 시 제거해야 합니다.

| 라이브러리 | 제거 조건 |
|---|---|
| `com.adop.sdk.adapter:adfit:{version}` | AdFit 광고 사용 시 (라이브러리 중복) |
| `com.adop.sdk.adapter:pangle:{version}` | Pangle 광고 사용 시 (라이브러리 중복) |
| `com.adop.sdk.partners:admobbidding:{version}` | Pangle 광고 사용 시 (라이브러리 중복) |

### Coupang SDK 추가

#### <span class="step-label">STEP 1</span>저장소 추가

project 단위 Gradle에 Coupang SDK를 가져오기 위한 저장소를 추가합니다.

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

#### <span class="step-label">STEP 2</span>의존성 추가

app 단위 Gradle 파일에 Coupang SDK를 추가합니다.

```groovy
implementation 'com.coupang:ads:1.3.0'
```

#### <span class="step-label">STEP 3</span>Manifest 설정

`AndroidManifest.xml`의 `application` 태그 안에 meta-data를 추가합니다. 값은 가이드와 함께 제공된 Coupang Sub ID를 입력합니다.

```xml
  <application>
    ....
    <meta-data android:name="coupang_ads_sub_id"
          android:value="{전달 받은 Coupang Sub ID}"/>
    ....
  </application>
```

#### <span class="step-label">STEP 4</span>Proguard 설정

Proguard 사용 시 아래와 같이 예외 설정을 추가해 주셔야 합니다.

```text
-keep interface com.coupang.ads.dto.DTO
-keep class * implements com.coupang.ads.dto.DTO { *; }
```

!> 광고 View를 생성할 때 전달하는 Context는 **LifecycleOwner를 상속하거나 구현**하고 있어야 합니다.<br>
대체로 AndroidX의 ComponentActivity를 상속받고 있는 객체라면 특별히 문제 되지 않습니다.

?> 전면 배너는 사이즈 옵션과 관계없이 Coupang SDK에서 지원하는 사이즈로만 출력됩니다.

### Unity Ads SDK 추가

Unity Ads 광고를 송출하려면 [Unity Ads SDK](https://docs.unity.com/grow/ko-kr/ads/android-sdk) 가이드의 SDK 연동 요구사항 및 설치 부분을 참고해 주세요. (4.7.0 버전에 최적화되어 있습니다.)

##### GameID 설정

Unity Ads SDK를 미디에이션하려면 광고 로딩 전에 아래와 같이 GameID를 설정해야 합니다.

```java
MobwithSDK.getInstance().setUnityGameId(this,"{ 전달 받은 GameId }");
```

### IronSource(LevelPlay) SDK 추가

IronSource(LevelPlay) 광고를 송출하려면 [IronSource(LevelPlay) SDK](https://developers.is.com/ironsource-mobile/android/getting-started-android/) 가이드의 Getting started와 Android SDK Integration 항목을 참고해 주세요. (8.4.0 버전에 최적화되어 있습니다.)

```groovy
implementation 'com.ironsource.sdk:mediationsdk:9.2.0'
implementation 'com.ironsource:adqualitysdk:7.26.2'
```

##### AppKey 설정

IronSource(LevelPlay) SDK를 미디에이션하려면 광고 로딩 전에 아래와 같이 AppKey를 설정해야 합니다.

```java
MobwithSDK.getInstance().setLevelPlayAppKey(this,"{ 전달 받은 AppKey }");
```

### Pangle SDK 추가

Pangle 광고를 송출하려면 [Pangle SDK](https://www.pangleglobal.com/kr/integration/integrate-pangle-sdk-for-android) 가이드를 참고해 주세요. (7.1.0.4 버전에 최적화되어 있습니다.)

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

##### AppKey 설정

Pangle SDK를 미디에이션하려면 광고 로딩 전에 아래와 같이 AppKey를 설정해야 합니다.

```java
MobwithSDK.getInstance().setPangleAppKey("전달 받은 AppKey");
```

!> 외부 미디에이션 사용 시 라이브러리 간 충돌이 발생할 수 있습니다. 아래 라이브러리가 implementation 되어 있으면 충돌이 발생하니 제거해 주시기 바랍니다.

```groovy
implementation 'com.adop.sdk.adapter:pangle:5.2.1.1.3'
implementation 'com.adop.sdk.partners:admobbidding:1.0.2'
```

implementation된 라이브러리의 dependency에 Pangle 관련 라이브러리가 있으면 충돌이 발생할 수 있으니 관련해서 협의 바랍니다.

##### 라이브러리 충돌 확인 방법

1. Android Studio > Terminal에서 `.\gradlew app:dependencies --configuration debugRuntimeClasspath`를 입력합니다.
2. 결과 로그에서 `(*)`, `->`, `conflict`, `requested` 같은 키워드는 중복되었다는 의미입니다.
3. 중복된 implementation을 제거합니다.

### DT Exchange SDK 추가

DT Exchange 광고를 송출하려면 [DT Exchange SDK](https://developer.digitalturbine.com/hc/en-us/articles/360010822437-Integrating-the-Android-SDK) 가이드를 참고해 주세요.

##### AppKey 설정

DT Exchange SDK를 미디에이션하려면 광고 로딩 전에 아래와 같이 AppKey를 설정해야 합니다.

```java
MobwithSDK.getInstance().setDTExChangeAppKey("전달 받은 AppKey");
```

##### build.gradle 설정

DT Exchange SDK를 `build.gradle`에 implementation 해야 합니다. (`com.fyber:marketplace-sdk:8.3.8` 버전에 최적화되어 있습니다.)

```groovy
implementation 'com.fyber:marketplace-sdk:8.4.5'
```

### Inmobi SDK 추가

Inmobi 광고를 송출하려면 [Inmobi SDK](https://support.inmobi.com/monetize/getting-started) 가이드를 참고해 주세요.

```groovy
implementation 'com.inmobi.monetization:inmobi-ads-kotlin:11.3.0'
implementation 'com.google.android.gms:play-services-location:21.3.0'
implementation 'androidx.browser:browser:1.10.0'
```

##### AppKey 설정

Inmobi SDK를 미디에이션하려면 광고 로딩 전에 아래와 같이 AppKey를 설정해야 합니다.

```java
MobwithSDK.getInstance().setInMobiAppKey("전달 받은 AppKey");
```

!> NativeAdView 기능을 사용할 때 `R.id.mediaContainerView`에 **FrameLayout**을 사용해야 미디어(사진, 동영상) 광고가 원활히 송출됩니다. (MediaView의 상위 클래스가 FrameLayout이기 때문입니다.)

##### build.gradle 설정

Inmobi SDK를 `build.gradle`에 implementation 해야 합니다.<br>
(`com.unity3d.ads-mediation:inmobi-adapter:4.3.29`, `com.inmobi.monetization:inmobi-ads-kotlin:10.8.2` 버전에 최적화되어 있습니다.)

```groovy
implementation 'com.unity3d.ads-mediation:inmobi-adapter:4.3.29'
implementation 'com.inmobi.monetization:inmobi-ads-kotlin:10.8.2'
```

### Cauly SDK 추가

Cauly 광고를 송출하려면 [Cauly SDK](https://cauly.gitbook.io/cauly/android/project-build-setting) 가이드를 참고해 주세요.

##### build.gradle 설정

Cauly SDK를 `build.gradle`에 implementation 해야 합니다. (`com.fsn.cauly:cauly-sdk:3.5.41` 버전에 최적화되어 있습니다.)

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

### AdPopcorn SDK 추가

AdPopcorn 광고를 송출하려면 [AdPopcorn SDK](https://adpopcornssp.gitbook.io/ssp-sdk/sdk/android/undefined) 가이드를 참고해 주세요.

##### Manifest 설정

발급받은 애드팝콘 APP Key를 Manifest에 추가합니다.

```xml
  <application>
  ...
  <meta-data android:name="adpopcorn_ssp_app_key" android:value="이곳에_앱키를_입력하세요"/>

  <meta-data
          android:name="com.naver.gfpsdk.PUBLISHER_CD"
          android:value="발급받은 nam_publisher_cd를 입력하세요"/>
  ...
  </application>
```

##### build.gradle 설정

AdPopcorn SDK를 `build.gradle`에 implementation 해야 합니다. (`com.igaworks.ssp:IgawAdPopcornSSP:3.11.1` 버전에 최적화되어 있습니다.)

```groovy
implementation ('com.igaworks.ssp:IgawAdPopcornSSP:3.11.1')
implementation platform('com.naver.gfpsdk:nam-bom:8.17.0')
implementation ('com.naver.gfpsdk:nam-core')
implementation ('com.naver.gfpsdk.mediation:nam-nda')
```

### ADMANAGER SDK 추가

ADMANAGER 광고를 송출하려면 [ADMANAGER SDK](https://developers.google.com/ad-manager/mobile-ads-sdk/android/quick-start?hl=ko) 가이드를 참고해 주세요.

##### Manifest 설정

ADMANAGER 광고 송출을 위한 Manifest 속성 추가가 필요합니다.

```xml
<manifest>
  <application>
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="발급받은 APP_ID"/>

    <meta-data android:name="com.google.android.gms.ads.AD_MANAGER_APP"
            android:value="true" />
  </application>
</manifest>
```

##### build.gradle 설정

```groovy
implementation("com.google.android.gms:play-services-ads:24.9.0")
```

### Admob Mediation SDK 추가

Admob Mediation 광고를 송출하려면 [Admob SDK](https://developers.google.com/admob/android/choose-networks?hl=ko) 가이드를 참고해 주세요.

##### build.gradle 설정

Admob SDK를 `build.gradle`에 implementation 해야 합니다. (`com.google.android.gms:play-services-ads:24.9.0` 버전에 최적화되어 있습니다.)

```groovy
implementation("com.google.android.gms:play-services-ads:24.9.0")
```

##### Manifest 설정

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

**다음 단계** : [Ad formats](/Android/usage.md)에서 광고 유형별 구현 방법을 확인합니다.
