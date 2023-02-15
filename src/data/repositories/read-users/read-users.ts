import { User } from "../../../domain/models/user";
import { ReadUsersRepository } from "../../protocols/read-users";
import { MockendInterface } from '../../../utils/mockend-utils';

export class ReadUsersRepositoryAdapter implements ReadUsersRepository {
  constructor(private mockend: MockendInterface) {}

  async read(): Promise<User[]> {
    const users = await this.mockend.fetch("users");

    return users as User[];
  }
}
