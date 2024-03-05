import {
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
  useTheme,
} from "react-native-paper";
import { ColorSchemeName } from "react-native";

import { textStyles } from "./text-styles";
import { spacings } from "./spacings";
import { colors } from "./colors";

export function createTheme(colorScheme: ColorSchemeName) {
  const paperTheme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  return {
    ...paperTheme,
    colors: {
      ...paperTheme.colors,
      ...colors,
      brandPrimary: "#2575FC",
      brandSecondary: "#071034",
      primary: "#2575FC",
      onPrimary: "#FFFFFF",
    },
    fonts: configureFonts({
      config: { fontFamily: "ProximaNova-Regular" },
    }),
    textStyles,
    spacings,
  };
}

export type AppTheme = ReturnType<typeof createTheme>;

export const useAppTheme = () => useTheme<AppTheme>();
