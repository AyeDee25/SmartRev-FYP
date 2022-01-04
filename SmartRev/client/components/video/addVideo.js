import axios from 'axios';
import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, Alert,  Keyboard, TouchableWithoutFeedback} from 'react-native';
import {  
  VStack,
  FormControl,
  Input,
  NativeBaseProvider,
  TextArea,
  Spacer,
  Center,
  Button,
  useColorModeValue,
 
Box } from 'native-base';

export default function addVideo({navigation}) {

    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleLinkChange = (value) => {
        setLink(value)
    }

    const submitVideo = async () => {

          try {
              const {data} = await axios.post("http://10.0.2.2:3006/api/v1/video",{
              title,
              link,
          })
          
          console.log()
          Alert.alert('','You have added a video!',[
            {onPress: () => navigation.goBack()}
          ])
          
      
          } catch (error) {
              console.log(error)
          }
        
      }

    return (
        <TouchableWithoutFeedback onPress={() =>
            {
              Keyboard.dismiss();
            }
          }>
      
          
          <SafeAreaView style={styles.container}>
            
      
          {/* <Text >
              Title:
              </Text>
          <TextInput  style={styles.input} onChangeText = {handleTitleChange}  placeholder = "  Insert title here  "/>
          
          <Text>
              Content:
            </Text>
      
          <TextInput style={styles.input} onChangeText = {handleLinkChange} placeholder = "  e.g. W6NZfCO5SIk (case sensitive) "/>
              
          <Button onPress = {submitVideo}  title = "Add video"/>  */}

    <Box
				shadow={1}
				bg={'white'}
				// my={50}
				// mx={50}
        m = {5}
        p = {5}
        width={350}
				borderRadius={16}
		>

    <VStack width="90%" mx="3">
      <FormControl isRequired marginBottom={25}>
        <FormControl.Label _text={{bold: true}}>Title</FormControl.Label>
        <Input
         
          placeholder="Insert title here"
          
          onChangeText={handleTitleChange}
        />
        <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Title</FormControl.ErrorMessage>
      </FormControl>
      

  
      <FormControl isRequired>
        <FormControl.Label _text={{bold: true}}>Link</FormControl.Label>
        <TextArea
          placeholder="e.g. W6NZfCO5SIk (case sensitive)"
          
          onChangeText={handleLinkChange}
        />
       
        <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Link</FormControl.ErrorMessage>
      </FormControl>

      <Button onPress={submitVideo} mt="5" colorScheme="blue">
        Add Video
      </Button>
    </VStack>
   
    </Box>
         
                
          </SafeAreaView>
          
          </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00A6FB',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      marginVertical: 25,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'white',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'blue',
    },
  
    titles: {
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
      fontWeight: '500',
    },
  
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      width: 250,
      padding: 5,
    },
  
    inputlong: {
      height: 100,
      margin: 12,
      padding: 5,
      borderWidth: 1,
      width: 250
    }
  
  
  });
  

