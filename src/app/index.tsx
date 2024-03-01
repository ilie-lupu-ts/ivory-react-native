import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Text>Index</Text>
      <Link href="/signup/" asChild>
        <Pressable>
          <Text>Signup</Text>
        </Pressable>
      </Link>
    </View>
  );
}
