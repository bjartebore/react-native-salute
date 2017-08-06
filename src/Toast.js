import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 9999,
    height: 100,
    backgroundColor: 'red',
  },
});

const noop = () => {};

export default class Toast extends Component {
  static propTypes = {
    duration: PropTypes.number,
    height: PropTypes.number,
    onShow: PropTypes.func,
    onVisible: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    onPress: PropTypes.func,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  }

  static defaultProps = {
    duration: null,
    height: 100,
    onClick: null,
    onShow: noop,
    onVisible: noop,
    onHide: noop,
    onHidden: noop,
    onPress: noop,
  }

  state = {
    timeoutRef: null,
    animatedValue: new Animated.Value(0),
  }

  componentWillMount() {
    this.state.animatedValue.addListener(this.onAnimationEnd);
  }
  componentDidMount() {
    this.show();

  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutRef);
  }

  onAnimationEnd = (value) => {
    if (value === 0) {
      this.props.onHidden();
    } else if (value === 1) {
      this.props.onVisible();
    }
  }

  onPress = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress(this.hide);
    }
  }


  onVisible = () => {
    // debugger;
    if (this.props.duration) {
      setTimeout(this.hide, this.props.duration);
    }
    this.props.onVisible();
  }

  onHidden = () => {
    this.props.onHidden();
  }

  hide = () => {
    const { onHide } = this.props;
    if (onHide) {
      onHide();
    }

    Animated.timing(
      this.state.animatedValue,
      { toValue: 0, duration: 350  }
    ).start(() => this.onHidden());
  }

  show = () => {
    const { onShow } = this.props;
    if (onShow) {
      onShow();
    }

    Animated.timing(
      this.state.animatedValue,
      { toValue: 1, duration: 350  }
    ).start(() => this.onVisible());
  }

  renderContent() {
    const { content } = this.props;
    if (Object.prototype.toString.call(content) === '[object String]') {
      return (<Text>{content}</Text>);
    }
    return content;
  }

  render() {
    const y = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-this.props.height, 0],
    });

    const style ={
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      zIndex: 9999,
      height: this.props.height,
      backgroundColor: 'green',
      opacity: this.state.animatedValue,
      transform: [{ translateY: y }]
    };

    return (
      <Animated.View style={style}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={{flex: 1}}>
            {this.renderContent()}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}
