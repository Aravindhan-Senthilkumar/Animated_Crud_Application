import { StyleSheet } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeContext';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Router from './src/router/Router';


const App = () => {

  return (
    <GestureHandlerRootView style={{ flex:1 }}>
      <SafeAreaProvider>
      <Provider store={store}>
      <ThemeProvider>
      <Router />
      </ThemeProvider>
      <Toaster />
      </Provider>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})