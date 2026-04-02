# Hivemind

## Session Summary (2026-04-02 - Contact Page and Theme Update)
- Added a new contact page at `contact.html` featuring GitHub, X (Twitter), LinkedIn, and email (`priteshvishwakarma@gmail.com`).
- Updated the website's visual theme to match the updated app logo (purple theme).
- Changed primary color to `#6200EE` and accent color to `#BB86FC`, aligned with the app's `accent_vibrant` resources.
- Updated all hardcoded colors, gradients, and backgrounds across `styles.css` to follow the new purple/lavender palette.
- Synchronized navigation links across `index.html`, `privacy-policy.html`, `contact.html`, and `screenshots.html`.
- Updated contact email in `privacy-policy.html` to `priteshvishwakarma@gmail.com` for consistency.

## Session Summary (2026-04-02 - Website Logo Sync)
- User requested syncing the website logo to the updated Android app logo found under `C:\Users\Pritesh CTO\Documents\CoreApp\app\src\main`.
- Located the current source logo at `C:\Users\Pritesh CTO\Documents\CoreApp\app\src\main\ic_launcher-playstore.png`.
- Replaced website asset files `C:\Users\Pritesh CTO\Documents\core\assets\core-logo.png` and `C:\Users\Pritesh CTO\Documents\core\assets\core-brand-preview.png` with the current Android source logo so existing website references automatically use the new branding.
- Verification confirmed both website asset files now match the Android source logo hash exactly.

## Session Summary (2026-04-02 - Privacy Link and Website Metadata Fix)
- User explicitly authorized write access inside `C:\Users\Pritesh CTO\Documents\CoreApp` for this task.
- Updated in-app privacy policy URL in `C:\Users\Pritesh CTO\Documents\CoreApp\app\src\main\res\values\strings.xml` from the website home page to the dedicated privacy policy URL: `https://scinecisstudio.github.io/core/privacy-policy.html`.
- Updated website homepage metadata in `C:\Users\Pritesh CTO\Documents\core\index.html` to match the current Android app project state: `versionName 1.1.7`, `versionCode 12`, `targetSdk 36`.
- Verification after edits confirmed the app privacy link string and website metadata now match the intended compliance state.

## Session Summary (2026-04-02 - CoreApp Privacy Compliance Recheck)
- Audited `C:\Users\Pritesh CTO\Documents\CoreApp` in read-only mode to compare current app behavior with website privacy disclosures for Google Play compliance.
- Confirmed current app source/release build state now uses `versionName 1.1.7`, `versionCode 12`, and `targetSdk 36`; existing website homepage metadata in `C:\Users\Pritesh CTO\Documents\core\index.html` is stale at `1.1.1`, `versionCode 5`, and `API 35`.
- Confirmed current source manifest still declares `READ_MEDIA_IMAGES`, legacy `READ_EXTERNAL_STORAGE` (`maxSdkVersion=32`), `READ_CONTACTS`, `READ_CALENDAR`, `CALL_PHONE`, `USE_BIOMETRIC`, `SYSTEM_ALERT_WINDOW`, and `QUERY_ALL_PACKAGES`, plus Accessibility Service and Notification Listener service bindings.
- Confirmed release merged manifest currently includes additional SDK/runtime permissions/components such as `USE_FINGERPRINT`, `ACCESS_NETWORK_STATE`, `WAKE_LOCK`, install referrer binding, Firebase component discovery, Firebase Installations, Firebase Sessions, and Google measurement components.
- Confirmed Firebase Analytics, Crashlytics, Performance, and Remote Config are present in the app and telemetry collection defaults remain disabled until user consent is enabled.
- Confirmed telemetry logger filters sensitive keys such as package names, contact IDs, locations, event IDs, widget IDs, and provider identifiers before analytics/crash logging.
- Confirmed weather feature still sends user-provided location text and API key to OpenWeather endpoints when the feature is configured by the user.
- Confirmed backup rules still exclude `launcher_prefs.xml` and launcher databases from Android cloud backup/device transfer while manual export/import remains user-controlled.
- Current Play/privacy risk still present: app string `privacy_policy_url` in `app/src/main/res/values/strings.xml` points to `https://scinecisstudio.github.io/core/index.html` instead of the dedicated `privacy-policy.html` page.
- Website privacy policy at `C:\Users\Pritesh CTO\Documents\core\privacy-policy.html` remains broadly aligned with current code-based behavior; the more immediate required fixes are the in-app privacy-policy URL and stale website version/target SDK metadata.

