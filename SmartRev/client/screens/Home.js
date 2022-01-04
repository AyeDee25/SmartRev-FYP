import React from 'react';
import { StyleSheet, Text, SafeAreaView, Alert, Button, Pressable, View, Image} from 'react-native';
import { COLORS, SIZES } from '../components/quiz/constants';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';




export default function Home({navigation}) {
    
  
    const openFlashcard = () => {
        navigation.navigate("Flashcard")
        console.log("enter flashcard")
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

  return (
  <SafeAreaView style={styles.container}>
  
    {/* <Header/> */}

  
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
    
      
  );
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
    borderRadius: 5,
    
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
});
