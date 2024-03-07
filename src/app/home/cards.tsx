import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet } from "react-native";

import { useAppTheme } from "@/constants/theme";

export default function CardsPage() {
  const styles = getThemedStyles();
  const { user } = useAuth();
  console.log("user", user);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="inverted" />

      <Text>Cards page</Text>
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
