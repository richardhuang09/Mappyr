
import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Style from './Style';


const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

class CustomCallout extends React.Component {
  render() {
    return (
      <View>
        <View style={Style.bubble}>
          <View style={Style.amount}>
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}

CustomCallout.propTypes = propTypes;
export default CustomCallout;
