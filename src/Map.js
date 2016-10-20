import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    AppRegistry,
} from 'react-native';
import MapView from 'react-native-maps';
import Style from './Style';
import CustomCallout from './CustomCallout';

let id = 0;

export default class Map extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  state = {
    initialPosition: { latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 },
    lastPosition: { latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 },
    markers: [],
  };

  watchID: ?number = null;

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position.coords;
        initialPosition.latitudeDelta = 0.0922,
        initialPosition.longitudeDelta = 0.0421,
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position.coords;
      lastPosition.latitudeDelta = 0.0922,
      lastPosition.longitudeDelta = 0.0421,
      this.setState({lastPosition});
    });
  }

  componentWillUpdateProps() {
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  constructor() {
    super();
    this.markers = {};
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
  }

  onMarkerPress = (e) => {
    e.persist();
    console.log("marker_pressed");
    const c = e.nativeEvent.coordinate;
    const markers = this.state.markers.filter(
      (x) => (
        ! (x.coordinate.latitude  == c.latitude &&
           x.coordinate.longitude == c.longitude)));

    this.setState({ markers });
  };

  render() {
    return (
      <View style={Style.container}>
        <MapView style={Style.map}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          region={this.state.lastPosition}
          onRegionChange={(lastPosition) => this.setState({ lastPosition })}
          initialRegion={{
            latitude: this.state.initialPosition.latitude,
            longitude: this.state.initialPosition.longitude,
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
              onCalloutPress={this.props.onForward}
            >
              <View>
                <Text>X</Text>
              </View>
              <MapView.Callout
                tooltip
                style={Style.mapViewCallout}
              >
                <CustomCallout
                  onForward={this.props.onForward}
                >
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
