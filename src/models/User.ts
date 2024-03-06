export interface User {
  id: string;
  email: string;
  accessToken: string;
  attributes: UserAttributes;
}

export interface UserAttributes {
  firstName: string;
  lastName: string;
  personId: string;
  accountId: string;
}
