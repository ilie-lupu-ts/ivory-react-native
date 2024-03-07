import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export const useSignupBasicInfo = () => {
  const { dispatchOnboardingState, onboardingState } = useContext(AppContext);

  const basicInfo = onboardingState.signUp;

  function setBasicInfo({
    title,
    firstName,
    lastName,
  }: {
    title: string;
    firstName: string;
    lastName: string;
  }) {
    dispatchOnboardingState({ type: "SET_BASIC_INFO", payload: { title, firstName, lastName } });
  }

  function setEmail(email: string) {
    dispatchOnboardingState({ type: "SET_EMAIL", payload: { email } });
  }

  function setPassword(password: string) {
    dispatchOnboardingState({ type: "SET_PASSWORD", payload: { password } });
  }

  return { setBasicInfo, setEmail, setPassword, basicInfo };
};
