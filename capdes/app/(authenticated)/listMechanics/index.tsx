import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import Header from '@/components/ui/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '@/components/ui/Footer';

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const index = () => {
     const { width, height } = Dimensions.get('window')
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     
     return (
          <>
          <Stack.Screen options={{ headerShown: true, header: () => <Header title='Mechanics and Garages' />}} />
          <LinearGradient colors={[
                    theme.background.first,
                    theme.background.second,
                    theme.background.third,
               ]}
               start={{ x: 0, y: 0 }}
               end={{ x: width, y: height }}
               style={styles.container}>
               
               <View style={styles.searchContainer}>
                    <Ionicons color={theme.secondIconColor} size={20} name='search' />
                    <TextInput placeholder='Search Garage or Mechanic' placeholderTextColor={colorScheme === 'dark' ? '#ddda' : '#222a'} style={styles.searchInput} />
               </View>
               
               <Text style={styles.someTitles}>Available Mechanics</Text>
               <View style={styles.flatListContainer}>
                    <View style={styles.mechanic}>
                         <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.mechanicImg} />
                         <View style={styles.mechanicText}>
                              <Text style={styles.mechanicValues}>Mechanic: Ngwije Imbaraga</Text>
                              <Text style={styles.mechanicValues}>Phone: 250 788 888 888</Text>
                              <Text style={styles.mechanicValues}>Whatsapp: 250 788 888 888</Text>
                              <Text style={styles.mechanicValues}>Garage: Certain Garage</Text>
                         </View>
                    </View>
                    <View style={styles.mechanic}>
                         <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.mechanicImg} />
                         <View style={styles.mechanicText}>
                              <Text style={styles.mechanicValues}>Mechanic: Ngwije Imbaraga</Text>
                              <Text style={styles.mechanicValues}>Phone: 250 788 888 888</Text>
                              <Text style={styles.mechanicValues}>Whatsapp: 250 788 888 888</Text>
                              <Text style={styles.mechanicValues}>Garage: Certain Garage</Text>
                         </View>
                    </View>
               </View>
               
               <Text style={styles.someTitles}>Available Garages</Text>
               <View style={styles.flatListContainer}>
                    <View style={styles.mechanic}>
                         <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.mechanicImg} />
                         <View style={styles.mechanicText}>
                              <Text style={styles.mechanicValues}>Mechanic: Ngwije Imbaraga</Text>
                              <Text style={styles.mechanicValues}>Phone: 250 788 888 888</Text>
                              <Text style={styles.mechanicValues}>Whatsapp: 250 788 888 888</Text>
                              <Text style={styles.mechanicValues}>Garage: Certain Garage</Text>
                         </View>
                    </View>
                    <View style={styles.mechanic}>
                         <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.mechanicImg} />
                         <View style={styles.mechanicText}>
                              <Text style={styles.mechanicValues}>Mechanic: Ngwije Imbaraga</Text>
                              <Text style={styles.mechanicValues}>Phone: 250 788 888 888</Text>
                              <Text style={styles.mechanicValues}>Whatsapp: 250 788 888 888</Text>
                              <Text style={styles.mechanicValues}>Garage: Certain Garage</Text>
                         </View>
                    </View>
               </View>
               <Footer />
               <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : '#0000', position: 'fixed', bottom: -100, left: -100, top: -100, width: 400, zIndex: -1, right: 0, borderRadius: '100%' }}></View>
               <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : "#0000", position: 'fixed', bottom: -80, left: -70, right: -20, height: 200, zIndex: -1, borderRadius: '100%' }}></View>
          </LinearGradient>
          </>
     )
}

export default index

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          container: {
               flex: 1,
               paddingTop: 25,
               padding: 20,
               overflow: 'hidden'
          },
          searchContainer: {
               borderColor: theme.mainColor,
               borderWidth: 2,
               padding: 5,
               borderRadius: theme.mainRadius,
               backgroundColor: theme.background.second,
               flexDirection: 'row',
               gap: 10,
               alignItems: 'center',
          },
          searchInput: {
               borderWidth: 0,
               borderColor: 'transparent',
               color: theme.secondTextColor,
               width: '100%',
               padding: 3,
          },
          someTitles: {
               fontSize: 20,
               fontWeight: 500,
               color: theme.secondTextColor,
               marginVertical: 10,
               marginTop: 20,
          },
          flatListContainer: {
               flexDirection: 'column',
               gap: 5,
          },
          mechanic: {
               flexDirection: 'row',
               gap: 5,
               paddingHorizontal: 15,
               paddingVertical: 5,
               alignItems: 'center',
               borderRadius: theme.mainRadius,
               shadowColor: theme.secondTextColor,
               shadowOffset: {
                    width: 0,
                    height: 2,
               },
               shadowOpacity: 0.5,
               shadowRadius: 3.84,
          },
          mechanicImg: {
               width: 60,
               height: 60,
               borderWidth: 3,
               borderColor: theme.mainColor,
               borderRadius: '100%',
          },
          mechanicText: {
               flexDirection: 'column',
               gap: 2,
               textAlign: 'left',
               paddingLeft: 10,
          },
          mechanicValues: {
               color: theme.secondTextColor,
               fontSize: 12,
               fontWeight: 400,
          },
     })
}