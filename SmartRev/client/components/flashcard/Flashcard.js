import React from 'react';
import { StyleSheet, Text, SafeAreaView, Alert, Pressable, View} from 'react-native';
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


export default function Flashcard({navigation}) {

    const createFlashcard = () => {
        navigation.navigate("createFlashcard")
    }

    const viewFlashcard = () => {
        navigation.navigate("flashcardSubject")
    }

  return (
    <SafeAreaView style={styles.container}>
      

    {/* <Pressable style={styles.button} onPress={createFlashcard}>
      <Text style={styles.text}>Create Flashcard</Text>
    </Pressable>

    <Pressable style={styles.button} onPress={viewFlashcard}>
      <Text style={styles.text}>View Flashcard</Text>
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
            <Button size="lg" w = "250"  py={4}  onPress={viewFlashcard} > View Flashcard </Button>
            <Button size="lg" w = "250" py={4} variant="subtle" onPress={createFlashcard}> Create a Flashcard </Button>
            
            
        </Stack>
        
     
        </VStack>
          
    </SafeAreaView>
    
      
  );
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
