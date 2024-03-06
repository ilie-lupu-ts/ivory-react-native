import { Person } from "./Person";
import { User } from "./User";

export interface AuthenticatedUser extends User {
  person: Person;
}
