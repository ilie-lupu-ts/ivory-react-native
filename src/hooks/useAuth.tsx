import { useContext, useReducer } from "react";

import { AppContext } from "@/context/AppContext";
import { AuthenticationError } from "@/context/reducers/authReducer";

export const useAuth = () => {
  const { authService, authState, dispatchAuthState } = useContext(AppContext);

  async function signInWithEmail({ username, password }: { username: string; password: string }) {
    try {
      dispatchAuthState({ type: "SIGN_IN_LOADING" });

      const user = await authService.signInWithEmail({ email: username, password });

      console.log(user);
      dispatchAuthState({ type: "SIGN_IN_SUCCESS", payload: { id: "test" } });
    } catch (error) {
      dispatchAuthState({ type: "SIGN_IN_ERROR", payload: AuthenticationError.Unknown });
    }
  }

  return { signInWithEmail, authState };
};
