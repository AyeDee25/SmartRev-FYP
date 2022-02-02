import React, {useState, useEffect} from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, SafeAreaView, Alert, Button, Pressable, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function videoSubject({navigation}) {

    //get current user
  var currentUseremail = '';

  if (auth().currentUser) {
   currentUseremail = auth().currentUser.email;
  } else {
  currentUseremail = '';
  }
  
  const [arrayprofile, setArrayProfile] =  useState([])
  const isFocused = useIsFocused();
  const [userid, setuserid] = useState("");
  const [mathCode, setMathCode] = useState();
  const [phyCode, setPhyCode] = useState();
  const [chemCode, setChemCode] = useState();
  const [bioCode, setBioCode] = useState();
  

  useEffect(() => {
    getProfile(); 
    }, []);

  const getProfile =  async () => {try {

  const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
  setuserid(data.data.profile.userid)
  setMathCode(data.data.profile.math);
  setPhyCode(data.data.profile.physics);
  setChemCode(data.data.profile.chemistry);
  setBioCode(data.data.profile.biology);



  } catch (error) {
      console.log(error)
  }

  } 
    

    const openMath = () => {
        navigation.navigate("watchVideo", {code: mathCode})
    }

    const openPhysics = () => {
        navigation.navigate("watchVideo", {code: phyCode})
    }

    const openChemistry = () => {
      navigation.navigate("watchVideo", {code: chemCode})
    }

    const openBiology = () => {
      navigation.navigate("watchVideo", {code: bioCode})
    }


  return (
  <SafeAreaView style={styles.container}>
  
  <View style={styles.row}>

  <Pressable style={styles.button1} onPress={openMath}>
    <Icon name="calculator" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Mathematics</Text>
    </Pressable>  

    <Pressable style={styles.button2} onPress={openPhysics}>
  <Icon name="send" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Physics</Text>
    </Pressable>

    </View>

    <View style={styles.row}>

    <Pressable style={styles.button3} onPress={openChemistry}>
    <Icon name="apple" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Chemistry</Text>
    </Pressable>  

    <Pressable style={styles.button4} onPress={openBiology}>
    <Icon name="envira" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Biology</Text>
    </Pressable>  

    </View>
          
    </SafeAreaView>
    
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#00A6FB',   
    paddingTop: 20,
    backgroundColor: '#252c4a',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 50,
    
  },

  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //  paddingVertical: 12,
    // paddingHorizontal: 32,
    padding: 10,
    margin: 25,
    borderRadius: 25,
    
    // elevation: 3,
    backgroundColor: 'pink',
  },

  button2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //  paddingVertical: 12,
    // paddingHorizontal: 32,
    padding: 10,
    margin: 25,
    borderRadius: 25,
    
    // elevation: 3,
    backgroundColor: 'blue',
  },

  button3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //  paddingVertical: 12,
    // paddingHorizontal: 32,
    padding: 10,
    margin: 25,
    borderRadius: 25,
    
    // elevation: 3,
    backgroundColor: 'yellow',
  },

  button4: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //  paddingVertical: 12,
    // paddingHorizontal: 32,
    padding: 10,
    margin: 25,
    borderRadius: 25,
    
    // elevation: 3,
    backgroundColor: 'green',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#00008b',
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
