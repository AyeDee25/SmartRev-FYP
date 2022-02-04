import React, {useState, useEffect} from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
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

export default function Forum({navigation}) {

  //get current user
  var currentUseremail = '';

  if (auth().currentUser) {
   currentUseremail = auth().currentUser.email;
  } else {
  currentUseremail = '';
  }
  
  const [usertype, setusertype] = useState();

  useEffect(() => {
    getProfile(); 
    }, []);

  const getProfile =  async () => {try {

  const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
  setusertype(data.data.profile.usertype)

  } catch (error) {
      console.log(error)
  }

  } 

    const createForum = () => {
      if(usertype=="Student"){
        navigation.navigate("createForum")
      }
      else{
        navigation.navigate("createForumTeacher")
      }
    }

    const viewForum = () => {
      if(usertype=="Student"){
        navigation.navigate("viewForum")
      }
      else{
        navigation.navigate("viewForumTeacher")
      }
    }

  return (
    <SafeAreaView style={styles.container}>
      

    {/* <Pressable style={styles.button} onPress={createForum }>
      <Text style={styles.text}>Create Forum</Text>
    </Pressable>

    <Pressable style={styles.button} onPress={viewForum}>
      <Text style={styles.text}>View Forum</Text>
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
            <Button size="lg" w = "250"  py={4}  onPress={viewForum} > View Forum </Button>
            <Button size="lg" w = "250" py={4} variant="subtle" onPress={createForum}> Create a Forum </Button>
            
            
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
