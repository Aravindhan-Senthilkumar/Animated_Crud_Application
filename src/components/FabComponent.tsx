import { Pressable, PressableProps, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import LottieView, { LottieViewProps } from 'lottie-react-native'
import { useTheme } from '../theme/ThemeContext'

type Props = {
    icon:any,
    buttonStyle:ViewStyle,
    iconStyle:ViewStyle,
    onClick:() => void
}

const FabComponent = ({ buttonStyle,icon,iconStyle,onClick }:Props) => {

    const { theme }  = useTheme()

  return (
    <TouchableOpacity style={[buttonStyle, {backgroundColor: theme.text}]} onPress={onClick}>
    <LottieView autoPlay source={icon} style={iconStyle}/>
    </TouchableOpacity>
  )
}

export default FabComponent

const styles = StyleSheet.create({})

