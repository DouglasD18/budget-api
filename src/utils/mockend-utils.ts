import axios from "axios";
import { Product } from "../domain/models/product";
import { User } from "../domain/models/user";

export const mockendGet = async (url: string): Promise<User[] | Product[]> => {
  const response = await axios.get(url)
  return response.data;
}
