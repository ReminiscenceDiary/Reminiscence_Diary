import React, {useState, useEffect} from 'react';
import {StatusBar, SafeAreaView, StyleSheet, Text, View, TouchableOpacity , Pressable, TouchableWithoutFeedback, Keyboard, TextInput, Image} from 'react-native';
import moment from "moment";
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage';

function StatisticsScreen() {
  const options = [
    { label: "Daily", value: "Daily"},
    { label: "Monthly", value: "Monthly"},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.graphView}>
        <SwitchSelector
          style={{width: '90%'}}
          options={options}
          initial={0}
          textColor={"grey"}
          selectedColor={"black"}
          buttonColor={"white"}
          borderRadius={10}
          backgroundColor={'#e2e2e2'}
          borderColor={'#e2e2e2'}
          height={50}
          fontSize={20}
          hasPadding={true}
          isOptionDisabled={(options) => options.disabled}
          onPress={value => {}}
        />
        </View>
        <View style={styles.rankingView}>
        <View style={styles.content}>
          <Text style={styles.rankingTitle}>Keywords ranking</Text>
        <View style={styles.Row}>
          <View style={{flex: 1, alignItems: 'flex-end'}}><Text style = {styles.rankingorder}>1st</Text></View>
          <View style={{flex: 2}}/>
          <View style={{flex: 2, alignItems: 'flex-start'}}><Text style = {styles.rankingorder}>keyword1</Text></View>
        </View>
        <View style={styles.Row}>
          <View style={{flex: 1, alignItems: 'flex-end'}}><Text style = {styles.rankingorder}>2nd</Text></View>
          <View style={{flex: 2}}/>
          <View style={{flex: 2, alignItems: 'flex-start'}}><Text style = {styles.rankingorder}>keyword2</Text></View>
        </View>
        <View style={styles.Row}>
          <View style={{flex: 1, alignItems: 'flex-end'}}><Text style = {styles.rankingorder}>3rd</Text></View>
          <View style={{flex: 2}}/>
          <View style={{flex: 2, alignItems: 'flex-start'}}><Text style = {styles.rankingorder}>keyword3</Text></View>
        </View>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'rgba(249, 235, 200, 0.11)',
    ustifyContent: 'center',
    padding: 20,
  },
  graphView:{
    flex: 4,
    alignItems: 'center',
    paddingTop:15,
    paddingBottom: 15,
  },
  rankingView:{
    flex: 3,
    alignItems: 'center', 
  },
  Row: {
    flex: 1,
    width:'85%',
    flexDirection:'row',
    alignItems: 'center',
  },
  content:{
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankingTitle:{
    alignItems: 'center',
    textDecorationLine: 'underline',
    fontSize: 25
  },
  rankingorder:{
    fontSize: 20,  
    fontWeight: "400",
  },
})


export default StatisticsScreen;