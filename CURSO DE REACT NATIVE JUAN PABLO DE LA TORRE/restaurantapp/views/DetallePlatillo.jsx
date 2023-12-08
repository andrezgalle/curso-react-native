import React, {useContext} from 'react'
import { Text,View } from "react-native";
import PedidoContext from '../context/pedidos/pedidosContext'
import {
  Container,
  Button,
  Card,
  Image,
  Pressable,
} from 'native-base'
import GlobalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native';
const DetallePlatillo = () => {

  const navigation = useNavigation()
  
  //Pedido context
  const {platillo} = useContext(PedidoContext)
  const {nombre, imagen, descripcion, precio} = platillo

  return (
    <View style={[GlobalStyles.contenedor,{position:'relative'}]}>
      <View style={[GlobalStyles.contenido]}>
        <Text style={{
          marginTop:30,
          fontSize:30,
          textAlign:'center',
          marginBottom:20,
          color:'#000',
        }}>{nombre}</Text>

        <Card>
          <Image style={GlobalStyles.imagen} source={{uri:imagen}}/>
          <Text style={{marginTop:20,fontWeight:'bold',color:'#000'}}>{descripcion}</Text>
          <Text style={GlobalStyles.cantidad}>Precio: $ {precio}</Text>
        </Card>

      </View>

      <Pressable 
        style={[GlobalStyles.boton,{position:'absolute', bottom:0, width:'100%', padding:15}]}
        onPress={()=>navigation.navigate('FormularioPlatillo')}
      >
        <Text style={[GlobalStyles.botonTexto,{textAlign:'center'}]}>Ordenar Platillo</Text>
      </Pressable>
    </View>
  )
}

export default DetallePlatillo