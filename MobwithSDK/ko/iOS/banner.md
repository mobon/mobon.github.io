# Banner AD <!-- {docsify-ignore} -->

MobWithAdView를 이용하여 배너 광고를 표시하는 방법을 안내합니다.

## 광고 생성 및 로드

MobWithAdView를 생성하여 화면에 추가한 뒤 `loadAd()`를 호출하여 광고를 요청합니다.

```swift
let mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: 320, height: 50),
                                       type: .BANNER_320x50,
                                       bannerUnitId: "{발급받은 광고 지면번호}")
self.view.addSubview(mobWithAdView)
mobWithAdView.loadAd()
```

## 배너 타입 및 크기

| 타입명 | 크기 | 설명 |
|---|---|---|
| `.BANNER_320x50` | 320x50 | 320x50 크기의 배너를 표시합니다. |
| `.BANNER_320x100` | 320x100 | 320x100 크기의 배너를 표시합니다. |
| `.BANNER_300x250` | 300x250 | 300x250 크기의 배너를 표시합니다. |

## 배너 사이즈 설정

광고를 표시할 뷰의 크기는 아래와 같이 지정한 배너 타입의 크기와 동일하게 맞추는 것을 권장합니다.

```swift
mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: 320, height: 50),
                                   type: .BANNER_320x50,
                                   bannerUnitId: "{발급받은 광고 지면번호}")
```

?> 뷰 크기가 배너 타입의 크기와 다르면 여백이 생길 수 있습니다.<br>
`fillMode`를 설정하거나 AdFit 비즈보드 광고가 표시되는 경우에는 배너 타입과 관계없이 지정된 크기를 최대한 활용하기도 합니다.

### 표시 옵션

| 속성 | 기본값 | 설명 |
|---|---|---|
| `fillMode` | `false` | `true`로 설정하면 지정한 크기를 최대한 활용하여 광고를 표시합니다. 실제 광고의 비율과 지정한 영역의 비율이 다르면 남는 공간에 여백이 생길 수 있으므로, 가급적 비율을 동일하게 맞추는 것을 권장합니다. |
| `fitToHeight` | `false` | `true`로 설정하면 일부 광고 소스에 대해 MobWithAdView 생성 시 전달한 height 값을 기준으로 비율에 맞게 크기를 조절합니다. 부모 View 비율에 따라 좌우에 여백이 생길 수 있습니다. |
| `useCloseButton` | `false` | `true`로 설정하면 광고에 닫기 버튼이 표시됩니다. 닫기 버튼을 누르면 `mobWithAdViewClose(_:)` 콜백이 전달되므로, 이에 맞춰 적절히 처리하는 것을 권장합니다. |

```swift
mobWithAdView.fillMode = true
mobWithAdView.fitToHeight = true
mobWithAdView.useCloseButton = true
```

### AdFit 비즈보드 여백 설정

비즈보드 광고는 기본으로 여백이 할당되도록 구현되어 있습니다. 필요한 경우 광고 뷰 생성 및 로드 전에 아래와 같이 여백을 설정합니다.<br>
`BizBoardTemplate`을 사용하려면 `import AdFitSDK`가 필요합니다. ([SDK Initialization](/iOS/installation_init.md) 참고)

```swift
BizBoardTemplate.defaultEdgeInset = UIEdgeInsets.init(top: 0.0, left: 0.0, bottom: 0.0, right: 0.0)
```

## 광고 자동 갱신

`interval` 값을 설정하면 배너 광고가 설정된 시간마다 자동으로 갱신됩니다.

| 속성 | 기본값 | 설명 |
|---|---|---|
| `interval` | `0` | 자동 갱신 주기(초)입니다. 최소 60초 이상으로 설정해야 하며, 60보다 작은 값을 설정하면 60초마다 갱신됩니다. 사용하지 않는 경우 0으로 설정합니다. |

```swift
mobWithAdView.interval = 60
```

?> 관리자 페이지에 설정된 값이 있는 경우 해당 값이 우선 적용됩니다.

자동 갱신은 아래 메서드로 정지하거나 다시 시작할 수 있습니다.

