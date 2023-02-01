import { Product } from "../models/product";

export interface ReadProducts {
  read(): Promise<Product[]>;
}
