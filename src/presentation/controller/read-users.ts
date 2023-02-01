import { ReadUsers } from "../../domain/useCases/read-users";
import { serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpResquest, HttpResponse } from "../protocols/http";

export class ReadUsersController implements Controller {
  constructor(private readUsers: ReadUsers) {}

  async handle(_httpResquest: HttpResquest): Promise<HttpResponse> {
    try {
      const users = await this.readUsers.read();

      return {
        statusCode: 200,
        body: users
      }
    } catch (error) {
      return serverError();
    }
  }
  
}