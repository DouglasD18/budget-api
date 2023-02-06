import { MissingParamError } from "../errors/missing-param-error";
import { CreateBudgetController } from "./create-budget";
import { CreateBudget, CreateBudgetData } from "../../domain/useCases/create-budget";
import { InvalidParamError } from "../errors/invalid-param-error";
import { ServerError } from "../errors/server-error";
import { makeReadUsers } from "./read-users.spec";
import { makeReadProducts } from "./read-products.spec";
import { NotFoundError } from "../errors/not-found-error";

interface ControllerTypes {
  sut: CreateBudgetController
  createBudgeStub: CreateBudget
}

const budge = 1910;

const makeCreateBudge = (): CreateBudget => {
  class CreateBudgeStub implements CreateBudget {
    constructor() {}

    create(data: CreateBudgetData): Promise<number> {
      return new Promise(resolve => resolve(budge));
    }
  }

  const readUsersStub = makeReadUsers();
  const readProductsStub = makeReadProducts();

  return new CreateBudgeStub();
}

const makeSut = (): ControllerTypes => {
  const createBudgeStub = makeCreateBudge();
  const sut = new CreateBudgetController(
    createBudgeStub
  );

  return {
    sut,
    createBudgeStub
  }
}

describe("CreateBudget Controller", () => {
  it("Should return 400 if no userId is provided", async () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        productsId: [1, 2]
      }
    }

    const httpResponse = await sut.handle(httpResquest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('userId'));
  })

  it("Should return 400 if no productsId is provided", async () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        userId: 5
      }
    }

    const httpResponse = await sut.handle(httpResquest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('productsId'));
  })

  it("Should return 400 if userId is invalid", async () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        userId: "5",
        productsId: [1, 2]
      }
    }

    const httpResponse = await sut.handle(httpResquest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('userId'));
  })

  it("Should return 400 if productsId is invalid", async () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        userId: 5,
        productsId: [1, "2"]
      }
    }

    const httpResponse = await sut.handle(httpResquest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('productsId'));
  })

  it("Should return 404 if CreateBudget return User", async () => {
    const { sut, createBudgeStub } = makeSut();
    const httpResquest = {
      body: {
        userId: 5,
        productsId: [1, 2]
      }
    }

    jest.spyOn(createBudgeStub, "create").mockReturnValueOnce(new Promise(resolve => resolve("User")));
    const httpResponse = await sut.handle(httpResquest);

    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toEqual(new NotFoundError('User'));
  })

  it("Should return 404 if CreateBudget return Product", async () => {
    const { sut, createBudgeStub } = makeSut();
    const httpResquest = {
      body: {
        userId: 1,
        productsId: [1, 2, 3]
      }
    }

    jest.spyOn(createBudgeStub, "create").mockReturnValueOnce(new Promise(resolve => resolve("Product")));
    const httpResponse = await sut.handle(httpResquest);

    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toEqual(new NotFoundError('Product'));
  })

  it('Should return 500 if CreateBudget throws', async () => {
    const { sut, createBudgeStub } = makeSut();
    const httpRequest = {
      body: {
        userId: 1,
        productsId: [1, 2]
      }
    }
    
    jest.spyOn(createBudgeStub, "create").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it('Should call CreateBudge with correct values.', async () => {
    const { sut, createBudgeStub } = makeSut();
    const httpRequest = {
      body: {
        userId: 1,
        productsId: [1, 2]
      }
    }
    
    const createSpy = jest.spyOn(createBudgeStub, "create");
    sut.handle(httpRequest);

    expect(createSpy).toHaveBeenCalledWith({
      userId: 1,
      productsId: [1, 2]
    });
  })

  it('Should return 200 if valid values is provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        userId: 1,
        productsId: [1, 2]
      }
    }
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toBe(1910);
  })
})