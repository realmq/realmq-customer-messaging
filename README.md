# RealMQ Customer Messaging

[![Build Status](https://img.shields.io/travis/RealMQ/realmq-customer-messaging/master.svg?style=flat-square)](https://travis-ci.org/RealMQ/realmq-customer-messaging)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT license](https://img.shields.io/github/license/realmq/realmq-customer-messaging.svg?style=flat-square)](LICENSE)

A customer messaging reference implementation on top of RealMQ's instant messaging backbone.

See [Live Demo](https://customer-messaging-example.herokuapp.com/)

## About

[RealMQ](https://realmq.com) is a highly scalable, privacy compliant real-time communication backbone.
Our focus is to deliver great service with best possible integrability while you keep full control over your data.

## Contact

Get in touch with us to get an RealMQ account set up.
You can do that by sending an email to service@realmq.com.

## Getting started

First install dependencies:

```bash
$ yarn
```

Build the vue apps (agent & chat-widget)

```bash
$ yarn dist
```

Start the express app

```bash
$ yarn start
```

## Configuration

The app can be configured via environment variables and/or `.env` file.

```
$ cp .env.tpl .env
```

| Env Var | Description | Default |
|---------|---|---|
| `REALMQ_TOKEN` | Realmq admin token for setup and managing clients, channels, messaging.<br>:point_right: This configuration variable is **REQUIRED** | - |
| `REALMQ_HOST` | Can be set to custom realmq deployment. | - |
| `PORT` | http port the server will listen to | **8080** |
| `AGENT_USERNAME` | Username required to access `/agent` | **agent** |
| `AGENT_PASSWORD` | Password of the agent user | **password** |

---

### LICENSE

The files in this archive are released under MIT license.
You can find a copy of this license in [LICENSE](LICENSE).
