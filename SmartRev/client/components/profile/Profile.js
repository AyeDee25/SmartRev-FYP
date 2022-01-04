import { StyleSheet, Text, SafeAreaView, Alert, Button, Pressable, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {useIsFocused} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Profile({navigation}) {

  var currentUseremail = '';

  if (auth().currentUser) {
   currentUseremail = auth().currentUser.email;
  } else {
  currentUseremail = '';
  }
  
  const [arrayprofile, setArrayProfile] =  useState([])
  const isFocused = useIsFocused();
  

  useEffect(() => {
    getProfile();
    }, []);

  const getProfile =  async () => {try {

  const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
  setArrayProfile(data.data.profile)
  

  } catch (error) {
      console.log(error)
  }

  }
    
  return (

    <SafeAreaView style={styles.container}>

    <Icon name="user" size={75} color={'blue'}></Icon>

      <View style = {styles.profile}>
                        
        <Text style = {styles.content}>
          {arrayprofile.name}
        </Text>

        <Text style = {styles.content}>
          {arrayprofile.phonenumber}
        </Text>

        <Text style = {styles.content}>
          {arrayprofile.school}
        </Text>

      </View>

      

    <Pressable style={styles.button} onPress={() => auth().signOut()}>
      <Text style={styles.text}>Logout</Text>
    </Pressable>  


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

  profile: {
    borderWidth: 5, 
    borderColor: 'black', 
    marginVertical: 10, 
    width: 300,
    backgroundColor: '#00A6FB'
  },
  content: {
    fontSize: 25,
    fontWeight: '500',
    paddingVertical:10,
    marginHorizontal: 10,
    
},
});
