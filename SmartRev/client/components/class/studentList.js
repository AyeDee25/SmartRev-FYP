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




export default function studentList({ navigation, route }) {


    const code = route.params.code
    const subject = route.params.subject
    const clasName = route.params.class
    const [students, setStudents] = useState();

    //tggu getprofile settle baru execute getarrayflashcard
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const something = await retrieveStudents();

        } catch (error) {
            console.log(error);
        }

    }

    const retrieveStudents = async () => {

        try {
            const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${code}/${subject}`)

            setStudents(data.data.profile);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <Text style={styles.title}>
                    {clasName}
                </Text>


                <DataTable >
                    <DataTable.Header style={styles.header}>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Email</DataTable.Title>
                    </DataTable.Header>

                    {students && students.map((student) => (


                        <DataTable.Row style={styles.row} key={student.userid} >

                            <DataTable.Cell>
                                <Text>
                                    {student.fullname}
                                </Text>
                            </DataTable.Cell>

                            <DataTable.Cell>
                                <Text>
                                    {student.email}
                                </Text>
                            </DataTable.Cell>

                            {/* <DataTable.Cell>
                                    <Text>
                                        {userclass.subject}
                                    </Text>
                                </DataTable.Cell> */}
                            {/* <DataTable.Cell numeric><Button
                                colorScheme="green"
                                onPress={() => {
                                    // console.log("id " + quiz.quizid + " subject " + quiz.subject);
                                    navigation.navigate("answerQuiz", { id: quiz.quizid, subject: quiz.subject })



                                }}
                            >
                                Attempt Quiz
                            </Button></DataTable.Cell> */}
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
        backgroundColor: '#5cd65c',
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
        textAlign: 'center',
        marginBottom: 20
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
