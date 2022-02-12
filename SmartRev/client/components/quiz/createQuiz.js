import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, SafeAreaView, Alert, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
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
    Box
} from 'native-base';

export default function createQuiz({ navigation }) {

    //Data
    const [id, setId] = useState();
    const [userclasses, setUserclasses] = useState([]);

    //Input to quiz
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [subject, setSubject] = useState('');
    const [nameclass, setNameclass] = useState('');

    //Input to question
    const [quizid, setQuizid] = useState();
    const [questList, setQuestList] = useState([{ quest: "", option1: "", option2: "", option3: "", option4: "", answer: "" }]);

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
        const userid = await getProfile();
        getClass(userid);
        setId(userid)
    }

    const getProfile = () => {

        return new Promise(async (resolve, reject) => {
            try {

                const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)

                resolve(data.data.profile.userid)
            } catch (error) {
                console.log(error)
                reject(false)
            }
        })

    }

    const getClass = async (userid) => {
        try {

            console.log(userid);
            const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/class/id/${userid}`)
            setUserclasses(data.data.class)
            console.log(userclasses);


        } catch (error) {
            console.log(error)
        }

    }

    const handleQuestAdd = () => {
        setQuestList([...questList, { quest: "", option1: "", option2: "", option3: "", option4: "", answer: "" }])
    }

    const handleQuestDel = (index) => {
        const list = [...questList]
        list.splice(index, 1);
        setQuestList(list)
    };

    const handleFormChange = (values, index, key) => {
        // console.log(e);
        // const { name, value } = values;
        const list = [...questList];
        list[index][key] = values;
        console.log(list);
        setQuestList(list);
    }


    const getSubjectandClass = () => {

        var subject = ""
        var nameclass = ""
        return new Promise(async (resolve, reject) => {
            try {
                for (let i = 0; i < userclasses.length; i++) {
                    if (userclasses[i].code === code) {
                        subject = userclasses[i].subject
                        nameclass = userclasses[i].name
                    }
                }
                resolve({ subject, nameclass })
            } catch (error) {
                reject(error)
            }

        })
    }


    const insertQuiz = (subject, nameclass) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.post("http://10.0.2.2:3006/api/v1/quiz/create", {
                    id, title, code, subject, nameclass
                })
                resolve(data.data.quiz.quizid);
                console.log()
                // Alert.alert('','You have added a video!',[
                //   {onPress: () => navigation.goBack()}
                // ])


            } catch (error) {
                reject(error)
            }
        })
    }

    const insertQuestion = async (quizid) => {

        for (let i = 0; i < questList.length; i++) {
            var quest = questList[i].quest
            var option1 = questList[i].option1
            var option2 = questList[i].option2
            var option3 = questList[i].option3
            var option4 = questList[i].option4
            var answer = questList[i].answer
            try {
                const { data } = await axios.post("http://10.0.2.2:3006/api/v1/quiz/create/question", {
                    quizid,
                    quest,
                    option1,
                    option2,
                    option3,
                    option4,
                    answer,

                })
                console.log(quizid)
                // Alert.alert('','You have added a video!',[
                //   {onPress: () => navigation.goBack()}
                // ])


            } catch (error) {
                console.log(error)
            }

        }
    }


    const handleSubmit = async () => {

        try {
            const { subject, nameclass } = await getSubjectandClass()
            const something = await insertQuiz(subject, nameclass)
            insertQuestion(something)
            console.log()
            Alert.alert('', 'You have added a quiz!', [
                { onPress: () => navigation.goBack() }
            ])

        } catch (error) {
            console.log(error);

        }

    }




    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }
        }>


            <SafeAreaView style={styles.container}>
                <ScrollView>


                    <Box
                        shadow={1}
                        bg={'white'}
                        m={5}
                        p={5}
                        width={350}
                        borderRadius={16}
                    >

                        <VStack width="90%" mx="3">
                            <FormControl isRequired marginBottom={25}>
                                <FormControl.Label _text={{ bold: true }}>Quiz Title</FormControl.Label>
                                <Input

                                    placeholder="Insert title here"
                                    value={title}
                                    onChangeText={setTitle}
                                />
                                <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Title</FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl w="3/4" maxW="300" isRequired marginBottom={25}>
                                <FormControl.Label _text={{ bold: true }}>Class</FormControl.Label>
                                <Select selectedValue={code} minWidth="200" accessibilityLabel="Choose Class" placeholder="Choose Class" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size={5} />
                                }} onValueChange={itemValue => { setCode(itemValue) }}>
                                    {userclasses &&
                                        userclasses.map((userclass) => {
                                            // console.log('dalam map');
                                            var nam = '' + userclass.name
                                            var sub = '' + userclass.subject

                                            if (nam != 't' && sub != '') {
                                                // console.log('dalam if');
                                                return (
                                                    <Select.Item label={userclass.name} id={userclass.classid.toString()} key={userclass.classid.toString()} value={userclass.code} />
                                                );
                                            } else {

                                            }
                                        })}
                                </Select>
                                {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage> */}
                            </FormControl>

                            {/* <Button onPress={handleSubmit} mt="5" colorScheme="blue">
                            Add Video
                        </Button> */}
                        </VStack>




                    </Box>

                    {questList.map((singleQuest, index) => (
                        <Box
                            shadow={1}
                            bg={'white'}
                            m={5}
                            p={5}
                            width={350}
                            borderRadius={16}
                            key={index}
                        >
                            <VStack width="90%" mx="3">
                                <FormControl isRequired marginBottom={25}>
                                    <FormControl.Label _text={{ bold: true }}>Question {index + 1}</FormControl.Label>
                                    <Input
                                        placeholder="Insert question here"
                                        value={singleQuest.quest}
                                        onChangeText={(value) => handleFormChange(value, index, "quest")}
                                    />
                                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Title</FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl isRequired marginBottom={25}>
                                    <FormControl.Label _text={{ bold: true }}>Option 1</FormControl.Label>
                                    <Input
                                        placeholder=""
                                        value={singleQuest.option1}
                                        onChangeText={(value) => handleFormChange(value, index, "option1")}
                                    />
                                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Title</FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl isRequired marginBottom={25}>
                                    <FormControl.Label _text={{ bold: true }}>Option 2</FormControl.Label>
                                    <Input
                                        placeholder=""
                                        value={singleQuest.option2}
                                        onChangeText={(value) => handleFormChange(value, index, "option2")}
                                    />
                                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Title</FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl isRequired marginBottom={25}>
                                    <FormControl.Label _text={{ bold: true }}>Option 3</FormControl.Label>
                                    <Input
                                        placeholder=""
                                        value={singleQuest.option3}
                                        onChangeText={(value) => handleFormChange(value, index, "option3")}
                                    />
                                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Title</FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl isRequired marginBottom={25}>
                                    <FormControl.Label _text={{ bold: true }}>Option 4</FormControl.Label>
                                    <Input
                                        placeholder=""
                                        value={singleQuest.option4}
                                        onChangeText={(value) => handleFormChange(value, index, "option4")}
                                    />
                                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Title</FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl isRequired marginBottom={25}>
                                    <FormControl.Label _text={{ bold: true }}>Answer</FormControl.Label>
                                    <Input
                                        placeholder="Insert the correct answer here"
                                        value={singleQuest.answer}
                                        onChangeText={(value) => handleFormChange(value, index, "answer")}
                                    />
                                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Title</FormControl.ErrorMessage>
                                </FormControl>

                                {questList.length > 1 && (

                                    <Button
                                        colorScheme="secondary"
                                        onPress={() => {
                                            handleQuestDel(index)

                                        }}
                                    >
                                        Delete
                                    </Button>

                                )}
                            </VStack>
                        </Box>
                    ))}

                    <VStack width="90%" mx="3" alignItems="center" >

                        <Button.Group space={2} justify="center">

                            <Button onPress={handleQuestAdd} mt="5" colorScheme="green">
                                Add more question
                            </Button>


                            <Button onPress={handleSubmit} mt="5" colorScheme="blue">
                                Submit Quiz
                            </Button>
                        </Button.Group>

                    </VStack>


                </ScrollView>
            </SafeAreaView>

        </TouchableWithoutFeedback>
    )
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
        borderWidth: 1,
        width: 250,
        padding: 5,
    },

    inputlong: {
        height: 100,
        margin: 12,
        padding: 5,
        borderWidth: 1,
        width: 250
    }


});


