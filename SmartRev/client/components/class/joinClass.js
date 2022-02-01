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

export default function joinClass({navigation}) {

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

  const getProfile =  async () => {
    
  try {

  const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
  setuserid(data.data.profile.userid)

  } catch (error) {
      console.log(error)
  }

  } 
  
  //

// const [topic, settopic] = useState("")
const [code, setcode] = useState();
const [subject, setSubject] = useState();

const handleCodeChange = (value) => {
    setcode(value)
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

const joinClass = async () => {

  try {

    const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/class/${code}`)
    setSubject(data.data.class[0].subject)

    const update = await axios.put(`http://10.0.2.2:3006/api/v1/profile/${subject}/${userid}`,{
        code,
    })
    
    console.log()
    
    Alert.alert('','You have joined a class!',[
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
        m = {5}
        p = {5}
        width={350}
		borderRadius={16}
	>
    <VStack width="90%" mx="3">
     
      <FormControl isRequired>
        <FormControl.Label _text={{bold: true}}>Enter the Class code</FormControl.Label>
        <Input
          placeholder="Class code"
          onChangeText={handleCodeChange}
        />
       
        <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Content</FormControl.ErrorMessage>
      </FormControl>

        
      <Button onPress={joinClass} mt="5" colorScheme="blue">
        Join Class
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
