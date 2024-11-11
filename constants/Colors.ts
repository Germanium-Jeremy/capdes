import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const { width, height } = Dimensions.get('window');

export const getLinearGradient = (angle = 0) => {
  return {
    colors: ['#FF6B6B', '#FFA500'],
    start: { x: 0, y: 0 },
    end: { x: width, y: height },
    angle: angle,
  };
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    gradient: getLinearGradient(45),
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    gradient: getLinearGradient(135),
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${Colors.light.gradient}`,
    // backgroundColor: Colors.light.gradient,
  },
});
