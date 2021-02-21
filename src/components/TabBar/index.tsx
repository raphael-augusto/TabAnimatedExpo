import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import * as shape from 'd3-shape';
import Svg, { Path } from 'react-native-svg';
import StaticTabbar, { tabHeight as height } from '../StaticTabBar';

const { width } = Dimensions.get('window');

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const tabs = [
  { name: 'menu' },
  { name: 'github' },
  { name: 'refresh-cw' },
  { name: 'linkedin' },
  { name: 'user' },
];
const tabWidth = width / tabs.length;

const getPath = (): string => {
  const left = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
      { x: 0, y: 0 },
      { x: width, y: 0 },
    ]);

  const tab = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
      { x: width, y: -2 },
      { x: width - 500, y: 0 },
      { x: width - 0, y: -60 },
      { x: width - 5, y: 65 },
      { x: width + tabWidth - 2, y: 65 },
      { x: width + tabWidth + 5, y: -10 },
      { x: width + tabWidth + 60, y: 0 },
      { x: width + tabWidth, y: 0 },
    ]);

  const right = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
      { x: width + tabWidth, y: 0 },
      { x: width * 2, y: 0 },
      { x: width * 2, y: height },
      { x: 0, y: height },
      { x: 0, y: 0 },
    ]);
  return `${left} ${tab} ${right}`;
};

const d = getPath();

export default class Tabbar extends Component {
  value = new Animated.Value(-width);

  render() {
    const { value: translateX } = this;

    return (
      <>
        <View {...{ width, height }}>
          <AnimatedSvg
            width={width * 2}
            style={{ transform: [{ translateX }] }}
            {...{ height }}
          >
            <Path {...{ d }} fill="white" />
          </AnimatedSvg>
          <View style={StyleSheet.absoluteFill}>
            <StaticTabbar value={translateX} {...{ tabs }} />
          </View>
        </View>
        <SafeAreaView style={styles.safeArea} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
});
