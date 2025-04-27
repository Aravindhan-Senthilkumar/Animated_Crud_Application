import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ThemedInput from '../../components/ThemedInput';
import {dimensions} from '../../constants/dimensions';
import ThemedButton from '../../components/ThemedButton';
import NavLink from '../../components/NavLink';
import {useTheme} from '../../theme/ThemeContext';
import useAppNavigation from '../../hooks/useAppNavigation';
import AuthViewWrapper from '../../components/AuthViewWrapper';
import {loginPayload, loginResponse} from '../../types/commonTypes';
import useToggler from '../../hooks/useToggler';
import LoaderScreen from '../../components/LoaderScreen';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { handleLogin } from '../../redux/slices/authSlice';
import { AxiosError } from 'axios';
import { authApi } from '../../api/api';
import { toast } from 'sonner-native';
import useLoader from '../../hooks/useLoader';
import { storage } from '../../storage/storage';


const LoginScreen = () => {
  const {theme} = useTheme();

  const {navigateToSignUpScreen, navigateToForgotScreen} = useAppNavigation();

  const [userData, setUserData] = useState<loginPayload>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<loginPayload>({
    email: '',
    password: '',
  });

  const validationCheck = () => {
    let hasError = false;
    let newErrors: loginPayload = {
      email: '',
      password: '',
    };

    if (userData.email.trim() === '') {
      newErrors.email = 'Please enter your email id';
      hasError = true;
    }

    if (userData.password.trim() === '') {
      newErrors.password = 'Please enter your password';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return false;
    } else {
      setErrors({
        email: '',
        password: '',
      });
      return true;
    }
  };

  const dispatch = useDispatch<AppDispatch>()

  const { loading,startLoading,stopLoading } = useLoader()

  const loginHandler = async () => {
    startLoading()
    try {
      const response = await authApi.post('/login',userData);

      const receivedData:loginResponse = response.data

      if(receivedData){
      // await AsyncStorage.setItem('token',receivedData.token)
      storage.set('token',receivedData.token)
      toast.success(receivedData.message)
      dispatch(handleLogin(true))
      }
    } catch (err) {
      const error = err as AxiosError<{ message:string }>
      toast.error(error.response?.data.message as string)
    } finally {
      stopLoading()
    }
  };

  const handleLoginAdmin = async () => {
    const hasPermitted = validationCheck();
    if(!hasPermitted)
      return;
    await loginHandler()
  };

  const passwordToggler = useToggler();

  return (
    <AuthViewWrapper>
      <View style={styles.container}>
        <Text style={[styles.welcomeText, {color: theme.uniqueAccent1}]}>
          Welcome
        </Text>
        <ThemedInput
          errorData={errors.email}
          value={userData.email}
          onChangeText={text => {
            setUserData(prev => ({...prev, email: text}));
            setErrors(prev => ({...prev, email: ''}));
          }}
          placeholder="Enter your email"
          leftIcon="email"
        />
        <ThemedInput
          isPassword
          errorData={errors.password}
          value={userData.password}
          onChangeText={text => {
            setUserData(prev => ({...prev, password: text}));
            setErrors(prev => ({...prev, password: ''}));
          }}
          placeholder="Enter your password"
          leftIcon="lock"
          isPasswordVisible={passwordToggler.value}
          toggleVisibility={passwordToggler.toggler}
          secureTextEntry={!passwordToggler.value}
        />
        <TouchableOpacity onPress={navigateToForgotScreen}>
          <Text style={[styles.forgotText, {color: theme.buttonBackground}]}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <ThemedButton
          loading={loading}
          onClick={handleLoginAdmin}
          style={
            userData.email === '' &&
            userData.password === '' &&
            styles.disableButton
          }
          disabled={userData.email === '' && userData.password === '' && true}>
          Login
        </ThemedButton>
        <NavLink
          onClick={navigateToSignUpScreen}
          description="Don't have an account?"
          navText="SignUp now"
          style={styles.navlinkContainer}
        />
      </View>
      <LoaderScreen isLoading={loading}/>
    </AuthViewWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: dimensions.paddingXL,
    marginTop: dimensions.height / 3.5,
  },
  forgotText: {
    textAlign: 'right',
    fontSize: dimensions.fontMD,
    marginBottom: dimensions.paddingXL / 2,
  },
  navlinkContainer: {
    marginTop: dimensions.marginSM,
  },
  welcomeText: {
    fontSize: dimensions.fontSM * 3,
    textAlign: 'center',
    letterSpacing: dimensions.fontSM / 2,
    fontWeight: 'bold',
    marginBottom: dimensions.fontMD,
  },
  disableButton: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
});
