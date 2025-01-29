import { Stack } from "expo-router";

export default function AuthLayout() {
     return (
          <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name="index" />
               <Stack.Screen name="login" />
               <Stack.Screen name="signup" />
               <Stack.Screen name="choose" />
               <Stack.Screen name="mechanic" />
               <Stack.Screen name="garage" />
               <Stack.Screen name="getCode" />
               <Stack.Screen name="code" />
               <Stack.Screen name="reset" />
               <Stack.Screen name="TermsOfServices" />
          </Stack>
     )
}