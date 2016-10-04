import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';
import MapView from 'react-native-maps';
import Style from './Style';

class Mappyr extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       var initialPosition = JSON.stringify(position);
  //       this.setState({initialPosition});
  //     },
  //     (error) => alert(JSON.stringify(error)),
  //     {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
  //   );
  //   this.watchID = navigator.geolocation.watchPosition((position) => {
  //     var lastPosition = JSON.stringify(position);
  //     this.setState({lastPosition});
  //   });
  // }
  //
  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID);
  // }

  render() {
    return (
      <View style={Style.container}>
        <MapView style={Style.map}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
        />
      </View>
    );
  }
}


AppRegistry.registerComponent('Mappyr', () => Mappyr);
