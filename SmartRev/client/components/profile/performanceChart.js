import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { StyleSheet, SafeAreaView, View, TextInput, ScrollView } from 'react-native';
import { Dimensions } from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
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

export default function performanceChart({ navigation, route }) {

    const id = route.params.id
    const [math, setMath] = useState(0);
    const [phy, setPhy] = useState(0);
    const [chem, setChem] = useState(0);
    const [bio, setBio] = useState(0);

    useEffect(() => {
        retrieveData();
    }, []);


    const retrieveData = async () => {
        try {
            const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/profile/id/${id}`)
            if (data.data.profile.mathscore !== 0 && data.data.profile.mathscore !== null) {
                setMath(data.data.profile.mathscore);
            }
            if (data.data.profile.physicsscore !== 0 && data.data.profile.physicsscore !== null) {
                setPhy(data.data.profile.physicsscore);
            }
            if (data.data.profile.chemistryscore !== 0 && data.data.profile.chemistryscore !== null) {
                setChem(data.data.profile.chemistryscore);
            }
            if (data.data.profile.biologyscore !== 0 && data.data.profile.biologyscore !== null) {
                console.log("masuk sini");
                setBio(data.data.profile.biologyscore);
            }

        } catch (error) {
            console.log(error);
        }

    }

    const data = {
        labels: ["Math", "Physics", "Chem", "Bio"],
        datasets: [
            {
                data: [math, phy, chem, bio]
            }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional

    };
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <BarChart
                    // style={graphStyle}
                    data={data}
                    width={screenWidth}
                    height={screenHeight}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    fromZero={true}
                // verticalLabelRotation={30}
                />
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
