import { useAppTheme } from "@/constants/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function SignupPage() {
  const styles = getThemedStyles();

  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen
        options={{ headerTitle: "Sign in", headerShadowVisible: false }}
      />
      <StatusBar style="inverted" />

      <Text>Signup page</Text>
      <Button
        mode="elevated"
        onPress={() => {
          console.log("pressed");
        }}
      >
        Signup
      </Button>
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
