/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';
import MapView from 'react-native-maps';
import Style from './Style';
import CustomCallout from './CustomCallout';

let id = 0;

class Mappyr extends Component {
  state = {
    initialPosition: { latitude: 0, longitude: 0},
    lastPosition: { latitude: 0, longitude: 0},
    markers: [],
  };

  watchID: ?number = null;

  componentWillMount() {
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  constructor() {
    super()
    this.markers = {}

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position.coords;
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position.coords;
      this.setState({lastPosition});
    });
  }

  onMapPress = (e) => {
    console.log("marker_laid")
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          title: "Sample Title",
          description: "Sample Description",
          upvotes: 0,
          downvotes: 0
        }
      ]
    })
  };

  onMarkerPress = (e) => {
    e.persist()
    console.log("marker_pressed")
    const c = e.nativeEvent.coordinate
    const markers = this.state.markers.filter(
      (x) => (
        ! (x.coordinate.latitude  == c.latitude &&
           x.coordinate.longitude == c.longitude)))

    this.setState({ markers })
  };

  render() {
    return (
      <View style={Style.container}>
        <MapView style={Style.map}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          initialRegion={{
            latitude: this.state.lastPosition.latitude,
            longitude: this.state.lastPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLongPress={this.onMapPress}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              ref={ ref => { this.markers[marker.key] = ref } }
              key={marker.key}
              coordinate={marker.coordinate}
              onPress={() => this.markers[marker.key].showCallout()}
              onCalloutPress={() => this.markers[marker.key].hideCallout()}
            >
              <View>
                <Text>X</Text>
              </View>
              <MapView.Callout
                tooltip
                style={Style.mapViewCallout}
              >
                <CustomCallout>
                  <Text>Callout</Text>
                  <Text>({marker.upvotes}-{marker.downvotes})</Text>
                </CustomCallout>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  };
};


AppRegistry.registerComponent('Mappyr', () => Mappyr);
