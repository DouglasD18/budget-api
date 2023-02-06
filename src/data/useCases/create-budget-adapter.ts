import { Product } from "../../domain/models/product";
import { User } from "../../domain/models/user";
import { CreateBudget, CreateBudgetData } from "../../domain/useCases/create-budget";
import { ReadProducts } from "../../domain/useCases/read-products";
import { ReadUsers } from "../../domain/useCases/read-users";

export class CreateBudgetAdapter implements CreateBudget {
  constructor(
    private readUsers: ReadUsers,
    private readProducts: ReadProducts
  ) {}

  private async verifyProducts(productsId: number[]): Promise<string | Product[]> {
    const products = await this.readProducts.read();
    const ids = products.map((product) => product.id);
    const exists = productsId.some((id) => ids.indexOf(id) === -1);

    if (exists === true) {
      return "Product"
    }

    const selected = products.filter((product) => productsId.indexOf(product.id) !== -1);
    return selected;
  }

  private async verifyUser(userId: number): Promise<string | User> {
    const users = await this.readUsers.read();
    const exists = users.find((user) => user.id === userId);
    
    if (!exists) {
      return "User"
    } 

    return exists;
  }

  async create(data: CreateBudgetData): Promise<number | string> {
    const { userId, productsId } = data;

    const user = await this.verifyUser(userId);
    if (typeof user === "string") return user;

    const products = await this.verifyProducts(productsId);
    if (typeof products === "string") return products;

    const { tax } = user;

    const prices = products.map(product => product.price);
    console.log(prices);
    

    const budget = prices.reduce((prev, cur) => prev + cur * tax / 100, 0);
    return Number(budget.toFixed(2));
  }
}
