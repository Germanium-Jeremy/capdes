import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const index = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })

     const [isLang, setIsLang] = useState(false)
     
     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <View style={{ alignItems: 'center' }}>
                    <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.profileImage} />
                    <Text style={{ color: theme.text, fontSize: 16, fontWeight: 500 }}>Username for User</Text>
               </View>

               <Text style={{ color: theme.text, fontSize: 20, fontWeight: 500, marginTop: 20 }}>Account Settings</Text>
               <View style={styles.settingsDiv}>
                    <Pressable style={[styles.setting]} onPress={() => router.push('/(tabs)/settings/updateUser')}>
                         <Ionicons name='person' size={28} color={theme.icons} />
                         <Text style={{ color: theme.text, fontSize: 16 }}>Personal Information</Text>
                         <FontAwesome name='chevron-right' size={20} color={theme.icons} style={styles.left} />
                    </Pressable>
                    <Pressable style={[styles.setting]} onPress={() => router.push('/(tabs)/settings/AboutApp')}>
                         <Ionicons name='person' size={28} color={theme.icons} />
                         <Text style={{ color: theme.text, fontSize: 16 }}>About Our App</Text>
                         <FontAwesome name='chevron-right' size={20} color={theme.icons} style={styles.left} />
                    </Pressable>
                    <Pressable style={[styles.setting]} onPress={() => router.push('/(tabs)/settings/HelpSupport')}>
                         <Ionicons name='person' size={28} color={theme.icons} />
                         <Text style={{ color: theme.text, fontSize: 16 }}>Help and Support</Text>
                         <FontAwesome name='chevron-right' size={20} color={theme.icons} style={styles.left} />
                    </Pressable>
                    <Pressable style={[styles.setting]} onPress={(e) => { e.preventDefault(); setIsLang(!isLang) }}>
                         <Ionicons name='person' size={28} color={theme.icons} />
                         <Text style={{ color: theme.text, fontSize: 16 }}>Language</Text>
                         <FontAwesome name='chevron-right' size={20} color={theme.icons} style={styles.left} />
                         {isLang && <View style={[styles.lang, { borderColor: theme.text, backgroundColor: theme.background }]}>
                              <Text>Kinyarwanda</Text>
                              <Text>English</Text>
                         </View> }
                    </Pressable>
               </View>
          </SafeAreaView>
     )
}

export default index

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 10,
          justifyContent: 'center',
     },
     profileImage: {
          width: 80,
          height: 80,
          borderRadius: 30,
          alignSelf: 'center',
     },
     settingsDiv: {
          gap: 10,
          position: 'relative',
     },
     setting: {
          flexDirection: 'row',
          alignItems: 'center',
          shadowOffset: {
               width: 0,
               height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3,
          shadowColor: '#aaa',
          elevation: 2,
          paddingHorizontal: 20,
          paddingVertical: 10,
          position: 'relative',
          gap: 20,
     },
     left: {
          position: 'absolute',
          right: 20,
     },
     lang: {
          position: 'absolute',
          right: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderWidth: 1,
          top: 50,
     },
})