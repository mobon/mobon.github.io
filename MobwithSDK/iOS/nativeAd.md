## Native AD <!-- {docsify-ignore} -->

## MMNativeAdView
--- 
사용자가 직접 뷰를 설정하고, 설정된 뷰를 SDK에서 전달받아 각각의 view에 광고 데이터를 설정해주는 기능만 담당하는 AdView입니다.  
설정된 View를 확인하지 못하는 경우 광고가 제대로 표시되지 않을 수 있으니 주의 바랍니다.

### 광고 호출방법
```swift
var nativeAdView = MMNativeAdView(bannerUnitId: mediaCode,
                                  adContainerView: adContainerView,
                                  nativeAdRootView: nativeAdRootView,
                                  adImageView: thumbnailImageView,
                                  logoImageView: logoImageView,
                                  titleLabel: titleLabel,
                                  descriptionLabel: descLabel,
                                  gotoSiteButton: goButton,
                                  infoLogoImageView: infoLogoImageView)
nativeAdView.adDelegate = self
nativeAdView.loadAd()

```

### performAdClicked()
gotoSiteButton을 통한 광고 클릭을 발생시킬 수 없는 경우 별도로 버튼을 만들어 아래 예시와 같이 해당 함수를 호출하여 광고 클릭 이벤트를 발생시킬 수 있습니다.
```swift
nativeAdView.performAdClicked()

```
위 메소드를 호출하여 광고를 클릭한 것과 동일한 효과를 줄 수 있습니다.


### adDelegate 
콜백을 받기 위한 Delegate는 [MobWithADViewDelegate](/iOS/banner?id=mobwithadviewdelegate)를 사용합니다.  

<br><br>

## MobWithNativeAdLoader
---
MobWithNativeAdLoader는 MMNativeAdView를 ListView와 같은 타입의 뷰에 광고를 표시하고자 할 때 유용한 기능 입니다.

<br>

### 광고 로드 방법

먼저 광고를 표시하기 위한 View를 생성합니다.  
이때 해당 Views는 MobwithNativeAdViewRender를 extension하여 각 메소드들을 정의해 주어야 하며, AppLovin을 사용하시는 경우 MANativeAdView를 상속 받은 상태여야 합니다.

```swift
class NativeAdLoaderView: MANativeAdView {
    static let needHeight:CGFloat = 347.0
    
    @IBOutlet weak var thumbnailImageView: UIImageView!
    @IBOutlet weak var logoImageView: UIImageView!
    @IBOutlet weak var infoLogoImageView: UIImageView!
    
    @IBOutlet weak var adTitleLabel: UILabel!
    @IBOutlet weak var descLabel: UILabel!
    @IBOutlet weak var goButton: UIButton!
        
}


extension NativeAdLoaderView: MobwithNativeAdViewRender {
    
    func getAdImageView() -> UIImageView? {
        return thumbnailImageView
    }
    
    func getAdLogoImageView() -> UIImageView? {
        return logoImageView
    }
    
    func getAdTitleLabel() -> UILabel? {
        return adTitleLabel
    }
    
    func getAdDescriptionLabel() -> UILabel? {
        return descLabel
    }
    
    func getGoToSiteButton() -> UIButton? {
        return goButton
    }
    
    func getInfoLogoImageView() -> UIImageView? {
        return infoLogoImageView
    }
    
}
```
<br>

다음으로 광고를 불러오기 위해 MobWithNativeAdLoader를 생성 및 초기화를 진행해 줍니다.  여기에 위에서 생성해 두었던 광고를 표시할 View를 넘겨 주도록 합니다.
```swift

//MobwithNativeAdLoader 생성
let mediaCodes:[String] = [ "광고 Unit ID" ] //1개 이상의 Unit를 설정해 주어야 합니다.
var nativeAdLoader = MobWithNativeAdLoader(unitIds: mediaCodes, nibName: "NativeAdLoaderView", bundle: nil)
nativeAdLoader.nativeAdLoaderDelegate = self
//광고를 표시할 View 설정
adLoader.setNativeADView(this,
      R.layout.custom_native_ad_view,
      R.id.mediaContainerView,
      R.id.imageViewAD,
      R.id.imageViewLogo,
      R.id.textViewTitle,
      R.id.textViewDesc,
      R.id.buttonGo,
      R.id.infoViewLayout,
      R.id.imageViewInfo);


.......

```
<br> 

이후 UITableView등 리스트 타입 View에서 아래와 같이 생성된 광고 View를 가져와서 화면에 노출 되도록 합니다.

```swift

...

func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
  if (indexPath.row % 5 == 4) {
    let cell:UITableViewCell? = tableView.dequeueReusableCell(withIdentifier: "NativeADCellID", for: indexPath)
    
    // loadAD()를 호출하면 이미 로드된 광고가 있거나 이미 생성된 뷰가 있는 경우 해당 View를 전달해 줍니다.
    // isLoadedAd()를 호출하면 광고를 받아온 경우 true를 반환합니다. 해당 값을 확인후 뷰에 추가하는것을 권장드립니다.
    if let adView = nativeAdLoader.loadAd(At: indexPath), nativeAdLoader.isLoadedAd(At: indexPath) {
      cell?.addSubview(adView)
                
      adView.translatesAutoresizingMaskIntoConstraints = false
      cell?.widthAnchor.constraint(equalTo: adView.widthAnchor).isActive = true
      cell?.heightAnchor.constraint(equalTo: adView.heightAnchor).isActive = true
      cell?.centerXAnchor.constraint(equalTo: adView.centerXAnchor).isActive = true
      cell?.centerYAnchor.constraint(equalTo: adView.centerYAnchor).isActive = true
    }
    else {
      if nativeAdLoader.isFailLoadAd(At: indexPath) {
        nativeAdLoader.retryLoadAd(At: indexPath)
      }
                
      cell?.subviews.forEach({ view in
        (view as? NativeAdLoaderView)?.removeFromSuperview()
      })
    }

    return cell ?? UITableViewCell.init()
  }
  else {
    ...
  }

...

```



## MobWithNativeAdLoaderDelegate
MobWithNativeAdLoader의 경우 리스트상 index등의 관리가 필요하기 때문에 별도로 제작된 MobWithNativeAdLoaderDelegate를 사용해야 합니다.  
delegate의 각 콜백 메소드는 아래를 참고 하시면 됩니다.
* <b>주의 : MMNativeAdView의 adDelegate는 [MobWithADViewDelegate](/iOS/banner?id=mobwithadviewdelegate)를 사용하셔야 합니다. </b>

### mobWithNativeAdViewClickedAd()                                
광고를 클릭한 경우 전달 됩니다

### mobWithNativeAdViewDidReceivedAd(At index:IndexPath?)      
광고를 수신한 경우 전달 됩니다.  
index는 해당 광고가 표시될 위치의 IndexPath값 입니다

### mobWithNativeAdViewDidFailToReceiveAd(At index:IndexPath?) 
광고를 수신하지 못한 경우 전달 됩니다.  
index는 해당 광고가 표시될 위치의 IndexPath값 입니다.
