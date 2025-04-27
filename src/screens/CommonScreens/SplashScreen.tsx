import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { dimensions } from '../../constants/dimensions';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';

const SplashScreen = () => {
  const positionCircle1 = useSharedValue(0);

    const { theme } = useTheme()

  useEffect(() => {
    positionCircle1.value = withSpring(dimensions.height / 3.4, {
      damping: 5,
      stiffness: 150,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    top: positionCircle1.value,
    left: positionCircle1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    right: positionCircle1.value,
    bottom: positionCircle1.value,
  }));

  return (
    <Animated.View style={[styles.container,{ backgroundColor:theme.background }]}>
      <Animated.View style={[styles.circle, {backgroundColor:theme.uniqueAccent1},animatedStyle]} />
      <Animated.View style={[styles.circle, {backgroundColor:theme.uniqueAccent2}, animatedStyle2]} />
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    height: dimensions.height / 5,
    width: dimensions.height / 5,
    borderRadius: dimensions.height / 10,
    position: 'absolute',
  },
});
