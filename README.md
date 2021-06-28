# graphql-body-parser

Parses and exposes the graphql query as graphql object in the request. Works as an express middleware, and build on top of `body-parser` module. As of now it only works with graphql request send with `application/json` as `Content-Type`.

## How it works?

It looks for `query` and `variable` object in request body, and then parses the query into its AST. It then attaches both
the AST object as well as variables to req as `gqlObject` property.

Request Body

```json
  {
    query: "query($name: String) {
               hello(name: $name){
               name
              }
            }",
    variables: {
      "name": "khubo"
    }
  }
```

the parsed AST and variable will be attached as follows

`req.gqlObject`

```json
{
  "operation": {
    "kind": "Document",
    "definitions": [
      {
        "kind": "OperationDefinition",
        "operation": "query",
        "variableDefinitions": [
          {
            "kind": "VariableDefinition",
            "variable": {
              "kind": "Variable",
              "name": {
                "kind": "Name",
                "value": "name"
              }
            },
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "String"
              }
            },
            "directives": []
          }
        ],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "hello"
              },
              "arguments": [
                {
                  "kind": "Argument",
                  "name": {
                    "kind": "Name",
                    "value": "name"
                  },
                  "value": {
                    "kind": "Variable",
                    "name": {
                      "kind": "Name",
                      "value": "name"
                    }
                  }
                }
              ],
              "directives": [],
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                  {
                    "kind": "Field",
                    "name": {
                      "kind": "Name",
                      "value": "name"
                    },
                    "arguments": [],
                    "directives": []
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    "loc": {
      "start": 0,
      "end": 94
    }
  },
  "variables": {
    "name": "khubo"
  }
}
```

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
