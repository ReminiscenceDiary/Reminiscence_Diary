import * as React from 'react';
import { ImageStore, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './Screens/CalendarScreen';
import AddDiaryScreen from './Screens/AddDiaryScreen';
import WrittenDiaryScreen from './Screens/WrittenDiaryScreen';
import EditDiaryScreen from './Screens/EditDiaryScreen';
import SettingScreen from './Screens/SettingScreen';
import SelectColorScreen from './Screens/SelectColorScreen';
import HowtoUseScreen from './Screens/HowtoUseScreen';
import StatisticsScreen from './Screens/StatisticsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DiaryStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function DiaryStackScreen() {
  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: false }} />
      <DiaryStack.Screen name="AddDiaryScreen" component={AddDiaryScreen} options={{ headerShown: false }} />
      <DiaryStack.Screen name="WrittenDiaryScreen" component={WrittenDiaryScreen} options={{ headerShown: false }} />
      <DiaryStack.Screen name="EditDiaryScreen" component={EditDiaryScreen} options={{ headerShown: false }} />
    </DiaryStack.Navigator>
  );
}

function SettingsStackScreen()  {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
      <SettingsStack.Screen name="SelectColorScreen" component={SelectColorScreen} options={{ headerShown: false }} />
      <SettingsStack.Screen name="HowtoUseScreen" component={HowtoUseScreen} options={{ headerShown: false }} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Calendar') {
              iconName = focused
                ? 'calendar'
                : 'calendar-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }else{
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={35} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle:{
            elevation: 0,
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor:'rgba(157, 157, 157, 0.4)',
            height: 60,
          }
        })}
        initialRouteName="Calendar"
        >

          <Tab.Screen name="Settings" component={SettingsStackScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Calendar" component={DiaryStackScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Statistics" component={StatisticsScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}