## Reward AD <!-- {docsify-ignore} -->


## MobWithRewardAd
---
MobWithRewardAd를 이용하여 화면에 리워드 광고를 표시 할 수 있습니다.  
해당 광고를 통하여 사용자에게 광고를 보여주고 리워드를 제공할 수 있게 됩니다.  
MobWithRewardAd의 사용은 아래 예시를 참고 하시면 됩니다.

```swift
let rewardAd = MobWithRewardAd.init()
rewardAd.rootViewController = self
rewardAd.adDelegate = self
rewardAd.unitId = "{전달 받은 지면번호}"

rewardAd.loadAd()
```

### loadAd()
광고를 로드 합니다.  
전면배너의 경우 광고 로드와 화면에 표시하는것이 분리 되어 있으며,  광고의 빠른 표시를 위해 실제 광고가 표시되는 시점 이전에 미리 광고를 불러 두시는 것을 권장 드립니다.

### isLoaded()
해당 객체에 광고가 로드 되어 있는지 확인 합니다.  
광고가 로드 되어 있는 경우 true를, 그 외의 경우 false를 리턴 합니다.
광고가 로드 되어 있지 않는 경우 show()를 해도 실패 하게 됩니다.

### show()
로드된 광고가 있는 경우 화면에 전면배너를 표시 합니다. 
광고 로드 여부는 isLoaded() 함수를 통해 확인 가능 합니다.









## MobWithRewardAdDelegate
---
MobWithRewardAd의 각 이벤트를 전달 받을 수 있는 delegate 입니다.   
각 콜백 함수별 설명은 아래를 참고 바랍니다. 

### mobWithRewardAdDidReceived(_ rewardAd: MobWithRewardAd?)
광고를 수신한 경우 호출 됩니다.  
해당 메세지를 받은 이후 show() 함수를 호출해야 광고가 표시 됩니다.  
rewardAd는 해당 이벤트가 호출된 객체 입니다.

### mobWithRewardAdDidFailToReceive(_ rewardAd: MobWithRewardAd?)
광고를 수신하지 못한 경우 호출 됩니다.  
rewardAd는 해당 이벤트가 호출된 객체 입니다.

###  mobWithRewardAdClicked(_ rewardAd: MobWithRewardAd?)
광고를 클릭한 경우 호출 됩니다.  
rewardAd는 해당 이벤트가 호출된 객체 입니다.

### mobWithRewardAdDidOpend(_ rewardAd: MobWithRewardAd?) 
광고가 화면에 표시되는 경우 호출 됩니다.  
rewardAd는 해당 이벤트가 호출된 객체 입니다.

### mobWithRewardAdDidOpenFailed(_ rewardAd: MobWithRewardAd?)
광고를 화면에 표시하는데 실패한 경우 호출 됩니다. 
rewardAd는 해당 이벤트가 호출된 객체 입니다.

### mobWithRewardAdClosed(_ rewardAd: MobWithRewardAd?)
열려있는 광고를 닫은 경우에 호출 됩니다.  
rewardAd는 해당 이벤트가 호출된 객체 입니다.

### mobWithRewardAdCanReward(_ rewardAd: MobWithRewardAd?) 
리워드 제공 조건을 충족한 경우 호출 됩니다.
rewardAd는 해당 이벤트가 호출된 객체 입니다.
