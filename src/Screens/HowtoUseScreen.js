import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function HowtoUseScreen({route, navigation}) {
  return(
    <View style={styles.container}>
       <View style={styles.Top}>
        <View style={{flex: 1, alignItems: 'flex-start'}}><TouchableOpacity onPress={() => navigation.goBack()}>< Ionicons name="chevron-back" size={35} color="black" /></TouchableOpacity></View>
        <View style={{flex: 7, alignItems: 'flex-start'}}><Text style = {{fontSize: 22,  fontWeight: "700" }}>How To Use</Text></View>
      </View>
      <View style={styles.content}>
      <View style={styles.detail}>
        <Text style={styles.title}>How to select own color for emotion</Text>
        <Text style={styles.item}>1. Click Setting icon on the left of the bottom</Text>
        <Text style={styles.item}>2. Click the button next to 'Select Color for emotion'</Text>
        <Text style={styles.item}>3. Click the circle button on the right of the feeling you want to change the color.</Text>
        <Text style={styles.item}>4. Click the circle button of color what you want to change to.</Text>
      </View>
      <View style={styles.detail}>
      <Text style={styles.title}>How to check short summary sentence</Text>
      <Text style={styles.item}>1. On the main screen, click the date that you want to check summary sentence.</Text>
      <Text style={styles.item}>2. Click the button on the right of 'Show short summary sentence'.</Text>
      <Text style={styles.item}>3. Click the same button again to hide the summary sentence.</Text>
    </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 235, 200, 0.11)',
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
  title:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    justifyContent: 'center',
    marginBottom: 15,
  },
  item:{
    fontSize: 15,
    color: 'black',
    marginBottom: 10,
  },
  content:{
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  detail:{
    flex: 1,
    justifyContent: 'flex-start',
  }
});

export default HowtoUseScreen;