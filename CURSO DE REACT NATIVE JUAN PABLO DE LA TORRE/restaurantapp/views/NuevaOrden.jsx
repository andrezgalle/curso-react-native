import React from 'react'
import {View, StyleSheet } from 'react-native'
import {Button,Text} from 'native-base'
import GlobalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'

const NuevaOrden = () => {
  const navigation = useNavigation()
  return (
      <View
        style={GlobalStyles.contenedor}
      >
        <View style={[GlobalStyles.contenido,styles.contenido]}>
          <Button
            rounded={100}
            style={GlobalStyles.boton}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text
              style={GlobalStyles.botonTexto}
            >Crear Nueva Orden</Text>
          </Button>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  contenido: {
    flexDirection:'column',
    justifyContent:'center'
  }
})

export default NuevaOrden