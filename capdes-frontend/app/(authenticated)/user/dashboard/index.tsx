import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

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
               <View style={{ position: 'relative', width: 200, height: 200, alignSelf: "center" }}>
                    <Image source={require("../../../../assets/images/MaleUser.png")} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                    <Pressable style={{ position: 'absolute', top: 20, right: 20 }}>
                         <Ionicons name='add-circle' size={30} color={"black"} />
                    </Pressable>
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