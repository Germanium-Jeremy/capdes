import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const Footer = () => {
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });

     return (
          <View style={styles.footer}>
               <Pressable onPress={() => router.push('/(authenticated)')}>
                    <Ionicons name='home' size={25} color={"white"} />
               </Pressable>
               <Pressable onPress={() => router.push('/(authenticated)/phone')}>
                    <Ionicons name='call' size={25} color={"white"} />
               </Pressable>
          </View>
     )
}

export default Footer

function createStyles({ theme }: StyleProps) {
     return StyleSheet.create({
          footer: {
               backgroundColor: theme.mainHeaderColor,
               height: 40,
               justifyContent: "space-evenly",
               alignItems: 'center',
               display: 'flex',
               flexDirection: 'row',
               paddingHorizontal: 30,
               position: 'fixed',
               bottom: 0,
               right: 0,
               left: 0,
               zIndex: 5,
          },
     })
}