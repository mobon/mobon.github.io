# Getting Started <!-- {docsify-ignore} -->

MobWithAD SDK를 iOS 앱에 연동하기 위한 지원 환경, 최신 버전, 연동 순서를 안내합니다.

## 지원 환경

| 항목 | 요구 사항 |
|---|---|
| Deployment Target | iOS 15.6 이상 |
| Xcode | 최신 버전 (Xcode 26.0 / Swift 5.3) |

?> MobWithAD SDK는 Swift로 개발되었습니다. Swift 기반 프로젝트에서 사용하려면 반드시 최신 버전의 Xcode를 사용해 주세요.<br>
Objective-C 프로젝트의 경우 [Project Configuration](/iOS/installation_other?id=objective-c-프로젝트)의 추가 설정을 참고 바랍니다.

## 최신 버전

| 설치 방식 | 최신 버전 | 설치 방법 |
|---|---|---|
| SPM | 1.3.35 | [SPM을 이용하여 설치](/iOS/installation_base?id=spm을-이용하여-설치) |
| CocoaPods | 1.3.35 | [CocoaPods를 이용하여 설치](/iOS/installation_base?id=cocoapods를-이용하여-설치) |

버전별 변경 내역은 [History](/iOS/history.md)를 참고 바랍니다.

!> 1.3.0 이상 버전에서 일부 중요한 오류가 수정되었으므로, **최소 버전을 1.3.2 이상**으로 설정하시기 바랍니다.

?> 1.3.0 버전부터 미디에이션에 필요한 외부 SDK 연동 부분이 별도 Adapter SDK로 분리되었습니다. 자세한 내용은 [미디에이션을 위한 Adapter SDK 추가](/iOS/installation_base?id=step-2미디에이션을-위한-adapter-sdk-추가)를 참고 바랍니다.

## 마이그레이션 안내

SDK 1.3.34에서 일부 API 이름이 변경되었습니다. 기존 코드는 그대로 동작하며, 변경 내용과 수정 방법은 [Migration Guide](/iOS/migration-guide.md)를 참고 바랍니다.

## 지면번호 / App Key

외부 미디에이션 SDK 사용에 필요한 App Key 및 지면번호는 별도로 안내된 값을 이용하시면 됩니다.

!> 일부 App Key와 지면번호는 앱의 Bundle ID 등에 영향을 받을 수 있으니 주의 바랍니다.

## 연동 순서

<div class="doc-flow">
  <div class="doc-flow-step"><span class="doc-flow-num">1</span><div><p class="doc-flow-title">SDK 설치</p><p class="doc-flow-desc">SPM, CocoaPods 또는 수동 설치로 SDK 추가</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">2</span><div><p class="doc-flow-title">프로젝트 설정</p><p class="doc-flow-desc">ATS, ATT, Other Linker 등 프로젝트 설정</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">3</span><div><p class="doc-flow-title">SDK 초기화</p><p class="doc-flow-desc">MobWith SDK와 미디에이션 SDK 초기화</p></div></div>
  <div class="doc-flow-step"><span class="doc-flow-num">4</span><div><p class="doc-flow-title">광고 구현</p><p class="doc-flow-desc">광고 유형별 구현</p></div></div>
</div>

---

**다음 단계** : [SDK Installation](/iOS/installation_base.md)에서 SDK를 설치합니다.
