import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useAppTheme } from "@/constants/theme";

type Props = {
  variant: "error";
  title: string;
  message: string;
};

export const AlertMessage: React.FC<Props> = ({ title, message }) => {
  const theme = useAppTheme();
  const styles = getThemedStyles();

  return (
    <View style={styles.errorContainer}>
      <View style={styles.titleWrapper}>
        <MaterialIcons name="error-outline" size={24} color={theme.colors.error} />
        <Text style={theme.textStyles.bodySmallBold}>{title}</Text>
      </View>
      <Text style={theme.textStyles.bodySmallRegular}>{message}</Text>
    </View>
  );

  function getThemedStyles() {
    const { backgroundColor, iconColor, textColor, borderColor } = getColors();

    return StyleSheet.create({
      errorContainer: {
        backgroundColor,
        padding: 16,
        borderWidth: 1,
        borderColor,
        borderRadius: 8,
      },
      titleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 8,
      },
    });
  }

  function getColors() {
    return {
      backgroundColor: theme.colors.errorContainer,
      textColor: theme.colors.onErrorContainer,
      iconColor: theme.colors.error,
      borderColor: theme.colors.red[200],
    };
  }
};
