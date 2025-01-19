import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { ThemeContext } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import FormSend from '../../../components/ui/formSend';

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
               <Stack.Screen options={{ headerShown: true, header: () => <Header title='Chat' /> }} />
               <LinearGradient colors={[
                         theme.background.first,
                         theme.background.second,
                         theme.background.third,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: width, y: height }}
                    style={styles.container}>
                    <View style={styles.flatListContainer}>
                         <View style={[styles.chat]}>
                              <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.profile} />
                              <Text style={styles.message}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque quam earum aut ab cumque, veritatis repudiandae placeat ea, libero officia quis? Accusantium voluptas corrupti ad repudiandae, est animi ab at.</Text>
                              <Text style={styles.sentAt}>12 2 3232</Text>
                         </View>
                         <View style={[styles.chat]}>
                              <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.profile} />
                              <Text style={styles.message}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque quam earum aut ab cumque, veritatis repudiandae placeat ea, libero officia quis? Accusantium voluptas corrupti ad repudiandae, est animi ab at.</Text>
                              <Text style={styles.sentAt}>34 43 1212</Text>
                         </View>
                    </View>

                    <FormSend />

                    <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : '#0000', position: 'fixed', bottom: -100, left: -100, top: -100, width: 400, right: 0, borderRadius: '100%', zIndex: -1 }}></View>
                    <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : "#0000", position: 'fixed', bottom: -80, left: -70, right: -20, height: 200, borderRadius: '100%', zIndex: -1 }}></View>
               </LinearGradient>

               <Footer />
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
          chat: {
               borderRadius: theme.mainRadius,
               position: 'relative',
               shadowColor: `${theme.secondTextColor}8`,
               shadowOffset: {
                    width: 0,
                    height: 2,
               },
               shadowOpacity: 0.5,
               shadowRadius: 3.84,
               paddingHorizontal: 20,
               paddingVertical: 10,
               justifyContent: 'center',
               gap: 20,
               minHeight: 50,
          },
          chatM: {
               backgroundColor: `${theme.background.first}aa`,
          },
          chatN: {
               backgroundColor: theme.background.first,
          },
          profile: {
               width: 20,
               height: 20,
               borderRadius: '100%',
               borderWidth: 1,
               borderColor: theme.mainColor,
               position: 'absolute',
               top: 5,
               right: 5,

          },
          flatListContainer: {
               flexDirection: 'column',
               gap: 10,
          },
          sentAt: {
               position: 'absolute',
               right: 5,
               bottom: 5,
               color: theme.secondTextColor
          },
          message: {
               paddingBottom: 20,
               color: theme.secondTextColor,
          }
     })
}