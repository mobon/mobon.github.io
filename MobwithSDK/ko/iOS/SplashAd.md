🌐 <a href="../en/#/iOS/SplashAd">View English Guide</a>

## MMSplashAd  <!-- {docsify-ignore} -->

스플래시 화면에 광고를 표시하기 위한 광고 객체 입니다.

```swift
let splashAd = MMSplashAd(viewController: self, unitId: "{ 전달받은 광고 지면번호 }", rootView: self.view)
splashAd.delegate = self
splashAd.useFullScreenAd = false
splashAd.timeOutSec = 5

splashAd.loadAd()
```


### 초기화 함수 파라메터
| 파라메터 명 | 설명 |
| :----: | :---- |
| **viewController** | 필수값. <br> 광고가 표시될 ViewController를 넘겨주시면 됩니다. <br> rootView가 설정되지 않으면 전달받은 ViewController의 메인 view에 스플래시 광고를 띄워주며, <br>광고가 표시되는 부분에 다른 뷰가 있는 경우 가려질 수 있습니다. |
| **unitId** | 필수값. <br> 광고에서 사용될 지면번호를 전달해주시면 됩니다. |
| **rootView** | 선택값. <br> SplashAd가 표시될 뷰를 전달해 주시면 됩니다. <br> View 크기는 해당 ViewController의 메인 View와 동일한 크기로 전달해 주시는 것을 권장 드립니다. <br> 앱 로고등 광고 표시로 가려지지 않기 원하는 뷰가 있는 경우 사용을 권장 드립니다.  <br> * 전달 받은 View의 크기 및 위치에 따라 광고가 제대로 표시 되지 않을 수 있으니 주의 바랍니다.|

<br>
<br>
<br>

### 전체 화면 모드 사용
useFullScreenAd를 true로 설정하면 전체화면 모드를 사용하게 됩니다.  기본값은 false 입니다.
* 광고 사이즈에 따라 전체화면 사이즈를 표시하지 않을 수도 있습니다.  
```swift
splashAd.useFullScreenAd = true
```

### 광고 요청
loadAd() 함수를 호출하여 광고 로딩을 합니다.
```swift
splashAd.loadAd()
```

### 광고 요청 타임아웃
광고 요청 대기 시간을 설정할 수 있습니다.  
지정된 시간내 광고 응답을 받지 못하는 경우 광고 로드 실패 콜백이 전달 됩니다.
초 단위로 입력하시면 되며, 기본값은 5초 입니다.
```swift
splashAd.timeOutSec = 5
```



### 광고 객체 제거
destroy() 함수를 호출하여 현재 광고 객체를 제거 합니다.  
만약 광고가 로딩중인 경우, 해당 함수 호출이후 광고 수신에 성공하더라도 이벤트 콜백이 전달 되지 않으니 주의 바랍니다.  
```swift
splashAd.destroy()
```


### MMSplashAdDelegate
MMSplashAdDelegate를 구현하여 스플래시 광고의 각 이벤트에 대한 콜백을 전달 받을 수 있습니다. 
자세한 내용은 아래를 참고 바랍니다.
```swift
extension SplashViewController: MMSplashAdDelegate {
    
    public func mobWithSplashAdDidReceived() {
        // 스플래시 광고를 수신함
    }
    
    public func mobWithSplashAdFailToReceived() {
        // 스플래시 광고 수신 실패
    }
}

```


### 광고 콜백 이벤트 처리 및 스플래시 화면 동작  
광고 로딩 및 콜백 이벤트 처리는 아래를 참고 부탁드립니다.
* 광고 로딩 성공시 일정 시간 지연후 다음 화면으로 이동 하시기 바랍니다.

```swift
class SplashViewController: UIViewController {
    
    var splashAd: MMSplashAd?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        splashAd = MMSplashAd.init(viewController: self, unitId: "{ 광고 지면번호}")
        splashAd?.delegate = self
        splashAd.useFullScreenAd = false
        splashAd.timeOutSec = 5
        
        splashAd?.loadAd()
    }
    
    func openNextVC() {
        // 다음 화면 이동 기능 구현
    }
}



extension SplashViewController: MMSplashAdDelegate {
    func mobWithSplashAdDidReceived() {
        // 광고 로딩 성공.  3초 추가 대기후 화면 이동
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) { [weak self] in
            self?.openNextVC()
        }
    }
    
    func mobWithSplashAdFailToReceived() {
        // 광고 로딩 실패.  즉시 다음 화면으로 이동
        openNextVC()
    }
}

```