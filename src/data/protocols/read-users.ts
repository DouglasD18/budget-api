import { User } from "../../domain/models/user";

export interface ReadUsersRepository {
  read(userId: number): Promise<User>
}