// screens/SignInScreen.js
import React from 'react';
import {
StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { AuthSession } from 'expo';

const REDIRECT_URL = AuthSession.getRedirectUrl();
const GIT_CONFIG = {
  id: 'xxxxxxxxxxxxx',
  secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  scope: ['user', 'public_repo','delete_repo']
};

export default class SignInScreen extends React.Component {

  state = {
    token : ''
  };

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

  createAccessToken = async (code) => {
    const url =
      `https://github.com/login/oauth/access_token` +
      `?client_id=${GIT_CONFIG.id}` +
      `&client_secret=${GIT_CONFIG.secret}` +
      `&code=${code}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  onSignButtonPress = async () => {
    const { params }  = await AuthSession.startAsync({
      authUrl: this.getGitAuthUrl(GIT_CONFIG.id, GIT_CONFIG.scope),
    })
    let { access_token } = await this.createAccessToken(params.code);
    let user = await this.getUserInfo(access_token);
    this.setState({
      token : access_token
    })
    this.props.navigation.navigate('Main', { 'user' : user, 'token' : access_token });
  };

  getUserInfo = async (token) => {
    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Authorization': 'token ' + token
      },
    });
    return response.json();
  }

  getGitAuthUrl = (id, fields) => {
    return (
      `https://github.com/login/oauth/authorize` +
      `?client_id=${id}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
      `&scope=${encodeURIComponent(fields.join(' '))}&state=hello1`
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
