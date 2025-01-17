import globalStyles from "@/app/Styles/MainStyles";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useContext } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const LoginScreen = () => {
     const { width, height } = Dimensions.get('window')
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     const globalStyle = globalStyles({ theme, colorScheme })

     return (
          <View style={{ flex: 1 }}>
               <LinearGradient colors={[
                         theme.background.first,
                         theme.background.second,
                         theme.background.third,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: width, y: height }}
                    style={styles.container}
               >
                    <View style={{ position: 'relative' }}>
                         <Text style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', marginTop: 40, color: theme.secondTextColor }}>Login</Text>
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
                         <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Welcome to <Text style={{ fontSize: 20, fontWeight: 700 }}>CAPDES</Text></Text>
                         <View style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 40 }}>
                              <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                   <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Email</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="mail" size={25} color={theme.secondTextColor} />
                                        <TextInput placeholder="email@example.dom" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                                   </View>
                              </View>
                              
                              <View style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 30 }}>
                                   <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Password</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="key" size={25} color={theme.secondTextColor} />
                                        <TextInput  placeholder="my password" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                                   </View>
                              </View>

                              <Link href={'/(auth)/forgot'} style={{ color: theme.mainColor, textAlign: 'center', fontSize: 18, marginTop: 30 }}>Forgot Password?</Link>
                              <Link href={'/(auth)/signup'} style={{ color: theme.mainColor, textAlign: 'center', fontSize: 18, marginTop: 30 }}>Don't have an account?</Link>

                              <TouchableOpacity style={[styles.buttons, { marginTop: 30 }]}>
                                   <Text style={styles.textBtn}>Log in</Text>
                              </TouchableOpacity>
                         </View>
                    </LinearGradient>
               </LinearGradient>
          </View>
     )
}

export default LoginScreen

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