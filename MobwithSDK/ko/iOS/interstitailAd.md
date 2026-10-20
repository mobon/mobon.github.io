# Interstitial AD <!-- {docsify-ignore} -->

MobWithInterstitialAd를 이용하여 화면 전체에 전면 광고를 표시하는 방법을 안내합니다.

!> **Deprecated** : `MobWithInterstitailAd` / `MobWithIntersitialAdDelegate`는 SDK 1.3.34부터 deprecated 되었습니다. 대신 `MobWithInterstitialAd` / `MobWithInterstitialAdDelegate`를 사용해 주세요. 자세한 내용은 [Migration Guide](/iOS/migration-guide.md)를 참고 바랍니다.

## MobWithInterstitialAd

MobWithInterstitialAd를 생성하고 `loadAd()`를 호출하여 광고를 요청합니다.

```swift
let interstitialAd = MobWithInterstitialAd.init()
interstitialAd.rootViewController = self
interstitialAd.adDelegate = self
interstitialAd.unitId = "{전달받은 지면번호}"

interstitialAd.loadAd()
```

전면 광고는 광고 로드와 화면 표시가 분리되어 있습니다. 광고가 로드된 것을 확인한 뒤 `show()`를 호출하여 표시합니다.

```swift
if interstitialAd.isLoaded() {
    interstitialAd.show()
}
```

| 메서드 | 설명 |
|---|---|
| `loadAd()` | 광고를 로드합니다. 광고를 빠르게 표시하기 위해, 실제 광고를 표시하는 시점 이전에 미리 광고를 불러 두는 것을 권장합니다. |
| `isLoaded()` | 광고가 로드되어 있으면 `true`, 그 외에는 `false`를 반환합니다. 광고가 로드되어 있지 않으면 `show()`를 호출해도 실패합니다. |
| `show()` | 로드된 광고가 있는 경우 화면에 전면 광고를 표시합니다. |

## MobWithInterstitialAdDelegate

MobWithInterstitialAd의 각 이벤트를 전달받을 수 있는 delegate입니다.<br>
모든 콜백의 `interstitialAd` 파라미터는 해당 이벤트가 발생한 객체입니다.

?> 프로토콜 이름은 변경되었지만, 콜백 메서드 이름(`mobWithIntersitialAd...`)은 기존과 동일하게 유지됩니다.

| 콜백 | 호출 시점 |
|---|---|
| `mobWithIntersitialAdDidReceived(_:)` | 광고를 수신한 경우 |
| `mobWithIntersitialAdDidFailToReceive(_:)` | 광고를 수신하지 못한 경우 |
| `mobWithIntersitialAdClicked(_:)` | 광고를 클릭한 경우 |
| `mobWithIntersitialAdDidOpend(_:)` | 광고가 화면에 표시된 경우 |
| `mobWithIntersitialAdDidOpenFailed(_:)` | 광고를 화면에 표시하는 데 실패한 경우 |
| `mobWithIntersitialAdDidClosed(_:)` | 표시된 광고를 닫은 경우 |

```swift
extension ViewController: MobWithInterstitialAdDelegate {

    func mobWithIntersitialAdDidReceived(_ interstitialAd: MobWithInterstitialAd?) {
        // 광고 수신 성공
    }

    func mobWithIntersitialAdDidFailToReceive(_ interstitialAd: MobWithInterstitialAd?) {
        // 광고 수신 실패
    }

    func mobWithIntersitialAdClicked(_ interstitialAd: MobWithInterstitialAd?) {
        // 광고 클릭
    }

    func mobWithIntersitialAdDidOpend(_ interstitialAd: MobWithInterstitialAd?) {
        // 광고 표시
    }

    func mobWithIntersitialAdDidOpenFailed(_ interstitialAd: MobWithInterstitialAd?) {
        // 광고 표시 실패
    }

    func mobWithIntersitialAdDidClosed(_ interstitialAd: MobWithInterstitialAd?) {
        // 광고 닫기
    }
}
```
