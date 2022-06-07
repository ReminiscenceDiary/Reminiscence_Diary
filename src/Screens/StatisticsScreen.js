import React, {useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from "moment";
import { format, parseISO, subMonths, addMonths, set } from "date-fns";
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LineChart, PieChart } from "react-native-chart-kit";
import Ionicons from 'react-native-vector-icons/Ionicons';

function* yLabel() {
  yield* ['Sad', 'Gloomy', 'Angry', 'Happy'];
}

function getSortedArr(array) {
  if (array.length === 0)
    return [[" ", " "], [" ", " "], [" ", " "]]
  
  if (array.length === 0)
    return [array[0], [" ", " "], [" ", " "]]

  const counts = array.reduce((pv, cv)=>{
      pv[cv] = (pv[cv] || 0) + 1;
      return pv;
  }, {});

  const result = [];
  for (let key in counts) {
      result.push([key, counts[key]]);
  }

  result.sort((first, second) => {
      // 정렬 순서 바꾸려면 return first[1] - second[1];
      return second[1] - first[1];
  });

  if (result.length === 2)
    result.push([" ", " "])
  
  console.log(result)
  return result
}

function StatisticsScreen() {

  const options = [
    { label: "Daily", value: "Daily"},
    { label: "Monthly", value: "Monthly"},
  ];
  const [diaryInfo, setDiaryInfo] = useState({});
  const [data_D, setData_D] = useState({});
  const isFocused = useIsFocused();
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [DailyView, setDailyView] = useState(false);
  const [MonthlyView, setMonthlyView] = useState(false);
  const [keywords_D, setKeywords_D] = useState()
  const [KeywordView, setKeywordView] = useState(false);
  const [color_H, setColor_H] = useState('');
  const [color_A, setColor_A] = useState('');
  const [color_S, setColor_S] = useState('');
  const [color_G, setColor_G] = useState('');
  const [data_M, setData_M] = useState({});
  const yLabelIterator = yLabel();
  const [date, setDate] = useState(new Date())
  const [keywords, setKeywords] = useState()

  const emotion = {'Happy': 3, 'Angry': 2, 'Gloomy': 1, 'Sad': 0}

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional,
  };

  const Cal_Monthy = (date) => {
    const kw = []
    const monthTotalDiary = Object.values(diaryInfo).filter(diaryInfo =>moment(diaryInfo.date).format('MM') == format(date, 'MM'))
    for (let i = 0; i < Object.keys(monthTotalDiary ).length; i++) 
      kw.push(monthTotalDiary[i].keyword)
    setKeywords(getSortedArr(kw))
    if(monthTotalDiary){
      setData_M([{
        name: "Happy",
        number: Object.values(monthTotalDiary).filter((diary) => (diary.emotion === 'Happy')).length,
        color: color_H,
        legendFontColor: "black",
        legendFontSize: 15
      },
      {
        name: "Angry",
        number: Object.values(monthTotalDiary).filter((diary) => (diary.emotion === 'Angry')).length,
        color: color_A,
        legendFontColor: "black",
        legendFontSize: 15
      },
      {
        name: "Gloomy",
        number: Object.values(monthTotalDiary).filter((diary) => (diary.emotion === 'Gloomy')).length,
        color: color_G,
        legendFontColor: "black",
        legendFontSize: 15
      },
      {
        name: "Sad",
        number: Object.values(monthTotalDiary).filter((diary) => (diary.emotion === 'Sad')).length,
        color: color_S,
        legendFontColor: "black",
        legendFontSize: 15
  }])
}
}
  useEffect(() => {
    if (isFocused) {
        const firstLoad = async () => {
          try {
            const loadedDiarys = await AsyncStorage.getItem('diarys');
            if(loadedDiarys){
              setDiaryInfo(JSON.parse(loadedDiarys))
              const loadedColors = await AsyncStorage.getItem('colors')
              const diaryInfo = JSON.parse(loadedDiarys);
              const ColorInfo = JSON.parse(loadedColors)
              const kw = []
              const currentColors = Object.assign(ColorInfo)
              const b = Object.keys(diaryInfo).sort().reduce((acc, key) => {
                const d = parseISO(diaryInfo[key].date)
                const formattedDate = format(d, 'MM/dd')
                acc[formattedDate] = emotion[diaryInfo[key].emotion];
                kw.push(diaryInfo[key].keyword)
                return acc;
              }, {});
              setKeywords(getSortedArr(kw))
              setKeywords_D(getSortedArr(kw))   
              if(Object.entries(diaryInfo).length > 0 && Object.entries(ColorInfo).length > 0){
                setData_D(b);              
                setColor_H(currentColors.Happy)
                setColor_A(currentColors.Angry)
                setColor_S(currentColors.Sad)
                setColor_G(currentColors.Gloomy)         
                setKeywordView(true)
            }
            if(MonthlyView){
              setMonthlyView(false)
              setDailyView(true);
              }
            else
              setDailyView(true); 
            } else setIsEmpty(true)
          }catch (err) {
            throw err;
        }
      }
      setLoading(true);
      firstLoad()
    }
  }, [isFocused]);


  return (
      <View style={styles.container}> 
         <View style={styles.month}>
            { MonthlyView && <View style={styles.monthly}>
              <TouchableOpacity onPress={() => {setDate(subMonths(date, 1)); Cal_Monthy(subMonths(date, 1))}}>< Ionicons name="chevron-back" size={35} color="black" /></TouchableOpacity>
              <Text stye ={{fontSize: 30}}>{format(date, 'MMMM')}</Text>
              <TouchableOpacity onPress={() => {setDate(addMonths(date, 1)); Cal_Monthy(addMonths(date, 1))}}>< Ionicons name="chevron-forward-outline" size={35} color="black" /></TouchableOpacity>
            </View>}
          </View>
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
            onPress={value => {if(value === 'Monthly') {Cal_Monthy(date); setDailyView(false); setMonthlyView(true)} else {setMonthlyView(false); setDailyView(true); setKeywords(keywords_D)} }}
            />
          <View style={styles.graph}>
          { DailyView &&<LineChart
                  data={{
                    labels: Object.keys(data_D),
                    datasets: [{data: Object.values(data_D)}]
                  }}
                  segments={3}
                  width={330} // from react-native
                  height={250}
                  withShadow={false}
                  withHorizontalLines={false}
                  withVerticalLines={false}
                  formatYLabel={() => yLabelIterator.next().value}
                  yAxisInterval={1} // optional, defaults to 1
                  verticalLabelRotation={345}
                  getDotColor={(dataPoint, dataPointIndex) => {
                    if (dataPoint === 3) 
                      return color_H;
                    if (dataPoint === 2) 
                      return color_A;
                    if (dataPoint === 1) 
                      return color_G;
                    if (dataPoint === 0) 
                      return color_S;
                    }
                    }
                  chartConfig={{
                    backgroundColor: `rgba(255, 255, 255, 100)`,
                    backgroundGradientFrom: "rgba(255, 255, 255, 100)",
                    backgroundGradientTo: "rgba(255, 255, 255, 100)",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 0) => `black`,
                    labelColor: (opacity = 0) => `black`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: "8",
                      strokeWidth: "2",
                    }
                  }}
                />}

            { MonthlyView && <PieChart
                data={Object.values(data_M)}
                width={320}
                height={220}
                chartConfig={chartConfig}
                accessor={"number"}
                backgroundColor={"white"}
                center={[10, 0]}
                paddingLeft={15}
                absolute
            />} 
            </View>
          </View>
          <View style={styles.rankingView}>
          <View style={styles.content}>
            <Text style={styles.rankingTitle}>Keywords ranking</Text>
            {KeywordView &&<View>
              <View style={styles.Row}>
                <View style={{flex: 1, alignItems: 'flex-end'}}><Text style = {styles.rankingorder}>1st</Text></View>
                <View style={{flex: 2}}/>
                <View style={{flex: 2, alignItems: 'flex-start'}}><Text style = {styles.rankingorder}>{keywords[0][0]}</Text></View>
              </View>
              <View style={styles.Row}>
                <View style={{flex: 1, alignItems: 'flex-end'}}><Text style = {styles.rankingorder}>2nd</Text></View>
                <View style={{flex: 2}}/>
                <View style={{flex: 2, alignItems: 'flex-start'}}><Text style = {styles.rankingorder}>{keywords[1][0]}</Text></View>
              </View>
              <View style={styles.Row}>
                <View style={{flex: 1, alignItems: 'flex-end'}}><Text style = {styles.rankingorder}>3rd</Text></View>
                <View style={{flex: 2}}/>
                <View style={{flex: 2, alignItems: 'flex-start'}}><Text style = {styles.rankingorder}>{keywords[2][0]}</Text></View>
              </View>
              </View>}
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
  month:{
    flex: 0.6,
    marginTop: 30
  },
  monthly:{
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  graphView:{
    flex: 4.5,
    alignItems: 'center',
    paddingTop:15,
    paddingBottom: 15,
  },
  rankingView:{
    flex: 3,
    alignItems: 'center', 
  },
  graph:{
    flex: 1,
    justifyContent: 'center',
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
});


export default StatisticsScreen;