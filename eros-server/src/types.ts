import { IDatabaseDriver, Connection, EntityManager } from "@mikro-orm/core";
import { Request, Response } from "express";
import { createUpdootLoader } from "./utils/createUpdootLoader";
import { createUserLoader } from "./utils/createUserLoader";

declare module "express-session" {
  export interface SessionData {
    userId: any;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  updootLoader: ReturnType<typeof createUpdootLoader>;
};
