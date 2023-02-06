import { User } from "../../../domain/models/user";
import { ReadUsers } from "../../../domain/useCases/read-users";
import { ServerError } from "../../errors";
import { ReadUsersController } from "./read-users";

interface ControllerTypes {
  sut: ReadUsersController
  readUsers: ReadUsers
}

export const makeReadUsers = (): ReadUsers => {
  class ReadUsersStub implements ReadUsers {
    async read(): Promise<User[]> {
      const fakeUsers: User[] = [
        {
          "id": 1,
          "name": "cvRhuZicvV",
          "tax": 79
        },
        {
          "id": 2,
          "name": "P5hBDBonm3",
          "tax": 121
        }
      ];

      return new Promise(resolve => resolve(fakeUsers));
    }
  }

  return new ReadUsersStub();
}

const makeController = (): ControllerTypes => {
  const readUsers = makeReadUsers();
  const sut = new ReadUsersController(readUsers);

  return {
    sut,
    readUsers
  }
}

describe("ReadUsersController", () => {
  it('Should call ReadUsers', async () => {
    // given
    const { sut, readUsers } = makeController();
    
    // when
    const called = jest.spyOn(readUsers, "read");
    sut.handle({ body: '' })

    // then
    expect(called).toHaveBeenCalled();
  })

  it('Should return 500 if ReadUsers throws', async () => {
    // given
    const { sut, readUsers } = makeController();
    
    // when
    jest.spyOn(readUsers, "read").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle({ body: "" });

    // then
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it('Should return 200 and the corrects users', async () => {
    // given
    const { sut } = makeController();
    
    // when
    const httpResponse = await sut.handle({ body: "" });

    // then
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([
      {
        "id": 1,
        "name": "cvRhuZicvV",
        "tax": 79
      },
      {
        "id": 2,
        "name": "P5hBDBonm3",
        "tax": 121
      }
    ])
  })
})
