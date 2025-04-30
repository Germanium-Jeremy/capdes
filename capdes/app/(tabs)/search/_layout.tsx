import { Stack } from "expo-router"

const SearchLayout = () => {
     return (
          <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name="index" />
               <Stack.Screen name="chat" />
               <Stack.Screen name="report" />
               <Stack.Screen name="Details" />
          </Stack>
     )
}

export default SearchLayout