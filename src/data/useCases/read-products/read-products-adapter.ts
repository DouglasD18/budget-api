import { Product } from "../../../domain/models/product";
import { ReadProducts } from "../../../domain/useCases/read-products";
import { ReadProductsRepository } from "../../protocols/read-products";

export class ReadProductsAdapter implements ReadProducts {
  constructor(private repository: ReadProductsRepository) {}

  async read(): Promise<Product[]> {
    const products = await this.repository.read();
    return products;
  }
}