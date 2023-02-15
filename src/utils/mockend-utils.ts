import axios from "axios";
import { Product } from "../domain/models/product";
import { User } from "../domain/models/user";

export const mockendGet = async (type: "users" | "products"): Promise<User[] | Product[]> => {
  const response = await axios.get(`https://mockend.com/juunegreiros/BE-test-api/${type}`)
  return response.data;
}
