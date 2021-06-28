# graphql-body-parser

Parses and exposes the graphql query as graphql object in the request. Works as an express middleware.

## Installation

```sh
$ npm install @antstackio/graphql-body-parser
$ yarn add @antstackio/graphql-body-parser
```

## Usage

This can be used instead of normal json parser used with express

```js
import * as express from "express";
import * as gqlParser from "@antstackio/graphql-body-parser";

const app = express();

app.use(gqlParser());

app.listen(process.env.PORT, () => {
  logger.info(`Node app running on port ${process.env.PORT} 🚀🚀`);
});
```
