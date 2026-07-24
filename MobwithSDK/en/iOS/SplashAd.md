🌐 <a href="../ko/#/iOS/SplashAd">한국어 가이드</a>

## MMSplashAd  <!-- {docsify-ignore} -->

This is an ad object used to display ads on the splash screen.

```swift
let splashAd = MMSplashAd(viewController: self, unitId: "{ Your Ad Unit ID }", rootView: self.view)
splashAd.delegate = self
splashAd.useFullScreenAd = false
splashAd.timeOutSec = 5

splashAd.loadAd()
```


### Initialization Function Parameters
| Parameter Name | Description |
| :----: | :---- |
| **viewController** | Required. <br> Pass the ViewController where the ad will be displayed. <br> If rootView is not set, the splash ad will be displayed on the main view of the passed ViewController, <br>and if there are other views covering the ad display area, it may be obscured. |
| **unitId** | Required. <br> Pass the ad unit ID to be used for the ad. |
| **rootView** | Optional. <br> Pass the view where the SplashAd will be displayed. <br> It is recommended to pass a view of the same size as the main view of the ViewController. <br> Recommended for use if you have views such as app logos that you want to avoid being covered by the ad.  <br> * Please be cautious as the ad may not display properly depending on the size and position of the passed view.|

<br>
<br>
<br>

### Using Full-Screen Mode
Setting useFullScreenAd to true enables full-screen mode. The default value is false.
* Depending on the ad size, full-screen size may not be displayed.  
```swift
splashAd.useFullScreenAd = true
```

### Ad Request
Call the loadAd() function to load the ad.
```swift
splashAd.loadAd()
```

### Ad Request Timeout
You can set the waiting time for the ad request.  
If no ad response is received within the specified time, the ad load failure callback is triggered.
Enter the time in seconds, and the default value is 5 seconds.
```swift
splashAd.timeOutSec = 5
```



### Removing the Ad Object
Call the destroy() function to remove the current ad object.  
If the ad is loading, even if the ad is successfully received after calling this function, event callbacks will not be delivered. Please be aware of this.  
```swift
splashAd.destroy()
```


### MMSplashAdDelegate
Implement MMSplashAdDelegate to receive callbacks for each splash ad event. 
Please refer to the details below.
```swift
extension SplashViewController: MMSplashAdDelegate {
    
    public func mobWithSplashAdDidReceived() {
        // Splash ad received
    }
    
    public func mobWithSplashAdFailToReceived() {
        // Failed to receive splash ad
    }
}

```


### Handling Ad Callback Events and Splash Screen Behavior  
Please refer to the following for ad loading and callback event handling.
* After a successful ad load, please delay for a certain period before moving to the next screen.

```swift
class SplashViewController: UIViewController {
    
    var splashAd: MMSplashAd?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        splashAd = MMSplashAd.init(viewController: self, unitId: "{ Your Ad Unit ID }")
        splashAd?.delegate = self
        splashAd.useFullScreenAd = false
        splashAd.timeOutSec = 5
        
        splashAd?.loadAd()
    }
    
    func openNextVC() {
        // Implement navigation to the next screen
    }
}



extension SplashViewController: MMSplashAdDelegate {
    func mobWithSplashAdDidReceived() {
        // Ad loaded successfully. Wait an additional 3 seconds before moving to the next screen
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) { [weak self] in
            self?.openNextVC()
        }
    }
    
    func mobWithSplashAdFailToReceived() {
        // Ad load failed. Immediately move to the next screen
        openNextVC()
    }
}

```