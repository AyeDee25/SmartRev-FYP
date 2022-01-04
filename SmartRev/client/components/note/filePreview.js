import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf'

const FilePreview = ({route}) => {
    console.log(route.params.fileData);

    return(
        <SafeAreaView style={styles.container}>

        {route.params.fileData.fileType=='application/pdf' &&(
            <Pdf
                source = {{uri: route.params.fileData.fileURL}}
                style = {{
                    flex:1,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,

                }}
                resizeMode={'contain'}
            />

        )}
        </SafeAreaView>
    )

};

export default FilePreview;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#252c4a',
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
      // position: 'absolute',
      // top:0,
   
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
      color: 'black'
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
    },
  
    list: {
      borderWidth: 5, 
      borderColor: 'black', 
      marginVertical: 2, 
      width: 400,
      backgroundColor: 'white'
    },
  
  
  });
  