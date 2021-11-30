# Plaid Integrations Api

An awesome project based on [Nestjs](http://nestjs.com/)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>

<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Third-party API integration from [Plaid](https://plaid.com/docs/api/).

_Plaid helps all companies build fintech solutions by making it easy, safe and reliable for people to connect their financial data to apps and services._

## Installation

```bash
yarn install
```

- ### Register in [Plaid](https://dashboard.plaid.com/signup?email=&referrer_url=) to get Credentials

- ### Create a `.env` file

```bash
PORT=3000
HTTPS_PORT=4000
NODE_ENV=production
API_KEY=60f85354b82d8357f36bd79e
PLAID_CLIENT_ID={{PLAID_CLIENT_ID}}
PLAID_DEV={{PLAID_DEV}}
PLAID_SANDBOX={{PLAID_SANDBOX}}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Show the Docs with Swagger UI

_Development_

- [Swagger Local](http://localhost:3000/docs)

_Heroku App_

- [Swagger Heroku](https://test-fintech-integrations.herokuapp.com/docs)

## List endpoints

---

A list for use correct endpoints

1. **Get the Institutions list to generate Access Token for the others endpoints**\

   - `Get /plaid/institutions`

2. **Get the Access Token for use in the others endpoints**\

   - `Get /plaid/token`

3. **Others Endpoints to Use**

   - `Get /plaid/identity/get`
   - `Get /plaid/investments/holding/get`
   - `Get /plaid/item/get`
   - `Get /plaid/transactions/get`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
