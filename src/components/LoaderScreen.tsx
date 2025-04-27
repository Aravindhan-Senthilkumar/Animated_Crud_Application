import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {useTheme} from '../theme/ThemeContext';
import Loader from '../assets/animation/Loader.json';
import { dimensions } from '../constants/dimensions';

type Props = {
  isLoading?:boolean
}

const LoaderScreen = ({ isLoading }:Props) => {
  return (
    <Modal visible={isLoading} transparent>
      <View style={[styles.container]}>
        <LottieView
          autoPlay
          source={Loader}
          loop
          style={styles.animatedImage}></LottieView>
      </View>
    </Modal>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingBottom:dimensions.paddingXL*4
  },
  animatedImage: {
    width: '70%',
    height: '70%',
  },
});
