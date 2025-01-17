import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/ThemeContext';
import globalStyles from '@/app/Styles/MainStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import Header from '../../../components/ui/Header';
import { Ionicons } from '@expo/vector-icons';

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const Phone = () => {
     const { width, height } = Dimensions.get('window')
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     const globalStyle = globalStyles({ theme, colorScheme })

     return (
          <>
               <Stack.Screen options={{ header: () => <Header title='Call' /> }} />
               <LinearGradient colors={[
                         theme.background.first,
                         theme.background.second,
                         theme.background.third,
                    ]}
                    start={{ x: 0, y: 0 }} end={{ x: width, y: height }} style={[styles.container, { padding: 20 }]}
               >
                    <View style={{ alignSelf: 'center', width: '100%', height: 200, marginVertical: 20 }}>
                         <Image source={require('@/assets/images/LandingImg1.png')} resizeMode='cover' style={{ width: '100%', height: '100%', borderWidth: 2 }} />
                    </View>

                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                         <Pressable style={styles.buttons}>
                              <Text style={styles.textBtn}>Chat</Text>
                         </Pressable>
                         <Pressable style={styles.buttons}>
                              <Text style={styles.textBtn}>Call</Text>
                         </Pressable>
                    </View>

                    <View style={{ flexDirection: 'column', gap: 10, marginTop: 50 }}>
                         <View style={styles.formFields}>
                              <Ionicons name="person" size={25} color={theme.secondTextColor} />
                              <Text style={globalStyle.formInputs}>This is a mechanic</Text>
                         </View>
                         
                         <View style={styles.formFields}>
                              <Ionicons name="home" size={25} color={theme.secondTextColor} />
                              <Text style={globalStyle.formInputs}>This is a mechanic</Text>
                         </View>

                         <View style={styles.formFields}>
                              <Ionicons name="call" size={25} color={theme.secondTextColor} />
                              <Text style={globalStyle.formInputs}>This is a mechanic</Text>
                         </View>

                         <View style={styles.formFields}>
                              <Ionicons name="logo-whatsapp" size={25} color={theme.secondTextColor} />
                              <Text style={globalStyle.formInputs}>This is a mechanic</Text>
                         </View>
                    </View>
               </LinearGradient>
          </>
     )
}

export default Phone

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
     })
}