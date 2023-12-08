import React from 'react'
import { Text } from 'react-native'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
const BarraSuperior = ({navigation, route}) => {

    const handlePress = () => {
      navigation.navigate('NuevoCliente')
    }

  return (
    <Icon.Button backgroundColor='#1774f2'  name={'pluscircleo'}  onPress={() => handlePress()}>
      Cliente
    </Icon.Button>
  )
}

export default BarraSuperior