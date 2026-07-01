🌐 <a href="../ko/#/iOS/banner">한국어 가이드</a>

## Banner AD <!-- {docsify-ignore} -->
<br>  
<br>  

## MobWithAdView
----
A Banner ad can be displayed using MobWithAdView.  
You can request an ad by calling it as shown below.


```swift
let mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: width, height: height),
                                       type: .BANNER_320x50,
                                       bannerUnitId: 'UNIT ID')
self.view.addSubview(mobWithAdView)
mobWithAdView.loadAd()
```


## Banner types and sizes
----
| Type name | Size | Description |
| :----:| :---:| :----|
| Banner320x50 | 320x50 | Displays a 320x50 size banner |
| Banner320x100 | 320x100 | Displays a 320x100 size banner |
| Banner300x250 | 300x250 | Displays a 320x250 size banner |


## Ad auto-refresh
----

### interval
As in the example below, if you set the interval variable value to 60 or higher, the banner ad is automatically refreshed at the set time interval.  
The value set is in 'seconds', and you must set at least 60 seconds; if you set a value smaller than 60, it operates every 60 seconds.  
If you do not use it, set it to 0. The default value is 0.  
If there is a value set in the admin page, that value takes precedence.

```swift
mobWithAdView.interval = 60
```

### stop()
Restarts the stopped ad auto-refresh.
```swift
mobWithAdView.stop()       // Stop ad auto-refresh

```

### start()
정지된 광고 자동 갱신을 다시 시작합니다.
```swift
mobWithAdView.restart()    // Restart ad auto-refresh
```





## Banner size setup
----
We recommend matching the size of the view that displays the ad to the size of the specified BannerType, as shown below.
```swift
mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: 320, height: 50),
                                   type: .BANNER_320x50,
                                   bannerUnitId: 'UNIT ID')
```
* If the sizes are not the same, margins (whitespace) may occur.
* When fillMode is set, or for AdFit Bizboard ads, the specified size may be used to the maximum regardless of the type.

### fillMode
If you set fillMode to true, the specified size will be used to the maximum.  
The default value is false.  
However, if the ratio of the ad that will actually be displayed does not match the ratio of the specified area, margins may occur in the remaining space, so we recommend matching the ratio identically where possible.
``` swift
...
mobWithAdView.fillMode = true
...
```

### fitToHeight
If you set fitToHeight to true, for some ad sources, the size is adjusted proportionally based on the height value provided when creating the MobWithAdView.  
In this case, please note that margins may appear on the left and right depending on the parent View ratio.  
The default value is false.
``` swift
...
mobWithAdView.fitToHeight = true
...
```


### useCloseButton
If you set useCloseButton to true, a close button is created on the ad.  
When the close button is pressed, the mobWithAdViewClose() callback is delivered, and we recommend handling it appropriately accordingly.  
The default value is false.
``` swift
...
mobWithAdView.useCloseButton = true
...
```

### When using AdFit Bizboard
For Bizboard ads, margins are allocated by default.  
Therefore, before creating and loading the ad view, you need to set the margins as needed by referring to the code below.
``` swift
...
BizBoardTemplate.defaultEdgeInset = UIEdgeInsets.init(top: 0.0, left: 0.0, bottom: 0.0, right: 0.0)
...
```




## MobWithADViewDelegate
---
The callback events of MobWithAdView are delivered via MobWithADViewDelegate.  
Please refer to the following for MobWithADViewDelegate.

```swift
class ViewController: UIViewController {
  .....
  let mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: width, height: height),
                                         type: .BANNER_320x50,
                                         bannerUnitId: 'UNIT ID')
  mobWithAdView.adDelegate = self
  .....

}



extension ViewController: MobWithADViewDelegate {

  func mobWithAdViewDidReceivedAd() {
    // Ad received successfully
    printLog(#function)
  }

  func mobWithAdViewDidFailToReceiveAd() {
    // Ad reception failed
    printLog(#function)
  }
    
  func mobWithAdViewClickedAd() {
    // Ad clicked
    printLog(#function)
  }

  func mobWithAdViewClose(_ banner: MobWithAdView?) {
    // When the close button is used and the close button is pressed
    printLog(#function)
  }
}

```
