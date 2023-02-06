import { User } from "../../domain/models/user";

export interface ReadUsersRepository {
  read(): Promise<User[]>
}
