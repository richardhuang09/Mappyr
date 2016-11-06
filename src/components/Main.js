import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
} from 'react-native';
import MapView from 'react-native-maps';
import Style from '../Style';
import CustomCallout from '../CustomCallout';

let id = 0;

export default class Map extends Component {

  static propTypes = {
    onForward: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.markers = {};
  }



  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }


  render() {
    const { markers, location, onForward } = this.props;
    return (
      <View style={Style.container}>
        <MapView
          style={Style.map}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          region={lastPosition}
          initialRegion={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers.map(marker => (
            <MapView.Marker
              ref={(ref) => { this.markers[marker.key] = ref; }}
              key={marker.key}
              coordinate={marker.coordinate}
              onPress={() => this.markers[marker.key].showCallout()}
              onCalloutPress={onForward}
            >
              <View>
                <Text>X</Text>
              </View>
              <MapView.Callout
                tooltip
                style={Style.mapViewCallout}
              >
                <CustomCallout
                  onForward={onForward}
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
  }
}
