import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { router } from "expo-router";

export default function Index() {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          Colors.dark.background.first,
          Colors.dark.background.second,
          Colors.dark.background.third,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: width, y: height }}
        style={style.container}
      >
        <Image
          source={require("../assets/images/Design.png")}
          style={{ width: "80%", height: "46%" }}
          resizeMode="contain"
        />
        <Text style={style.title1}>WELCOME TO</Text>
        <Text style={style.title2}>CAPDES</Text>
        <Text style={style.title3}>
          Your solution for Car Problems on the go.
        </Text>

        <TouchableOpacity
          style={style.buttons}
          onPress={() => router.push("/(onboarding)")}
        >
          <Text style={style.textBtn}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title1: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 600,
  },
  title2: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: 700,
  },
  title3: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
  },
  buttons: {
    backgroundColor: Colors.dark.buttons.background,
    color: Colors.dark.buttons.text,
    borderRadius: Colors.dark.buttons.round,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: "100%",
    marginTop: 20,
    shadowOffset: { width: 2, height: 1 },
    shadowColor: "#444a",
  },
  textBtn: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
  },
});
