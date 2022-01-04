import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Button,
  ImageBackground, 
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import FormInput from '../../utilities/FormInput';
import FormButton from '../../utilities/FormButton';
import auth from '@react-native-firebase/auth'

const Login = ({navigation}) => {

    const [ email, setemail] = useState('')
    const [ password, setpassword] = useState('')
    

    const onSignIn = () => {
      
        auth().signInWithEmailAndPassword(email, password)
        .then((result) =>{
            console.log(result)
        } )
        .catch((error) =>{
            console.log(error)
        } )

    }

    return (
      <TouchableWithoutFeedback onPress={() =>
        {
          Keyboard.dismiss();
        }
      }>

            <ScrollView contentContainerStyle={styles.container}>

            <Image
             source={require('../../assets/Book.png')}
             style={styles.logo}
           />
           <Text style={styles.text}>SmartRev</Text>

             <FormInput
             labelValue={email}
             onChangeText = {(email) => setemail(email)}
             placeholderText="Email"
             iconType="mail"
             keyboardType="email-address"
             autoCapitalize="none"
             autoCorrect={false}
             />

            <FormInput
             labelValue={password}
             onChangeText = {(password) => setpassword(password)}
             placeholderText="Password"
             iconType="lock"
             secureTextEntry={true}
            />
         
            <FormButton
             buttonTitle="Sign In"
             onPress = {() => onSignIn()}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => alert("Tak buat lagi")}>
              <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>        

            <TouchableOpacity
             style={styles.forgotButton}
             onPress={() => navigation.navigate('Register')}>
             <Text style={styles.navButtonText}>
               Don't have an acount yet? Create here
             </Text>
           </TouchableOpacity>

            </ScrollView>

            </TouchableWithoutFeedback>
          
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 150
    },
    logo: {
      height: 100,
      width: 100,
      resizeMode: 'cover',
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'Lato-Regular',
    },
  });
