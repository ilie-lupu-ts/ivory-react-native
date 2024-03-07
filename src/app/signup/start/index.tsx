import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";

import { AppTheme, useAppTheme } from "@/constants/theme";
import LogoSmall from "@/assets/icons/appbar_logo.svg";
import CreditCardPaymentsIllustration from "@/assets/images/credit_card_payments.svg";
import { Button } from "@/components/Button";

export default function SignupStartPage() {
  const router = useRouter();
  const theme = useAppTheme();
  const styles = getThemedStyles(theme);

  return (
    <SafeAreaView style={styles.screen}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => <LogoSmall />,
        }}
      />
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.screenContent}>
        <View>
          <Text style={theme.textStyles.heading1}>It's quick and easy!</Text>
          <View style={{ height: 16 }} />
          <Text style={theme.textStyles.bodyRegular}>
            Get your credit card instantly in just
            <Text style={theme.textStyles.bodyRegularBold}> 25 minutes!</Text>
          </Text>
          <View style={{ height: 16 }} />
          <Text style={theme.textStyles.bodyRegular}>
            Please make sure your information is
            <Text style={theme.textStyles.bodyRegularBold}> accurate, </Text>
            as you
            <Text style={theme.textStyles.bodyRegularBold}> won't be able to modify it later.</Text>
          </Text>
          <View style={{ height: 16 }} />
          <Text style={theme.textStyles.bodyRegular}>
            First we'll ask you two quick questions to ensure our services are tailored to your
            needs.
          </Text>
        </View>
        <View style={styles.illustrationWrapper}>
          <CreditCardPaymentsIllustration />
        </View>
        <Button
          onPress={() => {
            router.push("/signup/basic-info/");
          }}
        >
          Let's start
        </Button>
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
    screenContent: {
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: theme.spacings.screen.paddingHorizontal,
      marginBottom: 16,
    },
    illustrationWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
}
