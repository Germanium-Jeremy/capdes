import { Stack } from "expo-router";

export default function SettingLayout () {
     return (
          <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name="index" />
               <Stack.Screen name="updateUser" />
               <Stack.Screen name="ChangePassword" />
               <Stack.Screen name="AboutApp" />
               <Stack.Screen name="HelpSupport" />
          </Stack>
     )
}