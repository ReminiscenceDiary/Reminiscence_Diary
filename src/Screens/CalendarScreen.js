import React, { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { Button, StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function CalendarScreen({ navigation }) {

  const posts = [
    {
      id: 1,
      keyword: "keyword1",
      contents: "내용입니다.",
      emotion: "blue",
      date: "2022-05-22",
    },
    {
      id: 2,
      keyword: "keyword2",
      contents: "내용입니다.",
      emotion: "red",
      date: "2022-05-28",
    },
    {
      id: 3,
      keyword: "keyword3",
      contents: "내용입니다.",
      emotion: "red",
      date: "2022-05-23",
    }
  ];

  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true, keyword: current.keyword, colors: current.emotion};
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );

  const markedSelectedDates = {
    ...markedDates,
  };

  return (
        <View style = {{backgroundColor: 'rgba(249, 235, 200, 0.11)', height: '100%', justifyContent: "center", alignItems :'center'}}>
          <View style ={{width: '98%'}}> 
            <Calendar 
            style={styles.calendar}
            markedDates={markedDates}
            theme={{
                selectedDayBackgroundColor: '#009688',
                arrowColor: '#009688',
                dotColor: '#009688',
                todayTextColor: 'white',
            }} 
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              console.log(selectedDate);
              navigation.navigate('AddDiaryScreen', {date: day.dateString});
            }}
            />
        </View>
     </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    height: 550,
    backgroundColor: 'transparent'
  },
});