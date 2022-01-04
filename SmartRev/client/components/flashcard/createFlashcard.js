import axios from 'axios';
import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, Alert,Pressable, View, Keyboard, TextInput, TouchableWithoutFeedback} from 'react-native';
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

export default function createFlashcard({navigation}) {

const [topic, settopic] = useState("")
const [content, setcontent] = useState("")

const handleTopicChange = (value) => {
    settopic(value)
}

const handleContentChange = (value) => {
    setcontent(value)
}

const [errors, setErrors] = useState({});

const submitFlashCard = async () => {

  
  if (topic === undefined) {
    setErrors({
      ...errors,
      name: 'Topic is required',
    });
    return false;
  } 
  
  if (content.length < 3) {
    setErrors({
      ...errors,
      name: 'Content is too short',
    });
    return false;
  }

  
    try {
        const {data} = await axios.post("http://10.0.2.2:3006/api/v1/flashcards",{
        topic,
        content,
    })
    
    console.log()
    
    Alert.alert('','You have added a flashcard!',[
      {onPress: () => navigation.goBack()}
    ])

    

    } catch (error) {
        console.log(error)
    }
  
}


  
  


  return (

    <NativeBaseProvider>


    <TouchableWithoutFeedback onPress={() =>
      {
        Keyboard.dismiss();
      }
    }>

    
    <SafeAreaView style={styles.container}>
      

    {/* <Text >
        Topic:
        </Text>
    <TextInput  style={styles.input} onChangeText = {handleTopicChange}  placeholder = "  Insert topic here  "/>
    
    <Text>
        Content:
        </Text>

    <TextInput style={styles.inputlong} multiline={true}  onChangeText = {handleContentChange} placeholder = "  Content  "/>
        
    <Button onPress = {submitFlashCard}  title = "Add flashcard"/>  */}

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
        <FormControl.Label _text={{bold: true}}>Topic</FormControl.Label>
        <Input
         
          placeholder="Insert topic here"
          
          onChangeText={handleTopicChange}
        />
        <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Topic</FormControl.ErrorMessage>
      </FormControl>
      

  
      <FormControl isRequired>
        <FormControl.Label _text={{bold: true}}>Content</FormControl.Label>
        <TextArea
          placeholder="Content"
          
          onChangeText={handleContentChange}
        />
       
        <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Content</FormControl.ErrorMessage>
      </FormControl>

      <Button onPress={submitFlashCard} mt="5" colorScheme="blue">
        Add Flashcard
      </Button>
    </VStack>
   
    </Box>
    </SafeAreaView>
    
    </TouchableWithoutFeedback>

    </NativeBaseProvider>
      
  );
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
