import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
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

interface CustomHeader {
     title: string
}

const Header: React.FC<CustomHeader> = ({ title = "Header" }) => {
     const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     const navigate = useNavigation()

     // title === 'Home' ? setIsHome(true) : setIsHome(false)

     return (
          <View style={styles.header}>
               { title !== 'Home' && <Pressable onPress={() => navigate.goBack()}>
                    <Ionicons name='arrow-back' size={25} color={"white"} />
               </Pressable> }
               
               <Text style={styles.headerTitle}>{title}</Text>
               {/* <Text style={styles.headerTitle}>User</Text> */}
               <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                    <Pressable onPress={() => router.push('/(authenticated)/notifications')}>
                         <Ionicons name='notifications' size={25} color={"white"} />
                    </Pressable>
                    <Pressable onPress={() => router.push('/(authenticated)/settings')}>
                         <Ionicons name='settings' size={25} color={"white"} />
                    </Pressable>
               </View>
          </View>
     )
}

export default Header

function createStyles({ theme }: StyleProps) {
     return StyleSheet.create({
          header: {
               backgroundColor: theme.mainHeaderColor,
               height: 45,
               justifyContent: "space-between",
               alignItems: 'center',
               display: 'flex',
               flexDirection: 'row',
               paddingHorizontal: 30,
               marginTop: 25,
          },
          headerTitle: {
               color: "white",
               fontSize: 18,
               fontWeight: 'bold',
          }
     })
}