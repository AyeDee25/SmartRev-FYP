import axios from 'axios';
import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, Alert,  Pressable, TextInput, TouchableWithoutFeedback} from 'react-native';
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

export default function createForum({navigation}) {

const [topic, settopic] = useState()
const [content, setcontent] = useState()

const handleTopicChange = (value) => {
    settopic(value)
}

const handleContentChange = (value) => {
    setcontent(value)
}

const submitForum = async () => {
    try {
        const {data} = await axios.post("http://10.0.2.2:3006/api/v1/forum",{
        topic,
        content,
    })
    
    console.log()
    Alert.alert('','You have created a forum!',[
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
      
{/* 
    <Text>
        Topic:
        </Text>
    <TextInput  style={styles.input} onChangeText = {handleTopicChange}  placeholder = "  Insert topic here  "/>
    
    <Text>
        Content:
        </Text>

    <TextInput style={styles.inputlong}  multiline={true} onChangeText = {handleContentChange} placeholder = "  Insert question here  "/>
        
    <Button onPress = {submitForum}  title = "Add forum"/>  */}


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

      <Button onPress={submitForum} mt="5" colorScheme="blue">
        Create Forum
      </Button>
    </VStack>
   
    </Box>
          
    </SafeAreaView>

    </TouchableWithoutFeedback>
      
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
    padding: 5,
    borderWidth: 1,
    width: 250
   
  },

  inputlong: {
    height: 100,
    margin: 12,
    padding: 5,
    borderWidth: 1,
    width: 250
   
  },
});
