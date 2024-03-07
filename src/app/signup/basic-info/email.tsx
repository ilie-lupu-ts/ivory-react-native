import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";

import LogoSmall from "@/assets/icons/appbar_logo.svg";
import { AppTheme, useAppTheme } from "@/constants/theme";
import { Button } from "@/components/Button";
import { useSignupBasicInfo } from "@/hooks/useSignupBasicInfo";

type SignupEmailForm = {
  email: string;
};

export default function SignupEmailPage() {
  const router = useRouter();
  const theme = useAppTheme();
  const styles = getThemedStyles(theme);
  const { setEmail } = useSignupBasicInfo();
  const { control, formState, handleSubmit } = useForm<SignupEmailForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = ({ email }: SignupEmailForm) => {
    setEmail(email);
    router.push("/signup/basic-info/password");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => <LogoSmall />,
        }}
      />
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={theme.textStyles.heading2}>Email address</Text>
          <Text style={theme.textStyles.bodyRegular}>Enter your email address below.</Text>

          <Controller
            control={control}
            name="email"
            rules={{ required: "Please input a valid email address (e.g. name@domain.com)." }}
            render={({ field, fieldState }) => (
              <>
                <TextInput
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  mode="outlined"
                  error={!!fieldState.error}
                  outlineStyle={{ borderWidth: 1 }}
                  label="Email address"
                  placeholder="Type email address"
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
        <Button onPress={formState.isValid ? handleSubmit(onSubmit) : undefined}>Continue</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

function getThemedStyles(theme: AppTheme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: theme.spacings.screen.paddingHorizontal,
      justifyContent: "space-between",
      marginBottom: 16,
    },

    contentContainer: {
      gap: 16,
    },
  });
}
