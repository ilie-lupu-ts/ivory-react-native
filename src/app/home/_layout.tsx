import React from "react";
import { Stack, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useAppTheme } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  const theme = useAppTheme();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.brandPrimary,
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="cards"
          options={{
            title: "Cards",
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="credit-card" color={color} />,
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="payments" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="settings" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
