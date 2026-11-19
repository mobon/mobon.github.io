# Adapter Compatibility <!-- {docsify-ignore} -->

SPM으로 배포되는 MobWith 미디에이션 Adapter의 버전별 호환 정보를 안내합니다.<br>
Adapter를 설치하면 호환되는 MobWith SDK와 미디에이션 대상 SDK가 함께 설치됩니다.

## Adapter 목록 <!-- {docsify-ignore} -->

| Adapter | 미디에이션 대상 SDK | SPM 최신 버전 |
|---|---|---|
| [MobWithAdFitAdapter](/iOS/adapter_compatibility?id=mobwithadfitadapter) | AdFit | 1.0.0 |
| MobWithAdMobAdapter | AdMob | 추가 예정 |
| MobWithCaulyAdapter | Cauly | 추가 예정 |
| MobWithDTExchangeAdapter | DT Exchange | 추가 예정 |
| MobWithInMobiAdapter | InMobi | 추가 예정 |
| MobWithLevelPlayAdapter | LevelPlay | 추가 예정 |
| MobWithPangleAdapter | Pangle | 추가 예정 |
| MobWithBidMadAdapter | ADOP BidMad | 추가 예정 |
| MobWithAdPopcornAdapter | AdPopcorn | 추가 예정 |

?> 나머지 Adapter는 SPM으로 순차 추가할 예정입니다. 아직 SPM으로 제공되지 않는 Adapter가 필요하다면 SPM 지원을 기다리거나, 당분간 [CocoaPods](/iOS/installation_base?id=cocoapods를-이용하여-설치)로 SDK와 Adapter를 설치해 주세요. 빠르게 지원이 필요한 경우 별도로 문의 바랍니다.

## 표 보는 방법 <!-- {docsify-ignore} -->

| 항목 | 설명 |
|---|---|
| 안정화 버전 | Adapter 개발과 검증에 사용한 버전입니다. 이 버전을 사용하는 것을 권장합니다. |
| 사용 가능 범위 | SPM의 Up to Next Minor 규칙에 따라 함께 설치될 수 있는 버전 범위입니다. |

?> SPM Adapter는 1.0.0부터 새 버전을 사용합니다. CocoaPods Adapter의 [버전 규칙](/iOS/installation_base?id=adapter-버전-규칙)은 SPM Adapter에 적용되지 않습니다.

## MobWithAdFitAdapter

<div class="info-card">
  <div class="info-card-head">
    <p class="info-card-name"><span class="info-card-tag">SPM</span>AdFit 미디에이션 Adapter</p>
    <span class="info-card-version">최신 1.0.0</span>
  </div>
  <dl class="info-card-meta">
    <dt>SPM Package</dt><dd><code>https://github.com/mobon/MobWithAdFitAdapter_iOS</code></dd>
    <dt>수동 설치 파일</dt><dd><code>MobWithAdFitAdapter.xcframework.zip</code> (버전별 Releases)</dd>
  </dl>
  <div class="info-card-links">
    <a class="info-card-main" href="https://github.com/mobon/MobWithAdFitAdapter_iOS/releases" target="_blank">Releases에서 다운로드</a>
    <a href="#/iOS/installation_base?id=spm을-이용하여-설치">SPM 설치 방법</a>
    <a href="#/iOS/installation_base?id=수동-설치">수동 설치 방법</a>
  </div>
</div>

| Adapter 버전 | 배포일 | MobWith SDK | AdFit SDK | 최소 iOS |
|---|---|---|---|---|
| 1.0.0 | 2026-11-19 | 안정화 1.3.39<br>사용 가능 1.3.39 이상 1.4.0 미만 | 안정화 3.22.7<br>사용 가능 3.22.7 이상 3.23.0 미만 | 15.0 |

?> CocoaPods 버전은 `3.21.24.1.3.34`가 마지막입니다. 이후 버전은 SPM으로만 배포됩니다.
