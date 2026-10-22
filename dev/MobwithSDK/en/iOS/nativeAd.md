# Native AD <!-- {docsify-ignore} -->

This page describes how to use native ads, which display ad data in a UI you build yourself.<br>
Use MMNativeAdView for a single placement, and MobWithNativeAdLoader for list-type screens.

## MMNativeAdView

An AdView whose only responsibility is to set ad data on each view that you configure and pass to the SDK.

!> If the SDK cannot recognize the configured Views, the ad may not display correctly.

### Method 1. XIB + MobwithNativeAdViewRender (Recommended)

?> Supported in SDK 1.3.10 or later.

This method supports the default UI and a dedicated UI for MobWith direct ads.<br>
You assign an ad placement and provide separate Interface Builder (XIB) files to define the ad UI.

#### <span class="step-label">STEP 1</span>Build the ad UI with XIB

Build the ad UI by referring to the image below. This is only a sample layout; configure the UI appropriately according to the guides of the mediation SDKs you use.

![Native ad XIB layout example](../../img/ios_native_nib.png)

!> When serving NAM ads with MobWithAdPopcornAdapter, **explicitly set the size of the ContainerView**.<br>
If its size depends on internal content, for example through Auto Layout, the ad may not display correctly.

#### <span class="step-label">STEP 2</span>Connect MobwithNativeAdViewRender

Implement `MobwithNativeAdViewRender` to connect each View.

```swift
class DefaultNativeAdView: UIView {
    @IBOutlet weak var mediaView: UIView!
    @IBOutlet weak var adTitleLabel: UILabel!
    @IBOutlet weak var descLabel: UILabel!
    @IBOutlet weak var goButton: UIButton!
    @IBOutlet weak var logoImageView: UIImageView!
    @IBOutlet weak var infoLogoImageView: UIImageView!
}

extension DefaultNativeAdView: MobwithNativeAdViewRender {

    func getMediaView() -> UIView? {
        return mediaView
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

    func getAdLogoImageView() -> UIImageView? {
        return logoImageView
    }

    func getInfoLogoImageView() -> UIImageView? {
        return infoLogoImageView
    }
}
```

| Function | Description |
|---|---|
| `getMediaView() -> UIView?` | Connects the View used to display ad content such as images and videos. **(Required)** |
| `getAdImageView() -> UIImageView?` | Connects the ImageView used to display ad images. Unless you need to explicitly specify an ImageView for image-based ad content, we recommend using `getMediaView()`. |
| `getAdLogoImageView() -> UIImageView?` | Connects the ImageView used to display the advertiser's logo. |
| `getAdTitleLabel() -> UILabel?` | Connects the Label used to display the main ad title. |
| `getAdDescriptionLabel() -> UILabel?` | Connects the Label used to display the ad description. |
| `getGoToSiteButton() -> UIButton?` | Connects the Button used for the ad landing. This is where the CTA title is displayed, and depending on the ad type and conditions, the button may not be used directly. |
| `getInfoLogoImageView() -> UIImageView?` | Connects the ImageView used to display the ad info image. **(Required)** |

#### <span class="step-label">STEP 3</span>Create MMNativeAdView and load the ad

```swift
var nativeAdView = MMNativeAdView(bannerUnitId: defaultMediaCode,
                                  adContainerView: adContainerView,
                                  nibNameForDefault: "DefaultNativeAdView",
                                  nibNameForDirectAd: "DirectNativeAdView",
                                  bundle: Bundle.main)
nativeAdView.adDelegate = self
nativeAdView.rootViewController = self        // For some mediated ad SDKs, ads may not be displayed unless rootViewController is set.

nativeAdView.loadAd()
```

| Parameter | Description |
|---|---|
| `bannerUnitId` | Sets the issued ad placement ID. |
| `adContainerView` | The RootView used to display the ad View. |
| `nibNameForDefault` | The name of the XIB file that defines the ad UI. |
| `nibNameForDirectAd` | The name of the XIB file for MobWith direct ads. To use the default UI for both, leave it unset or set an empty value. |
| `bundle` | The bundle from which the XIB files are loaded. If set to `nil`, `Bundle.main` is used. |

!> If the UI cannot be loaded from `nibNameForDefault` and `nibNameForDirectAd`, the SDK always returns a No Fill result.

### Method 2. Fixed UI Approach

?> For new integrations, we recommend [Method 1](/iOS/nativeAd?id=method-1-xib-mobwithnativeadviewrender-recommended).

The legacy approach in which you build the ad UI in the placement in advance and pass each UI component to the SDK.

```swift
var nativeAdView = MMNativeAdView(bannerUnitId: mediaCode,
                                  adContainerView: adContainerView,
                                  nativeAdRootView: nativeAdRootView,
                                  adImageView: thumbnailImageView,
                                  logoImageView: logoImageView,
                                  titleLabel: titleLabel,
                                  descriptionLabel: descLabel,
                                  gotoSiteButton: goButton,
                                  infoLogoImageView: infoLogoImageView,
                                  mediaView: mediaView)
nativeAdView.adDelegate = self
nativeAdView.rootViewController = self        // For some mediated ad SDKs, ads may not be displayed unless rootViewController is set.

nativeAdView.loadAd()
```

