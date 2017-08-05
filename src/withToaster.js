import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Toast from './Toast';

export default (WrappedComponent) => {
  class WithToaster extends PureComponent {
    static contextTypes = {
      addToast: PropTypes.func,
    };

    render() {
      const props = {
        ...this.props,
        addToast,
      }
      return (
        <WrappedComponent {props} />
      );
    }
  }
  hoistNonReactStatic(Toaster, WrappedComponent);
  return WithToaster;
};
