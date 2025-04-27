import { Pressable, StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { dimensions } from '../constants/dimensions';
import { useTheme } from '../theme/ThemeContext';
import LottieView from 'lottie-react-native';
import moon from '../assets/animation/moon.json';
import sun from '../assets/animation/sun.json';

const AuthViewWrapper = ({ children }: { children: ReactNode }) => {
  const { theme, toggleTheme, isDarkMode } = useTheme();



  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Pressable
        onPress={toggleTheme}
        style={[styles.themeButton, { backgroundColor: theme.border }]}
      >
        <LottieView 
          source={isDarkMode ? sun : moon}
          style={styles.modeButton}
          loop={false}
          autoPlay
        />
      </Pressable>
      <View style={[styles.circle, { backgroundColor: theme.uniqueAccent1 }]} />
      <View style={[styles.circle2, { backgroundColor: theme.uniqueAccent2 }]} />
      {children}
    </View>
  );
};

export default AuthViewWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  themeButton: {
    position: 'absolute',
    right: dimensions.marginMD * 2,
    top: dimensions.marginMD * 2,
    padding: dimensions.paddingSM,
    borderRadius: 999,
  },
  modeButton: {
    height: dimensions.fontLG * 2.25,
    width: dimensions.fontLG * 2.25,
  },
  circle: {
    height: dimensions.fontXXL * 8,
    width: dimensions.fontXXL * 8,
    borderRadius: (dimensions.fontXXL * 8) / 2,
    position: 'absolute',
    top: -dimensions.fontXXL * 2,
    left: -dimensions.fontXXL * 2,
    opacity: 0.5,
  },
  circle2: {
    height: dimensions.fontXXL * 6,
    width: dimensions.fontXXL * 6,
    borderRadius: (dimensions.fontXXL * 6) / 2,
    position: 'absolute',
    bottom: -dimensions.fontXXL * 1.5,
    right: -dimensions.fontXXL * 1.5,
    opacity: 0.5,
  },
});
