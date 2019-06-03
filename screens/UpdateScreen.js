import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Picker,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';
import { Icon } from 'expo'

export default class UpdateScreen extends React.Component {
  static navigationOptions = () => {
    return {
       
    };
}

  state = {
    options : [],
    selectedRepo : '',
    repoText : ''
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.loadRepoList()
  }

  loadRepoList = () => {
    let requestHeaders = new Headers();
    requestHeaders.append('pragma', 'no-cache');
    requestHeaders.append('cache-control', 'no-cache');

    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
    };
    const url = `https://api.github.com/users/jay3dec/repos?sort=created`;
    fetch(url, requestParams)
    .then(res => res.json())
    .then((result) => {
      this.setState({
        options : result || []
      })
      this.setState({
          selectedRepo : result[0].name
      }) 
    });
  }

  onPressUpdateRepo = async() => {
    let {error} = await this.updateRepo(this.state.repoText, this.state.selectedRepo);
    if(error){
        alert('Failed to update repo');
    } else {
        alert('success');
        this.props.navigation.navigate('Repo', {refesh : true});
    }
  }

  updateRepo = (newName, oldName) => {
    console.log(`new name is ${newName} Old name is ${oldName}`);
    let token = this.props.navigation.dangerouslyGetParent().getParam('token');
    let requestHeaders = new Headers();
    requestHeaders.append('Authorization', 'token ' + token);

    const requestParams = {
      method: 'PATCH',
      headers: requestHeaders,
      body: JSON.stringify({
        name : newName
      })
    };
    let url = `https://api.github.com/repos/jay3dec/${oldName}`
    return fetch(url, requestParams)
      .then(() => { return {status : 200} })
      .catch(error => {error : error});
  }



  render() {
    let serviceItems = this.state.options.map( (s, i) => {
        return <Picker.Item key={i} value={s.name} label={s.name} />
    });
    return (

        <View style={styles.container}>
            <View style={styles.headerContainer}>
                
                <Text style={styles.headerText}>
                Update Repositories
                </Text>
                
            </View>
            <Picker
                selectedValue={this.state.selectedRepo}
                onValueChange={ (service) => ( this.setState({selectedRepo:service}) ) } >

                {serviceItems}

            </Picker>
            <TextInput
                style={{height: 40}}
                placeholder="Enter new repository name !!"
                onChangeText={    
                (text) => this.setState({repoText : text})}
            />
            <Button
                onPress={this.onPressUpdateRepo}
                title="Update"
                color="#841584"
            />
        </View>
      );
  }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
       },
       headerContainer : {
         justifyContent:'center', 
         alignItems:'center', 
         backgroundColor: "#d67a17",
         flexDirection: 'row',
         justifyContent: 'space-between'
       },
       headerText: {
        fontSize : 32,
      },
  
  
})
