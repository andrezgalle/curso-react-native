import React,{useContext, useState, useEffect} from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { Button } from 'native-base'
import GlobalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import PedidoContext from '../context/pedidos/pedidosContext'
import firebase from '../firebase'


const ProgresoPedido = () => {

  const {idpedido} = useContext(PedidoContext)
  const [tiempo , guardarTiempo] = useState(0)
  useEffect(()=>{
    const obtenerProducto = async () => {
      const tiempo = await firebase.obtenerOrden(idpedido);
      guardarTiempo(tiempo.tiempoEntrega)
    }
    obtenerProducto()
  },[])
  
  return (
    <Text>{idpedido}</Text>
  )
}

export default ProgresoPedido