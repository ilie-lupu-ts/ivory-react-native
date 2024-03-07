import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

import LogoSmall from "@/assets/icons/appbar_logo.svg";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/Button";
import { TabView } from "@/components/TabView";
import { useAppTheme } from "@/constants/theme";
import { AlertMessage } from "@/components/AlertMessage";
import { useEffect } from "react";

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
  const router = useRouter();
  const { signInWithEmail, error, isLoading, user } = useAuth();
  const { control, handleSubmit, formState } = useForm<EmailForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: EmailForm) {
    await signInWithEmail({
      username: data.email,
      password: data.password,
    });
  }

  useEffect(() => {
    if (user) {
      router.dismissAll();
      router.replace("/home/");
    }
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        marginTop: 24,
      }}
    >
      <View style={{ gap: 16 }}>
        {error && <AlertMessage variant="error" title={error.title} message={error.message} />}
        <Controller
          control={control}
          name="email"
          rules={{ required: "This field is required" }}
          render={({ field, fieldState }) => (
            <>
              <TextInput
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                mode="outlined"
                outlineStyle={{ borderWidth: 1 }}
                label="Email"
              />
              {fieldState.error?.message && (
                <HelperText
                  type="error"
                  padding="none"
                  visible={true}
                  style={{ fontSize: 14, lineHeight: 18, paddingVertical: 0 }}
                >
                  {fieldState.error?.message}
                </HelperText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: "This field is required" }}
          render={({ field, fieldState }) => (
            <>
              <TextInput
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                mode="outlined"
                outlineStyle={{ borderWidth: 1 }}
                label="Password"
                secureTextEntry={true}
              />
              {fieldState.error?.message && (
                <HelperText
                  type="error"
                  padding="none"
                  visible={true}
                  style={{ fontSize: 14, lineHeight: 18, paddingVertical: 0 }}
                >
                  {fieldState.error?.message}
                </HelperText>
              )}
            </>
          )}
        />
      </View>
      <Button loading={isLoading} onPress={formState.isValid ? handleSubmit(onSubmit) : undefined}>
        Continue
      </Button>
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
      paddingHorizontal: theme.spacings.screen.paddingHorizontal,
      paddingTop: theme.spacings.screen.paddingVertical,
      marginBottom: 16,
    },
    tabView: {
      gap: 16,
      marginTop: 24,
    },
  });
}
