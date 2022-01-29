import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, ScrollView} from 'react-native';
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

export default function viewForum({navigation}) {
 

    const [arrayforum, setarrayforum] = useState([])
 


    useEffect(() => {
        
      getArrayForum()
          return () => {
          
        }
    }, [])
     
    
    const getArrayForum =  async () => {try {
        const {data} = await axios.get("http://10.0.2.2:3006/api/v1/forum")
        setarrayforum(data.data.forum)
    


    } catch (error) {
        console.log(error)
    }

  }
    

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        {
            arrayforum.map((forum, index) => {
                return(
                    // <View style ={styles.forum} key = {index}>
                    //     <View style = {styles.titles}>
                    //     <Text style = {styles.title}>
                    //         {forum.topic}
                    //     </Text>
                    //     </View>
                    //     <View style = {styles.forumcontent}>
                    //     <Text>
                    //         {forum.content}
                    //         </Text>
                    //         </View>
                    //     <View> 
                    //         <TextInput style={styles.inputlong} multiline={true} ></TextInput>
                    //     </View>
                    // </View>

                    <Pressable key={index}
                      onPress={() => {
                        // setflashcardTopic(flashcard.topic)
                        // setflashcardContent(flashcard.content)
                        // setflashcardID(flashcard.flashcardid)
                        // setShowModal(true)
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
                              p={2}
                              bg = {'#66a3ff'}
                              rounded= "sm"   
                            >
                              {forum.topic}
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
                              {forum.content}
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

  forum: {
    borderWidth: 5, 
    borderColor: 'black', 
    marginVertical: 10, 
    width: 300
  },

  forumcontent: {
      marginHorizontal: 5,
      paddingVertical:10
  },

  inputlong: {
    height: 50,
    margin: 12,
    padding: 5,
    borderWidth: 1,
    width: 250
  }
});
