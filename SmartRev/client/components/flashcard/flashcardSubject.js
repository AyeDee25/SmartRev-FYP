import React from 'react';
import { StyleSheet, Text, SafeAreaView, Alert, Button, Pressable, View, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function flashcardSubject({navigation}) {
    

    const openMath = () => {
        navigation.navigate("viewFlashcard", {subject: "Mathematics"})
    }

    const openPhysics = () => {
        navigation.navigate("viewFlashcard", {subject: "Physics"})
    }

    const openChemistry = () => {
      navigation.navigate("viewFlashcard", {subject: "Chemistry"})
    }

    const openBiology = () => {
      navigation.navigate("viewFlashcard", {subject: "Biology"})
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
