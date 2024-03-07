import { useAuth } from "@/hooks/useAuth";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet } from "react-native";

import { useAppTheme } from "@/constants/theme";

export default function SettingsPage() {
  const styles = getThemedStyles();
  const { user } = useAuth();
  console.log("user", user);

  return (
    <SafeAreaView style={styles.screen}>
      <Text>Settings page</Text>
    </SafeAreaView>
  );
}

function getThemedStyles() {
  const theme = useAppTheme();

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
}
