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
import { Icon } from 'expo';
import axios from 'axios';

export default class RepoScreen extends React.Component {
  static navigationOptions = () => {
    return {
        headerStyle:{
            backgroundColor: "#d67a17",
        }, 
        headerTitle : "rree"
    };
}

  state = {
    dataSource: [],
    modalAddVisible: false,
    modalDeleteVisible: false,
    repoText : '',
    refresh : false
  };

  setAddModalVisible(visible) {
    this.setState({modalAddVisible: visible});
  }

  setDeleteModalVisible(visible) {
    this.setState({modalDeleteVisible: visible});
  }

  constructor(props) {
    super(props)
  }

  showAddModal = () => {
    this.setState({modalAddVisible : true})
  }

  hideAddModal = () => {
    this.setState({modalAddVisible : false})
  }

  showDeleteModal = () => {
    this.setState({modalDeleteVisible : true})
  }

  hideDeleteModal = () => {
    this.setState({modalDeleteVisible : false})
  }

  componentDidMount() {
    this.loadRepoList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.refesh) {
      this.loadRepoList();
    }
  }

  
  loadRepoList = () => {
    console.log('ME AGAIN HERE')
    let requestHeaders = new Headers();
    requestHeaders.append('pragma', 'no-cache');
    requestHeaders.append('cache-control', 'no-cache');

    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
    };
    
    const url = `https://api.github.com/users/jay3dec/repos?sort=created`;
    // fetch(url, requestParams)
    // .then(res => res.json())
    // .then((result) => {
    //   console.log('result is ',result)
    //   this.setState({
    //     dataSource : result || []
    //   }) 
    // })
    axios.get(url, requestParams)
    .then((result) => {
      this.setState({
        dataSource : result.data || []
      }) 
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  onPressAddRepo = async () => {
    let repoName  = this.state.repoText;
    let response = await this.addRepo(repoName);
    if(response.error){
      alert('Failed to add repo');
    } else {
      alert('success');
      this.setState({
        refresh : !this.state.refresh
      },() => {
        this.loadRepoList();
        this.setAddModalVisible(!this.state.modalAddVisible);
      })
    }
  }

  onPressDeleteRepo = async () => {
    let repoName  = this.state.repoText;
    try{
      let { error } = await this.deleteRepo(repoName);      
      if(error){
        alert('Failed to delete repo');
      } else {
        alert('success');
        this.setState({
          refresh : !this.state.refresh
        },() => {
          this.loadRepoList();
          this.setDeleteModalVisible(!this.state.modalDeleteVisible);
        })
      }
    } catch(error){
      console.log('error ', error);
    }
  }

  deleteRepo = (repoName) => {
    let token = this.props.navigation.dangerouslyGetParent().getParam('token');
    let requestHeaders = new Headers();
    requestHeaders.append('Authorization', 'token ' + token);

    const requestParams = {
      method: 'DELETE',
      headers: requestHeaders,
    };
    let url = `https://api.github.com/repos/jay3dec/${repoName}`
    return fetch(url, requestParams)
      .then(() => { return {status : 200} })
      .catch(error => {error : error});
  }

  
  addRepo = (repoName) => {
    let token = this.props.navigation.dangerouslyGetParent().getParam('token');
    let requestHeaders = new Headers();
    requestHeaders.append('Authorization', 'token ' + token);

    const requestParams = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
          "name" : repoName     
      })
    };
    const url = `https://api.github.com/user/repos`
    return fetch(url, requestParams)
      .then(res => res.json())
      .catch(error => {error : error});
  }

  render() {
    return (
      
      <View style={styles.container}>

          <View style={styles.headerContainer}>
              <Button
                onPress={this.showAddModal}
                title="Add"
                color="#ccb399"
              />
              <Text style={styles.headerText}>
                Repositories
              </Text>
              <Button
                onPress={this.showDeleteModal}
                title="Delete"
                color="#ccb399"
              />
          </View>
      
        <FlatList style={{marginTop:50}}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          data={this.state.dataSource}
          renderItem={({item}) => <Text onChangeText={(event) => this.setState({repoText:event.nativeEvent.text})} key={item.id} style={styles.item}>{item.name}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Add Repo Modal Starts here */}
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalAddVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{margin: 22, height: 300}}>
              <View>
                <TextInput
                  style={{height: 40}}
                  placeholder="Enter repository name !!"
                  onChangeText={    
                    (text) => this.setState({repoText : text})}
                />

                <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                  <Button
                    onPress={this.onPressAddRepo}
                    title="Add"
                    color="#841584"
                  />

                  <Button
                    onPress={this.hideAddModal}
                    title="Cancel"
                    color="#811584"
                  />
                </View>
                
              </View>
            </View>
          </Modal>       
        </View>
      {/* Add Repo Modal ends here */}
      
      {/* Delete Repo Modal starts here */}
      <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalDeleteVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{margin: 22, height: 300}}>
              <View>
                <TextInput
                  style={{height: 40}}
                  placeholder="Enter repository name !!"
                  onChangeText={    
                    (text) => this.setState({repoText : text})}
                />

                <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                  <Button
                    onPress={this.onPressDeleteRepo}
                    title="Delete"
                    color="#841584"
                  />

                  <Button
                    onPress={this.hideDeleteModal}
                    title="Cancel"
                    color="#811584"
                  />
                </View>
                
              </View>
            </View>
          </Modal>       
        </View>
        {/* Delete Repo Modal ends here */}

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
  
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  
})
