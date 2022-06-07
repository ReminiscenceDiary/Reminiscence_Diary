import React, {useState , useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SelectColorScreen({route, navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [emotionName, setModalEmotionName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
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

const EditColor = (emotion, color) => {
  try{
    const newColorObject = {
      Happy: color_H, Angry: color_A, Gloomy: color_G, Sad: color_S
      };
      if(Object.values(newColorObject).includes(color)){
        alert("You already used this color for other emotion!")
        return
      }
      else{
        newColorObject[emotion] = color
        _saveColors({...colors, ...newColorObject})
        setColor_H(newColorObject.Happy)
        setColor_A(newColorObject.Angry)
        setColor_G(newColorObject.Gloomy)
        setColor_S(newColorObject.Sad)
        setModalVisible(!modalVisible)
      }
  }catch(e) {
      console.error(e);
  }
}

  useEffect(() => {
    if (isFocused) {
        const firstLoad = async () => {
          try {
            setLoading(true);
            const loadedColors = await AsyncStorage.getItem('colors')
            if(!loadedColors){
              const newColorObject = {
                Happy: '#3F9D2F', Angry: '#FA7470', Gloomy: '#AAAAAA', Sad: '#439DBB'
              };
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
            }
            catch (err) {
            throw err;
          }
        }
        firstLoad()
      }
    }, [isFocused]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
        }}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <View style={styles.modalTop}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>< Ionicons name="chevron-back" size={35} color="black" /></TouchableOpacity>
          <Text style={styles.emotion}>{emotionName}</Text>
        </View>
        <View style={styles.Row2}>
          <TouchableOpacity style = {[{ backgroundColor:'#FA7470', borderWidth: (selectedColor  === '#FA7470') ? 2 : 0}, styles.button2]} onPress={()=>{setSelectedColor('#FA7470')}} />
          <TouchableOpacity style = {[{ backgroundColor:'#F5DF99', borderWidth: (selectedColor  === '#F5DF99') ? 2 : 0}, styles.button2]} onPress={()=>{setSelectedColor('#F5DF99')}} />
          <TouchableOpacity style = {[{ backgroundColor:'#439DBB', borderWidth: (selectedColor  === '#439DBB') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#439DBB')}} />
          <TouchableOpacity style = {[{ backgroundColor:'#E2E2E2', borderWidth: (selectedColor  === '#E2E2E2') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#E2E2E2')}} />
        </View>
        <View style={styles.Row2}>
          <TouchableOpacity style = {[{ backgroundColor:'#FCB9B8', borderWidth: (selectedColor  === '#FCB9B8') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#FCB9B8')}} />
          <TouchableOpacity style = {[{ backgroundColor:'#BDD387', borderWidth: (selectedColor  === '#BDD387') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#BDD387')}} />
          <TouchableOpacity style = {[{ backgroundColor:'#2B59A2', borderWidth: (selectedColor  === '#2B59A2') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#2B59A2')}} />
          <TouchableOpacity style = {[{ backgroundColor:'#AAAAAA', borderWidth: (selectedColor  === '#AAAAAA') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#AAAAAA')}} />
      </View>
        <View style={styles.Row2}>
          <TouchableOpacity style = {[{ backgroundColor:'#F5A44D', borderWidth: (selectedColor  === '#F5A44D') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#F5A44D')}} />
          <TouchableOpacity style = {[{ backgroundColor:'#3F9D2F', borderWidth: (selectedColor  === '#3F9D2F') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#3F9D2F')}} />
          <TouchableOpacity style = {[{ backgroundColor:'#A997C4', borderWidth: (selectedColor  === '#A997C4') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#A997C4')}} />
          <TouchableOpacity style = {[{ backgroundColor:'#383838', borderWidth: (selectedColor  === '#383838') ? 2 : 0 }, styles.button2]} onPress={()=>{setSelectedColor('#383838')}} />
        </View>
      <View style={{alignItems:'flex-end'}}>
      <TouchableOpacity style={{backgroundColor: 'white', width: 70, borderColor: 'black', borderWidth: 2, alignItems: 'center'}} onPress={()=>{EditColor(emotionName, selectedColor)}}>
        <Ionicons name="checkmark-outline" size={35} color="black" />
      </TouchableOpacity>
      </View>
    </View>
    </View>
      </Modal>
      <View style={styles.container}>
      <View style={styles.Top}>
        <View style={{flex: 1, alignItems: 'flex-start'}}><TouchableOpacity onPress={() => navigation.goBack()}>< Ionicons name="chevron-back" size={35} color="black" /></TouchableOpacity></View>
        <View style={{flex: 7, alignItems: 'flex-start'}}><Text style = {{fontSize: 25,  fontWeight: "700" }}>Select Color for emotion</Text></View>
      </View>
      <View style={styles.content}>
        <View style={styles.Row}>
          <View style={{marginRight: 20, flex: 5, alignItems: 'flex-end'}}><Text style = {{ fontSize: 25,  fontWeight: "400" }}> Happy </Text></View>
          <View style={{margin: 40, flex: 4, alignItems: 'center'}}><TouchableOpacity style={[{backgroundColor: color_H}, styles.button]} onPress={() => {setModalEmotionName('Happy'); setModalVisible(!modalVisible); setSelectedColor(color_H)}} /></View>
        </View>
        <View style={styles.Row}>
          <View style={{marginRight: 20, flex: 5, alignItems: 'flex-end'}}><Text style = {{ fontSize: 25,  fontWeight: "400"}}> Angry </Text></View>
          <View style={{margin: 40, flex: 4, alignItems: 'center'}}><TouchableOpacity style={[{backgroundColor:color_A}, styles.button]} onPress={() => {setModalEmotionName('Angry'); setModalVisible(!modalVisible); setSelectedColor(color_A)}} /></View>
        </View>
        <View style={styles.Row}>
          <View style={{marginRight: 20, flex: 5, alignItems: 'flex-end'}}><Text style = {{ fontSize: 25,  fontWeight: "400" }}> Gloomy</Text></View>
          <View style={{margin: 40, flex: 4, alignItems: 'center'}}><TouchableOpacity style={[{backgroundColor:color_G}, styles.button]} onPress={() => {setModalEmotionName('Gloomy'); setModalVisible(!modalVisible); setSelectedColor(color_G)}} /></View>
        </View>
        <View style={styles.Row}>
          <View style={{marginRight: 20, flex: 5, alignItems: 'flex-end'}}><Text style = {{ fontSize: 25,  fontWeight: "400" }}> Sad</Text></View>
          <View style={{margin: 40, flex: 4, alignItems: 'center'}}><TouchableOpacity style={[{backgroundColor:color_S}, styles.button]} onPress={() => {setModalEmotionName('Sad'); setModalVisible(!modalVisible); setSelectedColor(color_S)}} /></View>
        </View>
      </View>
    </View>
  </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgba(249, 235, 200, 0.11)',
  },
  modalTop: {
    flex: 1.1,
    flexDirection: 'row',
    marginTop: 5,
    padding: 5,
  },
  Top:{
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent:'flex-start',
  },
  Row: {
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
  },
  Row2: {
    flex: 1,
    flexDirection:'row',
    margin: 25,
    justifyContent:'space-between',
  },
  content:{
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 20
  },
  button:{
    justifyContent: 'flex-end',
    height:45,
    width:45,
    borderRadius:35,
  },
  button2:{
    height:35, 
    width:35, 
    borderRadius:35
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 0,
    borderColor: "black",
    backgroundColor: 'white',
    borderWidth: 2,
    width: 350,
    height: '55%',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  emotion:{
    alignItems:'flex-start',
    fontSize : 25,
    color: 'black',
    marginBottom: 10,
    marginLeft: 10,
  },
  colorbtn:{
    height:30, 
    width:30, 
    borderRadius:35
  }
});
export default SelectColorScreen;