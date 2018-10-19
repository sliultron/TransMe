import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ListView,
  ActivityIndicator
} from 'react-native';

import BusRoute from './busRoute';
import Storage from '../services/storage';
import TranslinkApi from '../services/translinkApi';
import {BUS_ROUTES_STORAGE_KEY} from './constants';
class SearchStops extends Component {
 
 

  state={
    stopNumber: '',
    busNumber:'',
    stopResult: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    errorMessage:'',
    searchSuccess: false,
    showProgress:false
  }
 


  
  searchRoute = ()=>{
   TranslinkApi.getButStopRTS(this.state.stopNumber)
    .then((result)=>{
       if(result && result.Code){
        this.setState({
          errorMessage:result.Message,
          searchSuccess:false,
          showProgress:false
        });
       }
       else{
          this.setState({
          stopResult:this.state.stopResult.cloneWithRows(result),
          searchSuccess:true,
          errorMessage:'',
        showProgress:false});
       }
    })
     .catch((error) => {
        console.error(error);
      });
   
  }

  addRoute = (routeNo)=>{
      Storage.getItem(BUS_ROUTES_STORAGE_KEY).then(value=>{
          if(value)
          {
              value = value.concat({bus: routeNo, stopNumber: this.state.stopNumber});
          }
          else{
              value = [{bus: routeNo, stopNumber: this.state.stopNumber}];
          }

          Storage.setItem(BUS_ROUTES_STORAGE_KEY, value);
      })

   }

  render() {
    return (
      <View style={styles.container}>
          <TextInput
            style={styles.textbox}
            placeholder="stop number"
            onChangeText={(text)=>this.setState({
                stopNumber:text
            })}
            value={this.state.stopNumber}
          />
           <TextInput
            style={styles.textbox}
            placeholder="bus number"
            onChangeText={(text)=>this.setState({
                busNumber:text
            })}
            value={this.state.busNumber}
          />
         <TouchableHighlight onPress={this.searchRoute} style={styles.button}>
             <Text style={styles.buttonText}>Search</Text>
         </TouchableHighlight>

          <ActivityIndicator
            animating={this.state.showProgress}
            style={[styles.centering, styles.loader]}
            size="large"
        />
        
         {
          this.state.searchSuccess?
            <ListView style={styles.list}
              dataSource={this.state.stopResult}
              renderRow={(rowData) => <BusRoute route={rowData} addRoute={this.addRoute}></BusRoute>}
            /> :  <Text>{this.state.errorMessage}</Text> 
         }
         

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:40,
    padding:10,
    flex: 1,
    alignItems:"center",
    backgroundColor: '#F5FCFF',
  },
  textbox:{
    height:30,
    borderWidth:1,
    borderColor:"#ddd",
    borderStyle:"solid",
    marginBottom:10
  },
  button:{
    height:50,
    backgroundColor:"#eee",
    marginTop:10,
    alignSelf:'stretch',
    justifyContent:'center'
  },
  buttonText:{
    fontSize: 22,
    alignSelf:'center',
    color:"#555",
    fontWeight:'bold'

  },
  list:{
       alignSelf:'stretch',
  },
  loader:{
    marginTop:10
  }
});


export default SearchStops;