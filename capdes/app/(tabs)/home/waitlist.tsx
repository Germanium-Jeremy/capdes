import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { blue } from 'react-native-reanimated/lib/typescript/Colors'

const waitlist = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Text style={[allStyles.normalText, { fontSize: 20 }]}>Waitlist</Text>
               <View style={styles.allList}>
                    <View style={[styles.mechanic, { borderColor: theme.text }]}>
                         <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.mechanicImg} />
                         <View style={{ gap: 0, width: '30%' }}>
                              <Text style={{ fontSize: 12, color: theme.text }}>Full names</Text>
                              <Text style={{ fontSize: 12, color: theme.text }}>email</Text>
                              <Text style={{ fontSize: 12, color: theme.text }}>Phone number</Text>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                   <Text style={{ color: theme.links, fontSize: 12 }}>Approve</Text>
                                   <Text style={{ color: theme.links, fontSize: 12 }}>Decline</Text>
                              </View>
                         </View>
                    </View>
               </View>
          </SafeAreaView>
     )
}

export default waitlist

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
     },
     allList: {
          gap: 10,
          paddingVertical: 20,
     },
     mechanic: {
          borderRadius: 100,
          borderWidth: 1,
          paddingVertical: 5,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
     },
     mechanicImg: {
          width: 50,
          height: 50,
          borderRadius: 100,
     }
})