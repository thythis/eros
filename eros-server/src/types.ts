import { IDatabaseDriver, Connection, EntityManager } from "@mikro-orm/core";
import { Request, Response } from "express";

declare module "express-session" {
  export interface SessionData {
    userId: any;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
};
