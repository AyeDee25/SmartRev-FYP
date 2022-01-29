import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, Alert, Button, Pressable, ScrollView, View} from 'react-native';
import {List, ListItem, NativeBaseProvider} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function uploadNote({navigation}) {

  
  const[fileList, setFileList] = useState([]);

    async function chooseFile(){

        
            try {
              const file = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.allFiles],
              })
              
          
            // const path = await normalizePath(file.uri);
            const path = file.uri
            
            const result = await RNFetchBlob.fs.readFile(path, 'base64');
            uploadFileToFirebaseStorage(result, file);

          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err
            }
          }
    }

    //tak tau perlu ke tak
    // async function normalizePath(path){
    //   if(Platform.OS === 'ios' || Platform.OS ==='android'){
    //     const filePrefix = 'content://';
    //   if(path.startsWith(filePrefix)){
    //       path = path.substring(filePrefix.length);
    //       try{
    //         path = decodeURI(path);
    //       }catch(e){}
    //     }
    //   }
    //   return path;
    // }

    async function uploadFileToFirebaseStorage(result, file){
      const uploadTask = storage()
      .ref('Notes/' + file.name)
      .putString(result, 'base64',{contentType:file.type});

      uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            
            break;
          case storage.TaskState.RUNNING: // or 'running'
            
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          saveFileToRealimeDatabase(downloadURL, file);
        });
      }
    );
      
    }

    function saveFileToRealimeDatabase(downloadURL, file){
      const uniqueKey = database().ref().push().key;
      database().ref('Notes/' + uniqueKey).update({
        fileName: file.name,
        fileType: file.type,
        fileURL: downloadURL,
      })
    }

    useEffect(() => {

      setFileList([]);

      const onChildAdded = database().ref('Notes').on('child_added',(snapshot)=>{
        let helperArr = [];
        helperArr.push(snapshot.val());
        setFileList((files)=>[...files,...helperArr])
        
      })
      return()=> database().ref('Notes').off('child_added', onChildAdded);
      }, []);


  return (
    <NativeBaseProvider>

    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.container}>

       
      <Pressable style={styles.button} onPress={chooseFile}>
        <Icon name="upload" size={50} color={'black'}></Icon>
          <Text style={styles.text}>Select File</Text>
      </Pressable>

          {
            fileList.map((item, index) => {
                return(
                  <View style ={styles.list} key = {index}>
                          
                          <Text style = {styles.title} onPress={() => navigation.navigate('filePreview',{
                            fileData: item,
                          })}>
                              {item.fileName}
                          </Text>

                  </View>

                )


            })
          //   fileList.map((item, index) => {
          //    <List>
          //       <ListItem>
          //         <Text>
          //         {item.fileName}
          //         </Text>
          //       </ListItem>
          //     </List>


          // })



          }  
          

        </View>

      </ScrollView>
    </SafeAreaView>  

    </NativeBaseProvider>
  );
}

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
