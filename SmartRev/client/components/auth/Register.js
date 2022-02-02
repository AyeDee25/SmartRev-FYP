import axios from 'axios';
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
import FormSelect from '../../utilities/FormSelect';
import auth from '@react-native-firebase/auth'

const Register = ({navigation}) => {

    const [ name, setname] = useState('')
    const [ email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [school, setSchool] = useState('');
    const [usertype, setusertype] = useState('Student');


    const onSignUp = () => {

        auth().createUserWithEmailAndPassword(email, password)

        .then((result) =>{
            console.log(result)
        } )
        .catch((error) =>{
            console.log(error)
        } )

    }

    const onSignUpPosgres = async () => {

      try {
        const {data} = await axios.post("http://10.0.2.2:3006/api/v1/profile",{
          name, 
          email, 
          password, 
          phoneNumber, 
          school,
          usertype,
        })

      } catch (error) {
        console.log(error)
    }
    }

    return (

      <TouchableWithoutFeedback onPress={() =>
        {
          Keyboard.dismiss();
        }
      }>
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.text}>Create an account</Text>

            <FormInput
             labelValue={name}
             onChangeText = {(name) => setname(name)}
             placeholderText="Name"
             iconType="user"
             autoCorrect={false}
             />

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

            <FormInput
            labelValue={confirmPassword}
            onChangeText={(password) => setConfirmPassword(password)}
            placeholderText="Confirm Password"
            iconType="lock"
            secureTextEntry={true}
            />

            <FormInput
            labelValue={phoneNumber}
            onChangeText={(phoneNumber) => setphoneNumber(phoneNumber)}
            placeholderText="Phone Number"
            iconType="phone"
            />

            <FormInput
            labelValue={school}
            onChangeText={(school) => setSchool(school)}
            placeholderText="School"
            iconType="book"
            />

            <FormSelect
            labelValue={usertype}
            onValueChange={(usertype, itemIndex) => setusertype(usertype)}
            iconType="user"
            />
         
            <FormButton
             buttonTitle="Sign Up"
             onPress = {() => {onSignUp(); onSignUpPosgres()}}
            />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>   

               
            </ScrollView>

            </TouchableWithoutFeedback>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50
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
    
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'Lato-Regular',
    },
  });
