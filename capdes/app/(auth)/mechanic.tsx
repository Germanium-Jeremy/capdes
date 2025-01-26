import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'

const mechanic = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />
                              
               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Mechanic</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 20, textAlign: 'center' }]}>We require the following info to get you working.</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='Garage Name' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Garage Location' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
               </View>

               <View style={styles.interations}>
                    <Pressable style={allStyles.buttons}>
                         <Text style={allStyles.buttonText}>Finish</Text>
                    </Pressable>
               </View>
          </SafeAreaView>
     )
}

export default mechanic

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          justifyContent: 'center',
          gap: 30,
     },
     image: {
          width: 70,
          height: 70,
          alignSelf: 'center'
     },
     intro: {
          gap: 0,
          alignItems: 'center',
          marginVertical: 10,
     },
     interations: {
          marginTop: 20,
     },
})