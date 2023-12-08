import React, {useContext, useEffect} from 'react'
import { Text,View, TextInput, Alert, Pressable } from "react-native";
import PedidoContext from '../context/pedidos/pedidosContext'
import {
  List,
  Image,
  ScrollView,
  Button
} from 'native-base'
import GlobalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';

const ResumenPedido = () => {

  const navigation = useNavigation()

  //context del pedido
  const {pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado} = useContext(PedidoContext)
  
  useEffect(()=>{
    calcularTotal()
  },[pedido])

  const calcularTotal = () => {
    let nuevoTotal = 0
    nuevoTotal = pedido.reduce( (nuevoTotal , articulo)=> nuevoTotal + articulo.total , 0)
    mostrarResumen(nuevoTotal)
  }

  //redirecciona a progreso pedido
  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu Pedido',
      'Una vez que realizas tu pedido no podrás cambiarlo',
      [
        {
          text:'Confirmar',
          onPress: async () => {

            //crear el objeto
            const objPedido = {
              tiempoEntrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado:Date.now()
            }

            try {
              const pedido = await firebase.agregarPedido(objPedido)
              pedidoRealizado(pedido.id)

              //redireccionar
              navigation.navigate('ProgresoPedido')
            } catch (error) {
              console.log(error)
            }
          }
        },
        {
          text:'Revisar',
          style:'cancel'
        }
      ]
    )
  }

  //elimina un producto
  const confirmarEliminacion = (id) => {
    Alert.alert(
      '¿Desear eliminar este articulo?',
      'Una vez eliminado no se puedo recuperar',
      [
        {
          text:'Confirmar',
          onPress: () => {
            //eliminar del state y calcular
            eliminarProducto(id)
          }
        },
        {
          text:'cancelar',
          style:'cancel'
        }
      ]
    )
  }

  return (
    <>
    <ScrollView style={[GlobalStyles.contenedor]}>
      <View style={GlobalStyles.contenido}>
        <Text style={GlobalStyles.cantidad}>Resumen Pedido</Text>
        {pedido.map((platillo , i) => {
          const {cantidad, nombre , imagen, id, precio} = platillo;
          return(
            <List key={id + i}>
              <View style={{flexDirection:'row', gap:10 ,alignItems:'center', flex:1}}>
                <Image source={{uri:imagen}} style={GlobalStyles.imagen2}/>

                <View style={{flex:1, paddingHorizontal:15}}>
                  <Text style={{color:'#000'}}>{nombre}</Text>
                  <Text style={{color:'#000'}}>Cantidad: {cantidad}</Text>
                  <Text style={{color:'#000'}}>Precio: ${precio}</Text>
                  <Button
                    style={{backgroundColor:'#BA4138', marginTop:20,width:'100%'}}
                    onPress={()=> confirmarEliminacion(id)}
                  >
                    <Text style={[GlobalStyles.botonTexto,{color:'#fff'}]}>Eliminar</Text>
                  </Button>
                </View>
              </View>
            </List>
          )
        })}
      <Text style={GlobalStyles.cantidad}>Total a Pagar: $ {total}</Text>

      <Pressable 
        style={{width:'100%',padding:15, backgroundColor:'#000', borderRadius:5}}
        onPress={()=> navigation.navigate('Menu')}
      >
        <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold', textTransform:'uppercase'}}>Seguir Pidiendo</Text>
      </Pressable>
      </View>
    </ScrollView>
          <Pressable
            onPress={()=> progresoPedido()}
          style={[GlobalStyles.boton,{position:'absolute', bottom:0, width:'100%', padding:15}]}
          
        >
          <Text style={[GlobalStyles.botonTexto,{textAlign:'center'}]}>Ordenar Pedido</Text>
        </Pressable>
  </>
  )
}

export default ResumenPedido