declare namespace Express {
  export interface Request {
    gqlObject?: {
      operation?: Object;
      variables?: Object;
    };
  }
}
