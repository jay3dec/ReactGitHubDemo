import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import RepoScreen from '../screens/RepoScreen';
import UpdateScreen from '../screens/UpdateScreen';

export default createBottomTabNavigator({
  Home : {
    screen : HomeScreen
  },
  Repo : {
    screen : RepoScreen
  }, 
  Update : {
    screen : UpdateScreen
  }
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home`;
      } else  {
        iconName = `ios-settings`;
      }
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});