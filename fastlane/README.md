fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android test

```sh
[bundle exec] fastlane android test
```

Run Android unit tests

### android build_debug

```sh
[bundle exec] fastlane android build_debug
```

Build Android APK (Debug)

### android build_release

```sh
[bundle exec] fastlane android build_release
```

Build Android APK (Release)

----


## iOS

### ios build_simulator

```sh
[bundle exec] fastlane ios build_simulator
```

Build iOS for simulator (no signing needed)

### ios build_release

```sh
[bundle exec] fastlane ios build_release
```

Build iOS Release IPA (Development)

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
