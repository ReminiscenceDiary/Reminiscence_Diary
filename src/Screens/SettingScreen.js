import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SettingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <View><Text style = {{fontSize: 40,  fontWeight: "600" }}>Settings </Text></View>
      </View>
      <View style={styles.content}>
        <View style={styles.Row}>
          <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {{ fontSize: 22,  fontWeight: "400" }}> Select Color for emotion </Text></View>
          <View style={{flex: 2, alignItems: 'center'}}><TouchableOpacity onPress={() => navigation.navigate("SelectColorScreen")}>< Ionicons name="chevron-forward-outline" size={35} color="black" /></TouchableOpacity></View>
        </View>
        <View style={styles.Row}>
          <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {{ fontSize: 22,  fontWeight: "400"}}> Password </Text></View>
          <View style={{flex: 2, alignItems: 'center'}}><TouchableOpacity >< Ionicons name="chevron-forward-outline" size={35} color="black" /></TouchableOpacity></View>
        </View>
        <View style={styles.Row}>
          <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {{ fontSize: 22,  fontWeight: "400" }}> Notification </Text></View>
          <View style={{flex: 2, alignItems: 'center'}}><TouchableOpacity >< Ionicons name="chevron-forward-outline" size={35} color="black" /></TouchableOpacity></View>
        </View>
        <View style={styles.Row}>
          <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {{ fontSize: 22,  fontWeight: "400" }}> How To Use </Text></View>
          <View style={{flex: 2, alignItems: 'center'}}><TouchableOpacity onPress={() => navigation.navigate("HowtoUseScreen")}>< Ionicons name="chevron-forward-outline" size={35} color="black" /></TouchableOpacity></View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgba(249, 235, 200, 0.11)',
    padding: 30
  },
  Top:{
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    margin: 30, 
  },
  Row: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
  },
  content:{
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30
  },
});
export default SettingScreen;