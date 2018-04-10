# RealMQ Customer Messaging

An intercom-like customer messaging reference implementation on top of RealMQ's
instant messaging backbone.

## Getting started

First install dependencies:

```bash
$ yarn
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
| `PORT` | http port the server will listen to | **8080** |
| `AGENT_USERNAME` | Username required to access `/agent` | **agent** |
| `AGENT_PASSWORD` | Password of the agent user | **password** |
