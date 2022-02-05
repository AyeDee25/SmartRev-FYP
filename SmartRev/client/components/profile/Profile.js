import { StyleSheet, Text, SafeAreaView, Alert, Button, Pressable, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Profile({ navigation }) {

  //get current user
  var currentUseremail = '';

  if (auth().currentUser) {
    currentUseremail = auth().currentUser.email;
  } else {
    currentUseremail = '';
  }

  const [arrayprofile, setArrayProfile] = useState([])
  const isFocused = useIsFocused();
  const [UserType, setUserType] = useState("");


  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {

      const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
      setArrayProfile(data.data.profile)
      setUserType(data.data.profile.usertype)


    } catch (error) {
      console.log(error)
    }

  }

  const performance = () => {
    navigation.navigate("performanceChart", { id: arrayprofile.userid })
  }

  if (UserType == "Student") {
    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{arrayprofile.fullname}</Text>
            <Text style={styles.info}>{arrayprofile.email}</Text>
            <Text style={styles.description}>{arrayprofile.phonenumber}</Text>
            <Text style={styles.description}>{arrayprofile.school}</Text>
            <Text style={styles.description}>{arrayprofile.usertype}</Text>
            <Text style={styles.description}></Text>
            <Pressable style={styles.buttonContainer} onPress={performance} >
              <Text style={styles.text}>View Performance</Text>
            </Pressable>

            <Pressable style={styles.buttonContainer} onPress={() => auth().signOut()}>
              <Text style={styles.text}>Logout</Text>
            </Pressable>
          </View>


        </View>






      </SafeAreaView>


    );
  }
  else {
    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{arrayprofile.fullname}</Text>
            <Text style={styles.info}>{arrayprofile.email}</Text>
            <Text style={styles.description}>{arrayprofile.phonenumber}</Text>
            <Text style={styles.description}>{arrayprofile.school}</Text>
            <Text style={styles.description}>{arrayprofile.usertype}</Text>
            <Text style={styles.description}></Text>

            {/* <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 1</Text>  
                          </TouchableOpacity>              
                          <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 2</Text> 
                          </TouchableOpacity> */}
            {/* <Pressable style={styles.buttonContainer} onPress={navigation.navigate("performanceChart", { id: arrayprofile.userid })} >
                        <Text style={styles.text}>View Performance</Text>
                      </Pressable> */}

            <Pressable style={styles.buttonContainer} onPress={() => auth().signOut()}>
              <Text style={styles.text}>Logout</Text>
            </Pressable>
          </View>


        </View>






      </SafeAreaView>


    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#252c4a",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
