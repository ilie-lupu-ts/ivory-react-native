import { ScrollView, StyleSheet, Text, View } from "react-native";

import LogoSmall from "@/assets/icons/appbar_logo.svg";

import { useAppTheme } from "@/constants/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TabView } from "@/components/TabView";
import { Button } from "@/components/Button";
import { HelperText, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";

export default function LoginPage() {
  const styles = getThemedStyles();

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          headerTitle: "Login",
          headerShadowVisible: false,
          headerRight: () => <LogoSmall />,
        }}
      />
      <StatusBar style="dark" animated />
      <ScrollView contentContainerStyle={styles.screenScrollView}>
        <TabView
          initialTabIndex={1}
          tabs={[
            {
              title: "Mobile",
              content: <SignInWithMobile />,
            },
            {
              title: "Email",
              content: <SignInWithEmail />,
            },
          ]}
        />
      </ScrollView>
    </View>
  );
}

type EmailForm = {
  email: string;
  password: string;
};

function SignInWithEmail() {
  const { control } = useForm<EmailForm>({
    mode: "onChange",
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        marginTop: 24,
      }}
    >
      <View style={{}}>
        <Controller
          control={control}
          name="email"
          rules={{ required: "This field is required" }}
          render={({ field, fieldState }) => {
            console.log({ fieldState, field });

            return (
              <>
                <TextInput
                  label="Email"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                />
                <HelperText
                  type="error"
                  visible={true}
                  style={{ fontSize: 14, lineHeight: 18 }}
                >
                  {fieldState.error?.message}
                </HelperText>
              </>
            );
          }}
        />

        <TextInput label="Password" />
      </View>
      <Button>Continue</Button>
    </View>
  );
}

function SignInWithMobile() {
  return (
    <View>
      <TextInput label="Mobile number" />
      <TextInput label="Password" />
      <Button>Continue</Button>
    </View>
  );
}

function getThemedStyles() {
  const theme = useAppTheme();

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    screenScrollView: {
      flex: 1,
      paddingHorizontal: theme.spacings.paddingHorizontal,
      paddingTop: theme.spacings.paddingVertical,
      marginBottom: 16,
    },
    tabView: {
      gap: 16,
      marginTop: 24,
    },
  });
}
