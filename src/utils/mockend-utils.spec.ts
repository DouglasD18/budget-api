import { mockendGet } from './mockend-utils';

describe("Mockend Utils", () => {
  it("Should return an array of Products when receive the products value", async () => {
    const products = await mockendGet("products");

    expect(products).toBeTruthy();
    expect(products[0]).toHaveProperty("id");
    expect(products[0]).toHaveProperty("name");
    expect(products[0]).toHaveProperty("price");
  });

  it("Should return an array of Users when receive the users value", async () => {
    const users = await mockendGet("users");

    expect(users).toBeTruthy();
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("tax");
  });
})