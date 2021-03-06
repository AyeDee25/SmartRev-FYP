import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { StyleSheet, SafeAreaView, View, TextInput, ScrollView } from 'react-native';
import {
  Text,
  VStack,
  FormControl,
  Input,
  NativeBaseProvider,
  TextArea,
  Spacer,
  Center,
  Button,
  useColorModeValue,
  ZStack,
  Heading,
  colorMode,
  Divider,
  Flex,
  Modal,
  Pressable,


  Box
} from 'native-base';

export default function viewForum({ navigation }) {

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
      // console.log(Profile.fullname);
      const { mathCode, phyCode, chemCode, bioCode } = await getEverything(Profile);
      getAllForum(mathCode)
      getAllForum(phyCode)
      getAllForum(chemCode)
      getAllForum(bioCode)
      // if (subCode.length === 4) {
      //   console.log("before loop");
      //   for (let i = 0; i < subCode.length; i++) {
      //     getAllForum(subCode[i])
      //   }
      // }
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
        var mathCode = Profile.math
        var phyCode = Profile.physics
        var chemCode = Profile.chemistry
        var bioCode = Profile.biology

        resolve({ mathCode, phyCode, chemCode, bioCode });
      } catch (error) {
        // console.log(error)
        reject(false);
      }
    });
  };




  const getAllForum = async (subCode) => {
    try {
      console.log("get all forum");
      const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/forum/display/${subCode}`)
      if (data.data.forum.length !== 0) {
        for (let i = 0; i < data.data.forum.length; i++) {
          setLists(lists => [...lists, data.data.forum[i]])
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {
          lists.map((list, index) => {
            return (


              <Pressable key={index}
                onPress={() => {
                  navigation.navigate("forumDesc", {
                    id: list.forumid
                  })
                }}
              >

                <Box
                  shadow={1}
                  bg={'white'}
                  my={2}
                  mx={3}
                  borderRadius={16}
                  width={300}
                  rounded="lg"
                >
                  <VStack >
                    <Heading
                      size="md"
                      align="center"
                      p={2}
                      bg={'#8585ad'}
                      rounded="sm"
                    >
                      {list.title} - {(list.nameclass)}
                    </Heading>

                    <Divider
                      bg={'warmGray.200'}
                    />

                    <Flex
                      align="center"
                      p={6}
                      justify="center"
                      d="flex"

                    >
                      <Text numberOfLines={3} >
                        {list.details}
                      </Text>
                    </Flex>
                  </VStack>
                </Box>





              </Pressable>


            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A6FB',
    // backgroundColor: 'black',
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
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',

  },

  forum: {
    borderWidth: 5,
    borderColor: 'black',
    marginVertical: 10,
    width: 300
  },

  forumcontent: {
    marginHorizontal: 5,
    paddingVertical: 10
  },

  inputlong: {
    height: 50,
    margin: 12,
    padding: 5,
    borderWidth: 1,
    width: 250
  },


});
