import { signIn } from "aws-amplify/auth";

export class AuthService {
  async signInWithEmail({ email, password }: { email: string; password: string }) {
    try {
      const result = await signIn({ username: email, password });

      return result;
    } catch (error) {}
  }
}
