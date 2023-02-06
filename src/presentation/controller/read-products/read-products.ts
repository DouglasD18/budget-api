import { ReadProducts } from "../../../domain/useCases/read-products";
import { ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class ReadProductsController implements Controller {
  constructor(private readProducts: ReadProducts) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.readProducts.read();

      return ok(products);
    } catch (error) {
      return serverError();
    }
  }
}