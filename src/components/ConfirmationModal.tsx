import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { dimensions } from '../constants/dimensions'
import { useTheme } from '../theme/ThemeContext'
import ThemedButton from './ThemedButton'

type Props = {
    isVisible:boolean,
    onConfirm:() => void,
    onCancel:() => void
}

const ConfirmationModal = ({isVisible,onCancel,onConfirm}:Props) => {

    const { theme } = useTheme()

  return (
    <Modal transparent visible={isVisible} animationType='slide'>
      <View style={styles.outerContainer}>
        <View style={[styles.innerContainer,{ backgroundColor:theme.background }]}>
            <Text style={[styles.header,{ color:theme.uniqueAccent1 }]}>Are you sure?</Text>
            <View style={styles.buttonContainer}>
                <ThemedButton onClick={onConfirm} buttonColor='green' style={styles.buttonStyle}>Accept</ThemedButton>
                <ThemedButton onClick={onCancel} buttonColor='red' style={styles.buttonStyle}>Cancel</ThemedButton>
            </View>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmationModal

const styles = StyleSheet.create({
    outerContainer:{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent:'center',
    },
    innerContainer:{
        height:dimensions.height/4,
        marginHorizontal:dimensions.marginXL,
        borderRadius:dimensions.fontSM,
        alignItems:'center',
        paddingHorizontal:dimensions.paddingXL
    },
    buttonContainer:{
        flexDirection:'row',
        gap:dimensions.fontXL,
        marginTop:dimensions.marginXL*2
    },
    buttonStyle:{
        flex:1
    },
    header:{
        marginTop:dimensions.marginXL*2,
        fontSize:dimensions.fontXL,
        fontWeight:'bold'
    }
})