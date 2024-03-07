import { useContext } from "react";

import { AppContext } from "@/context/AppContext";
import { AuthError } from "@/models/auth/AuthError";

export const useAuth = () => {
  const { authService, personService, authState, dispatchAuthState } = useContext(AppContext);

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
    } catch (error) {
      dispatchAuthState({
        type: "SIGN_IN_ERROR",
        payload: error instanceof AuthError ? error : new AuthError("Unknown"),
      });
    }
  }

  async function signOut() {
    const signedOut = await authService.signOut();

    if (signedOut) {
      dispatchAuthState({ type: "SIGN_OUT" });
    }
  }

  return {
    signInWithEmail,
    signOut,
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
  };
};
