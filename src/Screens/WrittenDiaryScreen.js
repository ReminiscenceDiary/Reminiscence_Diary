import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity , Pressable, TouchableWithoutFeedback, Modal} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WrittenDiaryScreen({route, navigation}) {
  const [diaryInfo, setDiaryInfo] = useState({});
  const [keyword, setKeyword] = useState(' ');
  const [Diary, setDiary] = useState(' ');
  const [diarys, setDiarys] = useState({});
  const [summary, setSummary] = useState(' ');
  const [sumView, setSumview] = useState(false);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('');
  const [modalVisible2, setModalVisible2] = useState(false);

    useEffect(() => {
      if (isFocused) {
          const firstLoad = async () => {
            try {
              setLoading(true);
              const id = route.params['date']
              const loadedDiarys = await AsyncStorage.getItem('diarys')
              if(loadedDiarys){
                setDiaryInfo(JSON.parse(loadedDiarys))
                const DiaryInfo = JSON.parse(loadedDiarys)
                const loadedColors = await AsyncStorage.getItem('colors')
                const ColorInfo = JSON.parse(loadedColors)
                const currentColors = Object.assign(ColorInfo)
                const currentDiarys = Object.assign(DiaryInfo)
                setKeyword(currentDiarys[id].keyword)
                setColor(currentColors[currentDiarys[id].emotion])
                setDiary(currentDiarys[id].diary)
                setSummary(currentDiarys[id].summary)
                }
              }
              catch (err) {
              throw err;
            }
          }
          firstLoad()
        }
      }, [isFocused]);

  const _saveDiarys = async diarys => {
    try{
        await AsyncStorage.setItem('diarys', JSON.stringify(diarys));
        setDiarys(diarys);
    }catch(e) {
        console.error(e);
    }
};
  
  const deleteDiary = () => {
    console.log('a')
    console.log(diaryInfo)
    const currentDiarys = Object.assign(diaryInfo)
    if(currentDiarys){
      console.log(currentDiarys)
      delete currentDiarys[route.params['date']]
    _saveDiarys(currentDiarys)
  }
}

  return(
    <View style = {styles.container}>
      <View style = {styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={35} color="black" />
        </TouchableOpacity>
        <Text style = {{fontSize: 25,  fontWeight: '500' }}>{route.params['date'].replace(/-/gi , '/').concat(' ', moment(route.params['date']).format('dddd').slice(0, 3))}</Text>
        <TouchableOpacity onPress={() => setModalVisible2(!modalVisible2)}>
          <Ionicons name="ellipsis-vertical" size={25} color="black" />
        </TouchableOpacity>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible2}
            onBackdropPress={() => this.closeModal()}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible2(!modalVisible2);
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible2(!modalVisible2)
              }}>
              <View>
                <View style={styles.modalView}>
                  {/* Edit, Delete, Share */}
                  <Pressable
                    style={[styles.button, styles.buttonFunction]}
                    onPress={() => {
                      navigation.navigate('EditDiaryScreen', {date: route.params['date']})
                    }}
                  >
                    <Text style={styles.btntextStyle}>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonFunction]}
                    onPress={() => {
                    deleteDiary()
                    navigation.navigate('CalendarScreen')
                    }}
                  >
                    <Text style={styles.btntextStyle}>Delete</Text>
                  </Pressable>

                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
      </View>
     <View style = {styles.g}>
        <View style = {styles.mid}>
          <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 45, backgroundColor: color, overflow: 'hidden'}} />
          <Text style={{fontSize: 20}}>{keyword}</Text>
        </View>
        {!sumView && <TouchableOpacity onPress={()=>{setSumview(true)}}>
            <Text style={styles.summary_btn}>Show summary sentence!</Text>
        </TouchableOpacity>}
        {sumView &&
          <View style={styles.summary}> 
            <Text style={{fontSize: 20}}>{summary}</Text>
            <TouchableOpacity onPress={()=>{setSumview(false)}}>
                <Ionicons name="close-outline" size={30} color="red" />
            </TouchableOpacity>
          </View>
        }
        <Text style={styles.input}>{Diary}</Text>
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
      height: '15%',
      alignItems: "center",
    },
    g: {
      alignItems: "center",
      height:'90%',
    },
    mid: {
      flex: 1,
      flexDirection: 'row',
      height: '1%',
      width:'40%',
      justifyContent: 'space-around',
      alignItems: "center",
    },
  summary: {
    flex: 1,
    flexDirection: 'row',
    height: '1%',
    alignItems: "center",
  },
  input: {
    margin: 15,
    width: 350,
    height: '85%',
    borderColor: "black",
    backgroundColor: 'white',
    borderWidth: 2,
    textAlignVertical: 'top',
    padding: 10,
  },
  summary_btn:{
    textDecorationLine: 'underline',
    fontSize: 18
  },
  modalView: {
    margin: 0,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    padding: 20,
    width: '30%',
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position:"absolute",
    right: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonFunction: {
      borderRadius: 0,
      backgroundColor: "#E6E6E6",
  },
  btntextStyle: {
    color: "black",
    fontSize: 18,
    textAlign: "center"
  },
});

export default WrittenDiaryScreen;