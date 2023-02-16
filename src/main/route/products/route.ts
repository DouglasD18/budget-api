import { Router } from "express";
import { expressAdapter } from "../../adapter/express-adapter";
import { makeReadProductsController } from '../../factories/read-products';

export default (router: Router): void => {
  router.get("/products/", expressAdapter(makeReadProductsController()));
}