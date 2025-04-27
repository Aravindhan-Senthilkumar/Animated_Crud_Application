import { StyleSheet, Text, View, StyleProp, TextStyle } from 'react-native';
import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import { dimensions } from '../constants/dimensions';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  placeholder?: string;
  leftIcon?: string;
  errorData?: string;
  style?: StyleProp<TextStyle>;
  label?:string;
  isPassword?:boolean;
  isPasswordVisible?:boolean,
  toggleVisibility?:() => void,
  needChange?:boolean,
  onPressNeedChange?:() => void
} & TextInputProps;

const ThemedInput = ({ placeholder, leftIcon, errorData, style,label,isPassword,needChange,onPressNeedChange,isPasswordVisible,toggleVisibility, ...rest }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize={isPassword ? 'none' : undefined}
        label={label}
        placeholder={placeholder}
        mode="outlined"
        activeOutlineColor={theme.uniqueAccent1}
        style={[{ backgroundColor: theme.inputBackground }, style]}
        outlineStyle={{
          ...styles.outline,
          backgroundColor: theme.inputBackground,
        }}
        left={
          leftIcon && <TextInput.Icon icon={leftIcon} color={theme.uniqueAccent1} size={dimensions.fontXL} /> }
        outlineColor={theme.inputText}
        textColor={theme.text}
        right=
            {isPassword || needChange ? (
              <TextInput.Icon
                key="toggle"
                onPress={needChange ? onPressNeedChange : toggleVisibility}
                icon={needChange ? 'pencil' : isPasswordVisible ? 'eye-off' : 'eye'}
                color={theme.uniqueAccent1}
                size={dimensions.fontXL}
              />
            ) : null}
        {...rest}
      />
      {
        errorData && <Text style={[styles.error, { color: 'red' }]}>{errorData}</Text>
      }
    </View>
  );
};

export default ThemedInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.marginSM,
  },
  outline: {
    borderRadius: 10,
    height: dimensions.fontSM * 4,
  },
  error: {
    fontSize: dimensions.fontMD,
    marginTop: dimensions.marginSM,
  },
});
