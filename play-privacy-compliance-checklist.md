# Google Play Privacy Compliance Checklist

Last updated: May 1, 2026
Applies to: Core Launcher (`com.scinecis.launcher`)
Repository relationship: Website project root is `C:\Users\prite\Documents\Core` and its live Android app project is `C:\Users\prite\Documents\CoreApp`.
Execution constraint: Do not perform any write/update operation inside `C:\Users\prite\Documents\CoreApp` unless explicitly authorized by the user in that session.
Website gallery note: public website screenshot presentation is maintained in `index.html`, `styles.css`, `script.js`, and `screenshots.html` under this repo.

Use this checklist before every Play Store submission.

## 1. Privacy Policy URL Readiness
- [ ] Privacy policy URL is publicly accessible, active, non-geofenced, and non-editable.
- [ ] In-app privacy policy link and Play Console privacy policy URL both resolve directly to the privacy policy page, not just the website home page.
- [ ] Policy identifies the developer entity (Scinecis) and app package name.
- [ ] Policy explains what data is collected/accessed, how it is used, how it is shared, and how users can request support.
- [ ] Policy page includes a working privacy contact email.

## 2. Data Safety Form Consistency
- [ ] Play Console Data Safety answers exactly match current app behavior.
- [ ] All data categories used by app features and SDKs are declared.
- [ ] Optional telemetry consent gating is reflected accurately in privacy documentation and reviewer notes.
- [ ] Encryption-in-transit answers match actual network implementation.
- [ ] Data deletion/retention answers match implemented behavior.
- [ ] Fresh merged manifest for the exact release build reviewed for SDK-added permissions/components before submission.

## 3. SDK and Library Transparency
- [ ] All active SDKs are listed in privacy documentation and reflected in Data Safety.
- [ ] Current known third-party services: Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config, OpenWeather.
- [ ] No undeclared SDKs (including transitive dependencies) process user data.
- [ ] If `AD_ID` or AdServices permissions appear through transitive dependencies, Data Safety and policy text explicitly cover identifier/measurement behavior.

## 4. Sensitive Permission and Access Declarations
- [ ] Contacts/Calendar/Call actions are requested only for feature-critical use.
- [ ] Accessibility Service usage is accurately declared with required in-app disclosure/consent.
- [ ] `accessibility_service_config.xml` retains `android:description`, `android:summary`, and `android:canRetrieveWindowContent="false"` (removing any of these triggers a Play "missing prominent disclosure" rejection).
- [ ] Prominent disclosure video for Accessibility API is freshly recorded for the current release, uploaded as an unlisted YouTube link, and pasted into Play Console Accessibility API form.
- [ ] In-app disclosure dialog content for Accessibility (and every other runtime/special permission) lists what the permission does, how it is used, a privacy assurance, and the exact revocation path (e.g. `Settings → Apps → Core → Permissions`).
- [ ] In-app disclosure dialog text matches across all 6 supported locales (`values`, `values-es`, `values-hi`, `values-id`, `values-ru`, `values-pt-rBR`).
- [ ] Notification Listener usage is clearly explained to users.
- [ ] Package visibility (`QUERY_ALL_PACKAGES`) usage is limited to launcher core functionality and correctly declared.
- [ ] Overlay permission usage is optional and clearly described.
- [ ] Biometric usage is documented consistently with app-lock behavior.
- [ ] `READ_MEDIA_IMAGES` / legacy `READ_EXTERNAL_STORAGE` purpose is disclosed consistently for wallpaper/media-related local processing, including an explicit "no images or files uploaded, collected, or shared" assurance.

## 5. Store Listing and In-App Consistency
- [ ] Store listing text does not conflict with privacy policy or in-app behavior.
- [ ] Prominent disclosures are shown before sensitive data access where required.
- [ ] Permission rationale shown to users matches actual feature behavior.
- [ ] Website homepage metadata (version/features/permissions) matches the current app build and does not drift from Play listing claims.
- [ ] Website/app download CTA points to the current official channel (Play Store URL) and does not advertise unsupported direct APK distribution.

## 6. Account and Deletion Requirements
- [ ] If user account creation/sign-in is introduced, account deletion flows are implemented per Play policy.
- [ ] Deletion requests and retention timelines are documented and supportable.
- [ ] Backup behavior (`allowBackup`, backup rules, data extraction rules) is intentionally configured and disclosed when relevant.

## 7. Release Gate
- [ ] Privacy policy page updated when permissions, SDKs, or data flows change.
- [ ] Data Safety form reviewed in same release PR/QA cycle.
- [ ] Final compliance check signed off before upload to production track.

## Official References
- Google Play User Data policy and privacy policy expectations:
  https://support.google.com/googleplay/android-developer/answer/10144311
- Google Play policy center (Permissions and APIs section):
  https://support.google.com/googleplay/android-developer/answer/16313518
- Google Play account deletion policy help page:
  https://support.google.com/googleplay/android-developer/answer/13327111
