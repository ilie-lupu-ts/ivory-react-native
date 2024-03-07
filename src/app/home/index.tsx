import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableRipple } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, SafeAreaView, StyleSheet, ScrollView, View, Alert } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useAppTheme } from "@/constants/theme";

export default function HomePage() {
  const styles = getThemedStyles();
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableRipple
                onPress={() => {
                  Alert.alert("Profile", "Do you want to log out?", [
                    { text: "Yes", onPress: signOut },
                    { text: "No", onPress: () => {}, style: "cancel" },
                  ]);
                }}
              >
                <MaterialIcons name="person" size={25} />
              </TouchableRipple>
            </View>
          ),
        }}
      />
      <StatusBar style="inverted" />

      <ScrollView contentContainerStyle={styles.screenScrollView}>
        <Text>Welcome, {user?.attributes.firstName}</Text>
      </ScrollView>
      <Text></Text>
    </SafeAreaView>
  );
}

function getThemedStyles() {
  const theme = useAppTheme();

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    screenScrollView: {
      paddingHorizontal: theme.spacings.screen.paddingHorizontal,
    },
    headerRight: {
      marginRight: theme.spacings.screen.paddingHorizontal,
    },
  });
}
