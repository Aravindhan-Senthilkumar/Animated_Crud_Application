import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { useTheme } from '../theme/ThemeContext';
import { dimensions } from '../constants/dimensions';

type Props = {
  onClick: () => void;
} & ButtonProps;

const ThemedButton = ({ onClick, children, style, contentStyle, labelStyle,loading, ...rest }: Props) => {
  const { theme } = useTheme();

  return (
    <Button
      mode="contained"
      onPress={loading ? undefined : onClick}
      buttonColor={theme.buttonBackground}
      textColor={theme.buttonText}
      rippleColor={theme.background}
      style={[styles.button, style]}
      contentStyle={[styles.content, contentStyle]}
      labelStyle={[styles.label, labelStyle]}
      {...rest}
      >
      {children}
    </Button>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: dimensions.paddingSM,
  },
  content: {
    paddingVertical: dimensions.paddingSM / 2,
  },
  label: {
    fontSize: dimensions.fontMD,
  },
});
