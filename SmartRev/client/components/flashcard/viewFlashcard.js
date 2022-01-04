import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import editFlashcard from './editFlashcard';
import {useIsFocused} from "@react-navigation/native";

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



export default function viewFlashcard({navigation}) {
 

    const [arrayflashcard, setarrayflashcard] = useState([])
    const isFocused = useIsFocused();
    const [showModal, setShowModal] = useState(false)
 

//nk rerun getarrayflashcard
    useEffect(() => {
        getArrayFlashcard();
        }, [isFocused]);
  
     
    
    const getArrayFlashcard =  async () => {try {
        const {data} = await axios.get("http://10.0.2.2:3006/api/v1/flashcards")
        setarrayflashcard(data.data.flashcard)
       


    } catch (error) {
        console.log(error)
    }

  }
    

  const deleteFlashcard = async (flashcardid) => {
    try {
        const {data} = await axios.delete(`http://10.0.2.2:3006/api/v1/flashcards/${flashcardid}`)
        getArrayFlashcard()
        

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
                    // <View style ={styles.flashcard} key = {index}>

      
                    //     <Button  title = 'X' onPress = {()=> deleteFlashcard(flashcard.flashcardid)}/>
                       
                        
                    //     <View style = {styles.titles}>
                        
                    //     <Text style = {styles.title}>
                    //         {flashcard.topic}
                    //     </Text>

                    //     </View>

                    //     <View style = {styles.flashcardcontent}>
                    //     <Text>
                    //         {flashcard.content}
                    //         </Text>
                    //         </View>
                    //     <View> 
                            
                    //     </View>
                    //     <Button  title = 'Edit' onPress = {()=>navigation.navigate("editFlashcard",{
                    //         id: flashcard.flashcardid
                    //     })}/>

                       

                    // </View>
                    
        <Pressable key={index}
          onPress={() => 
            setShowModal(true)
          }
        > 

<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{flashcard.topic}</Modal.Header>
          <Modal.Body>
            {flashcard.content}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                
                onPress={() => {
                  setShowModal(false)
                }}
              >
                Edit
              </Button>
              <Button
                colorScheme="secondary"
                onPress={() => {
                  setShowModal(false)
                }}
              >
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

            <Box
							shadow={1}
							bg={'white'}
							my={2}
							mx={3}
							borderRadius={16}
              width={300}             
						>
							<VStack >
								<Heading
									size="md"
									p={4}
									color={'black'}
								>
									{flashcard.topic}
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
                  <Text numberOfLines={1}>
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
