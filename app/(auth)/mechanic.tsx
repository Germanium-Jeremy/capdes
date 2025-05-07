import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContect } from '@/Contexts/UserContext'
import { ROOT_API } from '@/Contexts/API'
import { router } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown'
import { AntDesign } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

const mechanic = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     const { userId } = useContext(UserContect)
     
     const [garageList, setGarageList] = useState<any>([])
     const [garageListLoading, setGarageListLoading] = useState(false)
     
     const [garageId, setGarageId] = useState(garageList[0]?._id)
     const [garageLocation, setGarageLocation] = useState('Garage Location')
     const [finishLoading, setFinishLoading] = useState(false)
     const [mechanicError, setMechanicError] = useState('')

     const ActivityContainer = () => {
          if (finishLoading) return <ActivityIndicator />

          return (
               <Pressable style={allStyles.buttons} onPress={handleRegisterMechanic}>
                    <Text style={allStyles.buttonText}>Finish</Text>
               </Pressable>
          );
     }

     useEffect(() => {
          getGarages()
     }, [])
     
     const ActivityContainer2 = () => {
          if (garageListLoading) return <ActivityIndicator />

          return (<>
               <Picker selectedValue={garageId} onValueChange={(itemValue, itemIndex) => {
                    console.log("Garage Value: ", itemValue)
                        const selectedGarage = garageList[itemIndex];
                        setGarageId(selectedGarage._id);
                        setGarageLocation(selectedGarage.location);
                    }}
                    style={[allStyles.inputs, { color: theme.formInputsTxt }]}
               >
                    {garageList.map((garage: any) => (
                        <Picker.Item key={garage._id} label={garage.garageName} value={garage._id} />
                    ))}
               </Picker>
               <Text style={[allStyles.inputs, { color: theme.formInputsTxt }]}>{ garageLocation}</Text>
               </>
          );
     }

     const getGarages = async () => {
          setGarageListLoading(true)

          try {
               const response = await fetch(`${ROOT_API}/garages`, { headers: { "Content-Type": "application/json" } });

               if (!response.ok) {
                    const errorResponse = await response.json();
                    console.log("Error fetching garages: ", errorResponse);
                    setMechanicError(errorResponse.message);
                    return;
               }

               const responseJson = await response.json();
               setGarageList(responseJson);
               setGarageId(responseJson[0]?._id)
               setGarageLocation(responseJson[0]?.location)
          } catch (error) {
               setMechanicError("An unexpected error occured");
               console.error("Error Signing Up: ", error);
          } finally {
               setGarageListLoading(false)
          }
     }

     const handleRegisterMechanic = async () => {
          setFinishLoading(true)
          setMechanicError('')

          const requestFinish = {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ garageId, userId }),
          };

          try {
               const response = await fetch(`${ROOT_API}/registerMechanic`, requestFinish);

               if (!response.ok) {
                    const errorResponse = await response.json()
                    console.log("ERROR APPLYING TO A GARAGE: ", errorResponse);
                    setMechanicError(errorResponse.message)
                    return
               }

               const responseJson = await response.json()
               console.log(responseJson)
               router.push('/(auth)/login')
          } catch (error) {
               setMechanicError("An unexpected error occured");
               console.error("Error Signing Up: ", error);
          } finally {
               setFinishLoading(false)
          }
     }

     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />
                              
               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Mechanic</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 20, textAlign: 'center' }]}>We require the following info to get you working.</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center', paddingVertical: 10, color: 'red', fontWeight: 500 }]}>{ mechanicError }</Text>
               </View>

               <ActivityContainer2 />

               <View style={styles.interations}>
                    <ActivityContainer />
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

     dropdown: {
          borderColor: 'gray',
          borderWidth: 0.5,
          borderRadius: 8,
          paddingHorizontal: 8,
     },
     icon: {
          marginRight: 5,
     },
     label: {
          position: 'absolute',
          backgroundColor: 'white',
          left: 22,
          top: 8,
          zIndex: 999,
          paddingHorizontal: 8,
          fontSize: 14,
     },
     placeholderStyle: {
          fontSize: 16,
     },
     selectedTextStyle: {
          fontSize: 16,
     },
     iconStyle: {
          width: 20,
          height: 20,
     },
     inputSearchStyle: {
          height: 40,
          fontSize: 16,
     },
})