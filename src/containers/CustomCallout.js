
import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import Style from '../Style';

export default class CustomCallout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onForward: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View>
        <View style={Style.bubble}>
          <View style={Style.amount}>
            {this.props.children}
            <TouchableHighlight onPress={this.props.onForward}>
              <Text>Tap me to load the next scene</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
