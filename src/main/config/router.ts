import { Router, Express } from "express";
import budgetRouter from "../route/budget/route";
import usersRouter from "../route/users/route";
import productsRouter from "../route/products/route";

export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  budgetRouter(router);
  usersRouter(router);
  productsRouter(router);
}
