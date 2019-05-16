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


export default class UserScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  

  componentDidMount(){
    
  }

  

  
  

  render() {
    return (
      <View style={styles.container}>
       <TouchableOpacity
         style={styles.button}
         onPress={this.onSignButtonPress}
       >
         <Text> User Home </Text>
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
