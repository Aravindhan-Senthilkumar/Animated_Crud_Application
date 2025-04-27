import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ThemedInput from '../../components/ThemedInput';
import {dimensions} from '../../constants/dimensions';
import ThemedButton from '../../components/ThemedButton';
import NavLink from '../../components/NavLink';
import {useTheme} from '../../theme/ThemeContext';
import useAppNavigation from '../../hooks/useAppNavigation';
import AuthViewWrapper from '../../components/AuthViewWrapper';
import {registerPayload, registerResponse} from '../../types/commonTypes';
import useToggler from '../../hooks/useToggler';
import LoaderScreen from '../../components/LoaderScreen';
import {authApi} from '../../api/api';
import {toast} from 'sonner-native';
import {AxiosError} from 'axios';
import useLoader from '../../hooks/useLoader';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { handleLogin } from '../../redux/slices/authSlice';

const RegisterScreen = () => {
  const {theme} = useTheme();

  const {navigateToLoginScreen} = useAppNavigation();

  const passwordToggler = useToggler();

  const {loading, startLoading, stopLoading} = useLoader();

  const [userData, setUserData] = useState<registerPayload>({
    email: '',
    password: '',
    name: '',
  });

  const [errors, setErrors] = useState<registerPayload>({
    email: '',
    password: '',
    name: '',
  });
  const dispatch = useDispatch<AppDispatch>()
  const validationCheck = () => {
    let hasError = false;
    let newErrors: registerPayload = {
      email: '',
      password: '',
      name: '',
    };

    if (userData.email.trim() === '') {
      newErrors.email = 'Please enter your email id';
      hasError = true;
    }

    if (userData.password.trim() === '') {
      newErrors.password = 'Please enter your password';
      hasError = true;
    }

    if (userData.name.trim() === '') {
      newErrors.name = 'Please enter your name';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return false;
    } else {
      setErrors({
        email: '',
        password: '',
        name: '',
      });
      return true;
    }
  };
  
  const registerHandler = async () => {
    startLoading();
    try {
      const response = await authApi.post('/register', userData);
      const receivedData: registerResponse = response.data;
      if (receivedData.message) {
        toast.success(receivedData.message);
        dispatch(handleLogin(true))
      }
      console.log('User registered successfully', receivedData);
    } catch (err) {
      const error = err as AxiosError<{message: string}>;
      toast.error(error.response?.data.message as string);
    } finally {
      stopLoading();
    }
  };

  const handleRegister = async () => {
    const hasPermitted = validationCheck();
    if (!hasPermitted) return;
    await registerHandler();
  };

  return (
    <AuthViewWrapper>
      <View style={styles.container}>
        <Text style={[styles.welcomeText, {color: theme.uniqueAccent1}]}>
          Welcome
        </Text>
        <ThemedInput
          value={userData.name}
          errorData={errors.name}
          onChangeText={text => {
            setUserData(prev => ({...prev, name: text}));
            setErrors(prev => ({...prev, name: ''}));
          }}
          placeholder="Enter your name"
          leftIcon="account"
        />
        <ThemedInput
          value={userData.email}
          onChangeText={text => {
            setUserData(prev => ({...prev, email: text}));
            setErrors(prev => ({...prev, email: ''}));
          }}
          errorData={errors.email}
          placeholder="Enter your email"
          leftIcon="email"
        />
        <ThemedInput
          isPassword
          onChangeText={text => {
            setUserData(prev => ({...prev, password: text}));
            setErrors(prev => ({...prev, password: ''}));
          }}
          value={userData.password}
          errorData={errors.password}
          placeholder="Enter your password"
          leftIcon="lock"
          isPasswordVisible={passwordToggler.value}
          toggleVisibility={passwordToggler.toggler}
          secureTextEntry={!passwordToggler.value}
        />
        <ThemedButton
          style={
            userData.email === '' &&
            userData.password === '' &&
            userData.name === '' &&
            styles.disableButton
          }
          disabled={
            userData.email === '' &&
            userData.password === '' &&
            userData.name === '' &&
            true
          }
          onClick={handleRegister}>
          Register
        </ThemedButton>
        <NavLink
          onClick={navigateToLoginScreen}
          description="Already have an account?"
          navText="Login now"
          style={styles.navlinkContainer}
        />
      </View>
      <LoaderScreen isLoading={loading} />
    </AuthViewWrapper>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: dimensions.paddingXL,
    marginTop: dimensions.height / 4,
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
