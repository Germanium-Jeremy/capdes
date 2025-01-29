import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { Link } from 'expo-router'

const Details = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <Image source={require('@/assets/images/Design2.png')} resizeMode='contain' style={styles.userImage} />

               <View style={{ gap: 10 }}>
                    <Text style={[allStyles.inputs, { color: theme.formInputsTxt }]}>Mechanic or Garage Names</Text>
                    <Text style={[allStyles.inputs, { color: theme.formInputsTxt }]}>Email or Location</Text>
                    <Text style={[allStyles.inputs, { color: theme.formInputsTxt }]}>Contacts Info</Text>
               </View>

               <View style={styles.interations}>
                    <Pressable style={allStyles.buttons}>
                         <Text style={allStyles.buttonText}>Call</Text>
                    </Pressable>
                    <Pressable style={allStyles.buttons}>
                         <Text style={allStyles.buttonText}>Chat</Text>
                    </Pressable>
                    <Pressable style={[allStyles.buttons, { marginTop: 20 }]}>
                         <Text style={allStyles.buttonText}>Report</Text>
                    </Pressable>
               </View>
          </SafeAreaView>
     )
}

export default Details

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 10,
          justifyContent: 'center',
     },
     userImage: {
          width: 120,
          height: 120,
          alignSelf: 'center',
          borderRadius: 30,
     },
     interations: {
          gap: 10,
          marginTop: 20,
     },
})