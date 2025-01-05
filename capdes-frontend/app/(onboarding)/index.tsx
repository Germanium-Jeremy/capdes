import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LandingScreen() {
     const { width, height } = Dimensions.get('window')
     return (
          <View style={{ flex: 1 }}>
               <LinearGradient
                    colors={[
                         Colors.dark.background.first,
                         Colors.dark.background.second,
                         Colors.dark.background.third,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: width, y: height }}
                    style={styles.container}
               >
                    <View style={styles.intro}>
                         <Text style={{ color: "#FFF", fontSize: 16, fontWeight: 600 }}>WELCOME TO</Text>
                         <Text style={{ color: "#FFF", fontSize: 35, fontWeight: 700 }}>CA.P.DE.S</Text>
                         <Text style={{ color: "#FFF", fontSize: 15, fontWeight: 500 }}>Your solution for Car Problems on the go.</Text>
                         <Image source={require('../../assets/images/Design3.png')} style={{ width: 50, height: 50, position: "absolute", top: 10, right: 10 }} resizeMode="contain" />
                    </View>
                    <Image source={require('../../assets/images/LandingImg1.png')} style={{ height: 250 }} resizeMode="cover" />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' ,gap: 10, padding: 10, paddingTop: 20 }}>
                         <View style={{ backgroundColor: '#000', padding: 10, borderRadius: 5, width: '47%' }}>
                              <Text style={{ color: '#FFF', fontSize: 20 }}>CAPDES</Text>
                              <Text style={{ color: '#FFF', textAlign: 'center', marginTop: 5 }}>CA.P.DE.S solution for car problems.</Text>
                         </View>
                         <View style={{ backgroundColor: '#000', padding: 10, borderRadius: 5, width: '47%' }}>
                              <Text style={{ color: '#FFF', fontSize: 20 }}>CAPDES</Text>
                              <Text style={{ color: '#FFF', textAlign: 'center', marginTop: 5 }}>Car problem detection on the go.</Text>
                         </View>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' ,gap: 10, padding: 10, paddingTop: 0 }}>
                         <TouchableOpacity style={styles.buttons} onPress={() => router.push('/(auth)/login')}>
                              <Text style={styles.textBtn}>Login</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.buttons} onPress={() => router.push('/(auth)/signup')}>
                              <Text style={styles.textBtn}>Register</Text>
                         </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.buttons, { alignSelf: 'center', width: '50%' }]}>
                         <Text style={styles.textBtn}>Got a Problem</Text>
                    </TouchableOpacity>
               </LinearGradient>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     intro: {
          display: "flex",
          flexDirection: "column",
          color: "#FFF",
          padding: 20,
          backgroundColor: '#000',
          position: 'relative',
     },
     buttons: {
          backgroundColor: Colors.dark.buttons.background,
          color: Colors.dark.buttons.text,
          borderRadius: Colors.dark.buttons.round,
          paddingVertical: 8,
          paddingHorizontal: 20,
          width: "47%",
          marginTop: 10,
          shadowOffset: { width: 2, height: 1 },
          shadowColor: "#444a"
     },
     textBtn: {
          fontSize: 20,
          fontWeight: 500,
          textAlign: "center",
     },
});