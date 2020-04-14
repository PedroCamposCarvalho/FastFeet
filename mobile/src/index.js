import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import '~/config/ReactotronConfig';
import AsyncStorage from '@react-native-community/async-storage';
import createRouter from './routes';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      signed: false,
    };
  }

  async componentDidMount() {
    const courier = await AsyncStorage.getItem('courier');
    if (courier) {
      this.setState({ signed: true });
    }
  }

  render() {
    const { signed } = this.state;
    const Routes = createRouter(signed);
    return (
      <>
        <StatusBar backgroundColor="#fff" />
        <Routes />
      </>
    );
  }
}
