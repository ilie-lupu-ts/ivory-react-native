import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";

import LogoSmall from "@/assets/icons/appbar_logo.svg";
import { AppTheme, useAppTheme } from "@/constants/theme";
import { SelectOption } from "@/components/SelectOption";
import { Button } from "@/components/Button";
import { useSignupBasicInfo } from "@/hooks/useSignupBasicInfo";

type SignupBasicInfoForm = {
  title: string;
  firstName: string;
  lastName: string;
};

export default function SignupBasicInfoPage() {
  const router = useRouter();
  const theme = useAppTheme();
  const styles = getThemedStyles(theme);
  const { setBasicInfo, basicInfo } = useSignupBasicInfo();
  const { control, formState, handleSubmit } = useForm<SignupBasicInfoForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: SignupBasicInfoForm) => {
    router.push("/signup/basic-info/email");
    setBasicInfo(data);
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
          <Text style={theme.textStyles.heading2}>Preferred title, first & last name</Text>
          <Text style={theme.textStyles.bodyRegular}>
            Select your title and fill in your first and last name. Include all names if you have
            multiple.
          </Text>

          <Controller
            control={control}
            name="title"
            rules={{ required: "Please select a title" }}
            render={({ field }) => (
              <SelectOption
                label="Preferred title"
                placeholder="Select preferred title"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                options={[
                  { text: "Mr", value: "MR" },
                  { text: "Ms", value: "MS" },
                  { text: "Other", value: "OTHER" },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="firstName"
            rules={{ required: "Please enter your first name" }}
            render={({ field, fieldState }) => (
              <>
                <TextInput
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  label="First name(s)"
                  placeholder="Type first name"
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
            name="lastName"
            rules={{ required: "Please enter your last name" }}
            render={({ field, fieldState }) => (
              <>
                <TextInput
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  mode="outlined"
                  outlineStyle={{ borderWidth: 1 }}
                  label="Last name(s)"
                  placeholder="Type last name"
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
