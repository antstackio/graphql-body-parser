import { json as jsonParser } from "body-parser";
import { Request, Response, NextFunction, RequestHandler } from "express";
import gql from "graphql-tag";

export interface Options {
  limit?: number | string;
  inflate?: boolean;
  reviver?: any;
  strict?: boolean;
  type?: string;
  verify?: any;
}

export const graphqlParser: (options?: Options) => RequestHandler =
  (options?: Options) => (req: Request, res: Response, next: NextFunction) => {
    if (req.is("application/json")) {
      jsonParser(options)(req, res, () => {
        // if body has query object try to parse it to graphql
        if (req.body.query) {
          try {
            req.gqlObject = {
              operation: gql`
                ${req.body.query}
              `,
              variables: req.body.variables,
            };
          } catch (e) {}
        }
        next();
      });
    } else {
      next();
    }
  };