## Session Summary (2026-03-17 - Website Policy Sync)
- Updated website privacy/compliance content in `C:\Users\Pritesh CTO\Documents\core` to match the current app state audited from `C:\Users\Pritesh CTO\Documents\CoreApp`.
- Updated `privacy-policy.html` to reflect March 17, 2026 status, including local media/wallpaper access for appearance tuning, biometric usage, direct privacy-policy URL expectations, and clearer sharing language for local-only wallpaper/media processing.
- Updated `index.html` so the public website reflects current app version `1.1.1` (`versionCode 5`), exposes privacy policy access more prominently, and documents package visibility, biometric, and media/wallpaper permission usage.
- Refreshed `play-data-safety-answer-sheet.md` to the live Android app path (`C:\Users\Pritesh CTO\Documents\CoreApp`), added current storage/media permissions, removed stale AD_ID/AdServices assumptions, documented telemetry consent gating, and noted that release merged-manifest artifacts must be freshly regenerated before submission review.
- Refreshed `play-privacy-compliance-checklist.md` to the live Android app path, added checks for direct privacy-policy URL resolution, telemetry consent alignment, biometric/media permission disclosure, and fresh release merged-manifest review.
- No write operations were performed inside `C:\Users\Pritesh CTO\Documents\CoreApp` during this task.

## Session Summary (2026-03-17 - Android Play Policy Audit)
- Audited the live Android app project at `C:\Users\Pritesh CTO\Documents\CoreApp` for Play-policy-relevant drift. Read-only audit only; no writes were made inside the app project.
- Confirmed repo docs still contain stale Android path references to `C:\Users\Pritesh CTO\Documents\core\coreapp`, while the existing project path on disk is `C:\Users\Pritesh CTO\Documents\CoreApp`.
- Current source manifest now declares `READ_EXTERNAL_STORAGE` (maxSdk 32) and `READ_MEDIA_IMAGES` in addition to the previously documented launcher/privacy-sensitive permissions.
- Current source manifest explicitly removes `AD_ID` and AdServices permissions; stale website/docs that still describe those identifiers as present need refresh before the next Play submission.
- App telemetry remains opt-in by default: Firebase Analytics, Crashlytics, and Performance collection are disabled in manifest metadata until consent is granted, and consent toggling is implemented in app settings.
- App telemetry logger filters sensitive values such as package names, contact IDs, app labels, locations, event IDs, widget IDs, and provider identifiers before analytics/crash logging.
- Current app privacy-policy link string points to `https://scinecisstudio.github.io/core/index.html` rather than the dedicated privacy policy page, which is a Play-review risk if reviewers expect a direct privacy policy destination.
- Existing release merged manifest under `app/build/intermediates/merged_manifest/release/...` is stale relative to source (`versionCode/versionName` mismatch versus `app/build.gradle.kts`), so submission checks should use a freshly generated release merged manifest rather than the checked-in/stale build artifact.

## Session Summary (2026-03-17)
- Reviewed all Markdown files in `C:\Users\Pritesh CTO\Documents\core`: `play-privacy-compliance-checklist.md`, `play-data-safety-answer-sheet.md`, and `hivemind.md`.
- Current workspace-level write constraint reaffirmed from repo docs: do not perform any write/update operation inside `C:\Users\Pritesh CTO\Documents\core\coreapp` unless the user explicitly authorizes it in that session.
- Privacy/compliance docs currently describe `coreapp` as the Android app project for this website repo and treat website screenshot/gallery files under this repo as public-facing compliance-sensitive assets.
- `hivemind.md` instruction reaffirmed: update relevant Markdown memory at the end of each completed task in this workspace.

## Session Summary (2026-03-12)
- User instruction: always update relevant `*.md` file(s) at the end of each completed task in this workspace.
- Current verified Android app project path for privacy/compliance audits: `C:\Users\Pritesh CTO\Documents\CoreApp`.
- Audited app manifest, merged release manifest, telemetry consent flow, backup rules, notification listener, accessibility service, weather repository, and settings/backup code from `C:\Users\Pritesh CTO\Documents\CoreApp`.
- Updated website privacy policy at `C:\Users\Pritesh CTO\Documents\core\privacy-policy.html`.
- Privacy policy changes aligned with current app behavior:
- Telemetry/Firebase collection is opt-in and disabled by default until user consent is enabled in app settings.
- Sensitive telemetry fields are filtered before analytics/crash logging.
- Manual backup export/import is distinct from Android cloud/device-transfer backup and may include launcher settings/local data chosen by the user.
- Android cloud/device-transfer backup exclusions for launcher prefs and launcher databases are disclosed.
- Previous AD_ID / AdServices disclosure note is stale for current build inputs; current source manifest removes those permissions and current release merged manifest does not include them.
- Synced Play Store screenshot sets from `C:\Users\Pritesh CTO\Documents\CoreApp\assets\play-store\phone`, `7_inch`, and `10_inch` into website asset folders under `C:\Users\Pritesh CTO\Documents\core\assets\screenshots\...`.
- Updated website galleries in `C:\Users\Pritesh CTO\Documents\core\index.html` and `C:\Users\Pritesh CTO\Documents\core\screenshots.html` to use the Play Store-ready screenshot filenames and 8-image sets for each device class.

