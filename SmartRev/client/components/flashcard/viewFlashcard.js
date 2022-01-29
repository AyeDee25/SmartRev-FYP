import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, ScrollView, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import editFlashcard from './editFlashcard';
import {useIsFocused} from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

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



export default function viewFlashcard({navigation, route}) {

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
    const userid =  await getProfile();
    getArrayFlashcard(userid);
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


   
   ////
 

    const [arrayflashcard, setarrayflashcard] = useState([])
    const isFocused = useIsFocused();
    const [showModal, setShowModal] = useState(false)
    const [flashcardContent, setflashcardContent] = useState("")
    const [flashcardID, setflashcardID] = useState("")
    const [subject, setsubject] = useState(route.params.subject);
   
 

    const getArrayFlashcard =  async (userid) => {try {
       console.log("masukk");
       console.log(userid);
        const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/flashcards/${userid}/${subject}`)
        setarrayflashcard(data.data.flashcard)
        
       


    } catch (error) {
        console.log(error)
    }

  }
    

  const deleteFlashcard = async (flashcardid) => {
    try {
        const {data} = await axios.delete(`http://10.0.2.2:3006/api/v1/flashcards/${flashcardid}`)
        init();
        
        

    } catch (error) {
        console.log(error)
    }
    
}

    return (
      <SafeAreaView style={styles.container}>
    
        <ScrollView  showsVerticalScrollIndicator={false}> 
        
        {
            arrayflashcard.map((flashcard, index) => {

              
                return(
                    
                    
        <Pressable key={index}
          onPress={() => {
            // setflashcardTopic(flashcard.topic)
            setflashcardContent(flashcard.content)
            setflashcardID(flashcard.flashcardid)
            setShowModal(true)
          }}
        > 

        

            <Box
							shadow={1}
							bg={'white'}
							my={2}
							mx={3}
							borderRadius={16}
              width={300} 
              rounded="lg"            
						>
							<VStack >
								<Heading
									size="md"
									p={0.5}
									bg = {'#b1b1cd'}
                  rounded= "sm"   
								>
									{/* {flashcard.topic} */}
								</Heading>
								<Divider
									bg={'warmGray.200'}
								/>
								<Flex
									align="center"
									p={6}
									justify="center"
									d="flex"
                  
								>
                  <Text numberOfLines={3} >
									{flashcard.content}
                  </Text>
								</Flex>
							</VStack>
						</Box>


          

          </Pressable>

          
                )
            })
        }

              

         </ScrollView>

              <Modal isOpen = {showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px" height={'250px'}>
                  <Modal.CloseButton />
                  {/* <Modal.Header>{flashcardTopic}</Modal.Header> */}
                  <Modal.Body>                    
                    {flashcardContent}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2} justify="center">
                      {/* <Button
                        
                        onPress={() => {
                          setShowModal(false)
                          navigation.navigate("editFlashcard",{
                                     id: flashcardID})
                          
                        }}
                      >
                        Edit
                      </Button> */}
                      <Button
                        colorScheme="secondary"
                        onPress={() => {
                          setShowModal(false)
                          deleteFlashcard(flashcardID)
                          
                        }}
                      >
                        Delete
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>

      </SafeAreaView>
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
