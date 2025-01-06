import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from '@/app/Styles/MainStyles'

const passwordReset = () => {
     const { width, height } = Dimensions.get('window')
     return (
          <LinearGradient colors={[
                    Colors.dark.background.first,
                    Colors.dark.background.second,
                    Colors.dark.background.third,
               ]}
               start={{ x: 0, y: 0 }} end={{ x: width, y: height }} style={styles.container}
          >
               <View style={{ position: 'relative' }}>
                    <Text style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', marginTop: 40 }}>Reset Password</Text>
                    <Image source={require('../../../assets/images/Design3.png')} resizeMode="contain" style={{ width: 50, height: 50, position: 'absolute', top: 10, right: 10 }} />
               </View>

               <LinearGradient colors={[
                         Colors.dark.background.first,
                         Colors.dark.background.second,
                         Colors.dark.background.third,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: width, y: height }}
                    style={[styles.container, { marginTop: 20, padding: 25, paddingTop: 40, borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}
               >
                    <Text style={{ fontSize: 18 }}>Reset <Text style={{ fontSize: 20, fontWeight: 700 }}>CAPDES</Text> password</Text>

                    <View style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 40 }}>
                              <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                   <Text style={{ fontSize: 18 }}>New Password</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="key-outline" size={25} />
                                        <TextInput placeholder="xxxxxxxx" placeholderTextColor={'#555'} style={globalStyles.formInputs} />
                                        <Ionicons name="checkmark" size={25} />
                                   </View>
                              </View>
                              
                              <View style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 20 }}>
                                   <Text style={{ fontSize: 18 }}>Confirm Password</Text>
                                   <View style={styles.formFields}>
                                        <Ionicons name="key-outline" size={25} />
                                        <TextInput placeholder="xxxxxxx" placeholderTextColor={'#555'} style={globalStyles.formInputs} />
                                        <Ionicons name="checkmark" size={25} />
                                   </View>
                              </View>

                              <TouchableOpacity style={[styles.buttons, { marginTop: 30 }]}>
                                   <Text style={styles.textBtn}>Reset</Text>
                              </TouchableOpacity>
                         </View>
               </LinearGradient>
          </LinearGradient>
     )
}

export default passwordReset

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     buttons: {
          backgroundColor: Colors.dark.buttons.background,
          color: Colors.dark.buttons.text,
          borderRadius: Colors.dark.buttons.round,
          paddingVertical: 8,
          paddingHorizontal: 20,
          width: "100%",
          marginTop: 10,
          shadowOffset: { width: 2, height: 1 },
          shadowColor: "#444a"
     },
     textBtn: {
          fontSize: 20,
          fontWeight: 500,
          textAlign: "center",
     },
     formFields: {
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 2,
          display: 'flex',
          alignItems: 'center', 
          flexDirection: 'row',
          gap: 1,
     },
});