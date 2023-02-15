import { Router } from "express"
import { expressAdapter } from "../adapter/express-adapter"
import { makeCreateBudgetController } from '../factories/create-budget';

export default (router: Router): void => {
  router.post("/budget/", expressAdapter(makeCreateBudgetController()));
}
