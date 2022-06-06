import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import moment from "moment";
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage';
import lexrank from 'lexrank.js'
import Ionicons from 'react-native-vector-icons/Ionicons';

function AddDiaryScreen({route, navigation}) {
    const [diary, setDiary] = useState('')
    const [emotion, setEmotion] = useState('')
    const [keyword, setKeyword] = useState('')
    const d = moment(route.params['date']).format('dddd');
    const [keywordview, setKeywordview] = useState(false);
    const [diarys, setDiarys] = useState({});
    const [color_H, setColor_H] = useState('');
    const [color_A, setColor_A] = useState('');
    const [color_S, setColor_S] = useState('');
    const [color_G, setColor_G] = useState('');
    const [colors, setColors] = useState({});


    const _saveColors = async colors => {
      try{
          await AsyncStorage.setItem('colors', JSON.stringify(colors));
          setColors(colors);
      }catch(e) {
          console.error(e);
      }
  }

  const block = () =>{
    if(diary.length === 0){
      return true;
    }
    else
      return false;
  }

  const options_emotion= [
    { label: "own", value: "own_e"},
    { label: "auto", value: "auto_e" , disabled: block()},
  ];

  const options_keyword = [
    { label: "own", value: "own_k" },
    { label: "auto", value: "auto_k" , disabled: block()},
  ];
  
    

    const diaryChangetext = text =>{ /*task에 text가 변할때마다 task에 그 값을 넣어줌 */
      setDiary(text);
    }

    const keywordChangetext = text => { /*comment에 text가 변할때마다 task에 그 값을 넣어줌 */
      setKeyword(text);
    }

    useEffect(() => {
      const firstLoad = async () => {
          try {
          const loadedDiarys = await AsyncStorage.getItem('diarys');
          setDiarys(JSON.parse(loadedDiarys || '{}'));
          const loadedColors = await AsyncStorage.getItem('colors')
            if(!loadedColors){
              const newColorObject = {
                Happy: '#3F9D2F', Angry: '#FA7470', Gloomy:'#AAAAAA', Sad: '#439DBB'
              }
              _saveColors({...colors, ...newColorObject});
              setColor_H('#3F9D2F')
              setColor_A('#FA7470')
              setColor_S('#439DBB')
              setColor_G('#AAAAAA')
            }
            else{
              const ColorInfo = JSON.parse(loadedColors)
              const currentColors = Object.assign(ColorInfo)
              setColor_H(currentColors.Happy)
              setColor_A(currentColors.Angry)
              setColor_S(currentColors.Sad)
              setColor_G(currentColors.Gloomy)
              }
            } catch (err) {
              console.log(err);
          }
      };
    firstLoad();
    });

    const _saveDiarys = async diarys => {
      try{
          await AsyncStorage.setItem('diarys', JSON.stringify(diarys));
          setDiarys(diarys);
      }catch(e) {
          console.error(e);
      }
  };

  function PressSubmit() {
    if(diary.length === 0){
      alert('You should write your diary first')
      return
    }
    if(!emotion){
      alert('You should select your emotion')
      return
    }
    else{
      const ID = route.params['date'];
      console.log(ID);
      const newDiaryObject = {
        [ID]: {date: route.params['date'], diary: diary, emotion: emotion, keyword: keyword, summary: sumDiary(diary)},
      };
      _saveDiarys({...diarys, ...newDiaryObject});
      navigation.navigate('CalendarScreen');
    }
    }

    const sumDiary = (text) => {
      var summary = lexrank(text)[0][0].text
      return summary
    };

    const diaryKeyword = (text) => {
      console.log(text);
      const keyword_extractor = require("keyword-extractor");
      var keyword = Object.values(keyword_extractor.extract(text,{
          language:"english",
          remove_digits: true,
          return_changed_case: true,
          remove_duplicates: true
      }));
      const stopword = ['today', 'yesterday', 'happy', 'sad', 'gloomy']
      var newkeyword = keyword.filter(word => !(stopword.includes(word)));
      console.log(newkeyword)
      return newkeyword[0]
    }

    const sentiment = (text) => {
      var emotion = ''
      const analyse = require("simple-sentiment-lib");
      var result = analyse(text);
      if (result["negative"]["comparative"] > result["positive"]["comparative"])
        emotion = 'Angry';
      else
        emotion = 'Happy';
      return emotion
    }
    
    return (
            <View style = {styles.container}>
              <View style = {styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>< Ionicons name="chevron-back" size={35} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={() => PressSubmit()}><Text style = {{fontSize: 20,  fontWeight: '500'}}>Done</Text></TouchableOpacity>
              </View>
              <View style = {styles.date}>
                <Text style = {{fontSize: 25,  fontWeight: '500' }}>{route.params['date'].replace(/-/gi , '/').concat(' ', moment(route.params['date']).format('dddd').slice(0, 3))}</Text>
              </View>
              <View style = {styles.input_d}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <TextInput
                      style={styles.input}
                      placeholder=" Write a diary here..."
                      placeholderTextColor= {"#898989"}
                      autoCapitalize= 'none'
                      autoCorrect= {false}
                      value ={diary}
                      multiline={true}
                      onChangeText ={diaryChangetext}
                      >
                  </TextInput> 
                </TouchableWithoutFeedback>
              </View>
              <View style = {styles.emotion}>
                <View style = {styles.mid}>
                  <Text style = {{fontSize: 20,  fontWeight: '500'}}>Emotion</Text>     
                  <SwitchSelector
                    style={{width: 200}}
                    options={options_emotion}
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
                    isOptionDisabled={(options) => options.disabled}
                    onPress={(value, disabled) => {if(value == 'auto_e' && !disabled) setEmotion(sentiment(diary)); else setEmotion(' ')}}
                  />
                </View>
                <View style = {styles.emotionBtn}> 
                  <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style = {[{ backgroundColor: color_H , borderWidth: (emotion  === 'Happy') ? 2 : 0 }, styles.roundButton]} onPress={()=>{setEmotion('Happy')}}/> 
                      <Text style = {{fontSize: 13}}>Happy</Text>
                    </View>
                    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style = {[{ backgroundColor: color_A , borderWidth: (emotion  === 'Angry') ? 2 : 0 }, styles.roundButton]} onPress={()=>{setEmotion('Angry')}}/> 
                      <Text style = {{fontSize: 13}}>Angry</Text>
                    </View>
                    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style = {[{ backgroundColor: color_G , borderWidth: (emotion  === 'Gloomy') ? 2 : 0 }, styles.roundButton]} onPress={()=>{setEmotion('Gloomy')}}/> 
                      <Text style = {{fontSize: 13}}>Gloomy</Text>
                    </View>
                    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style = {[{ backgroundColor: color_S , borderWidth: (emotion  === 'Sad') ? 2 : 0 }, styles.roundButton]} onPress={()=>{setEmotion('Sad')}}/>
                      <Text style = {{fontSize: 13}}>Sad</Text>
                    </View>
                  </View>
              </View>
              <View style = {styles.keyword}>
                <View style = {styles.mid}>
                  <Text style = {{fontSize: 20,  fontWeight: '500'}}>Keyword</Text>     
                  <SwitchSelector
                    style={{width: 200}}
                    options={options_keyword}
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
                    isOptionDisabled={(options) => options.disabled}
                    onPress={(value, disabled) => {if(value == 'auto_k'&& !disabled) {setKeywordview(true); setKeyword(diaryKeyword(sumDiary(diary)))} else setKeywordview(false)}}
                  />
                </View>
                {keywordview && 
                  <TextInput style={styles.input2} value={diaryKeyword(sumDiary(diary))} editable={false}/>}
                {!keywordview && 
                <TextInput
                  style={styles.input2}
                  placeholder="keyword..."
                  placeholderTextColor= {"#898989"}
                  autoCapitalize= 'none'
                  autoCorrect= {false}
                  value ={keyword}
                  onChangeText ={keywordChangetext}
                />}
            </View>
      </View>
  );
}
   
const styles = StyleSheet.create({
  container: {/*칸 나누기 용 */
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(249, 235, 200, 0.11)'
  },
  top: {
    height: '5%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  date: {
    height: '5%',
    alignItems: "center",
  },
  input_d: {
    flex: 7,
    alignItems: "center",
  },
  emotion:{
    height: '15%',
    alignItems: "center",
  }, 
  keyword:{
    flex: 2,
    alignItems: "center",
  }, 
  input: {
    flex: 1,
    margin: 15,
    width: 350,
    borderColor: "black",
    backgroundColor: 'white',
    borderWidth: 2,
    textAlignVertical: 'top',
    padding: 10,
  },
  mid: {
    height: '40%',
    width: 350,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  }, 
  emotionBtn: {
    height: '60%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: "center",
  },
  roundButton: {
    width: 10, 
    height: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 10, 
    borderRadius: 100,
  },
  input2: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
  },
});

export default AddDiaryScreen;