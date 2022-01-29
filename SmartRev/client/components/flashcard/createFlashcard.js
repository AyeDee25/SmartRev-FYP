import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, Alert,Pressable, View, Keyboard, TextInput, TouchableWithoutFeedback, Picker } from 'react-native';
import auth from '@react-native-firebase/auth';
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
  Select,
  CheckIcon,
  WarningOutlineIcon,
 Box 
} from 'native-base';
import { useIsFocused } from '@react-navigation/native';

export default function createFlashcard({navigation}) {

  //get current user
  var currentUseremail = '';

  if (auth().currentUser) {
   currentUseremail = auth().currentUser.email;
  } else {
  currentUseremail = '';
  }
  
  const [arrayprofile, setArrayProfile] =  useState([])
  const isFocused = useIsFocused();
  const [userid, setuserid] = useState("");
  

  useEffect(() => {
    getProfile(); 
    }, []);

  const getProfile =  async () => {try {

  const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
  setuserid(data.data.profile.userid)

  } catch (error) {
      console.log(error)
  }

  } 
  
  //

// const [topic, settopic] = useState("")
const [content, setcontent] = useState("")
const [selectedSubject, setSelectedSubject] = useState("");

// const handleTopicChange = (value) => {
//     settopic(value)
// }

const handleContentChange = (value) => {
    setcontent(value)
}

const [errors, setErrors] = useState({});

 // if (topic === undefined) {
  //   setErrors({
  //     ...errors,
  //     name: 'Topic is required',
  //   });
  //   return false;
  // } 
  
  // if (content.length < 3) {
  //   setErrors({
  //     ...errors,
  //     name: 'Content is too short',
  //   });
  //   return false;
  // }

const submitFlashCard = async () => {

    try {
        const {data} = await axios.post("http://10.0.2.2:3006/api/v1/flashcards",{
        userid,
        selectedSubject,
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
     
      <FormControl w="3/4" maxW="300" isRequired marginBottom={25}>
        <FormControl.Label _text={{bold: true}}>Subject</FormControl.Label>
        <Select  selectedValue={selectedSubject} minWidth="200" accessibilityLabel="Choose Subject" placeholder="Choose Subject" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size={5} />
      }}  onValueChange={itemValue => setSelectedSubject(itemValue)}>
          <Select.Item label="Mathematics" value="Mathematics" id = "1" />
          <Select.Item label="Physics" value="Physics" id = "2" />
          <Select.Item label="Chemistry" value="Chemistry" id = "3"/>
          <Select.Item label="Biology" value="Biology" id = "4"/>
        </Select>
        {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage> */}
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
