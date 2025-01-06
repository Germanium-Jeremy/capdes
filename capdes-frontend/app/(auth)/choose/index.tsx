import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

const index = () => {
     const { width, height } = Dimensions.get('window')
     return (
          <LinearGradient colors={[
               Colors.dark.background.first,
               Colors.dark.background.second,
               Colors.dark.background.third,
          ]}
               start={{ x: 0, y: 0 }} end={{ x: width, y: height }} style={[styles.container, { padding: 20 }]}
          >

               <View style={{ position: 'relative' }}>
                    <Text style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', marginTop: 40 }}>Register</Text>
                    <Image source={require('../../../assets/images/Design3.png')} resizeMode="contain" style={{ width: 50, height: 50, position: 'absolute', top: 10, right: 10 }} />
               </View>

               <View style={{ display: "flex", flex: 1, flexDirection: "column", gap: 10, marginTop: 40, justifyContent: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: 200 }}>Are you a garage or company owner or You are a mechanic who works at the garage.</Text>

                    <Text style={{ fontSize: 18, fontWeight: 200 }}>We require this info to know how to manage the business and your staff.</Text>

                    <TouchableOpacity style={[styles.buttons, { marginTop: 30 }]} onPress={() => router.push("/(auth)/mechanic")}>
                         <Text style={styles.textBtn}>Mechanic</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.buttons, { marginTop: 30 }]} onPress={() => router.push("/(auth)/garage")}>
                         <Text style={styles.textBtn}>Owner</Text>
                    </TouchableOpacity>
               </View>
          </LinearGradient>
     )
}

export default index

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