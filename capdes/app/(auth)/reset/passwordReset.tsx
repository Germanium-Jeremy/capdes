import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import globalStyles from '@/app/Styles/MainStyles'
import { ThemeContext } from '@/context/ThemeContext'

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const passwordReset = () => {
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
               start={{ x: 0, y: 0 }} end={{ x: width, y: height }} style={styles.container}
          >
               <View style={{ position: 'relative' }}>
                    <Text style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', marginTop: 40, color: theme.textColor }}>Reset Password</Text>
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
                    <Text style={{ fontSize: 18, color: theme.textColor }}>Reset <Text style={{ fontSize: 20, fontWeight: 700 }}>CAPDES</Text> password</Text>

                    <View style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 40 }}>
                              <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                   <Text style={{ fontSize: 18, color: theme.textColor }}>New Password</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="key-outline" size={25} color={theme.textColor} />
                                        <TextInput placeholder="xxxxxxxx" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.textColor} />
                                   </View>
                              </View>
                              
                              <View style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 20 }}>
                                   <Text style={{ fontSize: 18, color: theme.textColor }}>Confirm Password</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="key-outline" size={25} color={theme.textColor} />
                                        <TextInput placeholder="xxxxxxx" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.textColor} />
                                   </View>
                              </View>

                              <TouchableOpacity style={[styles.buttons, { marginTop: 30 }]}>
                                   <Text style={styles.textBtn}>Reset</Text>
                              </TouchableOpacity>
                         </View>
               </LinearGradient>
          </LinearGradient>
     )
}

export default passwordReset

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          container: {
               flex: 1,
               paddingTop: 25,
          },
          buttons: {
               backgroundColor: theme.mainColor,
               color: theme.textColor,
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
               color: colorScheme !== "light" ? "#212F42" : "white",
          },
          formFields: {
               borderRightWidth: 0,
               borderLeftWidth: 0,
               borderTopWidth: 0,
               borderBottomWidth: 2,
               borderColor: theme.textColor,
               display: 'flex',
               alignItems: 'center',
               flexDirection: 'row',
               gap: 1,
          },
     });
}