import axios from 'axios';
import React, {useState, useEffect } from 'react';
import {useIsFocused} from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
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
  Select,
  CheckIcon,
Box } from 'native-base';

export default function addVideo({navigation}) {

     //get current user
     var currentUseremail = '';

     if (auth().currentUser) {
      currentUseremail = auth().currentUser.email;
     } else {
     currentUseremail = '';
     }
     
     //tggu getprofile settle baru execute getclass
     useEffect(() => {
       init();
       }, []);
  
     const init = async() => {
      const userid =  await getProfile();
      getClass(userid);
     }
   
     const getProfile = () => {
       
     return new Promise(async(resolve,reject) => {
      try {
      
        const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
        resolve(data.data.profile.userid)
        } catch (error) {
            console.log(error)
            reject(false)
        }
      }) 
           
    }
    
    const getClass =  async (userid) => {try {
      
      console.log(userid);
      const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/class/id/${userid}`)
      setUserclasses(data.data.class)
      console.log(userclasses);
      

      } catch (error) {
          console.log(error)
      }

    }

    const [userclasses, setUserclasses] = useState([]);
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")
    const [subject, setSubject] = useState('');
    const [code, setCode] = useState('');
    const [nameclass, setNameclass] = useState('');
    // const [update, setUpdate] = useState(false);

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleLinkChange = (value) => {

      var removedValue = ""

        if(value.includes("https://youtu.be/")){
           removedValue = value.replace('https://youtu.be/','')
        }

        else if(value.includes("https://www.youtube.com/watch?v=")){
           removedValue = value.replace('https://www.youtube.com/watch?v=','')
        }

        setLink(removedValue)
    }

    const getSubjectandClass = () => {

      var subject = ""
      var nameclass = ""
      return new Promise(async(resolve,reject) => {

      for (let i = 0; i < userclasses.length; i++) {
        if(userclasses[i].code === code){
            subject = userclasses[i].subject
            nameclass = userclasses[i].name
        }
      }
      resolve({subject, nameclass})
    }) 
    }

      
    const submitVideo = async (subject, nameclass) => {

        try {
          const {data} = await axios.post("http://10.0.2.2:3006/api/v1/create/video",{
            title,
            link,
            subject,
            code,
            nameclass,
      })
      
      console.log()
      // Alert.alert('','You have added a video!',[
      //   {onPress: () => navigation.goBack()}
      // ])
      
  
      } catch (error) {
          console.log(error)
      }

    }
      
      
      const handleSubmit = async () => {

        try {
          const {subject, nameclass} = await getSubjectandClass()
          console.log("subject" + subject + nameclass);
          submitVideo(subject, nameclass)

          console.log()
          Alert.alert('','You have added a video!',[
          {onPress: () => navigation.goBack()}
          ])

        } catch (error) {
          
        }
      
      }

        


    return (
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
      <FormControl isRequired marginBottom={25}>
        <FormControl.Label _text={{bold: true}}>Title</FormControl.Label>
        <Input
         
          placeholder="Insert title here"
          
          onChangeText={handleTitleChange}
        />
        <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Title</FormControl.ErrorMessage>
      </FormControl>
      
      <FormControl isRequired marginBottom={25}>
        <FormControl.Label _text={{bold: true}}>Link</FormControl.Label>
        <Input
          placeholder="Insert link here"
          
          onChangeText={handleLinkChange}
        />
       
        <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Link</FormControl.ErrorMessage>
      </FormControl>

      <FormControl w="3/4" maxW="300" isRequired marginBottom={25}>
        <FormControl.Label _text={{bold: true}}>Class</FormControl.Label>
        <Select  selectedValue={code} minWidth="200" accessibilityLabel="Choose Class" placeholder="Choose Class" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size={5} />
      }}  onValueChange={itemValue => {setCode(itemValue)}}>
           {userclasses && userclasses.map((userclass) => (
                <Select.Item label = {userclass.name} id={userclass.classid} value={userclass.code} key = {userclass.classid.toString()} />
            ))}
        </Select>
        {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage> */}
      </FormControl>

      <Button onPress={handleSubmit} mt="5" colorScheme="blue">
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
  

