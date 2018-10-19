/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';


import AppContainer from "./app/components/appContainer";

class App extends Component {
 
  render() {
    return (
      <AppContainer/>
    );
  }
}


AppRegistry.registerComponent('TransMe', () => App);
