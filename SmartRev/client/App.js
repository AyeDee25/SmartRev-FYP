import React, {Component, useEffect, useState} from 'react';

//import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import { StyleSheet,View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NativeBaseProvider} from 'native-base';

import {NavigationContainer, useIsFocused} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './screens/tabs';

import Home from './screens/Home';

import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

import Forum from './components/forum/Forum';
import createForum from './components/forum/createForum';
import viewForum from './components/forum/viewForum';

import Flashcard from './components/flashcard/Flashcard';
import createFlashcard from './components/flashcard/createFlashcard';
import viewFlashcard from './components/flashcard/viewFlashcard';
import editFlashcard from './components/flashcard/editFlashcard';
import flashcardSubject from './components/flashcard/flashcardSubject';

import Quiz from './components/quiz/Quiz';
import createQuiz from './components/quiz/createQuiz';
import answerQuiz from './components/quiz/answerQuiz';

import Video from './components/video/Video';
import addVideo from './components/video/addVideo';
import watchVideo from './components/video/watchVideo';
import videoList from './components/video/videoList';
import videoSubject from './components/video/videoSubject';

import Note from './components/note/Note';
import uploadNote from './components/note/uploadNote';
import filePreview from './components/note/filePreview';


import Homework from './components/homework/Homework';
import uploadHomework from './components/homework/uploadHomework';

import Profile from './components/profile/Profile';

import Class from './components/class/Class';
import createClass from './components/class/createClass';
import joinClass from './components/class/joinClass';


const Stack = createStackNavigator()

export const App  = () => {
 
const [loggedIn, setloggedIn] = useState(false)
const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    console.log("hai")
    auth().onAuthStateChanged((user) => {
      if(!auth().currentUser){
        setloggedIn(false);
        setLoaded(true);
        console.log("tak login")
        }
      else{
        setloggedIn(true);
        setLoaded(true);
        console.log("login")
      }
    })
  }, [])

    if(!loaded){
      return(
        <View>

        </View>
      )
    }

    if(!loggedIn){
      return (
  
        <NavigationContainer>
         <Stack.Navigator initialRouteName = "Login">
         <Stack.Screen name="Login" component = {LoginScreen} options = {{ headerShown: false}}/>
       <Stack.Screen name="Register" component = {RegisterScreen} options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button 
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          ),
        })}  />
         </Stack.Navigator>
       </NavigationContainer>
      );
    }

    else{
  return(

    <NativeBaseProvider>
      <NavigationContainer>

        
       <Stack.Navigator initialRouteName = "Home">

       {/* <Stack.Screen name="Home" component = {Home} options = {{ headerTitle: "Home",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }, headerLeft: ()=> (<FontAwesome.Button 
                name="user"
                size={35}
                backgroundColor="orange"
                color="#333"
                onPress={() => navigation.navigate('Profile')}
              />), }} /> */}

        <Stack.Screen name="Home" component = {Home} options={({navigation}) => ({
                  title: 'Home',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: 'orange',
                    shadowColor: '#f9fafd',
                    elevation: 0,
                  },
                  headerLeft: () => (
                    <View style={{marginLeft: 10}}>
                      <FontAwesome.Button 
                        name="user"
                        size={35}
                        backgroundColor="orange"
                        color="#333"
                        onPress={() => navigation.navigate('Profile')}
                      />
                    </View>
                  ),
                })}  />

        <Stack.Screen name="Flashcard" component = {Flashcard} options = {{ headerTitle: "Flashcard",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' } }}/> 
        <Stack.Screen name="editFlashcard" component = {editFlashcard} options = {{ headerTitle: "Edit Flashcard",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="createFlashcard" component = {createFlashcard} options = {{ headerTitle: "Create a Flashcard",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}}/> 
        <Stack.Screen name="viewFlashcard" component = {viewFlashcard} options = {{ headerTitle: "View Flashcard",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="flashcardSubject" component = {flashcardSubject} options = {{ headerTitle: "Subject",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 

        <Stack.Screen name="Forum" component = {Forum} options = {{ headerTitle: "Forum",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="createForum" component = {createForum} options = {{ headerTitle: "Create a Forum",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="viewForum" component = {viewForum} options = {{ headerTitle: "View Forum",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}}/> 
        
        <Stack.Screen name="Quiz" component = {Quiz} options = {{ headerTitle: "Quiz",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="answerQuiz" component = {answerQuiz} options = {{ headerTitle: "Quiz",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="createQuiz" component = {createQuiz} options = {{ headerShown: false}} /> 

        <Stack.Screen name="Video" component = {Video} options = {{ headerTitle: "Video",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="addVideo" component = {addVideo} options = {{ headerTitle: "Add a Video",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="watchVideo" component = {watchVideo} options = {{animationEnabled: false, headerTitle: "Video",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="videoList" component = {videoList} options = {{headerTitle: "Video List",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="videoSubject" component = {videoSubject} options = {{headerTitle: "Subject",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        {/* animationEnabled: false,  */}
        <Stack.Screen name="Note" component = {Note} options = {{ headerTitle: "Note",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="uploadNote" component = {uploadNote} options = {{ headerTitle: "Upload Note",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="filePreview" component = {filePreview} options = {{headerShown:false }} /> 

        <Stack.Screen name="Homework" component = {Homework} options = {{ headerTitle: "Homework",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="uploadHomework" component = {uploadHomework} options = {{ headerTitle: "Homework",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 

        <Stack.Screen name="Class" component = {Class} options = {{ headerTitle: "Class",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="createClass" component = {createClass} options = {{ headerTitle: "Class",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 
        <Stack.Screen name="joinClass" component = {joinClass} options = {{ headerTitle: "Class",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' }}} /> 

        {/* <Stack.Screen name="Profile" component = {Profile} options = {{ headerTitle: "Profile",  headerTitleAlign: 'center', headerStyle: { backgroundColor: 'orange' } }} /> */}
        <Stack.Screen name="Profile" component = {Profile} options={({navigation}) => ({
                  title: 'Profile',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: 'orange',
                    shadowColor: '#f9fafd',
                    elevation: 0,
                  },
                  headerLeft: () => (
                    <View style={{marginLeft: 10}}>
                      <FontAwesome.Button 
                        name="home"
                        size={35}
                        backgroundColor="orange"
                        color="#333"
                        onPress={() => navigation.navigate('Home')}
                      />
                    </View>
                  ),
                })}  />
        
       </Stack.Navigator>
      
       </NavigationContainer>
    
       </NativeBaseProvider>
  );
    }
  }


export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A6FB',
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
