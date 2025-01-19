import globalStyles from "@/app/Styles/MainStyles";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import CustomCheckbox from "@/app/Styles/CustomCheckBox";
import { ThemeContext } from "@/context/ThemeContext";

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const { width, height } = Dimensions.get("window");

export default function SignupScreen() {
     const [isSelected, setIsSelected] = useState(false)
     const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     const globalStyle = globalStyles({ theme, colorScheme })

     const termsOfServices = <Text style={{ color: theme.secondTextColor }}>Agree to our <Link href={'/'} style={{ color: theme.mainColor }}>terms of services</Link> and <Link href={'/'} style={{ color: theme.mainColor }}>privacy policies</Link> </Text>
     const isMechanicOrOwner = <Text style={{ color: theme.secondTextColor }}>Do you have a job as a mechanic for any garage or own a garage?</Text>

     const handleToggle = () => {
          setIsSelected((prev) => !prev);
     };

     return (
          <ScrollView style={{ flex: 1 }}>
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
                         <Text style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', marginTop: 40, color: theme.secondTextColor }}>Sign up</Text>
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
                         <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Create a <Text style={{ fontSize: 20, fontWeight: 700 }}>CAPDES</Text> account</Text>
                         <View style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 40 }}>
                              <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                   <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Full names</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="person" size={25} color={theme.secondTextColor} />
                                        <TextInput  placeholder="John Doe" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                                   </View>
                              </View>

                              <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                   <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Email</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="mail" size={25} color={theme.secondTextColor} />
                                        <TextInput placeholder="email@example.dom" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                                   </View>
                              </View>
                              
                              <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                   <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Password</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="key" size={25} color={theme.secondTextColor} />
                                        <TextInput  placeholder="my password" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                                   </View>
                              </View>

                              <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                   <Text style={{ fontSize: 18, color: theme.secondTextColor }}>Telephone</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="call" size={25} color={theme.secondTextColor} />
                                        <TextInput  placeholder="+250 790 000 000" placeholderTextColor={colorScheme === 'light' ? '#444a' : '#aaaa'} style={globalStyle.formInputs} />
                                        <Ionicons name="checkmark" size={25} color={theme.secondTextColor} />
                                   </View>
                              </View> 

                              <View style={{ display: 'flex', flexDirection: 'column' }}>
                                   <CustomCheckbox isChecked={isSelected} onToogle={handleToggle}  label={termsOfServices} />
                                   <CustomCheckbox isChecked={isSelected} onToogle={handleToggle} label={isMechanicOrOwner} />
                              </View> 

                              <Link href={'/(auth)/login'} style={{ color: theme.mainColor, textAlign: 'center', fontSize: 18, marginTop: 10 }}>Have an account?</Link>

                              <TouchableOpacity style={[styles.buttons, { marginVertical: 20 }]}>
                                   <Text style={styles.textBtn}>Sign up</Text>
                              </TouchableOpacity>
                         </View>
                    </LinearGradient>
               </LinearGradient>
               <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : '#0000', position: 'fixed', bottom: -100, left: -100, top: -100, width: 400, zIndex: -1, right: 0, borderRadius: '100%' }}></View>
               <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : "#0000", position: 'fixed', bottom: -80, left: -70, right: -20, height: 200, zIndex: -1, borderRadius: '100%' }}></View>
          </ScrollView>
     )
}

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          container: {
               flex: 1,
               height: height,
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