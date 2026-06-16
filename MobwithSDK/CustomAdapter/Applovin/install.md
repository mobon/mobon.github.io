🌐 [View English Guide](/CustomAdapter/Applovin/install_en)

# AppLovin MAX 3rd Party Adapter SDK 설치

AppLovin MAX 3rd Party Adapter를 사용하기 위한 가이드 입니다.  
아래 설명된 두 SDK를 모두 설치해주시면 됩니다.   


### 1. MobWithAdSDK 설치
다음 링크를 참조하여 프로젝트에 Mobwith AD SDK를 추가해 줍니다.  
각 OS별 SDK에서 미디에이션을 위해 추가를 요구하는 부분은 협의된 내용에 따라 적용하시면 됩니다.
- Android : [[가이드 문서 링크](/Android/installation.md)]
- iOS : [[가이드 문서 링크](/iOS/installation_base.md)]


### 2. AppLovin MAX 3rd-Party Adapter SDK 추가
각 OS별 아래를 참고하여 3rd-Party Adapter를 추가해 줍니다.

#### Android
```
implementation("io.github.mobon:MobwithApplovinMediationAdapter:1.0.1")
```


#### iOS  
cocoapod 소스 지정 부분은 위 MobwithSDK 설치 과정에서 이미 설정하신 경우 무시하셔도 됩니다.
```
# Cocoapod 소스 지정.  순서에 따라 제대로 가져오지 못 할 수 있으니 주의 바랍니다.

# 기본 Repo.
source 'https://cdn.cocoapods.org/'                   

# MobWithAdSDK의 Repo.   
source 'https://github.com/mobon/MobwithAdSpecs.git'  

# AppLovin MAX 3rd-Party Adapter SDK 추가
pod 'MobwithAppLovinMediationAdapter'
```



### 3. SDK 설치 완료 확인
AppLovin MAX 초기화 함수의 콜백을 통해 SDK 설치가 제대로 되었는지 확인이 가능 합니다.  
각 OS별 아래 내용을 참고하셔서 SDK가 제대로 설치되었는지 확인 바랍니다.  
참고로 먼저 AppLovin MAX 관리자 콘솔에서 미디에이션 설정이 완료 되어야 합니다.  

#### Android
아래 초기화 함수를 통해 Initialize를 합니다.
```
AppLovinSdk.getInstance(activity).initialize(initConfigBuilder.build(), new AppLovinSdk.SdkInitializationListener() {
            @Override
            public void onSdkInitialized(AppLovinSdkConfiguration appLovinSdkConfiguration) {
                //SDK 설정 완료 시 진입
            }
        });
```

#### iOS
```
let initConfig = ALSdkInitializationConfiguration(sdkKey: AdIds.appKey) { builder in
            builder.mediationProvider = ALMediationProviderMAX
        }
        
        ALSdk.shared().initialize(with: initConfig) { config in
            self.isInited = true
        }
```


### 4. 참고 사항
* 3rd Party Adapter의 경우 AppLovin MAX SDK의 미디에이션에 3rd Party로 참여하는 것이므로, 해당 프로젝트에 AppLovin MAX SDK가 설치되어 있어야 합니다.  
* AppLovin MAX SDK를 설치하지 않은 경우 아래 각 OS별 링크를 통해 AppLovin MAX SDK의 설치 및 광고 설정을 진행해 주셔야 합니다.  
  * Android : [AppLovin MAX Android 가이드 바로가기](https://support.axon.ai/en/max/android/overview/integration)
  * iOS : [AppLovin MAX iOS 가이드 바로가기](https://support.axon.ai/en/max/ios/overview/integration)

* 최적화된 AppLovin Max SDK 버전은 아래와 같습니다.
  * Android : 13.6.3
  * iOS : 13.6.0