| Parameter | Description |
|---|---|
| `bannerUnitId` | Sets the issued ad placement ID. |
| `adContainerView` | The RootView used to display the ad View. |
| `nativeAdRootView` | The RootView for displaying the Native AD; a View that contains the child Views below. |
| `adImageView` | The ImageView that displays the ad image. You must set a Tag value. |
| `logoImageView` | The ImageView that displays the advertiser logo image. You must set a Tag value. |
| `titleLabel` | The Label that displays the ad title. You must set a Tag value. |
| `descriptionLabel` | The Label that displays additional content such as the ad description. You must set a Tag value. |
| `gotoSiteButton` | The Button for navigating to the ad landing page. You must set a Tag value. |
| `infoLogoImageView` | The ImageView that displays the ad Info Logo image. You must set a Tag value. |
| `mediaView` | Used to display ad images, videos, etc. during mediation of some external SDKs. |

!> When using NativeAd with the ADOP BidMad SDK, `BIDMADNativeAdView` is required.<br>
To serve NativeAd through the BidMad SDK, **create `nativeAdRootView` as a `BIDMADNativeAdView`** and pass it; otherwise ADOP ads are treated as No Fill regardless of whether an ad was received.<br>
Reference : [BidMad SDK iOS Native Ad Layout Setting Guide](https://github.com/bidmad/Bidmad-iOS/wiki/Native-Ad-Layout-Setting-Guide-%5BKOR%5D)

### performAdClicked()

If you cannot trigger an ad click via `gotoSiteButton`, call this method from a separate button as shown below to produce the same effect as clicking the ad.

```swift
nativeAdView.performAdClicked()
```

### adDelegate

The Delegate for receiving callbacks is [MobWithADViewDelegate](/iOS/banner?id=mobwithadviewdelegate).

### rootViewController

Some external SDKs being mediated also require `rootViewController` to be set for NativeAd.

!> For such ads, even if an ad is actually received, it is treated as not received if `rootViewController` is not set.

### Enabling Reward Ads

?> Supported in SDK 1.3.32 or later.

When enabling the reward feature in an ad, you must configure the following values.<br>
Use the values assigned by the media platform for `mediaId` and `serviceId`. If values have already been provided, use them as received.

| Field | Description |
|---|---|
| `mediaId` | A unique identifier for the media platform or service. |
| `serviceId` | An identifier for the ad placement or service location within the media platform. It is a child value of `mediaId` and distinguishes multiple placements or locations within the same platform. |
| `userKey` | A value used to identify the user, such as a user ID. Set this to a unique value managed by the media platform. |

```swift
nativeAdView.mediaId = "{Media ID}"
nativeAdView.serviceId = "{Service ID}"
nativeAdView.userKey = "{User Key}"
```

## MobWithNativeAdLoader

MobWithNativeAdLoader is useful when displaying MMNativeAdView ads in list-type views such as UITableView.

#### <span class="step-label">STEP 1</span>Create the ad View

Create the View for displaying the ad.<br>
This View must **inherit from `MANativeAdView`** and extend `MobwithNativeAdViewRender` to define each method.

```swift
class NativeAdLoaderView: MANativeAdView {
    static let needHeight: CGFloat = 347.0

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

#### <span class="step-label">STEP 2</span>Create MobWithNativeAdLoader

Create a MobWithNativeAdLoader and pass the nib name of the ad View created in STEP 1.

```swift
// Create MobWithNativeAdLoader
let mediaCodes: [String] = [ "{Unit ID}" ] // You must set one or more Unit IDs.
var nativeAdLoader = MobWithNativeAdLoader(unitIds: mediaCodes, nibName: "NativeAdLoaderView", bundle: nil)
nativeAdLoader.nativeAdLoaderDelegate = self
.......
```

#### <span class="step-label">STEP 3</span>Display ads in the list

In a list-type View such as UITableView, get the created ad View as shown below and display it on screen.

```swift
...

func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
  if (indexPath.row % 5 == 4) {
    let cell: UITableViewCell? = tableView.dequeueReusableCell(withIdentifier: "NativeADCellID", for: indexPath)

    // When you call loadAd(At:), if there is an already loaded ad or an already created view, that View is returned.
    // isLoadedAd(At:) returns true if an ad has been received. We recommend checking this value before adding the view.
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
}

...
```

## MobWithNativeAdLoaderDelegate

Because MobWithNativeAdLoader needs to manage list indices, it uses the separately built MobWithNativeAdLoaderDelegate.

!> For MMNativeAdView's `adDelegate`, you must use [MobWithADViewDelegate](/iOS/banner?id=mobwithadviewdelegate).

| Callback | When it is called |
|---|---|
| `mobWithNativeAdViewClickedAd()` | When the ad is clicked |
| `mobWithNativeAdViewDidReceivedAd(At index: IndexPath?)` | When an ad is received. `index` is the IndexPath of the location where the ad will be displayed. |
| `mobWithNativeAdViewDidFailToReceiveAd(At index: IndexPath?)` | When an ad could not be received. `index` is the IndexPath of the location where the ad will be displayed. |

```swift
extension ViewController: MobWithNativeAdLoaderDelegate {

    func mobWithNativeAdViewClickedAd() {
        // Ad clicked
    }

    func mobWithNativeAdViewDidReceivedAd(At index: IndexPath?) {
        // Ad received
    }

    func mobWithNativeAdViewDidFailToReceiveAd(At index: IndexPath?) {
        // Ad reception failed
    }
}
```
