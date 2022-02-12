import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  VStack,
  FormControl,
  Input,
  NativeBaseProvider,
  TextArea,
  Spacer,
  Center,
  Button,
  useColorModeValue,
  Select,
  CheckIcon,
  Box,
} from 'native-base';

export default function createForum({ navigation }) {
  //Get profile
  const [id, setId] = useState();
  const [userclasses, setUserclasses] = useState();
  const [stclasses, setStclasses] = useState([]);
  const [lists, setLists] = useState([]);
  const [subCode, setSubCode] = useState([]);

  //To display
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [author, setAuthor] = useState();
  const [code, setCode] = useState('');
  const [nameclass, setNameclass] = useState('');
  const [subject, setSubject] = useState('');

  //Others
  const date = new Date();
  const todayDate =
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  //get current user
  var currentUseremail = '';

  if (auth().currentUser) {
    currentUseremail = auth().currentUser.email;
  } else {
    currentUseremail = '';
  }

  //tggu getprofile settle baru execute getclass
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const Profile = await getProfile([]);
      const something = await getEverything(Profile);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`,
        );
        resolve(data.data.profile);
      } catch (error) {
        console.log(error);
        reject(false);
      }
    });
  };

  const getEverything = (Profile) => {
    return new Promise(async (resolve, reject) => {
      try {
        setAuthor(Profile.fullname);
        setId(Profile.userid);
        setSubCode(subCode => [...subCode, Profile.math]);
        setSubCode(subCode => [...subCode, Profile.physics]);
        setSubCode(subCode => [...subCode, Profile.chemistry]);
        setSubCode(subCode => [...subCode, Profile.biology]);
        if (Profile.math != null) {
          setStclasses(stclasses => [
            ...stclasses,
            { sub: 'Mathematics', cod: Profile.math },
          ]);
        }
        if (Profile.physics != null) {
          setStclasses(stclasses => [
            ...stclasses,
            { sub: 'Physics', cod: Profile.physics },
          ]);
        }
        if (Profile.chemistry != null) {
          setStclasses(stclasses => [
            ...stclasses,
            { sub: 'Chemistry', cod: Profile.chemistry },
          ]);
        }
        if (Profile.biology != null) {
          setStclasses(stclasses => [
            ...stclasses,
            { sub: 'Biology', cod: Profile.biology },
          ]);
        }
        resolve(true);
      } catch (error) {
        // console.log(error)
        reject(false);
      }
    });
  };

  const handleTitleChange = value => {
    setTitle(value);
  };

  const handleDetailsChange = value => {
    setDetails(value);
  };

  const getSubjectandClass = () => {
    var subject = '';
    var nameclass = '';
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `http://10.0.2.2:3006/api/v1/class/${code}`,
        );
        subject = data.data.class[0].subject;
        nameclass = data.data.class[0].name;

        resolve({ subject, nameclass });
      } catch (error) {
        reject(error);
      }
    });
  };

  const submitForum = async (subject, nameclass) => {
    try {
      const { data } = await axios.post(
        'http://10.0.2.2:3006/api/v1/forum/create',
        {
          title,
          details,
          author,
          todayDate,
          code,
          nameclass,
          subject,
        },
      );

      console.log();

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { subject, nameclass } = await getSubjectandClass();
      console.log('subject' + subject + nameclass);
      submitForum(subject, nameclass);

      console.log();
      Alert.alert('', 'You have added a forum!', [
        { onPress: () => navigation.goBack() },
      ]);
    } catch (error) { }
  };
  // console.log(JSON.stringify(stclasses));
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={styles.container}>
        <Box
          shadow={1}
          bg={'white'}
          // my={50}
          // mx={50}
          m={5}
          p={5}
          width={350}
          borderRadius={16}>
          <VStack width="90%" mx="3">
            <FormControl isRequired marginBottom={25}>
              <FormControl.Label _text={{ bold: true }}>Title</FormControl.Label>
              <Input
                placeholder="Insert title here"
                onChangeText={handleTitleChange}
              />
              <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
                Error Topic
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired marginBottom={25}>
              <FormControl.Label _text={{ bold: true }}>
                Details
              </FormControl.Label>
              <TextArea
                placeholder="Details"
                onChangeText={handleDetailsChange}
              />

              <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
                Error Content
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl w="3/4" maxW="300" isRequired marginBottom={25}>
              <FormControl.Label _text={{ bold: true }}>
                Subject
              </FormControl.Label>
              <Select
                selectedValue={code}
                minWidth="200"
                accessibilityLabel="Choose Class"
                placeholder="Choose Class"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size={5} />,
                }}
                onValueChange={itemValue => {
                  setCode(itemValue);
                }}>
                {stclasses.map((stclass, i) => {
                  // console.log('dalam map');
                  var sub = '' + stclass.sub;
                  var cod = '' + stclass.cod;
                  // console.log(JSON.stringify(stclass));
                  if (cod != 'takde' && sub != '') {
                    // console.log('dalam if');
                    return (
                      <Select.Item label={sub} id={i.toString()} key={i.toString()} value={cod} />
                    );
                  } else {
                    // return (
                    //   <Select.Item
                    //     label={'Dummy label'}
                    //     id={i}
                    //     key={i.toString()}
                    //     value={'Dummy value'}
                    //   />
                    // );
                  }
                })}

                {/* <Select.Item label="test 1" id="1" value="1" />
                <Select.Item label="test 2" id="2" value="2" /> */}
              </Select>
              {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage> */}
            </FormControl>

            <Button onPress={handleSubmit} mt="5" colorScheme="blue">
              Create Forum
            </Button>
          </VStack>
        </Box>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

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

  input: {
    height: 40,
    margin: 12,
    padding: 5,
    borderWidth: 1,
    width: 250,
  },

  inputlong: {
    height: 100,
    margin: 12,
    padding: 5,
    borderWidth: 1,
    width: 250,
  },
});
