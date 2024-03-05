import Video from "react-native-video";
import { Stack, useRouter } from "expo-router";
import { Text, View, Dimensions, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useAppTheme } from "@/constants/theme";
import { Carousel } from "@/components/Carousel";
import { Button } from "@/components/Button";
import { ActivityIndicator } from "react-native-paper";
import { useState } from "react";

export default function Page() {
  const theme = useAppTheme();
  const router = useRouter();
  const styles = getThemedStyles();
  const video = require("@/assets/videos/ivory_welcome_video.mp4");

  const [isVideoLoading, setVideoLoading] = useState(true);

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <View>
        {isVideoLoading && (
          <ActivityIndicator
            animating
            color={theme.colors.brandPrimary}
            size={48}
            style={styles.videoLoadingIndicator}
          />
        )}
        <Video
          source={video}
          style={styles.video}
          onReadyForDisplay={() => setVideoLoading(false)}
          onLoadStart={() => setVideoLoading(true)}
          playInBackground={true}
          repeat={true}
          resizeMode="cover"
        />
      </View>

      <ScrollView
        overScrollMode="never"
        style={{
          height: "100%",
        }}
      >
        <View style={{ height: 24 }} />
        <Carousel
          height={170}
          items={[
            {
              title: "Manage your finances with our credit card",
              description:
                "From easy transaction monitoring to convenient bill payments, our app empowers you to stay on top of your finances, anytime and anywhere.",
            },
            {
              title: "Seamless secure transactions",
              description:
                "Whether you're shopping online, in-store or abroad, our credit provides you with the confidence and convenience you deserve.",
            },
            {
              title: "Generous credit limit",
              description:
                "Enjoy competitive interest rates and flexible repayment options tailored to your needs be it fixed or percentage-based.",
            },
          ]}
          renderItem={({ item }) => {
            return (
              <View
                style={{ paddingHorizontal: theme.spacings.paddingHorizontal }}
              >
                <Text style={styles.sliderItemTitle}>{item.title}</Text>
                <View style={{ height: 16 }} />
                <Text style={styles.sliderItemDescription}>
                  {item.description}
                </Text>
              </View>
            );
          }}
        />
        <View style={{ height: 64 }} />
        <View
          style={{
            paddingHorizontal: theme.spacings.paddingHorizontal,
            gap: 16,
          }}
        >
          <Button variant="secondary" onPress={() => router.push("/login/")}>
            Log in
          </Button>
          <Button variant="primary" onPress={() => router.push("/signup/")}>
            Sign up
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

function getThemedStyles() {
  const theme = useAppTheme();
  const { width } = Dimensions.get("window");

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    video: {
      width,
      height: 400,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    videoLoadingIndicator: {
      flex: 1,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: [{ translateX: -24 }, { translateY: -24 }],
    },
    sliderItemTitle: {
      ...theme.textStyles.heading2,
      color: theme.colors.neutrals[900],
    },
    sliderItemDescription: {
      ...theme.textStyles.bodyRegular,
      color: theme.colors.neutrals[700],
    },
  });
}
