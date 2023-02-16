import { Router } from "express";
import { expressAdapter } from "../../adapter/express-adapter";
import { makeReadUsersController } from '../../factories/read-users';

export default (router: Router): void => {
  router.get("/users/", expressAdapter(makeReadUsersController()));
}