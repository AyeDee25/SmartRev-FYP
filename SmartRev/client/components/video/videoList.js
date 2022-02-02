import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, ScrollView, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {useIsFocused} from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { DataTable } from 'react-native-paper';


import { 
  Text, 
  VStack,
  FormControl,
  Input,
  NativeBaseProvider,
  TextArea,
  Spacer,
  Center,
  Button,
  useColorModeValue,
  ZStack,
  Heading,
  colorMode,
  Divider,
  Flex,
  Modal,
  Pressable,

 
Box } from 'native-base';



export default function videoList({navigation}) {
    console.log("videolist rendering");
   //get current user
   var currentUseremail = '';

   if (auth().currentUser) {
    currentUseremail = auth().currentUser.email;
   } else {
   currentUseremail = '';
   }
   
   //tggu getprofile settle baru execute getarrayflashcard
   useEffect(() => {
     init();
     }, []);

   const init = async() => {
     try {
      const userid =  await getProfile();
      console.log(userid);
      const Classes = await getClass(userid);
      if(Classes){
        console.log("before loop");
        for (let i = 0; i < Classes.length; i++) {
          getAllVideo(Classes[i].code)
       }
      // getAllVideo(userclasses[0].code);
     }
       
     } catch (error) {
       console.log(error);
     }
    
   
   
  

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
    

    const [userclasses, setUserclasses] = useState([]);

    const getClass =  (userid) => {
      return new Promise(async(resolve,reject) => {
      try {
      
      
      console.log(userid);
      const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/class/id/${userid}`)
      // setUserclasses(data.data.class)
      resolve(data.data.class)  
      // console.log(JSON.stringify(data.data.class));

      
      } catch (error) {
          console.log(error)
          reject(error)
      }
    })
    }

    const [lists, setLists] = useState([]);
    

    const getAllVideo =  async (code) => {try {
      
     console.log("get all video");
      const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/video/${code}`)
      if(data.data.video.length !==0 ){
        for (let i = 0; i < data.data.video.length; i++) {
          setLists(lists => [...lists, data.data.video[i]])
        }
      }
    } 
    catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) =>{
  
    try{
        const {data} = await axios.delete(`http://10.0.2.2:3006/api/v1/video/${id}`)
        setLists(lists.filter(list => {
            return list.videoid !== id
        }))
        // console.log(response);
        // Alert.alert('','You have deleted a video!',[
        //   {onPress: () => navigation.goBack()}
        // ])

    } catch(err){
        console.log(err)
    }
}

  


   
   ////
 

  
    const isFocused = useIsFocused();
    
 

    
    

    return (
      <SafeAreaView style={styles.container}>
    
        <ScrollView  showsVerticalScrollIndicator={false}> 
        
        <DataTable>
        <DataTable.Header>
          <DataTable.Title>Class</DataTable.Title>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title numeric></DataTable.Title>
        </DataTable.Header>

        {lists && lists.map((list) => (
        <DataTable.Row key={list.videoid}>
          <DataTable.Cell>{list.nameclass}</DataTable.Cell>
          <DataTable.Cell>{list.title}</DataTable.Cell>
          <DataTable.Cell numeric><Button
                        colorScheme="secondary"
                        onPress={() => {
                          handleDelete(list.videoid);
                          alert("You have deleted a video!")
                          
                        }}
                      >
                        Delete
                      </Button></DataTable.Cell>
        </DataTable.Row>
        ))}


      </DataTable>
      {/* color="error" */}
      {/* startIcon={<DeleteIcon />} */}

         </ScrollView>

              
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A6FB',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 30,
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
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    
  },

  flashcard: {
    borderWidth: 5, 
    borderColor: 'black', 
    marginVertical: 10, 
    width: 300
  },

  flashcardcontent: {
      paddingVertical:10,
      marginHorizontal: 5,
      height: 75,
      backgroundColor: '#00A6FB',
  },

  inputlong: {
    height: 50,
    margin: 12,
    padding: 5,
    borderWidth: 1,
    width: 250
  }
});
