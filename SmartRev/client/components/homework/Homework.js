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

export default function Homework({navigation}) {

   

    return (
        
        <SafeAreaView style={styles.container}>
      

        {/* <Pressable style={styles.button} >
          <Text style={styles.text}>Submit Homework</Text>
        </Pressable> */}

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
            <Button size="lg" w = "250"  py={4}   > Submit Homework </Button>
            
            
            
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
