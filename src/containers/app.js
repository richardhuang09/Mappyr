import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  NavigationExperimental,
} from 'react-native';
import { connect } from 'react-redux';

import Map from './Map';
import CreatePost from './CreatePost';
import { navigatePop } from '../actions/navigator';

const {
  CardStack: NavigationCardStack,
  Card: NavigationCard,
  Header: NavigationHeader,
} = NavigationExperimental;


class App extends Component {

  render() {
    let { navigationState, backAction } = this.props;

    return (
      <NavigationCardStack
        navigationState={navigationState}
        onNavigateBack={backAction}
        style={styles.container}
        direction={navigationState.routes[navigationState.index].key === 'Modal' ?
          'vertical' : 'horizontal'
        }
        renderHeader={props => (
          <NavigationHeader
            {...props}
            onNavigateBack={backAction}
            renderTitleComponent={props => {
              const title = props.scene.route.title;
              return <NavigationHeader.Title>{title}</NavigationHeader.Title>;
            }}
          />
        )}
        renderScene={this._renderScene}
      />
    );
  }

  _renderScene( {scene} ) {
    const { route } = scene;

    switch (route.key) {
      case 'The Map':
        return <Map />;
      case 'CreatePost':
        return <CreatePost />;
      default:
        return null;
    }
  }
}

App.propTypes = {
  backAction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  state => ({
    navigationState: state.navigationState,
  }),
  dispatch => ({
    backAction: () => {
      dispatch(navigatePop());
    },
  })
)(App);
