import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { DataTable } from 'react-native-paper';


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
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { greaterOrEq, set } from 'react-native-reanimated';
import editQuiz from './editQuiz';



export default function quizListTeacher({ navigation }) {

    const [ID, setID] = useState("");
    const [quizes, setQuizes] = useState([]);
    const [qid, setQid] = useState();
    console.log("quizlist rendering");
    //get current user
    var currentUseremail = '';

    if (auth().currentUser) {
        currentUseremail = auth().currentUser.email;
    } else {
        currentUseremail = '';
    }

    //tggu getprofile settle baru execute getarrayflashcard
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const userid = await getProfile();
            getQuiz(userid)
            // const Classes = await getClass(userid);
            // if (Classes) {
            //     console.log("before loop");
            //     for (let i = 0; i < Classes.length; i++) {
            //         getAllVideo(Classes[i].code)
            //     }
            //     // getAllVideo(userclasses[0].code);
            // }

        } catch (error) {
            console.log(error);
        }





    }
    const getProfile = () => {

        return new Promise(async (resolve, reject) => {
            try {

                const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
                setID(data.data.profile.userid)
                resolve(data.data.profile.userid)
            } catch (error) {
                console.log(error)
                reject(false)
            }
        })



    }


    const getQuiz = async (userid) => {

        try {
            console.log(userid);
            const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/quiz/display/${userid}`)
            setQuizes(data.data.quiz)

            // console.log(JSON.stringify(data.data.class));


        } catch (error) {
            console.log(error)
            reject(error)
        }

    }

    const deleteQuest = (quizid) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.delete(`http://10.0.2.2:3006/api/v1/quiz/delete/quest/${quizid}`)
                const newQuizes = quizes.filter(quiz => quiz.quizid !== quizid);
                setQuizes(newQuizes);
                setQid(quizid)
                resolve(quizid)
            } catch (error) {
                reject(error)
            }

            // setDel(true);
        })
    }

    const deleteQuiz = async (quizid) => {

        try {
            const { data } = await axios.delete(`http://10.0.2.2:3006/api/v1/quiz/delete/${quizid}`)


        } catch (error) {
            reject(error)
        }




    }


    const handleDelete = async (quizid) => {
        const something = await deleteQuest(quizid)
        deleteQuiz(quizid)


    }


    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <DataTable>
                    <DataTable.Header style={styles.header}>
                        <DataTable.Title>Class</DataTable.Title>
                        <DataTable.Title>Quiz Title</DataTable.Title>
                        <DataTable.Title numeric></DataTable.Title>
                    </DataTable.Header>

                    {quizes && quizes.map(quiz => (
                        <DataTable.Row style={styles.row} key={quiz.quizid}>
                            <DataTable.Cell>{quiz.nameclass}</DataTable.Cell>
                            <DataTable.Cell>
                                <Pressable numberOfLines={1} onPress={() => { navigation.navigate("editQuiz", { id: quiz.quizid, classname: quiz.nameclass }) }}>
                                    <Text>
                                        {quiz.title}
                                    </Text>
                                </Pressable>
                            </DataTable.Cell>
                            <DataTable.Cell numeric><Button
                                colorScheme="secondary"
                                onPress={() => {
                                    handleDelete(quiz.quizid);
                                    alert("You have deleted a quiz!")

                                }}
                            >
                                Delete
                            </Button></DataTable.Cell>
                        </DataTable.Row>
                    ))}


                </DataTable>
                {/* color="error" */}
                {/* startIcon={<DeleteIcon />} */}

            </ScrollView>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00A6FB',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 100,
        paddingHorizontal: 30,
    },

    row: {
        backgroundColor: 'white',
    },

    header: {
        backgroundColor: '#ffff66',
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
        alignItems: 'center',
    },

    flashcard: {
        borderWidth: 5,
        borderColor: 'black',
        marginVertical: 10,
        width: 300
    },

    flashcardcontent: {
        paddingVertical: 10,
        marginHorizontal: 5,
        height: 75,
        backgroundColor: '#00A6FB',
    },

    inputlong: {
        height: 50,
        margin: 12,
        padding: 5,
        borderWidth: 1,
        width: 250
    }
});
