import { User } from "../../../domain/models/user";
import { ReadUsers } from "../../../domain/useCases/read-users";
import { ReadUsersRepository } from "../../protocols/read-users";

export class ReadUsersAdapter implements ReadUsers {
  constructor(private repository: ReadUsersRepository) {}

  async read(): Promise<User[]> {
    const users = await this.repository.read();
    return users;
  }
}