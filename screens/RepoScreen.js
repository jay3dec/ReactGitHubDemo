import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';

export default class RepoScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center' },
    title: 'Repositories'
  };

  state = {
    dataSource: [],
    modalVisible: false,
    repoText : ''
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    console.log('in repo ', this.props);
    let k = await this.loadRepoList();
    this.setState({
      dataSource : k
    })
  }

  
  loadRepoList = async () => {
    const url =
      `https://api.github.com/users/jay3dec/repos?sort=created`;
    const res = await fetch(url, {
      method: 'GET'
    });
    return res.json();
  }

  onPressLearnMore(){

  }

  onPressAddRepo = () => {
    alert('repo added');
    console.log(this.props);
    // let url = `https://api.github.com/users/jay3dec/repos?access_token=` + 
    //   `${this.props.navigation.state.params.user}`
    // const r = await fetch('https://api.github.com/users/jay3dec/repos?access_token=', {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': 'token ' + token
    //   },
    // });
    this.setModalVisible(!this.state.modalVisible);
  }

  render() {
    return (
      <View style={styles.container}>

      
        <TouchableOpacity style={styles.header} onPress={() => {
                    this.setModalVisible(true);
                  }}>
          <Text>
            Add Repository
          </Text>
        </TouchableOpacity>       
      
         <FlatList
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          data={this.state.dataSource}
          renderItem={({item}) => <Text key={item.id} style={styles.item}>{item.name}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={{marginTop: 22}}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}>
                  <View style={{marginTop: 22}}>
                    <View>
                    <TextInput
                      style={{height: 40}}
                      placeholder="Enter repository name !!"
                      onChangeText={(text) => this.setState({repoText : text})}
                    />
                    <Button
                      onPress={this.onPressAddRepo}
                      title="Add"
                      color="#841584"
                    />

                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>Hide Modal</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>

               
              </View>

      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  header : {
    alignSelf: 'stretch',
    padding: 10,
    height:30,
    fontSize : 16,
    backgroundColor: "#FDD7E4",
    textAlign: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
})
