import { Pressable, StyleSheet } from "react-native";
import {
  signIn,
  getCurrentUser,
  signOut,
  fetchUserAttributes,
  fetchAuthSession,
} from "aws-amplify/auth";

import { Text, View } from "@/components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.buttonsWrapper}>
        {/* <Text>{authStatus}</Text> */}
        {/* <Text>isPending: {isPending ? "true" : "false"}</Text> */}
        <Pressable style={styles.button} onPress={signInHandler}>
          <Text>Sign in</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={getUserHandler}>
          <Text>getCurrentUser</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={signOutHandler}>
          <Text>signOut</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={fetchUserAttributesHandler}>
          <Text>fetchUserAttributes</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={fetchAuthSessionHandler}>
          <Text>fetchAuthSession</Text>
        </Pressable>
      </View>
    </View>
  );

  async function signInHandler() {
    try {
      const user = await signIn({
        username: "",
        password: "",
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserHandler() {
    try {
      const user = await getCurrentUser();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function signOutHandler() {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUserAttributesHandler() {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log({ userAttributes });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAuthSessionHandler() {
    try {
      const authSession = await fetchAuthSession();
      const accessToken = authSession.tokens?.accessToken;

      console.log({ accessToken });
    } catch (error) {
      console.log(error);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonsWrapper: {
    gap: 10,
  },
  button: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
  },
});
