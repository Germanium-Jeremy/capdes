import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContect } from '@/Contexts/UserContext'
import { ROOT_API } from '@/Contexts/API'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'

interface Document {
     uri: string;
     name: string;
     mimeType: string | undefined;
}

const garage = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     const { userId } = useContext(UserContect)

     const [garageName, setGarageName] = useState<string>('')
     const [garageLocation, setGarageLocation] = useState<string>('')
     const [garageNumber, setGarageNumber] = useState<string>('')
     const [garageLicences, setGarageLicences] = useState<Document | null>(null)
     const [garageRegProof, setGarageRegProof] = useState<Document | null>(null)
     const [startTime, setStartTime] = useState<string>('')
     const [endTime, setEndTime] = useState<string>('')

     const [garageLoading, setGarageLoading] = useState(false)
     const [garageError, setGarageError] = useState('')

     const ActivityContainer = () => {
          if (garageLoading) return <ActivityIndicator />
          
          return (
               <Pressable style={allStyles.buttons} onPress={handleRegisterGarage}>
                    <Text style={allStyles.buttonText}>Finish</Text>
               </Pressable>
          );
     }

     const handleRegisterGarage = async () => {
          setGarageLoading(true)
          setGarageError('')

          const requestFinish = {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ garageName, owner: userId, location: garageLocation, tel: garageNumber,
                    license: "This is a license", registrationProof: "This is a proof", workingTime: `${startTime}-${endTime}`
                    // license: JSON.stringify(garageLicences), registrationProof: garageRegProof, workingTime: { startTime, endTime }
               })
          };

          try {
               const response = await fetch(`${ROOT_API}/registerGarage`, requestFinish);

               if (!response.ok) {
                    const errorResponse = await response.json()
                    console.error("Error response: ", errorResponse)
                    setGarageError(errorResponse.message)
                    return
               }

               const responseJson = await response.json()
               console.log("Successfully registered garage: ", responseJson)

               router.push('/(tabs)/home')
          } catch (error) {
               setGarageError("An unexpected error occured")
               console.error('Error Creating Garage: ', error)
          } finally {
               setGarageLoading(false)
          }
     }

     const pickDoc = async (type: 'license' | 'registration') => {
          try {
               const result = await DocumentPicker.getDocumentAsync({
                    type: 'application/pdf',
                    copyToCacheDirectory: true
               })

               console.log(result)

               if (result.canceled) {
                    console.warn("File canceled: ", result);
                    return
               } else {
                    const selectedDoc: Document = {
                         uri: result.assets[0].uri,
                         name: result.assets[0].name,
                         mimeType: result.assets[0].mimeType
                    }

                    type === "license" ? setGarageLicences(selectedDoc) : setGarageRegProof(selectedDoc)
               }
          } catch (error) {
               console.error("Unable to get file: ", error)
          }
     }

     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />

               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Garage</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Please fill in the info of your garage or company.</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center', paddingVertical: 10, color: 'red', fontWeight: 500 }]}>{ garageError }</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='Garage Name' placeholderTextColor={theme.formInputsPlaceholders} style={[allStyles.inputs, { color: theme.formInputsTxt }]} value={garageName} onChangeText={setGarageName} />
                    <TextInput placeholder='Garage Location' placeholderTextColor={theme.formInputsPlaceholders} style={[allStyles.inputs, { color: theme.formInputsTxt }]} value={garageLocation} onChangeText={setGarageLocation} />
                    <TextInput placeholder='Garage Phone Number' placeholderTextColor={theme.formInputsPlaceholders} style={[allStyles.inputs, { color: theme.formInputsTxt }]} value={garageNumber} onChangeText={setGarageNumber} />
                    <Pressable style={[allStyles.inputs, { alignItems: 'flex-start' }]} onPress={() => pickDoc('license')}><Text style={{ color: theme.formInputsTxt}}>{garageLicences ? <Text>Selected File: { garageLicences.name }</Text> : "Garage Licences" }</Text></Pressable>
                    <Pressable style={[allStyles.inputs, { alignItems: 'flex-start' }]} onPress={() => pickDoc('registration')}><Text style={{ color: theme.formInputsTxt}}>{garageRegProof ? <Text>Selected File: { garageRegProof.name }</Text> : "Garage Registration Proof" }</Text></Pressable>
                    <View style={[allStyles.inputs, { flexDirection: 'row', alignItems: 'center' }]}>
                         <View style={{ flexDirection: 'row', width: '50%', gap: 20, paddingHorizontal: 5 }}>
                              <Text style={{ color: theme.formInputsTxt,  }}>Start</Text>
                              <TextInput value={startTime} style={{ color: theme.formInputsTxt }} onChangeText={setStartTime} placeholder='12:12 PM' />
                         </View>
                         <View style={{ flexDirection: 'row', width: '50%', gap: 20, paddingHorizontal: 5 }}>
                              <Text style={{ color: theme.formInputsTxt,  }}>End</Text>
                              <TextInput value={endTime} style={{ color: theme.formInputsTxt }} onChangeText={setEndTime} placeholder='13:45 PM' />
                         </View>
                    </View>
               </View>

               <View style={styles.interations}>
                    <ActivityContainer />
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