| 메서드 | 설명 |
|---|---|
| `stop()` | 광고 자동 갱신을 정지합니다. |
| `restart()` | 정지된 광고 자동 갱신을 다시 시작합니다. |

```swift
mobWithAdView.stop()       // 광고 자동 갱신 중지
mobWithAdView.restart()    // 광고 자동 갱신 재시작
```

## 리워드 광고 기능 활성화

?> SDK 1.3.32 이상에서 지원합니다.

광고에서 리워드 기능을 활성화하는 경우, 아래 값을 반드시 설정해야 합니다.<br>
`mediaId`와 `serviceId`는 매체에서 직접 지정한 값을 사용하거나, 전달받은 값이 있다면 동일하게 설정해 주세요.

| 항목 | 설명 |
|---|---|
| `mediaId` | 매체(서비스)를 구분하는 고유 식별자입니다. |
| `serviceId` | 매체 내 광고가 노출되는 지면 또는 서비스 위치를 구분하는 식별자입니다. `mediaId`의 하위 값이며, 하나의 매체에 여러 지면이나 노출 위치가 있는 경우 이를 구분하는 데 사용합니다. |
| `userKey` | 사용자 ID 등 사용자를 식별하기 위한 값입니다. 매체에서 관리하는 고유한 값을 설정해 주세요. |

```swift
mobWithAdView.mediaId = "{Media ID}"
mobWithAdView.serviceId = "{Service ID}"
mobWithAdView.userKey = "{User Key}"
```

### 리워드 Affordance 커스텀

?> SDK 1.3.34 이상에서 지원합니다.

리워드 광고에 표시되는 Affordance(리워드 지급 여부를 표시하는 뱃지)의 크기, 위치, 색상 등을 변경할 수 있습니다.<br>
`MWAffordanceConfiguration`을 생성하여 `affordanceConfig`에 설정합니다.

!> Affordance는 위의 `mediaId`, `serviceId`, `userKey`를 설정하고 **관리자 페이지에서 해당 기능을 활성화**한 경우에만 표시됩니다.

```swift
let affordanceConfig = MWAffordanceConfiguration(
    size: 35,
    position: .bottomLeft,
    backgroundColor: .systemGreen,
    textColor: .white,
    rewardedIcon: UIImage(named: "{리워드 지급 아이콘}")
)

mobWithAdView.affordanceConfig = affordanceConfig
```

| 파라미터 | 타입 | 설명 |
|---|---|---|
| `size` | `CGFloat` | Affordance 크기(pt)입니다. **(필수)** |
| `position` | `MWAffordancePosition?` | 표시 위치입니다. `.topLeft` / `.topRight` / `.bottomLeft` / `.bottomRight` |
| `font` | `UIFont?` | 텍스트 폰트입니다. |
| `backgroundColor` | `UIColor?` | 배경 색상입니다. |
| `textColor` | `UIColor?` | 텍스트 색상입니다. |
| `rewardedIcon` | `UIImage?` | 리워드 지급 아이콘입니다. |
| `padding` | `CGFloat?` | Affordance 주위 여백입니다. |

`size`를 제외한 항목을 `nil`로 전달하면 기본값이 사용됩니다.<br>
`affordanceConfig`에 `nil`을 설정하면 기본 Affordance 설정으로 돌아갑니다.

?> 변경한 설정은 현재 표시 중인 광고에 바로 반영됩니다.

## MobWithADViewDelegate

MobWithAdView의 콜백 이벤트는 MobWithADViewDelegate를 통해 전달됩니다.

| 콜백 | 호출 시점 |
|---|---|
| `mobWithAdViewDidReceivedAd()` | 광고 수신에 성공한 경우 |
| `mobWithAdViewDidFailToReceiveAd()` | 광고 수신에 실패한 경우 |
| `mobWithAdViewClickedAd()` | 광고를 클릭한 경우 |
| `mobWithAdViewClose(_ banner: MobWithAdView?)` | 닫기 버튼(`useCloseButton`)을 사용하고, 닫기 버튼을 누른 경우 |
| `mobwithAdViewOpenInAppLanding(ad:params:)` | 인앱 랜딩 광고를 클릭한 경우 (SDK 1.3.35 이상). [인앱 랜딩](/iOS/banner?id=인앱-랜딩) 참고 |

