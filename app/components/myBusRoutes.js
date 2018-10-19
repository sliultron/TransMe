import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ListView
} from 'react-native';



import BusRoute from './busRoute';
import Storage from '../services/storage';
import TranslinkApi from '../services/translinkApi';
import {BUS_ROUTES_STORAGE_KEY} from './constants';

class MyBusRoutes extends Component{
   state={
        busRoutes:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        messages:[]
   }

  componentDidMount() {
    this._loadInitialState().done();
  }

  

  _loadInitialState = async () => {
    try {
      var routes = await Storage.getItem(BUS_ROUTES_STORAGE_KEY);
      if (routes){
        //load bus routes
        
        Promise.all(routes.map(route=> TranslinkApi.getButStopRTS(route.stopNumber)))
               .then(result=>{
                  let routes = result.reduce(function(a, b) {
                    return a.concat(b);
                  });
                  this.setState({
                    busRoutes: this.state.busRoutes.cloneWithRows(routes),
                  });
               })
       

        
      }else{
        this._appendMessage('No routes in your collection yet.');
      }
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  }

  _appendMessage = (message) => {
    this.setState({messages: this.state.messages.concat(message)});
  }

  clean=()=>{
    Storage.removeItem(BUS_ROUTES_STORAGE_KEY).then(()=>{
      this.setState({busRoutes: []});
    });
  }

  render(){
      return(
          <View style={{marginTop:40}}>
                <Text>{this.state.messages}</Text>
              
                <ListView style={{alignSelf:'stretch'}}
                  dataSource={this.state.busRoutes}
                  renderRow={(rowData) => <BusRoute route={rowData}></BusRoute>}
                /> 
           </View>
      )
  }
}

export default MyBusRoutes;