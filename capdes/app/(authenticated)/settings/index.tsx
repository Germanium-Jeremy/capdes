import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import Header from '../../../components/ui/Header';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ToggleButton from '@/app/Styles/ToggleButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsContext } from '@/context/SettingsContext';

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const SettingsScreen = () => {
     const { width, height } = Dimensions.get('window')
     const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
     const { locationTracking, notifyOverApps, contactsAccess, saveLocationTracking, saveNotifyOverApps, saveContactsAccess } = useContext(SettingsContext);
     const styles = createStyles({ theme, colorScheme });

     const handleToggleChange = (value: boolean, setting: 'locationTracking' | 'notifyOverApps' | 'contactsAccess') => {
          switch (setting) {
               case 'locationTracking':
                    saveLocationTracking(value);
                    break
               case 'contactsAccess':
                    saveContactsAccess(value);
                    break
               case 'notifyOverApps':
                    saveNotifyOverApps(value);
                    break
               default:
                    break
          }
     }

     const saveTheme = async (theme: 'light' | 'dark' | 'custom') => {
          try {
               await AsyncStorage.setItem("savedTheme", theme)
               console.log("Theme saved successfully")
          } catch (error) {
               console.error('Error saving theme', error)
          }
     }

     const clearCache = async () => {
          try {
               await AsyncStorage.clear()
               console.log("Cache cleared successfully")
          } catch (error) {
               console.error('Error clearing cache ', error)
          }
     }

     const saveThemeChange = async (theme: 'light' | 'dark' | 'custom') => {
          await saveTheme(theme)
          setColorScheme(theme)
     }

     return (
          <>
               <Stack.Screen options={{ headerShown: true, header: () => <Header title='Settings' /> }} />
               <LinearGradient colors={[
                         theme.background.first,
                         theme.background.second,
                         theme.background.third,
                    ]}
                    start={{ x: 0, y: 0 }} end={{ x: width, y: height }} style={styles.container}
               >
                    <Text style={{ color: theme.secondTextColor, fontSize: 18, fontWeight: 600, textAlign: 'center', marginVertical: 30 }}>Change Theme</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                         <Pressable style={{ width: 80, height: 80, borderWidth: 2, borderColor: '#55FFFF', borderRadius: '100%' }} onPress={() => saveThemeChange('dark')}>
                              <View style={{ width: '100%', height: '100%', borderWidth: 7, borderColor: '#333F60', borderRadius: '100%', overflow: 'hidden' }}>
                                   <LinearGradient colors={["#888FAA", "#444F66"]} start={{ x: 0, y: 0}} end={{ x: 70, y: 70 }} style={{ flex: 1 }}></LinearGradient>
                              </View>
                         </Pressable>

                         <Pressable style={{ width: 80, height: 80, borderWidth: 2, borderColor: '#FFF', borderRadius: '100%' }} onPress={() => saveThemeChange('light')}>
                              <View style={{ width: '100%', height: '100%', borderWidth: 7, borderColor: 'black', borderRadius: '100%', overflow: 'hidden' }}>
                                   <LinearGradient colors={["#111", "#FF8800"]} start={{ x: 0, y: 0}} end={{ x: 70, y: 70 }} style={{ flex: 1 }}></LinearGradient>
                              </View>
                         </Pressable>

                         <Pressable style={{ width: 80, height: 80, borderWidth: 2, borderColor: '#4400AA', borderRadius: '100%' }} onPress={() => saveThemeChange('custom')}>
                              <View style={{ width: '100%', height: '100%', borderWidth: 7, borderColor: '#660099', borderRadius: '100%', overflow: 'hidden' }}>
                                   <LinearGradient colors={["#FFF", "#660099"]} start={{ x: 0, y: 0}} end={{ x: 70, y: 70 }} style={{ flex: 1 }}></LinearGradient>
                              </View>
                         </Pressable>
                    </View>

                    <View style={{ backgroundColor: `${theme.background.third}`, padding: 30, marginTop: 20, position: 'absolute', bottom: 0, width: '100%' }}>
                         <Text style={{ color: theme.secondTextColor, fontSize: 20, fontWeight: 600, textAlign: 'center' }}>Adjust Settings</Text>
                         <View style={{ borderBottomColor: colorScheme === 'dark' ? 'white' : 'black', borderBottomWidth: 1, flexDirection: 'row', gap: 20, marginTop: 40, alignItems: 'center', paddingBottom: 10 }}>
                              <Ionicons name='location' size={50} color={theme.mainIconColor} />
                              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                   <Text style={{ fontWeight: 400, fontSize: 18, marginBottom: 10, color: theme.secondTextColor }}>Disable Location Tracking</Text>
                                   <ToggleButton initialValue={locationTracking} onValueChange={(value) => handleToggleChange(value, 'locationTracking')} />
                              </View>
                         </View>

                         {/* <View style={{ borderBottomColor: colorScheme === 'dark' ? 'white' : 'black', borderBottomWidth: 1, flexDirection: 'row', gap: 20, marginTop: 30, alignItems: 'center', paddingBottom: 5 }}>
                              <Ionicons name='notifications' size={50} color={theme.mainIconColor} />
                              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                   <Text style={{ fontWeight: 400, fontSize: 18, marginBottom: 10, color: theme.secondTextColor }}>Notofy Over Other Apps</Text>
                                   <ToggleButton initialValue={notifyOverApps} onValueChange={(value) => handleToggleChange(value, 'notifyOverApps')} />
                              </View>
                         </View> */}

                         <View style={{ borderBottomColor: colorScheme === 'dark' ? 'white' : 'black', borderBottomWidth: 1, flexDirection: 'row', gap: 20, marginTop: 30, alignItems: 'center', paddingBottom: 10 }}>
                              <AntDesign name='contacts' size={50} color={theme.mainIconColor} />
                              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                   <Text style={{ fontWeight: 400, fontSize: 18, marginBottom: 10, color: theme.secondTextColor }}>Allow Access To Contacts</Text>
                                   <ToggleButton initialValue={contactsAccess} onValueChange={(value) => handleToggleChange(value, 'contactsAccess')} />
                              </View>
                         </View>

                         <View style={{ flexDirection: 'row', gap: 20, marginTop: 10, alignItems: 'center', paddingBottom: 5 }}>
                              <Ionicons name='trash' size={50} color={theme.mainIconColor} />
                              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                   <Text style={{ fontWeight: 400, fontSize: 18, marginBottom: 10, color: theme.secondTextColor }}>Disable Location Tracking</Text>
                                   <Pressable style={styles.buttons} onPress={clearCache}>
                                        <Text style={styles.textBtn}>Clear Cache</Text>
                                   </Pressable>
                              </View>
                         </View>
                    </View>
                    <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : '#0000', position: 'fixed', bottom: -100, left: -100, top: -100, width: 400, zIndex: -1, right: 0, borderRadius: '100%' }}></View>
                    <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : "#0000", position: 'fixed', bottom: -80, left: -70, right: -20, height: 200, zIndex: -1, borderRadius: '100%' }}></View>
               </LinearGradient>
          </>
     )
}

export default SettingsScreen

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
               borderColor: theme.textColor,
               display: 'flex',
               alignItems: 'center',
               flexDirection: 'row',
               gap: 1,
          },
     });
}