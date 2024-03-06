import { useAppTheme } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet } from "react-native";

export default function HomePage() {
  const styles = getThemedStyles();
  const { user } = useAuth();
  console.log("user from home page", user);

  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen options={{ headerTitle: "Home", headerShadowVisible: false }} />
      <StatusBar style="inverted" />

      <Text>Home page</Text>
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
