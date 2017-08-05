import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default (WrappedComponent) => {
  class WithSalute extends PureComponent {
    static contextTypes = {
      addSalute: PropTypes.func,
    };

    render() {
      const props = {
        ...this.props,
        addSalute,
      }
      return (
        <WrappedComponent {props} />
      );
    }
  }
  hoistNonReactStatic(WithSalute, WrappedComponent);
  return WithSalute;
};
