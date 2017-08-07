import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles from './styles';

const noop = () => {};

export default class Salute extends Component {
  static propTypes = {
    duration: PropTypes.number,
    styles: PropTypes.object,
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
    styles: styles.info,
    height: 60,
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

  onAnimationEnd = ({ value }) => {
    if (value === 0) {
      this.onHidden();
    } else if (value === 1) {
      this.onVisible();
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
    ).start();
  }

  show = () => {
    const { onShow } = this.props;
    if (onShow) {
      onShow();
    }

    Animated.timing(
      this.state.animatedValue,
      { toValue: 1, duration: 350  }
    ).start();
  }

  renderContent() {
    const { content, styles } = this.props;
    if (Object.prototype.toString.call(content) === '[object String]') {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{content}</Text>
        </View>
      );
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
      opacity: this.state.animatedValue,
      transform: [{ translateY: y }]
    };

    const {
      styles,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <Animated.View style={style}>
          {this.renderContent()}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
