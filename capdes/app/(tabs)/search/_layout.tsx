import { Stack } from "expo-router"

const SearchLayout = () => {
     return (
          <Stack>
               <Stack.Screen name="index" options={{ headerTitle: "Settings", headerShown: false }} />
          </Stack>
     )
}

export default SearchLayout