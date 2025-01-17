import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";
import { useContext } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

export default function LandingScreen() {
     const { width, height } = Dimensions.get('window')
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     
     return (
          <>
          {/* <Stack.Screen options={{ headerShown: false }} /> */}
          <LinearGradient colors={[
                    theme.background.first,
                    theme.background.second,
                    theme.background.third,
               ]}
               start={{ x: 0, y: 0 }}
               end={{ x: width, y: height }}
               style={styles.container}>
               <LinearGradient colors={[theme.headerStartBg.first, theme.headerStartBg.second, theme.headerStartBg.third]} style={styles.intro}>
                    <Text style={{ color: "#FFF", fontSize: 16, fontWeight: 600 }}>WELCOME TO</Text>
                    <Text style={{ color: "#FFF", fontSize: 35, fontWeight: 700 }}>CA.P.DE.S</Text>
                    <Text style={{ color: "#FFF", fontSize: 15, fontWeight: 500 }}>Your solution for Car Problems on the go.</Text>
                    <Image source={colorScheme === 'light' ? require('../../assets/images/Design3.png') : require('../../assets/images/Design.png')} style={{ width: 50, height: 50, position: "absolute", top: 10, right: 10 }} resizeMode="contain" />
               </LinearGradient>
               <Image source={require('../../assets/images/LandingImg1.png')} style={{ height: 250, width: '100%' }} resizeMode="cover" />
               <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' ,gap: 10, padding: 10, paddingTop: 20 }}>
                    <View style={{ backgroundColor: theme.footerBg, padding: 10, borderRadius: theme.mainRadius, width: '47%' }}>
                         <Text style={{ color: '#FFF', fontSize: 20 }}>CAPDES</Text>
                         <Text style={{ color: '#FFF', textAlign: 'center', marginTop: 5 }}>CA.P.DE.S solution for car problems.</Text>
                    </View>
                    <View style={{ backgroundColor: theme.footerBg, padding: 10, borderRadius: theme.mainRadius, width: '47%' }}>
                         <Text style={{ color: '#FFF', fontSize: 20 }}>CAPDES</Text>
                         <Text style={{ color: '#FFF', textAlign: 'center', marginTop: 5 }}>Car problem detection on the go.</Text>
                    </View>
               </View>

               <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' ,gap: 10, padding: 10, paddingTop: 0 }}>
                    <TouchableOpacity style={styles.buttons} onPress={() => router.push('/(auth)/login')}>
                         <Text style={styles.textBtn}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={() => router.push('/(auth)/signup')}>
                         <Text style={styles.textBtn}>Register</Text>
                    </TouchableOpacity>
               </View>
               <TouchableOpacity style={[styles.buttons, { alignSelf: 'center', width: '50%' }]} onPress={() => router.push('/(authenticated)/listMechanics')}>
                    <Text style={styles.textBtn}>Got a Problem</Text>
               </TouchableOpacity>
          </LinearGradient>
          </>
     );
}

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          container: {
               flex: 1,
               paddingTop: 25,
          },
          intro: {
               display: "flex",
               flexDirection: "column",
               color: "#FFF",
               padding: 20,
               position: 'relative',
          },
          buttons: {
               backgroundColor: theme.mainColor,
               color: theme.textColor,
               borderRadius: theme.mainRadius,
               paddingVertical: 8,
               paddingHorizontal: 20,
               width: "47%",
               marginTop: 10,
               shadowOffset: { width: 2, height: 1 },
               shadowColor: theme.mainIconColor,
          },
          textBtn: {
               fontSize: 20,
               fontWeight: 500,
               textAlign: "center",
               color: colorScheme === "light" ? "black" : "white",
          },
     });
}