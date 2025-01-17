import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import globalStyles from '@/app/Styles/MainStyles'
import { ThemeContext } from '@/context/ThemeContext'

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const index = () => {
     const { width, height } = Dimensions.get('window')
     const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     const globalStyle = globalStyles({ theme, colorScheme })

     return (
          <LinearGradient colors={[
                    theme.background.first,
                    theme.background.second,
                    theme.background.third,
          ]}
               start={{ x: 0, y: 0 }} end={{ x: width, y: height }} style={[styles.container, { padding: 20 }]}
          >

               <View style={{ position: 'relative' }}>
                    <Text style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', marginTop: 40, color: theme.secondTextColor }}>Register</Text>
                    <Image source={colorScheme === 'light' ? require('../../../assets/images/Design3.png') : require('../../../assets/images/Design.png')} resizeMode="contain" style={{ width: 50, height: 50, position: 'absolute', top: 10, right: 10 }} />
               </View>

               <View style={{ display: "flex", flex: 1, flexDirection: "column", gap: 10, marginTop: 40, justifyContent: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: 200, color: theme.secondTextColor }}>Are you a garage or company owner or You are a mechanic who works at the garage.</Text>

                    <Text style={{ fontSize: 18, fontWeight: 200, color: theme.secondTextColor }}>We require this info to know how to manage the business and your staff.</Text>

                    <TouchableOpacity style={[styles.buttons, { marginTop: 30 }]} onPress={() => router.push("/")}>
                         <Text style={styles.textBtn}>Mechanic</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.buttons, { marginTop: 30 }]} onPress={() => router.push("/")}>
                         <Text style={styles.textBtn}>Owner</Text>
                    </TouchableOpacity>
               </View>
          </LinearGradient>
     )
}

export default index

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          container: {
               flex: 1,
               paddingTop: 25,
          },
          buttons: {
               backgroundColor: theme.mainColor,
               color: theme.secondTextColor,
               borderRadius: theme.mainRadius,
               paddingVertical: 8,
               paddingHorizontal: 20,
               width: "100%",
               marginTop: 10,
               shadowOffset: { width: 2, height: 1 },
               shadowColor: theme.mainIconColor
          },
          textBtn: {
               fontSize: 20,
               fontWeight: 500,
               textAlign: "center",
               color: colorScheme === "light" ? "#212F42" : "white",
          },
          formFields: {
               borderRightWidth: 0,
               borderLeftWidth: 0,
               borderTopWidth: 0,
               borderBottomWidth: 2,
               borderColor: theme.secondTextColor,
               display: 'flex',
               alignItems: 'center',
               flexDirection: 'row',
               gap: 1,
          },
     });
}