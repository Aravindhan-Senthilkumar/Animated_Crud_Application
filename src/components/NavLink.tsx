import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { dimensions } from '../constants/dimensions'
import { useTheme } from '../theme/ThemeContext'

type Props = {
    description:string,
    navText:string,
    style?:ViewStyle,
    onClick:() => void
}

const NavLink = ({ description,navText,style,onClick }:Props) => {

    const { theme } = useTheme()

  return (
    <View style={[styles.container,style]}>
      <Text style={[styles.descriptionText,{ color:theme.text }]}>{description}</Text>
      <TouchableOpacity onPress={onClick}>
      <Text style={[{ color:theme.uniqueAccent1 },styles.navText]}>{navText}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NavLink

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',alignSelf:'center',gap:dimensions.paddingSM/2
    },
    navText:{
    fontWeight:'bold',
    fontSize:dimensions.fontMD
    },
    descriptionText:{
      fontSize:dimensions.fontMD
    }
})