import { Product } from "../../domain/models/product";

export interface ReadProductsRepository {
  read(productId: number): Promise<Product>
}
