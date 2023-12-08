import React, {useContext, useState, useEffect} from 'react'
import { Text,View, TextInput, Alert } from "react-native";
import PedidoContext from '../context/pedidos/pedidosContext'
import {
  Container,
  Button,
  Card,
  Image,
  Pressable,
  AddIcon,
  Input,
  CheckIcon,
  IconButton,
  FormControl
} from 'native-base'
import GlobalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native';


const FormularioPlatillo = () => {

  const navigation = useNavigation()

  //state para cantidades
  const [cantidad, guardarCantidad] = useState(1)


  const [total, guardarTotal] = useState(0)
  const {platillo, guardarPedido} = useContext(PedidoContext)
  const {precio} = platillo

  //calcular total del platillo
  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    guardarTotal(totalPagar)
  }

  useEffect(()=>{
    calcularTotal()
  },[cantidad])

  const decrementarUno = () => {
    if(cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      guardarCantidad(nuevaCantidad) 
    }
  }

  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    guardarCantidad(nuevaCantidad)
  }

  const confirmarPedido = () => {
    Alert.alert(
      '¿Deseas confirmar tu pedido?',
      'Un pedido confirmado no se podrá modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              cantidad,
              total
            }

            guardarPedido(pedido)

            //navegar hacia el resumen
            navigation.navigate('ResumenPedido')
          }
        },
        {
          text:'Cancelar',
          style:'cancel'
        }
      ]
    )
  }


  return (
    <View style={{flex:1, backgroundColor:'#fff',position:'relative'}}>
      <View>
        <FormControl>
          <Text style={GlobalStyles.cantidad}>Cantidad</Text>

          <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around', alignItems:'center'}}>
            <View>
              <Pressable onPress={()=> decrementarUno()}>
                <Text style={{color:'#000', fontSize:70, fontWeight:'bold'}}>-</Text>
              </Pressable>
            </View>
            <View>
              <TextInput value={cantidad.toString()} keyboardType='number-pad' onChangeText={(cantidad)=> guardarCantidad(cantidad)} style={{color:'#000', fontSize:20, fontWeight:'bold', backgroundColor:'#fff', textAlign:'center'}}/>
            </View>
            <View>
            <Pressable onPress={()=> incrementarUno()}>
                <Text style={{color:'#000', fontSize:70, fontWeight:'bold'}}>+</Text>
              </Pressable>
            </View>
          </View>

          <Text style={GlobalStyles.cantidad}>Subtotal: ${total}</Text>
        </FormControl>
      </View>
      <Pressable 
        style={[GlobalStyles.boton,{position:'absolute', bottom:0, width:'100%', padding:15}]}
        onPress={()=>confirmarPedido()}
      >
        <Text style={[GlobalStyles.botonTexto,{textAlign:'center'}]}>Agregar al Pedido</Text>
      </Pressable>
    </View>
  )
}

export default FormularioPlatillo