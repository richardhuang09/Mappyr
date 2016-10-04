import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';
import MapView from 'react-native-maps';
import Style from './Style';

let id = 0;

class Mappyr extends Component {
  state = {
    region: {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    },
    markers: [],
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

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
        }
      ]
    })
  }

  render() {
    return (
      <View style={Style.container}>
        <MapView style={Style.map}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          onPress={(e) => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
            />
          ))}
        </MapView>
      </View>
    );
  }
}


AppRegistry.registerComponent('Mappyr', () => Mappyr);
