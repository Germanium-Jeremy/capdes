import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface ToggleBtnProps {
     initialValue: boolean
     onValueChange: (value: boolean) => void
}

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const ToggleButton: React.FC<ToggleBtnProps> = ({ initialValue, onValueChange }) => {
     const [isOn, setIsOn] = useState(initialValue)
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });

     const handleToggle = () => {
          setIsOn(!isOn)
          onValueChange(!isOn)
     }
     return (
          <TouchableOpacity style={[styles.container, isOn ? styles.containerOn : styles.containerOff]} onPress={handleToggle}>
               <View style={[styles.thumb, isOn ? styles.thumbOn : styles.thumbOff]}></View>
          </TouchableOpacity>
     )
}

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          container: {
               width: 50,
               height: 30,
               borderRadius: 15,
               padding: 3,
               justifyContent: 'center',
          },
          containerOn: {
               backgroundColor: theme.mainColor,
          },
          containerOff: {
               backgroundColor: theme.textColor,
          },
          thumb: {
               width: 24,
               height: 24,
               borderRadius: 12,
               backgroundColor: colorScheme === 'light' ? '#EEF' : colorScheme === 'dark' ? '#333F55' : '#AAA'
          },
          thumbOn: {
               alignSelf: 'flex-end',
          },
          thumbOff: {
               alignSelf: 'flex-start',
          },
     });
}

export default ToggleButton;