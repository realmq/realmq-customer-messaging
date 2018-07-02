# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2018-07-02
### Changed
- Adjust api responses to adapt latest changes. #5
- Upgraded deps to `@realmq/web-sdk@0.1.0`, `@realmq/node-sdk@0.1.0`. #5

### Added
- Add support for using the app on custom realmq instance by setting `REALMQ_HOST` env var.

## [0.1.0-alpha7] - 2018-06-29
### Fixed
- Fix missing chats in chat list. All chats will be loaded now.

## [0.1.0-alpha6] - 2018-06-28
### Fixed
- Fix flickering of agent view if two or more are open in parallel caused by
  permanent reconnect. Each agent view will now generate a new auth token.

[Unreleased]: https://github.com/realmq/realmq-customer-messaging/compare/0.1.0...HEAD
[0.1.0]: https://github.com/realmq/realmq-customer-messaging/compare/0.1.0-alpha7...0.1.0
[0.1.0-alpha7]: https://github.com/realmq/realmq-customer-messaging/compare/0.1.0-alpha6...0.1.0-alpha7
[0.1.0-alpha6]: https://github.com/realmq/realmq-customer-messaging/compare/0.1.0-alpha5...0.1.0-alpha6
