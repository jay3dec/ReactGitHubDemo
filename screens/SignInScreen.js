import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import { Icon } from 'expo'
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { AuthSession } from 'expo';

const REDIRECT_URL = AuthSession.getRedirectUrl();
const github = {
  id: '015dc9b0fdf8be8f6b15',
  secret: 'a61fb78c5940355486fa306736dad6f5383c8619'
};
const githubFields = ['user', 'public_repo','delete_repo'];
export default class SignInScreen extends React.Component {
  static navigationOptions = () => {
      return {
          headerStyle:{
              backgroundColor: "#d67a17",
          }, 
          headerTitle : () => {
            return (
              <View style={styles.headerContainer}>
                  <Text style={styles.headerText} >GitHub React App</Text>
              </View>
            )
          },
      };
  }

  state = {
    token : ''
  };

  onPressAddRepo(){

  }

  componentDidMount(){
    
  }

  createTokenWithCode = async (code) => {
    const url =
      `https://github.com/login/oauth/access_token` +
      `?client_id=${github.id}` +
      `&client_secret=${github.secret}` +
      `&code=${code}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  }
  


  onSignButtonPress = async () => {
    const {params} = await AuthSession.startAsync({
      authUrl: this.authUrlWithId(github.id, githubFields),
    });
    let k = await this.createTokenWithCode(params.code);
    let user = await this.getUserInfo(k.access_token);
    this.setState({
      token : k.access_token
    })
    this.props.navigation.navigate('Main', { 'user' : user, 'token' : k.access_token });
  };

  getUserInfo = async (token) => {
    const r = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Authorization': 'token ' + token
      },
    });
    return r.json();
  }



  
  // 2
  authUrlWithId = (id, fields) => {
    return (
      `https://github.com/login/oauth/authorize` +
      `?client_id=${id}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
       // 3
      `&scope=${encodeURIComponent(fields.join(' '))}&state=hello`
    );
  }

  render() {

    return (
      <View style={styles.container}>
       <TouchableOpacity
         style={styles.button}
         onPress={this.onSignButtonPress}>
         <Text style={styles.buttonText}> Sign In With GitHub </Text>
       </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor : "#d67a17",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ccb399',
    height : 60,
    borderRadius : 20
  },
  headerContainer : {
    flex:1, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor: "#d67a17",
  },
  headerText: {
    fontSize : 32,
  },
  buttonText : {
    lineHeight : 60,
    fontSize : 22,
  }
})
