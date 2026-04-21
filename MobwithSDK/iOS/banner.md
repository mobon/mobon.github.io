## Banner 광고 <!-- {docsify-ignore} -->
<br>  
<br>  

## MobWithAdView
----
Banner 광고는 MobWithAdView를 이용하여 표시할 수 있습니다. 
광고 요청은 아래와 같이 호출 하면 됩니다.


```swift
let mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: width, height: height),
                                       type: .BANNER_320x50,
                                       bannerUnitId: '발급받은 광고 UNIT ID')
self.view.addSubview(mobWithAdView)
mobWithAdView.loadAd()
```


## 배너 타입(BannerType) 및 크기
----
| 타입 명 | 크기 | 설명 |
| :----:| :---:| :----|
| Banner320x50 | 320x50 | 320x50 사이즈 배너를 표시합니다 |
| Banner320x100 | 320x100 | 320x100 사이즈 배너를 표시합니다 |
| Banner300x250 | 300x250 | 320x250 사이즈 배너를 표시합니다 |


## 광고 자동 갱신
----

### interval
아래 예시처럼 interval 변수 값을 60이상으로 설정하면 배너 광고가 설정된 시간마다 자동으로 갱신 됩니다.  
설정되는 값은 '초(Second)' 단위 값이며, 최소 60초 이상으로 설정하셔야 하며 60보다 작은 값을 설정하는 경우 60초 마다 동작합니다.  
사용하지 않는 경우 0으로 설정하시면 됩니다.  기본값은 0 입니다. 
관리자 페이지에서 설정된 값이 있는 경우 해당값을 우선 합니다.

```swift
mobWithAdView.interval = 60
```

### stop()
광고 자동 갱신을 정지 시킵니다.
```swift
mobWithAdView.stop()       // 광고 자동 갱신 중지

```

### start()
정지된 광고 자동 갱신을 다시 시작합니다.
```swift
mobWithAdView.restart()    // 광고 자동 갱신 재시작
```





## 배너 사이즈 설정
----
광고를 표시할 뷰의 사이즈는 아래와 같이 지정된 BannerType의 크기와 동일하게 맞추는 것을 권장 드립니다.
```swift
mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: 320, height: 50),
                                   type: .BANNER_320x50,
                                   bannerUnitId: '발급받은 광고 UNIT ID')
```
* 동일한 사이즈가 아닌 경우 여백이 발생 할 수 있습니다.
* fillMode 설정 또는 AdFit 비즈보드 광고의 경우 type에 상관없이 지정된 사이즈를 최대한 활용하기도 합니다.

### fillMode
fillMode를 true로 설정하시면 지정한 사이즈를 최대한 활용하게 됩니다. 기본값은 false 입니다.  
다만 실제 노출될 광고의 비율과 지정한 영역의 비율이 맞지 않는 경우 남는 공간에 대해 여백이 발생 할 수 있으니,  
가급적 비율은 동일하게 맞출 것을 권장 드립니다.
``` swift
...
mobWithAdView.fillMode = true
...
```

### fitToHeight
fitToHeight를 true로 설정하시면 일부 광고 소스에 대해 MobWithAdView를 생성 할때 제공된 height 값을 기준으로 사이즈를 비율에 맞게 조절합니다.  
이때, 부모 View 비율에 따라 좌우에 여백이 생길 수 있는점 참고 바랍니다.
기본값은 false 입니다.  
``` swift
...
mobWithAdView.fitToHeight = true
...
```

### AdFit 비즈보드 이용시
비즈보드 광고의 경우 기본으로 여백이 할당 되도록 구현되어 있습니다.  따라서 광고 뷰 생성 및 로드를 하기전 아래의 코드를 참고하여 필요에 따라 여백을 설정해줄 필요가 있습니다.
``` swift
...
BizBoardTemplate.defaultEdgeInset = UIEdgeInsets.init(top: 0.0, left: 0.0, bottom: 0.0, right: 0.0)
...
```




## MobWithADViewDelegate
---
MobWithAdView의 콜백 이벤트들은 MobWithADViewDelegate를 통해 전달 됩니다.  
MobWithADViewDelegate는 아래를 참고 하시면 됩니다.

```swift
class ViewController: UIViewController {
  .....
  let mobWithAdView = MobWithAdView.init(CGRect(x: 0, y: 100, width: width, height: height),
                                         type: .BANNER_320x50,
                                         bannerUnitId: '발급받은 광고 UNIT ID')
  mobWithAdView.adDelegate = self
  .....

}



extension ViewController: MobWithADViewDelegate {

  func mobWithAdViewDidReceivedAd() {
    // 광고 수신 성공
    printLog(#function)
  }

  func mobWithAdViewDidFailToReceiveAd() {
    // 광고 수신 실패
    printLog(#function)
  }
    
  func mobWithAdViewClickedAd() {
    // 광고 클릭
    printLog(#function)
  }

}

```
