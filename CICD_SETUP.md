# CI/CD Pipeline Setup Guide

This guide explains how to set up the CI/CD pipeline for building iOS and Android apps using Fastlane and GitHub Actions.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Android Setup](#android-setup)
- [GitHub Secrets Configuration](#github-secrets-configuration)
- [Running the Pipeline](#running-the-pipeline)
- [Downloading Builds](#downloading-builds)
- [Local Testing](#local-testing)
- [Troubleshooting](#troubleshooting)

## Overview

The CI/CD pipeline automatically:
- Builds iOS and Android release apps
- Signs the apps properly
- Uploads APK and IPA files as downloadable artifacts
- Creates GitHub Releases with downloadable builds
- Runs on every push to `main` or `master` branches
- Can be triggered manually via workflow dispatch

## Prerequisites

### General Requirements
- GitHub repository with Actions enabled
- Ruby 3.2 or later
- Bundler installed (`gem install bundler`)
- Fastlane installed (`bundle install`)

### Android Requirements
- Android Studio or Android SDK
- Java 17
- Android keystore for signing (will be generated)

### iOS Requirements
- macOS for building
- Xcode 15+
- No Apple Developer account needed for development builds

## Android Setup

### 1. Generate Android Keystore

If you don't have a keystore, generate one:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted for:
- Keystore password
- Key password
- Your name/organization details

**IMPORTANT**: Save these passwords securely. You'll need them for GitHub secrets.

### 2. Convert Keystore to Base64

```bash
cd android/app
base64 -i release.keystore -o release.keystore.base64
cat release.keystore.base64
```

Copy the output - you'll add this to GitHub secrets.

That's it for Android! No Play Store setup needed for development builds.

## GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

### Required Android Secrets

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `ANDROID_KEYSTORE_BASE64` | Base64 encoded keystore | See Android Setup step 2 |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password | Password you set when creating keystore |
| `ANDROID_KEY_ALIAS` | Key alias | Alias you set when creating keystore (e.g., "my-key-alias") |
| `ANDROID_KEY_PASSWORD` | Key password | Key password you set when creating keystore |

**Note**: iOS builds use automatic signing with development profile, so no iOS secrets are needed for now.

## Running the Pipeline

### Automatic Builds

The pipeline runs automatically:
- On every push to `main` or `master` branches
- On pull requests to `main` or `master` branches
- Creates GitHub Releases with downloadable APK and IPA files

### Manual Builds

To trigger a build manually:

1. Go to your GitHub repository
2. Click "Actions" tab
3. Select "iOS & Android Build CI/CD" workflow
4. Click "Run workflow" button
5. Select the branch you want to build
6. Click "Run workflow"

## Downloading Builds

There are two ways to download your builds:

### Method 1: GitHub Actions Artifacts (30 days retention)

1. Go to your repository → "Actions" tab
2. Click on the workflow run you want
3. Scroll down to "Artifacts" section
4. Download:
   - `android-release-apk` - Android APK file
   - `ios-release-ipa` - iOS IPA file

### Method 2: GitHub Releases (Permanent)

1. Go to your repository → "Releases" section
2. Find the release you want (tagged as `android-vXXX` or `ios-vXXX`)
3. Download the APK or IPA file from the Assets section

### Installing on Devices

**Android:**
- Transfer the APK to your Android device
- Enable "Install from Unknown Sources" in Settings
- Tap the APK file to install

**iOS:**
- You'll need to use a distribution service like TestFlight, Diawi, or install via Xcode
- For development, you can use Xcode → Window → Devices and Simulators → Install app

## Local Testing

### Test Android Build Locally

```bash
# Install dependencies
bundle install

# Build debug APK
bundle exec fastlane android build_debug

# Build release APK
bundle exec fastlane android build_release_apk

# Build release AAB
bundle exec fastlane android build_release_aab
```

**Note**: For release builds, create `android/gradle.properties` with:
```properties
MYAPP_UPLOAD_STORE_FILE=path/to/your.keystore
MYAPP_UPLOAD_KEY_ALIAS=your-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your-store-password
MYAPP_UPLOAD_KEY_PASSWORD=your-key-password
```

### Test iOS Build Locally

```bash
# Install dependencies
bundle install
cd ios && pod install && cd ..

# Build for simulator
bundle exec fastlane ios build_simulator

# Build ad-hoc IPA
bundle exec fastlane ios build_adhoc

# Build app store IPA
bundle exec fastlane ios build_release
```

## Available Fastlane Lanes

### Android Lanes

```bash
fastlane android test                  # Run unit tests
fastlane android build_debug           # Build debug APK
fastlane android build_release         # Build release APK
```

### iOS Lanes

```bash
fastlane ios build_simulator          # Build for simulator
fastlane ios build_release            # Build release IPA
```

## Troubleshooting

### Android Issues

**Build fails with signing errors:**
- Verify keystore path and passwords in secrets
- Ensure keystore base64 encoding is correct
- Check that key alias matches

**ProGuard issues:**
- Review `android/app/proguard-rules.pro`
- Check build logs for obfuscation errors

### iOS Issues

**Code signing fails:**
- iOS uses automatic signing for development builds
- Ensure you have "Automatically manage signing" enabled in Xcode
- Check that your Mac has the necessary certificates

**Build fails:**
- Ensure CocoaPods are installed correctly
- Try running `cd ios && pod install` locally first

### General Issues

**Fastlane not found:**
```bash
bundle install
bundle exec fastlane [command]
```

**Permission denied errors:**
```bash
chmod +x android/gradlew
```

**Secrets not working:**
- Verify secret names match exactly (case-sensitive)
- Check for extra whitespace in secret values
- Ensure base64 encoding doesn't include newlines

## Security Best Practices

1. **Never commit secrets to git**
   - Add `.env` files to `.gitignore`
   - Never commit keystore files
   - Keep certificates out of version control

2. **Rotate secrets periodically**
   - Update keystores annually
   - Update signing certificates when needed

3. **Monitor pipeline logs**
   - Check for exposed secrets in logs
   - Review failed builds for security issues

## Additional Resources

- [Fastlane Documentation](https://docs.fastlane.tools/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Android App Signing](https://developer.android.com/studio/publish/app-signing)
- [iOS Code Signing](https://developer.apple.com/support/code-signing/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)

## Support

For issues with:
- **Fastlane**: Check [Fastlane GitHub Issues](https://github.com/fastlane/fastlane/issues)
- **GitHub Actions**: Check [GitHub Community](https://github.community/)
- **This pipeline**: Open an issue in this repository
