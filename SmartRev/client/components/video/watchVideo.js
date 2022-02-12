import axios from 'axios';
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused } from "@react-navigation/native";

export default function watchVideo({ navigation, route }) {

  const [playing, setPlaying] = useState(false);
  const [arrayvideo, setarrayvideo] = useState([])
  const isFocused = useIsFocused();
  const [code, setcode] = useState(route.params.code);

  useEffect(() => {
    getArrayVideo();
  }, [isFocused]);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);

  const getArrayVideo = async () => {
    try {

      const { data } = await axios.get(`http://10.0.2.2:3006/api/v1/video/${code}`)
      setarrayvideo(data.data.video)



    } catch (error) {
      console.log(error)
    }

  }

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          arrayvideo.map((video, index) => {
            return (
              <View style={styles.video} key={index}>

                <View style={styles.titles}>

                  <Text style={styles.title}>
                    {video.title}
                  </Text>

                </View>

                <YoutubePlayer
                  height={250}
                  play={playing}
                  videoId={video.link}
                  onChangeState={onStateChange}
                />

              </View>
            )
            {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */ }
          })
        }</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A6FB',

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
    fontSize: 40,
    fontWeight: '500',
  },

  video: {
    borderWidth: 5,
    borderColor: 'black',
    marginTop: 10,
    backgroundColor: 'white'

  },
});