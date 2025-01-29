import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <View style={[styles.notification, { borderColor: theme.formInputsPlaceholders }]}>
                    <Image source={require('@/assets/images/Design2.png')} resizeMode='contain' style={styles.notificationImage} />
                    <Text style={{ color: theme.text, fontSize: 12, paddingBottom: 10 }}>This is a notification from our service. This is a notification from our service.</Text>
                    <Text style={{ position: 'absolute', bottom: 5, right: 30 }}>Now</Text>
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
     },
     notification: {
          borderRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
          borderWidth: 1,
          gap: 10,
     },
     notificationImage: {
          width: 30,
          height: 30,
          borderRadius: '50%',
     }
})