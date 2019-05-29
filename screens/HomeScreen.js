import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    console.log('data in home ', this.props);
    this.props.screenProps = {
      "ad" : "hello"
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Image source={{ uri: this.props.navigation.state.params.user.avatar_url}} style={styles.photo} />
        <View style={styles.separator}></View>
        <Text style={styles.text}>
          {`${this.props.navigation.state.params.user.name}`}
        </Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 20,
  },
  photo: {
    marginTop: 100,
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
