fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios build_simulator

```sh
[bundle exec] fastlane ios build_simulator
```

Build for simulator (no signing needed)

### ios tests

```sh
[bundle exec] fastlane ios tests
```

Run iOS tests

### ios ios_build_and_test

```sh
[bundle exec] fastlane ios ios_build_and_test
```

Full iOS workflow: build & test

----


## Android

### android build_release

```sh
[bundle exec] fastlane android build_release
```

Build Android APK (Release)

### android android_build_and_release

```sh
[bundle exec] fastlane android android_build_and_release
```

Full Android workflow: build & release

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
