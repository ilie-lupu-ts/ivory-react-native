import { ReactNode, createContext, Dispatch, useMemo, useReducer, useEffect } from "react";

import {
  OnboardingAction,
  OnboardingState,
  initialOnboardingState,
  onboardingReducer,
} from "./reducers/onboardingReducer";
import { AuthService } from "@/service/AuthService";
import { AuthAction, AuthState, authReducer, initialAuthState } from "./reducers/authReducer";
import { PersonService } from "@/service/PersonService";
import { useRouter } from "expo-router";

type AppContext = {
  authState: AuthState;
  dispatchAuthState: Dispatch<AuthAction>;
  onboardingState: OnboardingState;
  dispatchOnboardingState: Dispatch<OnboardingAction>;
  authService: AuthService;
  personService: PersonService;
};

const defaultAppContext: AppContext = {
  authState: initialAuthState,
  dispatchAuthState: () => {},
  onboardingState: initialOnboardingState,
  dispatchOnboardingState: () => {},
  authService: {} as AuthService,
  personService: {} as PersonService,
};

export const AppContext = createContext<AppContext>(defaultAppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [authState, dispatchAuthState] = useReducer(authReducer, initialAuthState);
  const [onboardingState, dispatchOnboardingState] = useReducer(
    onboardingReducer,
    initialOnboardingState
  );

  const authService = useMemo(() => new AuthService(), []);
  const personService = useMemo(() => new PersonService(), []);

  useEffect(() => {
    if (authState.status === "signed_out") {
      if (router.canDismiss()) {
        router.dismissAll();
      }

      router.replace("/");
    }
  });

  const value = {
    authState,
    dispatchAuthState,
    onboardingState,
    dispatchOnboardingState,
    authService,
    personService,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
