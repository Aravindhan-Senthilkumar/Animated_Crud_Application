import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import ForgotScreen from '../screens/AuthScreens/ForgotScreen';
import SplashScreen from '../screens/CommonScreens/SplashScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="forgot" component={ForgotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
