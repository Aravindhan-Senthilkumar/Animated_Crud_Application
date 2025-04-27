import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DashBoardScreen from '../screens/HomeScreens/DashBoardScreen'
import AddMemberScreen from '../screens/HomeScreens/AddMemberScreen'
import UpdateMemberScreen from '../screens/HomeScreens/UpdateMemberScreen'


const MainStack = () => {

  const Stack = createNativeStackNavigator() 

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown:false }}>
            <Stack.Screen name='dashboard' component={DashBoardScreen}/>
            <Stack.Screen name='addmember' component={AddMemberScreen}/>
            <Stack.Screen name='updatemember' component={UpdateMemberScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStack

const styles = StyleSheet.create({})