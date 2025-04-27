import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { dimensions } from '../constants/dimensions';
import { useTheme } from '../theme/ThemeContext';
import FabComponent from './FabComponent';
import Sun from '../assets/animation/sun.json';
import Moon from '../assets/animation/moon.json';
import home from '../assets/animation/home.json'
import useAppNavigation from '../hooks/useAppNavigation';
import AddIcon from '../assets/animation/add.json';
type Props = {
  isHome:boolean,
  children:ReactNode
}

const MainViewWrapper = ({children,isHome}:Props) => {
  const { theme,isDarkMode,toggleTheme } = useTheme();

  const { navigateToDashBoardScreen,navigateToAddMemberScreen } = useAppNavigation();

  return (
    <View style={[styles.container,{ backgroundColor:theme.background }]}>
      <View style={[styles.rectangle1, { backgroundColor: theme.uniqueAccent1 }]} />
      <View style={[styles.rectangle2, { backgroundColor: theme.uniqueAccent2 }]} />
      {children}
      <FabComponent  buttonStyle={styles.fab} icon={isHome ? AddIcon : home } iconStyle={styles.addIcon} onClick={isHome ? navigateToAddMemberScreen : navigateToDashBoardScreen} />
      <FabComponent buttonStyle={styles.darkFab} iconStyle={isDarkMode ? styles.sunIcon : styles.moonIcon} icon={isDarkMode ? Sun : Moon} onClick={toggleTheme} />
    </View>
  );
};

export default MainViewWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  rectangle1: {
    height: dimensions.height * 1.2, 
    width: dimensions.width * 2,    
    position: 'absolute',
    top: -dimensions.height * 1.1 , 
    left: -dimensions.width * 0.5,  
    transform: [
      { rotate: '60deg' },
    ],
  },
  rectangle2: {
    height: dimensions.height * 1.2,
    width: dimensions.width * 2,
    position: 'absolute',
    bottom: -dimensions.height * 1.1,
    left: -dimensions.width * 0.5,
    transform: [
      { rotate: '60deg' },
    ],
  },
  darkFab: {
    position: 'absolute',
    bottom: dimensions.marginXL * 5,
    right: dimensions.marginMD,
    width: dimensions.fontXXL * 2.5,
    height: dimensions.fontXXL * 2.5,
    borderRadius: dimensions.fontXXL,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sunIcon: {
    height: dimensions.fontXXL * 3,
    width: dimensions.fontXXL * 2,
  }, moonIcon: {
    height: dimensions.fontXXL * 4,
    width: dimensions.fontXXL * 3,
  },
  fab: {
      position: 'absolute',
      bottom: dimensions.marginXL,
      right: dimensions.marginMD,
      width: dimensions.fontXXL * 2.5,
      height: dimensions.fontXXL * 2.5,
      borderRadius: dimensions.fontXXL,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
    }, 
    addIcon: {
      height: dimensions.fontXXL * 3,
      width: dimensions.fontXXL * 1.5,
    }
});
