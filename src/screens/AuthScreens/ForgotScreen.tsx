import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ThemedInput from '../../components/ThemedInput';
import { dimensions } from '../../constants/dimensions';
import ThemedButton from '../../components/ThemedButton';
import NavLink from '../../components/NavLink';
import { useTheme } from '../../theme/ThemeContext';
import useAppNavigation from '../../hooks/useAppNavigation';
import AuthViewWrapper from '../../components/AuthViewWrapper';
import LoaderScreen from '../../components/LoaderScreen';
import { AxiosError } from 'axios';
import { authApi } from '../../api/api';
import { forgotPasswordResponse } from '../../types/commonTypes';
import { toast } from 'sonner-native';
import useLoader from '../../hooks/useLoader';
import useToggler from '../../hooks/useToggler';

const ForgotScreen = () => {
  const { theme } = useTheme();
  const { navigateToLoginScreen } = useAppNavigation();
  const passwordToggler = useToggler();
  const { loading, startLoading, stopLoading } = useLoader();

  // form state
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  // flow state
  const [step, setStep] = useState<'send' | 'verify' | 'reset'>('send');

  const handleSubmit = async () => {
    startLoading();
    try {
      let response;
      switch (step) {
        case 'send':
          response = await authApi.post<forgotPasswordResponse>('/forgotPassword', { email });
          break;
        case 'verify':
          response = await authApi.post<forgotPasswordResponse>('/verifyOTP', { email, otp });
          break;
        case 'reset':
          response = await authApi.post<forgotPasswordResponse>('/resetPassword', {
            email,
            password,
          });
          break;
      }

      const data = response.data;
      toast.success(data.message);

      // advance to next step
      if (step === 'send') setStep('verify');
      else if (step === 'verify') setStep('reset');
      else if (step === 'reset') {
        // done! go back to login
        navigateToLoginScreen();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data.message as string);
    } finally {
      stopLoading();
    }
  };

  // figure out button label and disabled state
  let buttonLabel = '';
  if (step === 'send') buttonLabel = 'Send OTP';
  else if (step === 'verify') buttonLabel = 'Verify OTP';
  else buttonLabel = 'Reset Password';

  // inputs for each step
  return (
    <AuthViewWrapper>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.uniqueAccent1 }]}>Forgot Password</Text>

        <ThemedInput
          needChange={step === 'verify'} 
          onPressNeedChange={() => setStep('send')}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your Email"
          leftIcon="email"
          disabled={step !== 'send'}
        />

        {step !== 'send' && (
          <ThemedInput
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
            leftIcon="lock"
            keyboardType="number-pad"
            maxLength={6}
            disabled={step === 'reset'}
          />
        )}

        {step === 'reset' && (
          <ThemedInput
            value={password}
            onChangeText={setPassword}
            isPassword
            secureTextEntry={!passwordToggler.value}
            isPasswordVisible={passwordToggler.value}
            toggleVisibility={passwordToggler.toggler}
            placeholder="Enter New Password"
            leftIcon="lock"
          />
        )}

        <ThemedButton
          loading={loading}
          disabled={
            (step === 'send' && !email.trim()) ||
            (step === 'verify' && (!otp.trim() || !email.trim())) ||
            (step === 'reset' && (!password.trim() || !otp.trim() || !email.trim()))
          }
          onClick={handleSubmit}
        >
          {buttonLabel}
        </ThemedButton>

        <NavLink
          onClick={navigateToLoginScreen}
          description=""
          navText="Back to Login"
          style={styles.navlink}
        />
      </View>

      <LoaderScreen isLoading={loading} />
    </AuthViewWrapper>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: dimensions.paddingXL,
    marginTop: dimensions.height / 3.5,
  },
  title: {
    fontSize: dimensions.fontSM * 2,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: dimensions.fontMD,
  },
  navlink: {
    marginTop: dimensions.marginSM,
  },
});
