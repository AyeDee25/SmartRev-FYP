import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet, Text, SafeAreaView, Alert, Button, Pressable, View, Image} from 'react-native';
import { COLORS, SIZES } from '../components/quiz/constants';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';




export default function Home({navigation}) {

  //get current user
  var currentUseremail = '';

  if (auth().currentUser) {
   currentUseremail = auth().currentUser.email;
  } else {
  currentUseremail = '';
  }
  
  const [usertype, setusertype] = useState();
  const isFocused = useIsFocused();
  
  

  useEffect(() => {
    getProfile(); 
    }, [isFocused]);

  const getProfile =  async () => {try {

  const {data} = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
  setusertype(data.data.profile.usertype)

  } catch (error) {
      console.log(error)
  }

  } 
    
  
    const openFlashcard = () => {
        navigation.navigate("Flashcard")
        console.log("enter flashcard")
    }

    const openClass = () => {
      navigation.navigate("Class")
      console.log("enter class")
  }

    const openForum = () => {
        navigation.navigate("Forum")
        console.log("enter forum")
    }

    const openQuiz = () => {
      navigation.navigate("Quiz")
      console.log("enter quiz")
    }

    const openVideo = () => {
      navigation.navigate("Video")
      console.log("enter video")
    }

    const openNote = () => {
      navigation.navigate("Note")
      console.log("enter note")
    }
    
    const openHomework = () => {
      navigation.navigate("Homework")
      console.log("enter homework")
    }


  if(usertype == "Student"){
  return (
  <SafeAreaView style={styles.container}>
  
  <View style={styles.row}>

  <Pressable style={styles.button} onPress={openQuiz}>
    <Icon name="pencil" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Quiz</Text>
    </Pressable>  

    <Pressable style={styles.button} onPress={openFlashcard}>
  <Icon name="credit-card" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Flashcard</Text>
    </Pressable>

    

    </View>

    <View style={styles.row}>
    <Pressable style={styles.button} onPress={openForum}>
    <Icon name="comments" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Forum</Text>
    </Pressable>  

    <Pressable style={styles.button} onPress={openVideo}>
    <Icon name="play" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Video</Text>
    </Pressable>  

    </View>

    <View style={styles.row}>
    <Pressable style={styles.button} onPress={openNote}>
    <Icon name="sticky-note-o" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Note</Text>
    </Pressable>  

    <Pressable style={styles.button} onPress={openHomework}>
    <Icon name="book" size={75} color={'black'}></Icon>
      <Text style={styles.text}>Homework</Text>
    </Pressable>   

    

    {/* <Pressable style={styles.button} onPress={() => auth().signOut()}>
      <Text style={styles.text}>Logout</Text>
    </Pressable>   */}

    
    </View>

    <Pressable  style={styles.buttonContainer}  onPress={openClass} >
      <Text style={styles.text}>Join Class</Text>
    </Pressable> 

    <Image
                source={require('../assets/DottedBG.png')}
                style={{
                    width: SIZES.width,
                    height: 130,
                    zIndex: -1,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.5
                }}
                resizeMode={'contain'}
                />
          
    </SafeAreaView>
    
      
  );}
  else{
    return (
      <SafeAreaView style={styles.container}>
      
      <View style={styles.row}>
    
      <Pressable style={styles.button} onPress={openQuiz}>
        <Icon name="pencil" size={75} color={'black'}></Icon>
          <Text style={styles.text}>Quiz</Text>
        </Pressable>  
    
        <Pressable style={styles.button} onPress={openClass}>
      <Icon name="users" size={75} color={'black'}></Icon>
          <Text style={styles.text}>Class</Text>
        </Pressable>
    
        
    
        </View>
    
        <View style={styles.row}>
        <Pressable style={styles.button} onPress={openForum}>
        <Icon name="comments" size={75} color={'black'}></Icon>
          <Text style={styles.text}>Forum</Text>
        </Pressable>  
    
        <Pressable style={styles.button} onPress={openVideo}>
        <Icon name="play" size={75} color={'black'}></Icon>
          <Text style={styles.text}>Video</Text>
        </Pressable>  
    
        </View>
    
        <View style={styles.row}>
        <Pressable style={styles.button} onPress={openNote}>
        <Icon name="sticky-note-o" size={75} color={'black'}></Icon>
          <Text style={styles.text}>Note</Text>
        </Pressable>  
    
        <Pressable style={styles.button} onPress={openHomework}>
        <Icon name="book" size={75} color={'black'}></Icon>
          <Text style={styles.text}>Homework</Text>
        </Pressable>   
    
        {/* <Pressable style={styles.button} onPress={() => auth().signOut()}>
          <Text style={styles.text}>Logout</Text>
        </Pressable>   */}
    
        
        </View>
    
        <Image
                    source={require('../assets/DottedBG.png')}
                    style={{
                        width: SIZES.width,
                        height: 130,
                        zIndex: -1,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0.5
                    }}
                    resizeMode={'contain'}
                    />
              
        </SafeAreaView>
        
          
      );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#00A6FB',   
    paddingTop: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 50,
    
  },

  row:{
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    padding: 10,
    margin: 25,
    borderRadius: 25,
    
    // elevation: 3,
    backgroundColor: '#00A6FB',
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

  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:250,
    borderRadius:30,
    backgroundColor: "white",
  },
});
