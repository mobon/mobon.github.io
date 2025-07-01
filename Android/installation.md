# 설치 방법

## 1. Gradle 설정

```groovy
implementation 'com.yourcompany:sdk:1.0.0'
```

## 2. 권한 설정

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## 3. 초기화

```kotlin
YourSDK.initialize(context)
```