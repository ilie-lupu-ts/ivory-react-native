import { useContext } from "react";

import { AppContext } from "@/context/AppContext";
import { AuthError } from "@/models/auth/AuthError";
import { useRouter } from "expo-router";

export const useAuth = () => {
  const { authService, personService, authState, dispatchAuthState } = useContext(AppContext);
  const router = useRouter();

  async function signInWithEmail({ username, password }: { username: string; password: string }) {
    try {
      dispatchAuthState({ type: "SIGN_IN_LOADING" });

      const user = await authService.signInWithEmail({
        email: username,
        password,
      });

      const person = await personService.getById(user.accessToken, user.attributes.personId);

      dispatchAuthState({
        type: "SIGN_IN_SUCCESS",
        payload: { ...user, person },
      });

      router.dismissAll();
      router.replace("/home/");
    } catch (error) {
      dispatchAuthState({
        type: "SIGN_IN_ERROR",
        payload: error instanceof AuthError ? error : new AuthError("Unknown"),
      });
    }
  }

  return {
    signInWithEmail,
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
  };
};
