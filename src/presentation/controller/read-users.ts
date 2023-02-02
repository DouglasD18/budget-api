import { ReadUsers } from "../../domain/useCases/read-users";
import { ok, serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class ReadUsersController implements Controller {
  constructor(private readUsers: ReadUsers) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const users = await this.readUsers.read();

      return ok(users);
    } catch (error) {
      return serverError();
    }
  }
  
}