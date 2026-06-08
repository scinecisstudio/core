# Core Launcher Play Data Safety Answer Sheet (Code-Based)

Last reviewed: June 5, 2026
Codebase audited: `C:\Users\prite\Documents\CoreApp`
Package: `com.scinecis.launcher`
Website distribution note: Play Store-only CTA on website (Direct APK option removed on March 1, 2026).
Repository relationship note: `C:\Users\prite\Documents\CoreApp` is the live Android app project currently paired with this website repository (`C:\Users\prite\Documents\Core`).
Execution constraint: Do not perform any write/update operation inside `C:\Users\prite\Documents\CoreApp` unless explicitly authorized by the user in that session.
Website gallery note: website screenshot assets and display logic are maintained separately in this repo and should stay consistent with the current app behavior shown publicly.
Audit note: existing generated merged-manifest artifacts under `app/build/intermediates/...` may be stale between builds; use a freshly generated release merged manifest before submission decisions.

## Evidence Sources
- App manifest: `app/src/main/AndroidManifest.xml`
- Merged manifest (release): `app/build/intermediates/merged_manifests/release/processReleaseManifest/AndroidManifest.xml`
- Dependencies: `app/build.gradle.kts`, `gradle/libs.versions.toml`
- Telemetry code: `util/FirebaseEventLogger.kt`, `util/FirebasePerformanceTracker.kt`, `util/PrivacyTelemetryManager.kt`, `util/RemoteConfigManager.kt`
- Feature/data access code: contacts/calendar/weather/backup files under `app/src/main/java/com/scinecis/launcher/...`

## 1) SDK / Service Inventory (Actual)
- Firebase Analytics (`com.google.firebase:firebase-analytics:23.0.0`)
- Firebase Crashlytics (`com.google.firebase:firebase-crashlytics:20.0.4`)
- Firebase Performance (`com.google.firebase:firebase-perf:22.0.4`)
- Firebase Remote Config (`com.google.firebase:firebase-config:23.0.0`)
- Firebase transitive components seen in merged manifest:
  - Firebase Installations
  - Firebase Sessions
  - Google Play services measurement components
- Open-Meteo API endpoints used directly in `WeatherRepository`.

## 2) Permissions (Current Release Build Inputs)
Declared in source manifest:
- `READ_CALENDAR`
- `INTERNET`
- `CALL_PHONE`
- `READ_CONTACTS`
- `USE_BIOMETRIC`
- `SYSTEM_ALERT_WINDOW`
- `QUERY_ALL_PACKAGES`
- `REQUEST_DELETE_PACKAGES`
- Service bindings: Notification Listener

Added by dependencies in merged manifest:
- `USE_FINGERPRINT`
- `ACCESS_NETWORK_STATE`
- `WAKE_LOCK`
- `com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE`

Removed in current source manifest:
- `com.google.android.gms.permission.AD_ID`
- `ACCESS_ADSERVICES_ATTRIBUTION`
- `ACCESS_ADSERVICES_AD_ID`
- Accessibility Service declaration

## 3) Data Flows That Leave Device (Observed)
- Firebase Analytics events for user actions and screen views when telemetry is enabled.
- Firebase Crashlytics logs/custom keys in release builds.
- Firebase Performance traces/metrics/attributes when telemetry is enabled.
- Firebase Remote Config fetches when telemetry is enabled.
- Open-Meteo network calls with user-provided weather city/location text and geocode coordinates when weather is configured by the user.
- Wallpaper color metadata used for appearance tuning remains local to the device based on current app code.

Notable telemetry payload keys observed in app code:
- Action names, screen names, `category_name`, `query_length`, coarse booleans/numerics, and feature toggles.
- Sensitive values such as `package_name`, `app_label`, `contact_id`, `location`, `event_id`, `widget_id`, and provider identifiers are filtered before telemetry logging.

## 4) Recommended Play Console Data Safety Answers (Conservative)
Use these if shipping current code unchanged.

### Location
- Approximate location: **Collected = Yes**
- Shared = **Yes** (sent to Open-Meteo when the user enables weather and enters a location)
- Purpose(s): App functionality
- Processing: Not required for core launcher; optional weather feature

### App Activity
- App interactions: **Collected = Yes** when telemetry is enabled
- Shared = **Yes** (Firebase Analytics / telemetry service operation)
- Purpose(s): Analytics, app functionality quality

### App Info and Performance
- Crash logs: **Collected = Yes** in release builds
- Diagnostics/performance data: **Collected = Yes** when telemetry is enabled
- Shared = **Yes** (Firebase Crashlytics/Performance)
- Purpose(s): Analytics, diagnostics, app stability

### Device or Other IDs
- Device or other IDs: **Collected = Yes** (conservative; inferred from Firebase Installations / app-instance support when telemetry-backed Firebase services are enabled)
- Shared = **Yes** (Firebase service operation)
- Purpose(s): Analytics, diagnostics, service operation

## 5) High-Risk Review Notes (Action Items)
1. The in-app privacy policy URL points directly to `privacy-policy.html`; confirm Play Console uses the same canonical URL before submission.
2. `allowBackup="true"` is still enabled, but current backup/data-extraction rules exclude the main launcher prefs file and launcher databases.
   - Re-verify backup exclusions on every release when prefs or database names change.
3. `QUERY_ALL_PACKAGES` requires strict policy justification as a launcher core requirement.
4. Existing generated release merged-manifest artifacts may be stale versus current Gradle version metadata.
   - Rebuild and review a fresh release merged manifest before final Data Safety / permissions sign-off.
5. Accessibility Service has been removed from the source manifest for v1.1.16.
   - Do not submit an Accessibility Services declaration/video for this release unless a fresh merged release manifest shows an AccessibilityService component.
   - Store listing, screenshots, and reviewer notes must not claim App Lock, Swipe Down for Notifications, Double Tap to Sleep, or AccessibilityService usage.

## 6) Suggested Data Safety Narrative Snippets
- "Core Launcher uses Firebase Analytics, Performance Monitoring, and Remote Config according to the user's telemetry setting, and uses Crashlytics in release builds for crash diagnostics."
- "Core Launcher uses Open-Meteo APIs for optional weather features configured by the user."
- "Core Launcher can access contacts, calendar, notification listener, overlay, biometric, package visibility, and uninstall-intent related features only when enabled or required for selected launcher functionality."

## 7) Final Submission Gate
Before production upload:
- Re-run merged-manifest check using a fresh release build artifact.
- Re-run SDK/dependency check.
- Confirm policy page + Data Safety form + permission declarations are aligned.
- Keep screenshots and in-app disclosures consistent with declared behavior.
