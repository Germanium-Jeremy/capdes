import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const FormSend = () => {
     const [message, setMessage] = useState('Random text')
     const { width, height } = Dimensions.get('window')
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     
     return (
          <View style={{ width: '100%', height: 70, position: 'absolute', bottom: 40, right: 0, left: 0, paddingHorizontal: 10, paddingVertical: 5 }}>
               <View style={styles.form}>
                    <Ionicons name='attach' size={25} color={theme.mainIconColor} />
                    <TextInput placeholder='Message Mechanic' placeholderTextColor={colorScheme === 'dark' ? '#aaaa' : '#222a'} style={styles.textInput} defaultValue={message} onChangeText={newMessage => setMessage(newMessage)} />
                    <Ionicons name='send' size={25} color={theme.mainIconColor} />
               </View>
          </View>
     )
}

export default FormSend

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          form: {
               padding: 10,
               flexDirection: 'row',
               alignItems: 'center',
               borderWidth: 1,
               borderColor: theme.secondIconColor,
               height: '100%',
               borderRadius: theme.mainRadius,
               justifyContent: 'space-between',
               gap: 10,
               backgroundColor: theme.background.first,
          },
          placeholder: {
               color: colorScheme === 'dark' ? '#aaaa' : '#222a',
               fontSize: 16,
               fontWeight: 400,

          },
          textInput: {
               fontSize: 15,
               fontWeight: 300,
               outline: 'none',
               width: '100%',
               paddingVertical: 5,
               paddingHorizontal: 10,
               color: theme.secondTextColor,
               flexWrap: 'wrap'
          }
     })
}