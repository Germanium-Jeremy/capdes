import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [loggedInUser, setLoggedInUser] = useState(null)

  const checkIfUserIsLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem("savedUser")
      if (userData) {
        setLoggedInUser(JSON.parse(userData))
      } else {
        setLoggedInUser(null)
      }
    } catch (e) {
      console.error("Error getting logged In user ", e)
    }
  }

  useEffect(() => {
    checkIfUserIsLoggedIn();

    console.log(loggedInUser)
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <SettingsProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
          </Stack>
          <StatusBar style="auto" />
        </SettingsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
