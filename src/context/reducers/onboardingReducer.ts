import { OnboardingStep } from "@/models/onboarding/common";

export type OnboardingAction =
  | {
      type: "SET_BASIC_INFO";
      payload: { title: string; firstName: string; lastName: string };
    }
  | {
      type: "SET_EMAIL";
      payload: { email: string };
    }
  | {
      type: "SET_PASSWORD";
      payload: { password: string };
    };

export type OnboardingState = {
  step: OnboardingStep;
  signUp: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    notificationsAllowed: boolean;
  };
};

export const initialOnboardingState: OnboardingState = {
  step: OnboardingStep.start,
  signUp: {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    notificationsAllowed: false,
  },
};

export const onboardingReducer = (
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState => {
  switch (action.type) {
    case "SET_BASIC_INFO":
      return {
        ...state,
        signUp: {
          ...state.signUp,
          title: action.payload.title,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
      };
    case "SET_EMAIL":
      return {
        ...state,
        signUp: {
          ...state.signUp,
          email: action.payload.email,
        },
      };
    case "SET_PASSWORD":
      return {
        ...state,
        signUp: {
          ...state.signUp,
          password: action.payload.password,
        },
      };
    default:
      throw new Error("Invalid action");
  }
};
