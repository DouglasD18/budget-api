import { User } from "../models/user";

export interface ReadUsers {
  read(): Promise<User[]>;
}
