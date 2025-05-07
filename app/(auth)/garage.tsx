import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContect } from '@/Contexts/UserContext'
import { ROOT_API } from '@/Contexts/API'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import districts from '@/assets/data/locations'
import { Picker } from '@react-native-picker/picker'
import { CountryPicker } from 'react-native-country-codes-picker'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

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
     const [district, setDistrict] = useState('')
     const [sector, setSector] = useState('')

     const [garageNumber, setGarageNumber] = useState<string>('')
     const [show, setShow] = useState(false)
     const [countryCode, setCountryCode] = useState('+20')

     const [garageLicences, setGarageLicences] = useState<Document | null>(null)
     const [garageRegProof, setGarageRegProof] = useState<Document | null>(null)

     const [startTime, setStartTime] = useState('')
     const [endTime, setEndTime] = useState('')

     const [garageLoading, setGarageLoading] = useState(false)
     const [garageError, setGarageError] = useState('')
     const sectors = districts.find(d => d.district === district)?.sectors || [];

     const ActivityContainer = () => {
          if (garageLoading) return <ActivityIndicator />
          
          return (
               <Pressable style={allStyles.buttons} onPress={handleRegisterGarage}>
                    <Text style={allStyles.buttonText}>Finish</Text>
               </Pressable>
          );
     }

    const validateTime = (time: string) => {
      const regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/; // HH:mm format
      return regex.test(time);
    };

     const handleStartTimeChange = (text: string) => {
          setStartTime(text);
          if (!validateTime(text)) {
               setGarageError('Start time must be in HH:mm format');
          } else {
               setGarageError(''); // Clear error if valid
          }
     };

     const handleEndTimeChange = (text: string) => {
          setEndTime(text);
          if (!validateTime(text)) {
               setGarageError('End time must be in HH:mm format');
          } else {
               setGarageError(''); // Clear error if valid
          }
     };


     const handleRegisterGarage = async () => {
          setGarageLoading(true)
          setGarageError('')

          const requestFinish = {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ garageName, owner: userId, location: district + ", " + sector, tel: countryCode + garageNumber,
                    license: JSON.stringify(garageLicences), registrationProof: JSON.stringify(garageRegProof), workingTime: { from: startTime, to: endTime }
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

                    <View style={[allStyles.inputs, { flexDirection: 'row', gap: 10, justifyContent: 'space-between', paddingVertical: 0 }]}>
                         <Picker style={[styles.picker, { color: theme.formInputsTxt, borderWidth: 0 }]} selectedValue={district} onValueChange={(dist) => { setDistrict(dist); setSector('') }}>
                              <Picker.Item label='Select District' value={''} />
                              {districts.map((district) => (<Picker.Item key={district.district} label={district.district} value={district.district} />))}
                         </Picker>
                         <Picker style={[styles.picker, { color: theme.formInputsTxt, borderWidth: 0 }]} selectedValue={sector} onValueChange={(sect) => setSector(sect)} enabled={sectors.length > 0}>
                              <Picker.Item label='Select Sector' value={''} />
                              {sectors.map((sector) => (<Picker.Item key={sector} label={sector} value={sector} />))}
                         </Picker>
                    </View>

                    <View style={[allStyles.inputs, { flexDirection: 'row', gap: 10, paddingVertical: 0 }]}>
                         <Pressable onPress={() => setShow(true)}>
                              <Text style={{ color: theme.text, fontSize: 16 }}>{ countryCode }</Text>
                         </Pressable>
                         
                         <CountryPicker lang='en' show={show} pickerButtonOnPress={(item) => {
                              setCountryCode(item.dial_code)
                              setShow(false)
                         }} style={{
                              modal: {
                                   height: 500, backgroundColor: theme.background, paddingHorizontal: 30,
                              }, line: {
                                   backgroundColor: theme.text
                              }, textInput: {
                                   paddingHorizontal: 20, color: theme.formInputsTxt, backgroundColor: theme.background, borderRadius: 100,
                                   borderWidth: 1, borderColor: theme.formInputsPlaceholders, fontSize: 15,
                              },
                              countryButtonStyles: {
                                   borderRadius: 100, borderWidth: 1, borderColor: theme.formInputsPlaceholders, backgroundColor: theme.background,
                              },
                              dialCode: {
                                   color: theme.text,
                              },
                              countryName: {
                                   color: theme.text,
                              },
                              }} initialState='+20' />
                         <TextInput placeholder='00000000' placeholderTextColor={theme.formInputsPlaceholders} style={{ width: '100%', paddingVertical: 10, color: theme.text }} value={garageNumber} onChangeText={setGarageNumber} />
                    </View>

                    <Pressable style={[allStyles.inputs, { alignItems: 'flex-start' }]} onPress={() => pickDoc('license')}><Text style={{ color: theme.formInputsTxt}}>{garageLicences ? <Text>Selected File: { garageLicences.name }</Text> : "Garage Licences" }</Text></Pressable>
                    <Pressable style={[allStyles.inputs, { alignItems: 'flex-start' }]} onPress={() => pickDoc('registration')}><Text style={{ color: theme.formInputsTxt}}>{garageRegProof ? <Text>Selected File: { garageRegProof.name }</Text> : "Garage Registration Proof" }</Text></Pressable>
                    <View style={[allStyles.inputs, { flexDirection: 'row', alignItems: 'center' }]}>

                         <View style={{ flexDirection: 'row', width: '50%', gap: 20, paddingHorizontal: 5 }}>
                              <Text style={{ color: theme.formInputsTxt, }}>Start</Text>
                              <TextInput placeholder='(HH:mm)' placeholderTextColor={theme.formInputsPlaceholders} style={{ color: theme.formInputsTxt, width: '80%' }} value={startTime} onChangeText={handleStartTimeChange} />
                         </View>
                         <View style={{ flexDirection: 'row', width: '50%', gap: 20, paddingHorizontal: 5 }}>
                              <Text style={{ color: theme.formInputsTxt, }}>End</Text>
                              <TextInput placeholder='(HH:mm)' placeholderTextColor={theme.formInputsPlaceholders} style={{ color: theme.formInputsTxt, width: '80%' }} value={endTime} onChangeText={handleEndTimeChange} />
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
     picker: {
          width: '50%',
          paddingHorizontal: 10,
          paddingVertical: 10,
          fontSize: 16,
     }
})