import { Router, Express } from "express";
import budgetRouter from "../route/route";

export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  budgetRouter(router);
}
