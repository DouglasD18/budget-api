import { Product } from "../../../domain/models/product";
import { ReadProductsRepository } from "../../protocols/read-products";
import { MockendInterface } from '../../../utils/mockend-utils';

export class ReadProductsRepositoryAdapter implements ReadProductsRepository {
  constructor(private mockend: MockendInterface) {}

  async read(): Promise<Product[]> {
    const products = await this.mockend.fetch("products");

    return products as Product[];
  }
}