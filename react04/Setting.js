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
        <View style={styles.Setting}>
          <Text style={styles.SettingText}>
            Setting
          </Text>
        </View>
        <View style={styles.Menu}>
          <View style={styles.left}>
            <View style={styles.Select}>
              <Text style={styles.text}>
                Select Color for emotion
              </Text> 
            </View>
            <View style={styles.Password}>
              <Text style={styles.text}>
                Password
              </Text>  
            </View>
            <View style={styles.Change}>
              <Text style={styles.text}>
                Change Password
              </Text>
            </View>
            <View style={styles.Notification}>
              <Text style={styles.text}>
                Notification
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.right2}>
              <TouchableOpacity>
                <Image style={styles.icon} source={require('./icon/arrow.png')}/>
              </TouchableOpacity>
            </View>
            <View style={styles.right2}>
              <TouchableOpacity>
                <Image style={styles.icon} source={require('./icon/arrow.png')}/>
              </TouchableOpacity>
            </View>
            <View style={styles.right2}>
              <TouchableOpacity>
                <Image style={styles.icon} source={require('./icon/arrow.png')}/>
              </TouchableOpacity>
            </View>
            <View style={styles.right2}>
              <TouchableOpacity>
                <Image style={styles.icon} source={require('./icon/arrow.png')}/>
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
  Setting:{
    flex: 1,
    backgroundColor:'rgba(249, 235, 200, 0.11)',
    justifyContent:'center',
    alignItems:'center',
  },
  SettingText:{
    alignItems: 'center',
    fontSize: 40,
    fontWeight:'bold',
    color:'black',
    marginRight:'15%',
    marginLeft: '15%',
  },
  Menu:{
    flex:3,
    flexDirection:'row',
    backgroundColor:'rgba(249, 235, 200, 0.11)',
    justifyContent:'center',
  },
  left:{
    flex:4,
    backgroundColor:'rgba(249, 235, 200, 0.11)',
  },
  right:{
    flex:1,
    backgroundColor:'rgba(249, 235, 200, 0.11)',
  },
  right2:{
    flex:1,
    justifyContent:'center',
  },
  Select:{
    flex:1,
    justifyContent:'center',
  },
  Password:{
    flex:1,
    justifyContent:'center',
  },
  Change:{
    flex:1,
    justifyContent:'center',
  },
  Notification:{
    flex:1,
    justifyContent:'center',
  },
  text:{
    alignItems:'flex-start',
    fontSize: 25,
    fontWeight:'normal',
    color:'black',
    marginLeft:'10%',  
  },
  icon:{
    justifyContent:'center',
    alignItems:'flex-end',
    height:'55%',
    width:'55%',
    resizeMode:'contain',
    marginTop:15,
  },
});