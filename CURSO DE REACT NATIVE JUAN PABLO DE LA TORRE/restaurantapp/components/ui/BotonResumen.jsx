import React,{useContext} from 'react'
import { Button, Text } from 'native-base'
import GlobalStyles from '../../styles/global'
import { useNavigation } from '@react-navigation/native'
import PedidoContext from '../../context/pedidos/pedidosContext'

const BotonResumen = () => {
  const navigation = useNavigation()
  const {pedido} = useContext(PedidoContext)

  if(pedido.length === 0) return null

  return (
    <Button style={GlobalStyles.boton} onPress={()=> navigation.navigate('ResumenPedido')}>
      <Text style={GlobalStyles.botonTexto}>Pedido</Text>
    </Button>
  )
}

export default BotonResumen