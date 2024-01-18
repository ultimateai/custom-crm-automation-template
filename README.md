# Custom CRM Automation template

Template NodeJS service template for integrating with Ultimate Chat API

## Introduction

Template for creating a NodeJS service that integrates with [Ultimate Chat API](https://developer.ultimate.ai/). It is written in Typescript and uses Express as the web framework.

It implements two simple webhooks:

- `POST /converse-webhook` - Receives a conversation webhook event from Ultimate Chat API
- `POST /action-webhook` - Receives an action webhook event from Ultimate Chat API

These webhooks will be used in your Ultimate Custom CRM setup in our [Ultimate's dashboard](https://dashboard.ultimate.ai/) to receive events from your Bot (text messages, escalation information)

**Please remember that this is an example and not a production-ready service.**

For more information on how Ultimate Chat API works, please refer to our official [documentation](https://developer.ultimate.ai/)

## Quick start

1. Install the dependencies with `npm install`
2. Copy `.env.example` as `.env`
3. Run `npm run build && npm run test` to make sure everything is ok
4. Run the application `npm run dev`
5. After the application is running, you can use the postman collection `CustomCrmWebhook.postman_collection.json` to test the webhooks 

## Tech

##### Basics

-   [Typescript](https://www.npmjs.com/package/typescript)
-   [TS-Node](https://github.com/TypeStrong/ts-node)
-   [Express](https://npmjs.com/package/express)
-   [dotenv](https://www.npmjs.com/package/dotenv)

##### Validation

-   [Class-validator](https://www.npmjs.com/package/class-validator)
-   [envalid](https://www.npmjs.com/package/envalid)

##### Testing

-   [jest](https://www.npmjs.com/package/jest)
-   [ts-jest](https://www.npmjs.com/package/ts-jest)