## Session Summary (2026-03-10)
- Website screenshot gallery updated in `C:\Users\Pritesh CTO\Documents\core\index.html`, `styles.css`, and `script.js`.
- Website now uses app screenshots from `assets/screenshots/phone`, `assets/screenshots/7_inch`, and `assets/screenshots/10_inch`.
- Main website gallery currently shows phone, 7-inch tablet, and 10-inch tablet screenshots in horizontal pager/carousel sections.
- Dedicated full gallery page exists at `C:\Users\Pritesh CTO\Documents\core\screenshots.html`.
- Canonical workspace root confirmed as `C:\Users\Pritesh CTO\Documents\core`.
- Canonical Android app path confirmed as `C:\Users\Pritesh CTO\Documents\core\coreapp`.
- Persistent relationship note: `coreapp` is the Android app project for this website repo and should be treated as such in future tasks.
- Authorization rule: no write/update operations are authorized inside `C:\Users\Pritesh CTO\Documents\core\coreapp` unless user explicitly grants permission in that session.

## Session Summary (2026-02-28)
- User asked to create `hivemind.md` and store concise, token-efficient session memory.
- Preference: keep carry-forward notes short so future chats need less re-explanation.
- Workspace root: `C:\Users\Pritesh CTO\Documents\core`.
- Android app path in this workspace: `C:\Users\Pritesh CTO\Documents\core\coreapp`.
- Current session actions: created this file; added Core app privacy policy files at `C:\Users\prite\Documents\CoreApp\play-store\privacy-policy.md` and `C:\Users\prite\Documents\CoreApp\play-store\privacy-policy-site\index.html`; rolled back in-app privacy policy link/activity changes; added website-native privacy page at `C:\Users\prite\Documents\Core\privacy-policy.html`, linked it from website `index.html`, and expanded wording for Play Store-friendly disclosures (permissions, third parties, data usage, retention, user controls).
- Active constraint: do not perform write operations under `C:\Users\prite\Documents\CoreApp\app` unless explicitly requested.

## Session Summary (2026-03-01)
- User requested a stronger privacy-policy review for Google Play readiness and clearer transparency.
- Updated website policy page `C:\Users\prite\Documents\Core\privacy-policy.html` with a fuller disclosure structure:
- Added explicit developer identity/scope, detailed data categories, purpose mapping, SDK/library transparency (Firebase Analytics, Crashlytics, Performance, Remote Config, OpenWeather), permission-to-feature mapping, retention/deletion language, international processing note, user rights/controls, and Google Play declaration consistency guidance.
- Updated policy timestamp to March 1, 2026 and retained privacy contact `privacy@scinecis.com`.
- Added release checklist file `C:\Users\prite\Documents\Core\play-privacy-compliance-checklist.md` for Play submission verification and policy/data-safety drift prevention.
- Note for release process: policy text must always match actual app behavior and Play Console Data Safety + permission declarations for each new build.

## Session Summary (2026-03-01 - Data Safety Audit)
- Per user approval, audited `C:\Users\prite\Documents\CoreApp` manifest, merged manifest, dependencies, and telemetry code to derive a code-based Play Data Safety answer set.
- Found additional SDK-added permissions in merged manifest (including `AD_ID`, AdServices attribution permissions, `ACCESS_NETWORK_STATE`, `WAKE_LOCK`) and Firebase transitive components.
- Created `C:\Users\prite\Documents\Core\play-data-safety-answer-sheet.md` with conservative Play Console answers plus release risks/action items.
- Updated website privacy policy `C:\Users\prite\Documents\Core\privacy-policy.html` to reflect transitive SDK transparency and backup behavior.
- Updated checklist `C:\Users\prite\Documents\Core\play-privacy-compliance-checklist.md` to require merged-manifest and AD_ID/backups verification each release.

## Session Summary (2026-03-01 - Website Download CTA)
- Updated website download section to Play Store-only distribution.
- Removed Direct APK option from `C:\Users\prite\Documents\Core\index.html`.
- Added Play Store URL CTA: `https://play.google.com/store/apps/details?id=com.scinecis.launcher`.
