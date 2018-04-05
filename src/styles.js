
import { StyleSheet } from 'react-native';
import types from './types';

export const base = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
};

export default {
  [types.NO_STYLE]: StyleSheet.create({}),
  [types.ERROR]: StyleSheet.create({
    container: {
      ...base.container,
      backgroundColor: 'red',
    },
    iconContainer: base.iconContainer,
    textContainer: base.textContainer,
    text: base.text,
  }),
  [types.WARNING]: StyleSheet.create({
    container: {
      ...base.container,
      backgroundColor: '#ec971f',
    },
    iconContainer: base.iconContainer,
    textContainer: base.textContainer,
    text: base.text,
  }),
  [types.SUCCESS]: StyleSheet.create({
    container: {
      ...base.container,
      backgroundColor: 'green',
    },
    iconContainer: base.iconContainer,
    textContainer: base.textContainer,
    text: base.text,
  }),
  [types.INFO]: StyleSheet.create({
    container: {
      ...base.container,
      backgroundColor: '#2487DB',
    },
    iconContainer: base.iconContainer,
    textContainer: base.textContainer,
    text: base.text,
  }),
};
