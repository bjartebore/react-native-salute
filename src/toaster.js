import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Toast from './Toast';

export default (WrappedComponent) => {
  class Toaster extends Component {
    static childContextTypes = {
      addToast: PropTypes.func,
    };

    state = {
      toast: null,
    }

    getChildContext() {
      const { addToast } = this;
      return {
        addToast,
      };
    }

    addToast = () => {
      this.setState({
        toast: 'yeah',
      })
    }

    renderToast() {
      if (this.state.toast) {
        return (<Toast
          content={this.state.toast}
          onPress={() => {}}
        />)
      }
      return null;
    }

    render() {
      const props = {
        ...this.props,
        addToast: this.addToast,
      }
      return (
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
          <WrappedComponent {...props} />
          { this.renderToast() }
        </View>
      );
    }
  }
  hoistNonReactStatic(Toaster, WrappedComponent);
  return Toaster;
};
