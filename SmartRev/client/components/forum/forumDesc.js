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

export default function forumDesc({ navigation, route }) {

    const forumid = route.params.id;

    //Data
    const [author, setAuthor] = useState();
    const [userid, setUserid] = useState();

    //Output
    const [contents, setContents] = useState({});
    const [replies, setReplies] = useState([]);

    //Input

    const [text, setText] = useState("");
    const [myreply, setMyreply] = useState();

    //Other data
    const date = new Date();
    const todayDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const time = date.getHours() + ":" + date.getMinutes();


    //get current user
    var currentUseremail = '';

    if (auth().currentUser) {
        currentUseremail = auth().currentUser.email;
    } else {
        currentUseremail = '';
    }

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {

            const Profile = await getProfile([]);
            const something = await getEverything(Profile);
            const somethingelse = await getForum([])
            const somethingelsemore = await getReply([])

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
                setUserid(Profile.userid);
                resolve(true);
            } catch (error) {
                // console.log(error)
                reject(false);
            }
        });
    };




    const getForum = () => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("dah masuk getForum " + forumid);
                const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/forum/description/${forumid}`)
                // console.log(JSON.stringify(data.data.forum));
                setContents(data.data.forum[0])
                resolve(data.data.forum)
            }
            catch (error) {
                reject(error)
            }
        });
    }

    const getReply = () => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("dah masuk getReply " + forumid);
                const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/forum/reply/${forumid}`)
                // console.log(JSON.stringify(data.data.forum));
                setReplies(data.data.reply)
                resolve(data.data.reply)
            }
            catch (error) {
                reject(error)
            }
        });
    }

    const getReplyDetail = () => {
        return new Promise(async (resolve, reject) => {
            var user = userid
            var reply = text
            var tarikh = date
            var masa = time

            resolve({ user, reply, tarikh, masa })
        })
    }


    const addReply = async (userid, reply, date, time) => {

        try {
            const { data } = await axios.post("http://10.0.2.2:3006/api/v1/forum/reply", {
                userid,
                forumid,
                author,
                reply,
                date,
                time

            })
            // console.log(userid + forumid + author + reply + date + time);

        } catch (error) {
            console.log(error)
        }

    }


    const handleSubmit = async () => {

        try {
            const { user, reply, tarikh, masa } = await getReplyDetail()

            addReply(user, reply, tarikh, masa)

            alert("You have added a reply!")
            setText("")
            init();

        } catch (error) {

        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

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
                            p={2}
                            bg={'#ff4d4d'}
                            rounded="sm"
                        >
                            {contents.author}
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
                            <Text>
                                {contents.details}
                            </Text>
                        </Flex>
                    </VStack>
                </Box>

                {replies && replies.map(reply => (
                    <Box
                        shadow={1}
                        bg={'white'}
                        my={2}
                        mx={3}
                        borderRadius={16}
                        width={300}
                        rounded="lg"
                        key={reply.replyid}
                    >
                        <VStack >
                            <Heading
                                size="md"
                                p={2}
                                bg={'#ffb3b3'}
                                rounded="sm"
                            >
                                {reply.name}
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
                                <Text>
                                    {reply.reply}
                                </Text>
                            </Flex>
                        </VStack>
                    </Box>
                ))}

                {/* {myreply && */}
                <Box
                    shadow={1}
                    bg={'white'}
                    m={5}
                    p={5}
                    width={250}
                    borderRadius={16}

                >
                    <VStack >

                        <FormControl isRequired>
                            {/* <FormControl.Label _text={{ bold: true }}>Enter the Class code</FormControl.Label> */}
                            <TextArea
                                value={text}
                                placeholder="Add reply"
                                onChangeText={setText}
                            />

                            {/* <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Content</FormControl.ErrorMessage> */}
                        </FormControl>


                        <Button onPress={handleSubmit} mt="5" colorScheme="purple">
                            Add Reply
                        </Button>
                    </VStack>

                </Box>
                {/* } */}




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
