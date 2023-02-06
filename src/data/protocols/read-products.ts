import { Product } from "../../domain/models/product";

export interface ReadProductsRepository {
  read(): Promise<Product[]>
}
