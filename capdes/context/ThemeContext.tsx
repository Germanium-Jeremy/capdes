import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextValue {
     colorScheme: 'light' | 'dark' | 'custom'
     setColorScheme: (scheme: 'light' | 'dark' | 'custom') => void
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom
}

export const ThemeContext = createContext<ThemeContextValue>({
     colorScheme: 'light',
     setColorScheme: () => { },
     theme: Colors.light
})

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children, }) => {
     const [colorScheme, setColorScheme] = useState<"light" | "dark" | "custom">("dark")

     const theme = colorScheme == 'dark' ? Colors.dark : colorScheme === 'light' ? Colors.light : Colors.custom

     const getSavedTheme = async () => {
          try {
               const savedTheme = await AsyncStorage.getItem("savedTheme")
               if (savedTheme) {
                    setColorScheme(savedTheme as 'light' | 'dark' | 'custom');
               } else {
                    setColorScheme(Appearance.getColorScheme() || "light");
               }
          } catch (error) {
               console.error("Theme getting error: ", error)
          }
     }

     useEffect(() => {
          getSavedTheme()
     }, [])

     return (
          <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
               { children }
          </ThemeContext.Provider>
     )
}