import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import {
  Button,
  Divider,
  Heading,
  VStack,
  Stack,
  ScrollView,
  Center,
  NativeBaseProvider,
} from "native-base"

export default function Video({navigation}) {

      const watchVideo = () => {
          navigation.navigate("watchVideo")
      }

      const addVideo = () => {
          navigation.navigate("addVideo")
      }


    return (

         <SafeAreaView style={styles.container}>
      

         {/* <Pressable style={styles.button} onPress={watchVideo}>
           <Text style={styles.text}>Watch Video</Text>
         </Pressable>
    
         <Pressable style={styles.button} onPress={addVideo}>
           <Text style={styles.text}>Add Video</Text>
         </Pressable>   */}
              
         
        <VStack
          w="100%"
          space={2.5}
          px="2"
          mt="4"
          alignItems="center"
          justifyContent="center"
          
        >
          {/* Solid */}
          
          <Stack
            mb="2.5"
            mt="1.5"
            direction={{
              base: "column",
              md: "row",
            }}
            space={25}
            mx={{
              base: "auto",
              md: "0",
            }}
            
          >
            <Button size="lg" w = "250"  py={4}  onPress={watchVideo} > Watch Video </Button>
            <Button size="lg" w = "250" py={4} variant="subtle" onPress={addVideo}> Add a Video </Button>
            
            
        </Stack>
        
     
      </VStack>

      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#252c4a',
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
  });
  
