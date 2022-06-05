import React, { useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { StyleSheet, View } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalendarScreen({ navigation }) {
  
  const [markedDates, setmarkedDates] = useState({});
  const isFocused = useIsFocused();
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (isFocused) {
        const firstLoad = async () => {
          try {
            const loadedDiarys = await AsyncStorage.getItem('diarys');
            if(loadedDiarys){
              const loadedColors = await AsyncStorage.getItem('colors')
              const diaryInfo = Object.values(JSON.parse(loadedDiarys));
              const ColorInfo = JSON.parse(loadedColors)
              const currentColors = Object.assign(ColorInfo)
              const b = diaryInfo.reduce((acc, current) => {
                const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
                acc[formattedDate] = {marked: true, keyword: current.keyword, colors: currentColors[current.emotion]};
                return acc;
              }, {});
              if(Object.entries(diaryInfo).length > 0)
                setmarkedDates(b);
            }
            else setIsEmpty(true)
          }catch (err) {
            throw err;
        }
      }
      setLoading(true);
      firstLoad()
    }
  }, [isFocused]);

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );


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
              if(Object.keys(markedDates).includes(day.dateString)){
                navigation.navigate('WrittenDiaryScreen', {date: day.dateString})
                setLoading(false);
              }
              else{
                navigation.navigate('AddDiaryScreen', {date: day.dateString})
                setLoading(false);
              }
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