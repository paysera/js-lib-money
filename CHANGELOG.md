# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.2.0
### Fixed
- From now lodash usage don't change global scope, before fix, it binds self to global `_` variable and could change project lodash version.
- eslint fixes
### Changed
- Updated lib build. Added es build, prepublishOnly command
### Removed
- Demo folder

## 1.1.0
### Added
- supported currencies: `XAU`, `XAG`, `XPT`
