/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Top}>
          <View style={styles.Back}>
            <TouchableOpacity>
              <Image style={styles.icon} source={require('./icon/arrow2.png')}/>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.Setting}>
              <Text style={styles.SettingText}>
                Select Color for emotion
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.Menu}>
          <View style={styles.left}>
            <View style={styles.Name}>
              <Text style={styles.text}>
                Happy
              </Text> 
            </View>
            <View style={styles.Name}>
              <Text style={styles.text}>
                Angry
              </Text>  
            </View>
            <View style={styles.Name}>
              <Text style={styles.text}>
                Gloomy
              </Text>
            </View>
            <View style={styles.Name}>
              <Text style={styles.text}>
                Sad
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.right2}>
              <TouchableOpacity style={styles.button1}>
              </TouchableOpacity>
            </View>
            <View style={styles.right2}>
              <TouchableOpacity style={styles.button2}>
              </TouchableOpacity>
            </View>
            <View style={styles.right2}>
              <TouchableOpacity style={styles.button3}>
              </TouchableOpacity>
            </View>
            <View style={styles.right2}>
              <TouchableOpacity style={styles.button4}>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.Blank}>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  Blank:{
    flex: 1,
    backgroundColor:'rgba(249, 235, 200, 0.11)',
  },
  Top:{
    flex: 1,
    flexDirection:'row',
    backgroundColor:'rgba(249, 235, 200, 0.11)',
    justifyContent:'center',
  },
  Setting:{
    flex: 8,
    backgroundColor:'rgba(249, 235, 200, 0.11)',
    justifyContent:'center',
    alignItems:'flex-start',
  },
  Back:{
    flex: 1,
    backgroundColor:'rgba(249, 235, 200, 0.11)',
  },
  SettingText:{
    alignItems: 'center',
    fontSize: 27,
    fontWeight:'bold',
    color:'black',
    marginRight:'10%',
    marginLeft: '0%',
  },
  Menu:{
    flex:3,
    flexDirection:'row',
    backgroundColor:'rgba(249, 235, 200, 0.11)',
    justifyContent:'center',
  },
  left:{
    flex:3,
    backgroundColor:'rgba(249, 235, 200, 0.11)',
  },
  right:{
    flex:2,
    backgroundColor:'rgba(249, 235, 200, 0.11)',
  },
  right2:{
    flex:1,
    justifyContent:'center',
  },
  Name:{
    flex:1,
    justifyContent:'center',
  },
  text:{
    alignItems:'center',
    fontSize: 25,
    fontWeight:'normal',
    color:'black',
    marginLeft:'40%',  
  },
  button1:{
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'flex-end',
    height:45,
    width:45,
    borderRadius:35,
  },
  button2:{
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'flex-end',
    height:45,
    width:45,
    borderRadius:35,
  },
  button3:{
    backgroundColor:'gray',
    justifyContent:'center',
    alignItems:'flex-end',
    height:45,
    width:45,
    borderRadius:35,
  },
  button4:{
    backgroundColor:'blue',
    justifyContent:'center',
    alignItems:'flex-end',
    height:45,
    width:45,
    borderRadius:35,
  },
  icon:{
    justifyContent:'center',
    alignItems:'center',
    height:'55%',
    width:'55%',
    resizeMode:'contain',
    marginTop: 35,
    marginLeft: 25,
  },
});