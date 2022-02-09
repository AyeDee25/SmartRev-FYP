import axios from 'axios';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native'
import { COLORS, SIZES } from './constants';
import data from '../../app/data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function answerQuiz({ navigation, route }) {

    const id = route.params.id
    const subject = route.params.subject

    // const allQuestions = data;

    //Questions
    const [questions, setQuestions] = useState([]);
    const [numberOfQuestion, setNumberOfQuestion] = useState(0);

    //Error Handling
    const [response, setResponse] = useState();
    const [toUpdate, setToUpdate] = useState(false);

    //quiz
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)

    //insert score purpose
    const [prevMark, setPrevMark] = useState(0);
    const [newMark, setNewMark] = useState(0);
    const [mark, setMark] = useState(0);
    const [remark, setRemark] = useState('')


    const [showScoreModal, setShowScoreModal] = useState(false)

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            getProfile();
            const something = await getQuestion();
            // console.log(something);
            // setEverything(something)
        } catch (error) {
            console.log(error);
        }

    }

    //get current user
    var currentUseremail = '';

    if (auth().currentUser) {
        currentUseremail = auth().currentUser.email;
    } else {
        currentUseremail = '';
    }

    const [arrayprofile, setArrayProfile] = useState([])
    const [userID, setuserID] = useState("");
    const getProfile = async () => {
        try {

            const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/profile/${currentUseremail}`)
            setArrayProfile(data.data.profile)
            setuserID(data.data.profile.userid)


        } catch (error) {
            console.log(error)
        }

    }

    const getQuestion = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/quiz/question/${id}`)
                setNumberOfQuestion(data.data.question.length)
                setQuestions(data.data.question)
                setToUpdate(true);
                // setResponse(await axios.get(`http://10.0.2.2:3006/api/v1/quiz/question/${id}`))
                resolve(data)
            } catch (error) {
                reject(error)
            }

        })
    }

    // const setEverything = (something) => {
    //     if (something) {
    //         setNumberOfQuestion(something.data.question.length)
    //         setQuestions(something.data.data.question)
    //         setToUpdate(true);
    //     }
    // }





    const validateAnswer = (selectedOption) => {
        let correct_option = questions[currentQuestionIndex]['answer'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption == correct_option) {
            // Set Score
            setScore(score + 1)
        }
        // Show Next Button
        setShowNextButton(true)
    }
    const handleNext = () => {
        if (currentQuestionIndex == questions.length - 1) {
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
            submitScoring()
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const restartQuiz = () => {
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }



    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{ color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2 }}>{currentQuestionIndex + 1}</Text>
                    <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>/ {questions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 30
                }}>{questions[currentQuestionIndex]?.quest}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>


                <TouchableOpacity
                    onPress={() => validateAnswer(questions[currentQuestionIndex]?.option1)}
                    disabled={isOptionsDisabled}
                    // key={option1}
                    style={{
                        borderWidth: 3,
                        borderColor: questions[currentQuestionIndex]?.option1 == correctOption
                            ? COLORS.success
                            : questions[currentQuestionIndex]?.option1 == currentOptionSelected
                                ? COLORS.error
                                : COLORS.secondary + '40',
                        backgroundColor: questions[currentQuestionIndex]?.option1 == correctOption
                            ? COLORS.success + '20'
                            : questions[currentQuestionIndex]?.option1 == currentOptionSelected
                                ? COLORS.error + '20'
                                : COLORS.secondary + '20',
                        height: 60, borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginVertical: 10
                    }}
                >
                    <Text style={{ fontSize: 20, color: COLORS.white }}>{questions[currentQuestionIndex]?.option1}</Text>

                    {/* Show Check Or Cross Icon based on correct answer*/}
                    {
                        questions[currentQuestionIndex]?.option1 == correctOption ? (
                            <View style={{
                                width: 30, height: 30, borderRadius: 30 / 2,
                                backgroundColor: COLORS.success,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons name="check" style={{
                                    color: COLORS.white,
                                    fontSize: 20
                                }} />
                            </View>
                        ) : questions[currentQuestionIndex]?.option1 == currentOptionSelected ? (
                            <View style={{
                                width: 30, height: 30, borderRadius: 30 / 2,
                                backgroundColor: COLORS.error,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons name="close" style={{
                                    color: COLORS.white,
                                    fontSize: 20
                                }} />
                            </View>
                        ) : null
                    }

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => validateAnswer(questions[currentQuestionIndex]?.option2)}
                    disabled={isOptionsDisabled}
                    // key={option2}
                    style={{
                        borderWidth: 3,
                        borderColor: questions[currentQuestionIndex]?.option2 == correctOption
                            ? COLORS.success
                            : questions[currentQuestionIndex]?.option2 == currentOptionSelected
                                ? COLORS.error
                                : COLORS.secondary + '40',
                        backgroundColor: questions[currentQuestionIndex]?.option2 == correctOption
                            ? COLORS.success + '20'
                            : questions[currentQuestionIndex]?.option2 == currentOptionSelected
                                ? COLORS.error + '20'
                                : COLORS.secondary + '20',
                        height: 60, borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginVertical: 10
                    }}
                >
                    <Text style={{ fontSize: 20, color: COLORS.white }}>{questions[currentQuestionIndex]?.option2}</Text>

                    {/* Show Check Or Cross Icon based on correct answer*/}
                    {
                        questions[currentQuestionIndex]?.option2 == correctOption ? (
                            <View style={{
                                width: 30, height: 30, borderRadius: 30 / 2,
                                backgroundColor: COLORS.success,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons name="check" style={{
                                    color: COLORS.white,
                                    fontSize: 20
                                }} />
                            </View>
                        ) : questions[currentQuestionIndex]?.option2 == currentOptionSelected ? (
                            <View style={{
                                width: 30, height: 30, borderRadius: 30 / 2,
                                backgroundColor: COLORS.error,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons name="close" style={{
                                    color: COLORS.white,
                                    fontSize: 20
                                }} />
                            </View>
                        ) : null
                    }

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => validateAnswer(questions[currentQuestionIndex]?.option3)}
                    disabled={isOptionsDisabled}
                    // key={option3}
                    style={{
                        borderWidth: 3,
                        borderColor: questions[currentQuestionIndex]?.option3 == correctOption
                            ? COLORS.success
                            : questions[currentQuestionIndex]?.option3 == currentOptionSelected
                                ? COLORS.error
                                : COLORS.secondary + '40',
                        backgroundColor: questions[currentQuestionIndex]?.option3 == correctOption
                            ? COLORS.success + '20'
                            : questions[currentQuestionIndex]?.option3 == currentOptionSelected
                                ? COLORS.error + '20'
                                : COLORS.secondary + '20',
                        height: 60, borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginVertical: 10
                    }}
                >
                    <Text style={{ fontSize: 20, color: COLORS.white }}>{questions[currentQuestionIndex]?.option3}</Text>

                    {/* Show Check Or Cross Icon based on correct answer*/}
                    {
                        questions[currentQuestionIndex]?.option3 == correctOption ? (
                            <View style={{
                                width: 30, height: 30, borderRadius: 30 / 2,
                                backgroundColor: COLORS.success,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons name="check" style={{
                                    color: COLORS.white,
                                    fontSize: 20
                                }} />
                            </View>
                        ) : questions[currentQuestionIndex]?.option3 == currentOptionSelected ? (
                            <View style={{
                                width: 30, height: 30, borderRadius: 30 / 2,
                                backgroundColor: COLORS.error,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons name="close" style={{
                                    color: COLORS.white,
                                    fontSize: 20
                                }} />
                            </View>
                        ) : null
                    }

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => validateAnswer(questions[currentQuestionIndex]?.option4)}
                    disabled={isOptionsDisabled}
                    // key={option4}
                    style={{
                        borderWidth: 3,
                        borderColor: questions[currentQuestionIndex]?.option4 == correctOption
                            ? COLORS.success
                            : questions[currentQuestionIndex]?.option4 == currentOptionSelected
                                ? COLORS.error
                                : COLORS.secondary + '40',
                        backgroundColor: questions[currentQuestionIndex]?.option4 == correctOption
                            ? COLORS.success + '20'
                            : questions[currentQuestionIndex]?.option4 == currentOptionSelected
                                ? COLORS.error + '20'
                                : COLORS.secondary + '20',
                        height: 60, borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginVertical: 10
                    }}
                >
                    <Text style={{ fontSize: 20, color: COLORS.white }}>{questions[currentQuestionIndex]?.option4}</Text>

                    {/* Show Check Or Cross Icon based on correct answer*/}
                    {
                        questions[currentQuestionIndex]?.option4 == correctOption ? (
                            <View style={{
                                width: 30, height: 30, borderRadius: 30 / 2,
                                backgroundColor: COLORS.success,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons name="check" style={{
                                    color: COLORS.white,
                                    fontSize: 20
                                }} />
                            </View>
                        ) : questions[currentQuestionIndex]?.option4 == currentOptionSelected ? (
                            <View style={{
                                width: 30, height: 30, borderRadius: 30 / 2,
                                backgroundColor: COLORS.error,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons name="close" style={{
                                    color: COLORS.white,
                                    fontSize: 20
                                }} />
                            </View>
                        ) : null
                    }

                </TouchableOpacity>






            </View>
        )
    }
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5,
                    }}>
                    <Text style={{ fontSize: 20, color: COLORS.white, textAlign: 'center' }}>Next</Text>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    }


    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, questions.length],
        outputRange: ['0%', '100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 10,
                borderRadius: 10,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.accent
                }, {
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }


    const convertScore = () => {
        console.log("masuk convert score, score = " + score);
        return new Promise(async (resolve, reject) => {
            try {
                if (score === 0) {
                    resolve(0);
                } else {
                    resolve((score / numberOfQuestion) * 100)
                }

                // resolve(true)
            } catch (error) {
                reject(error)
            }

        })
    }


    const getScoreFromDatabase = () => {
        console.log("masuk get score from database");
        return new Promise(async (resolve, reject) => {
            console.log(subject);
            try {
                if (subject === "Mathematics") {
                    if (arrayprofile.mathscore !== 0 && arrayprofile.mathscore !== null) {
                        resolve(arrayprofile.mathscore)
                    }
                    else {
                        resolve(0)
                    }
                } else if (subject === "Physics") {
                    if (arrayprofile.physicsscore !== 0 && arrayprofile.physicsscore !== null) {
                        resolve(arrayprofile.physicsscore)
                    }
                    else {
                        resolve(0)
                    }
                } else if (subject === "Chemistry") {
                    if (arrayprofile.chemistryscore !== 0 && arrayprofile.chemistryscore !== null) {
                        resolve(arrayprofile.chemistryscore)
                    }
                    else {
                        resolve(0)
                    }
                } else if (subject === "Biology") {
                    if (arrayprofile.biologyscore !== 0 && arrayprofile.biologyscore !== null) {
                        resolve(arrayprofile.biologyscore)
                    }
                    else {
                        console.log("masuk resolve 0 bio");
                        resolve(0)
                    }
                }

                // resolve(true)
            } catch (error) {
                reject(error)
            }

        })
    }

    const settingMark = (newMark, prevMark) => {
        console.log("masuk settingmark");
        return new Promise(async (resolve, reject) => {
            // console.log("check ni" + markah);
            // var markahAkhir = ""
            try {
                console.log("sebelum if " + prevMark);
                if (prevMark !== 0) {
                    resolve((prevMark + newMark) / 2)
                } else {
                    resolve(newMark)
                }

                // console.log("markah akhir " + markahAkhir);
                // resolve(true)

            } catch (error) {
                reject(error)
            }

        })
    }

    const handleScoring = async (mark) => {
        console.log("masuk handlescoring");
        if (mark && userID && subject) {
            console.log("mark " + mark + " userid " + userID + " subject " + subject);
            var id = userID
            try {

                const { data } = await axios.put(`http://10.0.2.2:3006/api/v1/profile/update/${id}`, {
                    subject,
                    mark,

                })

            } catch (error) {
                console.log(error)
            }
        }

    }

    const submitScoring = async () => {
        try {
            const newmark = await convertScore()
            const prevmark = await getScoreFromDatabase()
            const mark = await settingMark(newmark, prevmark)
            // console.log();
            handleScoring(mark)
        } catch (error) {
            console.log(error);
        }

    }


    return (



        <SafeAreaView style={{
            flex: 1
        }}>





            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <View style={{
                flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position: 'relative'
            }}>

                {/* ProgressBar */}
                {renderProgressBar()}

                {/* Question */}
                {renderQuestion()}

                {/* Options */}
                {renderOptions()}

                {/* Next Button */}
                {renderNextButton()}

                {/* Score Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showScoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{score > (questions.length / 2) ? 'Congratulations!' : 'Oops!'}</Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: score > (questions.length / 2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ {questions.length}</Text>
                            </View>
                            {/* Retry Quiz button */}
                            <TouchableOpacity
                                onPress={restartQuiz}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Retry Quiz</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>

                {/* Background Image */}
                <Image
                    source={require('../../assets/DottedBG.png')}
                    style={{
                        width: SIZES.width,
                        height: 130,
                        zIndex: -1,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0.5,
                        flex: 1
                    }}
                    resizeMode={'contain'}
                />

            </View>


        </SafeAreaView>

    )
}


