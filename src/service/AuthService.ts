import {
  signIn,
  AuthError as AmplifyAuthError,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";

import { AuthError } from "@/models/auth/AuthError";
import { User, UserAttributes } from "@/models/User";

export class AuthService {
  async signInWithEmail({ email, password }: { email: string; password: string }): Promise<User> {
    try {
      await signOut(); // TODO: remove this line when the user is not longer signed in on the previous session

      await signIn({
        username: email,
        password,
      });
      const [userInfo, userSession, userAttributes] = await Promise.all([
        getCurrentUser(),
        fetchAuthSession(),
        fetchUserAttributes(),
      ]);
      const accessToken = userSession.tokens?.accessToken.toString() ?? "";
      const attributes = mapUserAttributes(userAttributes);

      return {
        id: userInfo.username,
        email,
        accessToken,
        attributes,
      };
    } catch (error) {
      handleServiceError(error);
    }
  }
}

function handleServiceError(error: unknown): never {
  if (error instanceof AmplifyAuthError) {
    throw mapAmplifyErrorToAuthError(error);
  }

  throw new AuthError("Unknown");
}

function mapAmplifyErrorToAuthError(error: AmplifyAuthError): AuthError {
  if (error.name === "UserNotFoundException") {
    return new AuthError("UserNotFound");
  }

  return new AuthError("Unknown");
}

function mapUserAttributes(attributes: FetchUserAttributesOutput): UserAttributes {
  return {
    firstName: attributes.given_name ?? "",
    lastName: attributes.family_name ?? "",
    personId: attributes["custom:personId"] ?? "",
    accountId: attributes["custom:accountId"] ?? "",
  };
}
