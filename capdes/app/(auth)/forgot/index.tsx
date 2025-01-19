import { View, Text, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ThemeContext } from '@/context/ThemeContext'
import globalStyles from '@/app/Styles/MainStyles'

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
          <View style={{ flex: 1 }}>
               <LinearGradient colors={[
                         theme.background.first,
                         theme.background.second,
                         theme.background.third,
                    ]}
                    start={{ x: 0, y: 0 }} end={{ x: width, y: height }} style={styles.container}
               >
                    <View style={{ position: 'relative' }}>
                         <Text style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', marginTop: 40, color: theme.secondTextColor }}>Forgot Password</Text>
                         <Image source={colorScheme === 'light' ? require('../../../assets/images/Design3.png') : require('../../../assets/images/Design.png')} resizeMode="contain" style={{ width: 50, height: 50, position: 'absolute', top: 10, right: 10 }} />
                    </View>

                    <LinearGradient colors={[
                              theme.background.first,
                              theme.background.second,
                              theme.background.third,
                         ]}
                         start={{ x: 0, y: 0 }}
                         end={{ x: width, y: height }}
                         style={[styles.container, { marginTop: 20, padding: 25, paddingTop: 40, borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}
                    >
                         <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Reset <Text style={{ fontSize: 20, fontWeight: 700 }}>CAPDES</Text> password</Text>

                         <View style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 40 }}>
                              <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                   <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Email</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="mail" size={25} color={theme.secondTextColor} />
                                        <TextInput placeholder="email@example.dom" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                                   </View>
                              </View>

                              <TouchableOpacity style={[styles.buttons, { marginTop: 30 }]}>
                                   <Text style={styles.textBtn}>Get Code</Text>
                              </TouchableOpacity>
                         </View>
                         
                         <View style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 40 }}>
                              <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                   <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Enter code</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="code-working" size={25} color={theme.secondTextColor} />
                                        <TextInput placeholder="xxxxx" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                                   </View>
                              </View>

                              <TouchableOpacity style={[styles.buttons, { marginTop: 30 }]} onPress={() => router.push("/(auth)/reset/passwordReset")}>
                                   <Text style={styles.textBtn}>Verify</Text>
                              </TouchableOpacity>
                         </View>
                    </LinearGradient>
               </LinearGradient>
               <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : '#0000', position: 'fixed', bottom: -100, left: -100, top: -100, width: 400, zIndex: -1, right: 0, borderRadius: '100%' }}></View>
               <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : "#0000", position: 'fixed', bottom: -80, left: -70, right: -20, height: 200, zIndex: -1, borderRadius: '100%' }}></View>
          </View>
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