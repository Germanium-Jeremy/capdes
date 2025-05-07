import { Image, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const AboutApp = () => {
     const { colorScheme, theme, setColorScheme } = useContext(ThemeContext);
     const allStyles = AllStyles({ theme, colorScheme })

     const [themeSelected, setThemeSelected] = useState(false)
     
     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <View style={{ justifyContent: 'center', gap: 20 }}>
                    <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.profileImage} />
               </View>

               <View style={styles.settingsDiv}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderColor: theme.text, paddingVertical: 10, paddingHorizontal: 20, gap: 20, marginTop: 20 }}>
                         <MaterialCommunityIcons name='palette-outline' size={28} color={theme.icons} />
                         <View style={{ flexDirection: 'column' }}>
                              <Text style={{ color: theme.text, fontSize: 16 }}>Change Theme</Text>
                              <Switch value={themeSelected} onValueChange={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')} />
                         </View>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderColor: theme.text, paddingVertical: 10, paddingHorizontal: 20, gap: 20, marginTop: 20 }}>
                         <Ionicons name='location' size={28} color={theme.icons} />
                         <View style={{ flexDirection: 'column' }}>
                              <Text style={{ color: theme.text, fontSize: 16 }}>Location Tracking</Text>
                              <Switch value={themeSelected} onValueChange={() => setThemeSelected(!themeSelected)} />
                         </View>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderColor: theme.text, paddingVertical: 10, paddingHorizontal: 20, gap: 20, marginTop: 20 }}>
                         <MaterialCommunityIcons name='contacts' size={28} color={theme.icons} />
                         <View style={{ flexDirection: 'column' }}>
                              <Text style={{ color: theme.text, fontSize: 16 }}>Access Contacts</Text>
                              <Switch value={themeSelected} onValueChange={() => setThemeSelected(!themeSelected)} />
                         </View>
                    </View>
                    
                    <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 20, gap: 20, marginTop: 20 }}>
                         <Ionicons name='trash' size={28} color={theme.icons} />
                         <View style={{ flexDirection: 'column' }}>
                              <Text style={{ color: theme.text, fontSize: 16, marginBottom: 10 }}>Clear Cache</Text>
                              <Pressable style={allStyles.buttons}>
                                   <Text style={allStyles.buttonText}>Clear Cache</Text>
                              </Pressable>
                         </View>
                    </View>
               </View>
          </SafeAreaView>
     )
}

export default AboutApp

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 10,
          justifyContent: 'center',
     },
     profileImage: {
          width: 120,
          height: 120,
          borderRadius: 20,
          alignSelf: 'center',
     },
     settingsDiv: {
          gap: 10,
     },
})