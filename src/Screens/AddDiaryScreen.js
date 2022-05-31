/*항목 생성 screen */
import React, {useState, useEffect} from 'react';
// import {useIsFocused } from '@react-navigation/native';
import {StatusBar, SafeAreaView, StyleSheet, Text, View, TouchableOpacity , Pressable, TouchableWithoutFeedback, Keyboard, TextInput, Image} from 'react-native';
import moment from "moment";
// import { AddTask, AddComment } from '../components/Input'
import previous from '../images/previous.png'
import SwitchSelector from "react-native-switch-selector";

function AddDiaryScreen({route, navigation}) {
    const [loading, setLoading] = useState(false);
    const [emotion, setEmotion] = useState(' ');
    const d = moment(route.params['date']).format('dddd');
    const options = [
      { label: "own", value: "own" },
      { label: "auto", value: "auto" },
    ];
    return (
            <View style = {styles.container}>
              <View style = {styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={previous} tintColor='black'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style = {{fontSize: 20,  fontWeight: '500'}}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style = {styles.date}>
                  <Text style = {{fontSize: 25,  fontWeight: '500' }}>{route.params['date'].replace(/-/gi , '/').concat(' ', moment(route.params['date']).format('dddd').slice(0, 3))}</Text>
              </View>
              <View style = {styles.g}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                        style={styles.input}
                        placeholder=" Write a diary here..."
                        placeholderTextColor= {"#898989"}
                        autoCapitalize= 'none'
                        autoCorrect= {false}
                        >
                    </TextInput> 
                  </TouchableWithoutFeedback>
                    <View style = {{ width: '95%', flex: 1, justifyContent: 'center'}}>
                    <View style = {{flex: 1}}>
                      <View style = {styles.mid}>
                        <Text style = {{fontSize: 20,  fontWeight: '500'}}>Emotion</Text>     
                        <SwitchSelector
                          style={{width: 200}}
                          options={options}
                          initial={0}
                          textColor={"grey"}
                          selectedColor={"black"}
                          buttonColor={"white"}
                          borderRadius={10}
                          backgroundColor={'#e2e2e2'}
                          borderColor={'#e2e2e2'}
                          height={35}
                          fontSize={18}
                          hasPadding={true}
                          onPress={value => console.log(`Call onPress with value: ${value}`)}
                        />
                      </View>
                      <View style = {styles.emotion}> 
                        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <TouchableOpacity style={{width: 10, height: 10, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 100, backgroundColor: '#3f9d2f', borderWidth: (emotion === 'Happy') ? 2 : 0}} onPress={()=>{setEmotion('Happy')}}/>
                          <Text style = {{fontSize: 13}}>Happy</Text>
                        </View>
                        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{width: 10, height: 10, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 100, backgroundColor: '#fa7470', borderWidth: (emotion === 'Angry') ? 2 : 0}} onPress={()=>{setEmotion('Angry')}}/>
                          <Text style = {{fontSize: 13}}>Angry</Text>
                        </View>
                        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{width: 10, height: 10, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 100, backgroundColor: '#aaaaaa', borderWidth: (emotion === 'Sad') ? 2 : 0}} onPress={()=>{setEmotion('Sad')}}/>
                          <Text style = {{fontSize: 13}}>Gloomy</Text>
                        </View>
                        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{width: 10, height: 10, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 100, backgroundColor: '#439dbb', borderWidth: (emotion === 'Gloomy') ? 2 : 0}} onPress={()=>{setEmotion('Gloomy')}}/>
                          <Text style = {{fontSize: 13}}>Sad</Text>
                        </View>
                      </View>
                      </View> 
                    <View>
                    <View style = {styles.mid}>
                      <Text style = {{fontSize: 20,  fontWeight: '500'}}>Keyword</Text>     
                      <SwitchSelector
                        style={{width: 200}}
                        options={options}
                        initial={0}
                        textColor={"grey"}
                        selectedColor={"black"}
                        buttonColor={"white"}
                        borderRadius={10}
                        backgroundColor={'#e2e2e2'}
                        borderColor={'#e2e2e2'}
                        height={35}
                        fontSize={18}
                        hasPadding={true}
                        onPress={value => console.log(`Call onPress with value: ${value}`)}
                      />
                    </View>
                    <TextInput
                        style={styles.input2}
                        placeholder=" keyword..."
                        placeholderTextColor= {"#898989"}
                        autoCapitalize= 'none'
                        autoCorrect= {false}
                        >
                    </TextInput>
                  </View>         
                </View>
              </View>
           
            </View>
    );
}
   
const styles = StyleSheet.create({
  container: {/*칸 나누기 용 */
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(249, 235, 200, 0.11)'
    },
    top: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '5%',
      margin: 5
    },
    date: {
      flex: 1,
      alignItems: "center",
      height: '5%',
    },
    g: {
      alignItems: "center",
      height:'90%',
    },
    mid: {
      flex: 1,
      flexDirection: 'row', 
      justifyContent: 'space-between',
    }, 
  input: {
    margin: 15,
    width: 350,
    height: '60%',
    borderColor: "black",
    backgroundColor: 'white',
    borderWidth: 2,
  },
  emotion: {
    height: '70%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  roundButton1: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  input2: {
    width: '100%',
    height: '45%',
    borderColor: "black",
    borderWidth: 2
  },
});

export default AddDiaryScreen;