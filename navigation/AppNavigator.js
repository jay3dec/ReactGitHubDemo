import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator({
  Main: MainTabNavigator,
  Auth: AuthStack
},{
  initialRouteName: 'Auth',
}));