```swift
class ViewController: UIViewController {
    .....
    let mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: 320, height: 50),
                                           type: .BANNER_320x50,
                                           bannerUnitId: "{발급받은 광고 지면번호}")
    mobWithAdView.adDelegate = self
    .....
}

extension ViewController: MobWithADViewDelegate {

    func mobWithAdViewDidReceivedAd() {
        // 광고 수신 성공
        print(#function)
    }

    func mobWithAdViewDidFailToReceiveAd() {
        // 광고 수신 실패
        print(#function)
    }

    func mobWithAdViewClickedAd() {
        // 광고 클릭
        print(#function)
    }

    func mobWithAdViewClose(_ banner: MobWithAdView?) {
        // 닫기 버튼을 누른 경우
        print(#function)
    }

    func mobwithAdViewOpenInAppLanding(ad: AnyObject, params: Dictionary<String, String>) {
        // 인앱 랜딩 광고 클릭 (SDK 1.3.35 이상)
        print(#function)
    }
}
```

## 인앱 랜딩

?> SDK 1.3.35 이상에서 지원합니다.

광고를 클릭했을 때 외부 브라우저 대신 앱 안에서 랜딩 화면을 표시할 수 있습니다. 인앱 랜딩은 모비위드와 협의한 뒤 사용할 수 있습니다.<br>
인앱 랜딩으로 설정된 광고를 클릭하면 SDK는 랜딩 페이지를 열지 않고 `mobwithAdViewOpenInAppLanding(ad:params:)` 콜백을 전달합니다. 앱에서는 전달받은 값으로 랜딩 화면을 직접 표시합니다.

!> 인앱 랜딩을 사용하는 경우 `mobwithAdViewOpenInAppLanding(ad:params:)`를 **반드시 구현**해 주세요. 구현하지 않으면 광고를 클릭해도 랜딩 화면이 표시되지 않습니다.

```swift
extension ViewController: MobWithADViewDelegate {

    func mobwithAdViewOpenInAppLanding(ad: AnyObject, params: Dictionary<String, String>) {
        // params 값을 이용하여 앱 내 랜딩 화면 표시
    }
}
```

| 파라미터 | 타입 | 설명 |
|---|---|---|
| `ad` | `AnyObject` | 콜백이 발생한 광고 객체입니다. 여러 광고에서 콜백을 받는 경우 어떤 광고에서 발생했는지 구분할 때 사용합니다. 전달되는 객체는 아래 표를 참고해 주세요. |
| `params` | `Dictionary<String, String>` | 랜딩 URL의 쿼리 파라미터입니다. 전달되는 키와 값은 협의된 내용을 참고해 주세요. |

같은 이름의 콜백을 아래 delegate에서 사용할 수 있습니다.

| Delegate | 광고 유형 | `ad`로 전달되는 객체 |
|---|---|---|
| [MobWithADViewDelegate](/iOS/banner?id=mobwithadviewdelegate) | Banner AD, Native AD | `MobWithAdView`, `MMNativeAdView` |
| [MobWithInterstitialAdDelegate](/iOS/interstitailAd?id=mobwithinterstitialaddelegate) | Interstitial AD | `MobWithInterstitialAd` |
| [MobWithRewardAdDelegate](/iOS/rewardAd?id=mobwithrewardaddelegate) | Reward AD | `MobWithRewardAd` |
| [MMHybridBannerBridgeDelegate](/iOS/HybridBannerBridge?id=mmhybridbannerbridgedelegate) | HybridBannerBridge | `MMHybridBannerBridge` |

## 광고 뷰 해제

더 이상 MobWithAdView를 사용하지 않는 경우 아래를 참고하여 광고 리소스를 해제해 주셔야 합니다.

```swift
mobWithAdView?.clearAdViews()
mobWithAdView = nil
```
