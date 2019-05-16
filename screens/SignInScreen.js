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
import { Button } from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { AuthSession } from 'expo';

const REDIRECT_URL = AuthSession.getRedirectUrl();
const github = {
  id: '015dc9b0fdf8be8f6b15',
  secret: 'a61fb78c5940355486fa306736dad6f5383c8619'
};
const githubFields = ['user', 'public_repo'];
export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  

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
    console.log('User info ', user);
    const { navigate } = this.props.navigation;
    this.props.navigation.navigate('Home', { user });
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
         onPress={this.onSignButtonPress}
       >
         <Text> SignIn With GitHub </Text>
       </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
})
