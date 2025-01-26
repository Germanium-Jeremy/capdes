import { Colors } from "@/constants/Colors"
import { createContext, ReactNode, useState } from "react"

interface ThemeContextValue {
     colorScheme: 'light' | 'dark'
     setColorScheme: (scheme: 'light' | 'dark') => void
     theme: typeof Colors.light | typeof Colors.dark
}

export const ThemeContext = createContext<ThemeContextValue>({
     colorScheme: 'light',
     setColorScheme: () => { },
     theme: Colors.light
})

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const [colorScheme, setColorScheme] = useState<"light" | "dark">("light")
     const theme = colorScheme === 'dark' ? Colors.dark : Colors.light
     return (
          <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
               { children }
          </ThemeContext.Provider>
     )
}