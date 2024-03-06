export type AuthErrorType = "UserNotFound" | "Unknown";

export class AuthError {
  constructor(public type: AuthErrorType) {}

  get title() {
    const titles: Record<AuthErrorType, string> = {
      UserNotFound: "Wrong email or password",
      Unknown: "Unknown",
    };

    return titles[this.type];
  }

  get message() {
    const messages: Record<AuthErrorType, string> = {
      UserNotFound:
        "Please double-check the information you've entered and try with a different email or password.",
      Unknown: "Unknown error",
    };

    return messages[this.type];
  }
}
