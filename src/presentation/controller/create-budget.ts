import { CreateBudget } from "../../domain/useCases/create-budget";
import { ReadProducts } from "../../domain/useCases/read-products";
import { ReadUsers } from "../../domain/useCases/read-users";
import { InvalidParamError } from "../errors/invalid-param-error";
import { MissingParamError } from "../errors/missing-param-error";
import { NotFoundError } from "../errors/not-found-error";
import { badRequest, created, notFound, serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class CreateBudgetController implements Controller {
  constructor(
    private createBudget: CreateBudget,
    private readProducts: ReadProducts,
    private readUsers: ReadUsers
  ) {}

  private async verifyProducts(productsId: number[]): Promise<string | void> {
    const products = await this.readProducts.read();
    const ids = products.map((product) => product.id);
    const exists = productsId.some((id) => ids.indexOf(id) === -1);

    if (exists === true) {
      return "Product"
    }
  }

  private async verifyUser(userId: number): Promise<string | void> {
    const users = await this.readUsers.read();
    const exists = users.some((user) => user.id === userId);
    
    if (exists === false) {
      return "User"
    }
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["userId", "productsId"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { userId, productsId } = httpRequest.body;
      if (typeof userId !== "number") {
        return badRequest(new InvalidParamError("userId"))
      }

      if (!Array.isArray(productsId)) {
        return badRequest(new InvalidParamError("productsId"))
      } else {
        for (const id of productsId) {
          if (typeof id !== "number") {
            return badRequest(new InvalidParamError("productsId"))
          }
        }
      }

      const userExists = await this.verifyUser(userId);
      if (typeof userExists === "string") {
        return notFound(new NotFoundError(userExists));
      }

      const productsExists = await this.verifyProducts(productsId);
      if (typeof productsExists === "string") {
        return notFound(new NotFoundError(productsExists));
      }

      const budget = await this.createBudget.create({ userId, productsId });
      return created(budget);
    } catch (error) {
      return serverError();
    }
  }
}