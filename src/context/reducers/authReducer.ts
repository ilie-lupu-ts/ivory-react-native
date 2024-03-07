import { AuthenticatedUser } from "@/models/AuthenticatedUser";
import { User } from "@/models/User";
import { AuthError } from "@/models/auth/AuthError";

export type AuthAction =
  | { type: "SIGN_IN_LOADING" }
  | { type: "SIGN_IN_SUCCESS"; payload: AuthenticatedUser }
  | { type: "SIGN_IN_ERROR"; payload: AuthError }
  | { type: "SIGN_OUT" };

export type AuthState = {
  status: "loading" | "confirmation_required" | "authenticated" | "unauthenticated" | "signed_out";
  user?: AuthenticatedUser;
  isLoading: boolean;
  error?: AuthError;
};

export const initialAuthState: AuthState = {
  status: "unauthenticated",
  isLoading: false,
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGN_IN_LOADING":
      return { error: undefined, status: "loading", user: undefined, isLoading: true };
    case "SIGN_IN_SUCCESS":
      return { error: undefined, status: "authenticated", user: action.payload, isLoading: false };
    case "SIGN_OUT":
      return { error: undefined, status: "signed_out", user: undefined, isLoading: false };
    case "SIGN_IN_ERROR":
      return {
        error: action.payload,
        status: "unauthenticated",
        user: undefined,
        isLoading: false,
      };
    default:
      throw new Error("Invalid action");
  }
};
