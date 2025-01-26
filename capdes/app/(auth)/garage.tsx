import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'

const garage = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />

               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Garage</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Please fill in the info of your garage or company.</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='Garage Name' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Garage Location' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Garage Licences' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Garage Registration Proof' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <View style={[allStyles.inputs, { flexDirection: 'row', alignItems: 'center' }]}>
                         <View style={{ flexDirection: 'row', width: '50%', gap: 20, paddingHorizontal: 5 }}>
                              <Text style={{ color: theme.formInputsTxt,  }}>Start</Text>
                              <TextInput value='12:22 PM' />
                         </View>
                         <View style={{ flexDirection: 'row', width: '50%', gap: 20, paddingHorizontal: 5 }}>
                              <Text style={{ color: theme.formInputsTxt,  }}>End</Text>
                              <TextInput value='12:22 PM' />
                         </View>
                    </View>
               </View>

               <View style={styles.interations}>
                    <Pressable style={allStyles.buttons}>
                         <Text style={allStyles.buttonText}>Finish</Text>
                    </Pressable>
               </View>
          </SafeAreaView>
     )
}

export default garage

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
          gap: 2,
          alignItems: 'center',
     },
     interations: {
          gap: 5,
     },
})