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
        <View style={styles.Medium}>
          <View style={styles.box}>
            <Text style={styles.emotion}>
              Happy
            </Text>
          </View>
          <View style={styles.Row}>
              <TouchableOpacity style = {{ backgroundColor:'green', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
              <TouchableOpacity style = {{ backgroundColor:'crimson', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
              <TouchableOpacity style = {{ backgroundColor:'gray', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
              <TouchableOpacity style = {{ backgroundColor:'skyblue', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
          </View>
          <View style={styles.Row}>
              <TouchableOpacity style = {{ backgroundColor:'greenyellow', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
              <TouchableOpacity style = {{ backgroundColor:'orange', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
              <TouchableOpacity style = {{ backgroundColor:'lightgray', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
              <TouchableOpacity style = {{ backgroundColor:'navy', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
          </View>
          <View style={styles.Row}>
              <TouchableOpacity style = {{ backgroundColor:'yellow', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
              <TouchableOpacity style = {{ backgroundColor:'lightpink', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
              <TouchableOpacity style = {{ backgroundColor:'black', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
              <TouchableOpacity style = {{ backgroundColor:'purple', justifyContent:'center', alignItems:'flex-end', height:45, width:45, borderRadius:35, marginLeft:15, marginRight:15, marginBottom: 15,}}>
              </TouchableOpacity>
          </View>
          <View style={styles.box2}>
            <TouchableOpacity>
              <Image style={styles.icon2} source={require('./icon/checked.png')}/>
            </TouchableOpacity>
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
  Medium:{
    flex: 3,
    //flexDirection:'row',
    backgroundColor:'rgba(249, 235, 200, 0.11)',
    justifyContent:'center',
    alignSelf:'center',
    width : '90%',
    height : '90%',
    borderColor : 'black',
    borderWidth : 1,
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
  box:{
    flex: 1,
    justifyContent:'flex-start',
    alignSelf:'flex-start',
    marginTop : 15,
    marginLeft : 15,
    marginRight : 15,
  },
  box2:{
    flex: 1,
    justifyContent:'flex-end',
    alignSelf:'flex-end',
    marginTop : 15,
    marginRight:61,
  },
  Row:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'center',
    marginLeft : 15,
    marginRight : 15,
  },
  emotion:{
    alignItems:'flex-start',
    fontSize : 25,
    color: 'black',
    marginLeft: 30,
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
  icon2:{
    justifyContent:'center',
    alignItems:'center',
    height:'150%',
    width:'150%',
    resizeMode:'contain',
    marginBottom: 10,
    marginRight: 30,
  },
});