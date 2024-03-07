import { MD3LightTheme, MD3DarkTheme, configureFonts, useTheme } from "react-native-paper";
import { ColorSchemeName } from "react-native";

import { textStyles } from "./text-styles";
import { spacings } from "./spacings";
import { colors } from "./colors";

export function createTheme(colorScheme: ColorSchemeName) {
  const lightTheme = {
    ...MD3LightTheme,
    colors: { ...MD3LightTheme.colors, background: colors.white },
  };

  const paperTheme = colorScheme === "dark" ? MD3DarkTheme : lightTheme;

  return {
    ...paperTheme,
    colors: {
      ...paperTheme.colors,
      ...colors,
      brandPrimary: "#2575FC",
      brandSecondary: "#071034",
      primary: "#2575FC",
      onPrimary: "#FFFFFF",
      errorContainer: colors.extended.red[100],
      error: colors.extended.red[600],
      onErrorContainer: colors.extended.neutrals[900],
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
