import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    AsyncStorage,
    View,
    Text,
} from 'react-native';
import MapView from 'react-native-maps';
import Style from '../Style';
import CustomCallout from '../CustomCallout';
import * as locationActions from '../actions/location';
import * as markerActions from '../actions/markers';
import * as mapConstants from '../constants/MapConstants';

const STORAGE_KEY = 'lastSessionLocation';

class Map extends Component {

  static propTypes = {
    positionUpdate: PropTypes.func.isRequired,
    location: PropTypes.object,
    stagingMarkers: PropTypes.array.isRequired,
  }

  constructor() {
    super();
    this.markers = {};
  }
  componentDidMount() {
    this._loadInitialState().done();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position.coords;
        initialPosition.latitudeDelta = mapConstants.LATITUDE_DELTA;
        initialPosition.longitudeDelta = mapConstants.LONGITUDE_DELTA;
        this.props.positionUpdate(initialPosition);
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 80000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = position.coords;
      lastPosition.latitudeDelta = mapConstants.LATITUDE_DELTA;
      lastPosition.longitudeDelta = mapConstants.LONGITUDE_DELTA;
      this.props.positionUpdate(lastPosition);
    });
    AsyncStorage.setItem('lastSessionLocation', JSON.stringify(this.props.location));
    console.log('session_saved');
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress = (e) => {
    this.props.addMarker('sample_text', e.nativeEvent.coordinate);
  }

  onMarkerPress = (e) => {
    e.persist();
    const c = e.nativeEvent.coordinate;
    const markers = this.state.markers.filter(
      x => (
        !(x.coordinate.latitude === c.latitude &&
           x.coordinate.longitude === c.longitude)));

    this.setState({ markers });
  };

  _loadInitialState = async () => {
    try {
      const lastSessionLocationString = await AsyncStorage.getItem(STORAGE_KEY);
      const lastSessionLocation = JSON.parse(lastSessionLocationString);
      if (lastSessionLocation !== null) {
        this.props.positionUpdate(lastSessionLocation);
        console.log('last_location_loaded')
      }
    } catch (error) {
    }
  };

  render() {
    return (
      <View style={Style.container}>
        <MapView
          style={Style.map}
          showsUserLocation
          showsMyLocationButton
          region={this.props.location}
          onLongPress={this.onMapPress}
        >
          {this.props.stagingMarkers.map(marker => (
            <MapView.Marker
              ref={(ref) => { this.markers[marker.key] = ref; }}
              key={marker.key}
              coordinate={marker.coordinate}
              onPress={() => this.markers[marker.key].showCallout()}
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
  }
}

function mapStateToProps(state) {
  const { location, stagingMarkers } = state;
  return {
    location,
    stagingMarkers,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    positionUpdate: (position) => {
      dispatch(locationActions.changeLocation(position));
    },
    addMarker: (text, coordinate) => {
      dispatch(markerActions.addMarker(text, coordinate));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
