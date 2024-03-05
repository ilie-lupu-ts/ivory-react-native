import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Amplify } from "aws-amplify";
export { ErrorBoundary } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import config from "@/amplifyconfiguration.json";
import { createTheme } from "@/constants/theme";
import { useColorScheme } from "react-native";

Amplify.configure(config);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    "ProximaNova-Bold": require("../../assets/fonts/ProximaNova-Bold.otf"),
    "ProximaNova-Regular": require("../../assets/fonts/ProximaNova-Regular.otf"),
    "ProximaNova-Semibold": require("../../assets/fonts/ProximaNova-Semibold.otf"),
    "ProximaNova-Light": require("../../assets/fonts/ProximaNova-Light.otf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = createTheme(colorScheme);

  return (
    <PaperProvider theme={theme}>
      <Stack />
    </PaperProvider>
  );
}
