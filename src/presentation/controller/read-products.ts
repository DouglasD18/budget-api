import { ReadProducts } from "../../domain/useCases/read-products";
import { serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpResquest, HttpResponse } from "../protocols/http";

export class ReadProductsController implements Controller {
  constructor(private readProducts: ReadProducts) {}

  async handle(_httpResquest: HttpResquest): Promise<HttpResponse> {
    try {
      const products = await this.readProducts.read();

      return {
        statusCode: 200,
        body: products
      }
    } catch (error) {
      return serverError();
    }
  }
}