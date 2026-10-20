# Reward AD <!-- {docsify-ignore} -->

MobWithRewardAd를 이용하여 사용자에게 광고를 보여 주고 리워드를 제공하는 리워드 광고의 사용 방법을 안내합니다.

## MobWithRewardAd

MobWithRewardAd를 생성하고 `loadAd()`를 호출하여 광고를 요청합니다.

```swift
let rewardAd = MobWithRewardAd.init()
rewardAd.rootViewController = self
rewardAd.adDelegate = self
rewardAd.unitId = "{전달받은 지면번호}"

rewardAd.loadAd()
```

리워드 광고는 광고 로드와 화면 표시가 분리되어 있습니다. 광고가 로드된 것을 확인한 뒤 `show()`를 호출하여 표시합니다.

```swift
if rewardAd.isLoaded() {
    rewardAd.show()
}
```

| 메서드 | 설명 |
|---|---|
| `loadAd()` | 광고를 로드합니다. 광고를 빠르게 표시하기 위해, 실제 광고를 표시하는 시점 이전에 미리 광고를 불러 두는 것을 권장합니다. |
| `isLoaded()` | 광고가 로드되어 있으면 `true`, 그 외에는 `false`를 반환합니다. 광고가 로드되어 있지 않으면 `show()`를 호출해도 실패합니다. |
| `show()` | 로드된 광고가 있는 경우 화면에 리워드 광고를 표시합니다. |

## MobWithRewardAdDelegate

MobWithRewardAd의 각 이벤트를 전달받을 수 있는 delegate입니다.<br>
모든 콜백의 `rewardAd` 파라미터는 해당 이벤트가 발생한 객체입니다.

| 콜백 | 호출 시점 |
|---|---|
| `mobWithRewardAdDidReceived(_:)` | 광고를 수신한 경우. 이후 `show()`를 호출해야 광고가 표시됩니다. |
| `mobWithRewardAdDidFailToReceive(_:)` | 광고를 수신하지 못한 경우 |
| `mobWithRewardAdClicked(_:)` | 광고를 클릭한 경우 |
| `mobWithRewardAdDidOpend(_:)` | 광고가 화면에 표시된 경우 |
| `mobWithRewardAdDidOpenFailed(_:)` | 광고를 화면에 표시하는 데 실패한 경우 |
| `mobWithRewardAdClosed(_:)` | 표시된 광고를 닫은 경우 |
| `mobWithRewardAdCanReward(_:)` | 리워드 제공 조건을 충족한 경우 |

?> 사용자 보상은 `mobWithRewardAdCanReward(_:)` 콜백을 받은 경우에 지급해 주세요.

```swift
extension ViewController: MobWithRewardAdDelegate {

    func mobWithRewardAdDidReceived(_ rewardAd: MobWithRewardAd?) {
        // 광고 수신 성공
    }

    func mobWithRewardAdDidFailToReceive(_ rewardAd: MobWithRewardAd?) {
        // 광고 수신 실패
    }

    func mobWithRewardAdClicked(_ rewardAd: MobWithRewardAd?) {
        // 광고 클릭
    }

    func mobWithRewardAdDidOpend(_ rewardAd: MobWithRewardAd?) {
        // 광고 표시
    }

    func mobWithRewardAdDidOpenFailed(_ rewardAd: MobWithRewardAd?) {
        // 광고 표시 실패
    }

    func mobWithRewardAdClosed(_ rewardAd: MobWithRewardAd?) {
        // 광고 닫기
    }

    func mobWithRewardAdCanReward(_ rewardAd: MobWithRewardAd?) {
        // 리워드 지급
    }
}
```
