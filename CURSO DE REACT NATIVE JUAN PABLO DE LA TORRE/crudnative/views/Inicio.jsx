import React, { useEffect, useState } from 'react'
import {
    Text,
    FlatList,
    View,
    
  } from 'react-native';
import axios from 'axios';
import { List, Headline, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({navigation,route}) => {
  //state de la app
  const [clientes, guardarClientes] = useState([])
  const [consultarAPI, guardarConsultarAPI] = useState(true)


  useEffect(()=>{
      const obtenerClienteAPI = async ( ) => {
        try {

          let resultado;

          if(Platform.OS === 'ios'){
            resultado = await axios.get('http://localhost:3000/clientes')
            guardarConsultarAPI(false)
          }else{
            resultado = await axios.get('http://192.168.1.36:3000/clientes')
            guardarConsultarAPI(false)
          }

          guardarClientes(resultado.data)

        } catch (error) {
          console.log(error)
        }
      }
      if(consultarAPI){
        obtenerClienteAPI()
      }
  },[consultarAPI])
  
  return (
    <View style={globalStyles.contenedor}>

      <Button icon={'plus'} onPress={() => navigation.navigate('NuevoCliente',{
        guardarConsultarAPI
      })}>
        Nuevo Cliente
      </Button>

      <Headline style={globalStyles.titulo}>{clientes.length > 0 ? 'Clientes':'Aún no hay clientes'}</Headline>
      <FlatList 
        data={clientes}
        keyExtractor={cliente => cliente.id.toString()}
        renderItem={({item}) => (
            <List.Item
                title={item.nombre}
                description={item.empresa}
                onPress={()=> navigation.navigate('DetallesCliente',{
                  item, guardarConsultarAPI
                })}
            />
        )}
      />

      <FAB 
        icon={'plus'}
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NuevoCliente',{
          guardarConsultarAPI
        })}
      />
    </View>
  )
}


export default Inicio