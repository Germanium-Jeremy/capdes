import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { ThemeContext } from '@/context/ThemeContext'
import globalStyles from '@/app/Styles/MainStyles'
import { Link, Stack } from 'expo-router'
import Header from '../../components/ui/Header'
import axios from 'axios'

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const index = () => {
     const { width, height } = Dimensions.get('window')
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     const globalStyle = globalStyles({ theme, colorScheme })
     const backendUrl = "https://capdes-production.up.railway.app";

     const handlePress = () => {
          axios.get(`${backendUrl}/api`).then(response => {
               console.log(response.data)
          }).catch(error => console.info(error))
     }

     return (
          <>
          <Stack.Screen options={{ header: () => <Header title='Home' />}} />
          <LinearGradient colors={[
                    theme.background.first,
                    theme.background.second,
                    theme.background.third,
               ]}
               start={{ x: 0, y: 0 }} end={{ x: width, y: height }} style={[styles.container, { padding: 20 }]}
          >
               <View style={{ position: 'relative', width: 150, height: 150, alignSelf: "center" }}>
                    <Image source={require("../../assets/images/MaleUser.png")} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                    <Pressable style={{ position: 'absolute', top: 20, right: 5 }}>
                         <Ionicons name='add-circle' size={30} color={"black"} />
                    </Pressable>
               </View>

               <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 20 }}>
                         <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Full names</Text>
                         <View style={styles.formFields}>
                              <Ionicons name="person" size={25} color={theme.secondTextColor} />
                              <TextInput  placeholder="John Doe" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                              <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                         </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 10 }}>
                         <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Email</Text>
                         <View style={styles.formFields}>
                              <Ionicons name="mail" size={25} color={theme.secondTextColor} />
                              <TextInput  placeholder="email@example.dom" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                              <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                         </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 10 }}>
                         <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Telephone</Text>
                         <View style={styles.formFields}>
                              <Ionicons name="call" size={25} color={theme.secondTextColor} />
                              <TextInput  placeholder="250 788 888 888" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                              <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                         </View>
                    </View>
                    
                    <Link href={'/(auth)/reset/passwordReset'} style={{ color: theme.linkColor, fontSize: 18, textAlign: "center", marginTop: 20 }}>Change Password</Link>
               </View>

               <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginTop: 30 }}>
                    <Pressable style={styles.buttons} onPress={handlePress}>
                         <Text style={styles.textBtn}>Update</Text>
                    </Pressable>
                    <Pressable style={styles.buttons}>
                         <Text style={styles.textBtn}>Delete Account</Text>
                    </Pressable>
               </View>
          </LinearGradient>
          </>
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
               width: "45%",
               marginTop: 10,
               shadowOffset: { width: 2, height: 1 },
               shadowColor: theme.mainIconColor
          },
          textBtn: {
               fontSize: 18,
               fontWeight: 500,
               textAlign: "center",
               color: colorScheme === "dark" ? "#111" : "white",
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