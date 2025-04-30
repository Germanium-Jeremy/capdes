import { Image, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '@/Contexts/ThemeContext';
import AllStyles from '@/app/styles/style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LINE_HEIGHT: number = 20;
const MAX_LINES = 4;

const Chat = () => {
     const { colorScheme, theme } = useContext(ThemeContext);
     const allStyles = AllStyles({ theme, colorScheme });

     const [messageInput, setMessageInput] = useState<string>('');
     const [inputHeight, setInputHeight] = useState<number>(LINE_HEIGHT * 2);

     const handleMessageChange = (inputText: string) => {
          setMessageInput(inputText);
     };

     const handleContentSizeChange = (event: any) => {
          const { height } = event.nativeEvent.contentSize;
          const calculatedLines = Math.floor(height / LINE_HEIGHT);

          if (calculatedLines <= MAX_LINES) {
               setInputHeight(height);
          } else {
               setInputHeight(LINE_HEIGHT * MAX_LINES); // Stop expanding at max lines
          }
     };

     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <View style={[styles.recipient, { backgroundColor: theme.links }]}>
                    <Text style={styles.recipientData}>Chat with User</Text>
                    <Link href={'/'} style={styles.recipientData}>Report</Link>
               </View>

               <View style={styles.allMessages}>
                    <View style={[styles.message, { borderColor: theme.formInputsPlaceholders }]}>
                         <View style={{ position: 'relative', width: '10%', height: '100%' }}>
                         <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.messageImage} />
                         </View>
                         <View style={{ flexWrap: 'wrap', flexDirection: 'column', width: '80%' }}>
                         <Text style={{ color: theme.text, marginBottom: 25 }}>
                              This is the message being sent.
                         </Text>
                         </View>
                         <Text style={[styles.dateAndTime, { color: theme.text }]}>Date AND Time</Text>
                    </View>
               </View>

               <View style={[styles.messageContainer, { backgroundColor: theme.background }]}>
                    <View style={[styles.sendDiv, { borderColor: theme.formInputsPlaceholders }]}>
                         <Ionicons name='attach' size={28} color={theme.formInputsPlaceholders} />
                         <TextInput placeholder='Send Message' placeholderTextColor={theme.formInputsPlaceholders} style={[styles.messageInput, { color: theme.formInputsTxt, height: inputHeight }]} multiline value={messageInput} onChangeText={handleMessageChange} onContentSizeChange={handleContentSizeChange} />
                         <Ionicons name='send' size={28} color={theme.formInputsPlaceholders} />
                    </View>
               </View>
          </SafeAreaView>
     );
};

export default Chat;

const styles = StyleSheet.create({
     container: {
          
     },
     recipient: {
          paddingVertical: 10,
          paddingHorizontal: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     recipientData: {
          color: 'white',
          fontSize: 16,
     },
     allMessages: {
          gap: 5,
          paddingVertical: 20,
          paddingHorizontal: 30,
     },
     message: {
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderRadius: 30,
          flexDirection: 'row',
          gap: 5,
          position: 'relative',
          overflow: 'hidden',
     },
     messageImage: {
          width: 30,
          height: 30,
          borderRadius: 50,
          position: 'absolute',
          top: 10,
     },
     dateAndTime: {
          position: 'absolute',
          bottom: 5,
          right: 25,
     },
     messageContainer: {
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingVertical: 10,
          paddingHorizontal: 20,
     },
     sendDiv: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: 30,
          gap: 10,
          paddingHorizontal: 10,
          height: 'auto',
     },
     messageInput: {
          flex: 1,
          paddingVertical: 5,
          paddingHorizontal: 10,
          textAlignVertical: 'top', // Ensures text starts at the top
     },
});
