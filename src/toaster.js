import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Toast from './Toast';



const defaultState = {

}

const reducer = (state, action) => {

  switch (action.type) {
    case 'Toast/PUSH': {
      return {
        ...state,
        index: [...state.index, action.payload.id],
        toasts: {
          ...state.toasts,
          [action.payload.id]: action.payload,
        }
      }
    }
    case 'Toast/SHIFT': {
      return {
        ...state,
        index: state.index.slice(1),
      }
    }
    default: {
      return state;
    }
  }
}

export default (WrappedComponent) => {
  class Toaster extends Component {
    static childContextTypes = {
      addToast: PropTypes.func,
    };

    state = {
      index: [],
      toasts: {},
    }

    getChildContext() {
      const { addToast } = this;
      return {
        addToast,
      };
    }

    addToast = (props = {}) => {
      this.dispatch({
        type: 'Toast/PUSH',
        payload: {
          ...props,
          id: Math.random().toString(36),
        }
      })
    }

    dispatch = (action) => {
      this.setState(
        reducer(this.state, action)
      )
    }

    getToasts() {
      const { index, toasts } = this.state;
      return index.map((id, idx) => ({
        ...toasts[id],
        visible: idx === 0,
      }));
    }

    renderToast() {
      return this.getToasts().map(
        toast => (
          toast.visible ?
            <Toast
              key={toast.id}
              content={toast.text}
              duration={toast.duration}
              onHidden={() => {
                this.dispatch({
                  type: 'Toast/SHIFT'
                })
              }}
              onPress={toast.onPress}
            /> : null
        )
      )
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
