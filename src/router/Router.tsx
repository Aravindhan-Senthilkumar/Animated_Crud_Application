import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import MainStack from './MainStack'
import AuthStack from './AuthStack'
import useLoader from '../hooks/useLoader'
import { storage } from '../storage/storage'
import { authApi } from '../api/api'
import { generateTokenResponse } from '../types/commonTypes'
import { handleLogin } from '../redux/slices/authSlice'
import SplashScreen from '../screens/CommonScreens/SplashScreen'


const Router = () => {
  const isLogin = useSelector((state:RootState) =>state.isLoggedIn)
  
  const { loading,startLoading,stopLoading } = useLoader();

  const dispatch = useDispatch<AppDispatch>()

  const refreshToken = async () => {
    startLoading();
    try {
      const token = storage.getString('token');
      if (token !== undefined && token !== null) {
        const response = await authApi.post('/generateToken', { token });
        const data: generateTokenResponse = response.data;
        
        storage.set('token', data.newToken);

        dispatch(handleLogin(true));
      } else {

        dispatch(handleLogin(false));
      }
    } catch (error) {
      console.log('error refreshing token: ', error);
      dispatch(handleLogin(false));
    } finally {
      setTimeout(() => {
        stopLoading()
      },2000)
    }
  };

  useEffect(() => {
    refreshToken()
  },[])

  return (
    <View style={{flex:1}}>
      {
        loading ? <SplashScreen /> : isLogin ? <MainStack /> : <AuthStack />
      }
    </View>
  )
}

export default Router

const styles = StyleSheet.create({})