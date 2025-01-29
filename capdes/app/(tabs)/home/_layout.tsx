import { Stack } from "expo-router"

const HomeLayout = () => {
     return (
          <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name="index" />
               <Stack.Screen name="mechanic" />
               <Stack.Screen name="owner" />
               <Stack.Screen name="waitlist" />
               <Stack.Screen name="allMechs" />
               <Stack.Screen name="Record" />
          </Stack>
     )
}

export default HomeLayout