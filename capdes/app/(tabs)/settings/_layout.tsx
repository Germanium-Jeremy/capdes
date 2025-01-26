import { Stack } from "expo-router";

export default function SettingLayout () {
     return (
          <Stack>
               <Stack.Screen name="index" options={{ headerTitle: "Settings", headerShown: false }} />
               <Stack.Screen name="updateUser" options={{ headerTitle: "Change Your data" }} />
          </Stack>
     )
}