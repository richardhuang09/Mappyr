import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import Map from './Map';
import CreatePost from './CreatePost';

class Mappyr extends Component {
  render() {
    const routes = [
      { title: 'The Map', index: 0, component: Map },
      { title: 'Create Post', index: 1, component: CreatePost },
    ];

    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={(route, navigator) =>
          <route.component

            navigator={navigator}

            // Function to call when a new scene should be displayed
            onForward={() => {
              navigator.push(routes[1]);
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    );
  }
}

AppRegistry.registerComponent('Mappyr', () => Mappyr);
