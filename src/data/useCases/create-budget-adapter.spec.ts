import { makeReadProducts } from "../../presentation/controller/read-products.spec";
import { makeReadUsers } from "../../presentation/controller/read-users.spec";
import { CreateBudgetAdapter } from "./create-budget-adapter";

const makeSut = (): CreateBudgetAdapter => {
  const readProductsStub = makeReadProducts();
  const readUsersStub = makeReadUsers();
  
  return new CreateBudgetAdapter(readUsersStub, readProductsStub);
}

describe("CreateBudget Adapter", () => {
  it("Should return User if user not found", async () => {
    const sut = makeSut();
    const data = {
      userId: 3,
      productsId: [1, 2]
    }

    const response = await sut.create(data);

    expect(response).toBe("User");
  })

  it("Should return Product if user not product", async () => {
    const sut = makeSut();
    const data = {
      userId: 1,
      productsId: [1, 3]
    }

    const response = await sut.create(data);

    expect(response).toBe("Product");
  })

  it("Should return 7410.20 on success", async () => {
    const sut = makeSut();
    const data = {
      userId: 1,
      productsId: [1, 2]
    }

    const response = await sut.create(data);

    expect(response).toStrictEqual(7410.20);
  })
})