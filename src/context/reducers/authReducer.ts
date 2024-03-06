import { User } from "@/models/User";

export type AuthAction =
  | { type: "SIGN_IN_LOADING" }
  | { type: "SIGN_IN_SUCCESS"; payload: User }
  | { type: "SIGN_IN_ERROR"; payload: AuthenticationError }
  | { type: "SIGN_OUT" };

export type AuthState = {
  status: "loading" | "confirmation_required" | "authenticated" | "unauthenticated";
  user?: User;
  isLoading: boolean;
  error?: AuthenticationError;
};

export enum AuthenticationError {
  UserNotFound,
  Unknown,
}

export const initialAuthState: AuthState = {
  status: "unauthenticated",
  isLoading: false,
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SIGN_IN_LOADING":
      return { ...state, isLoading: true };
    case "SIGN_IN_SUCCESS":
      return { ...state, isLoading: false, user: action.payload, status: "authenticated" };
    case "SIGN_OUT":
      return { ...state, user: undefined, status: "unauthenticated" };
    default:
      throw new Error("Invalid action");
  }
};
