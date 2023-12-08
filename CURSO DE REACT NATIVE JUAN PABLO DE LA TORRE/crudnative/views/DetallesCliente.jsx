import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper'
import globalStyles from '../styles/global' 
import axios from 'axios'
const DetallesCliente = ({navigation,route}) => {
  const {guardarConsultarAPI} = route.params
  const {nombre, telefono , correo , empresa, id} = route.params.item; 

  const mostrarConfirmacion = () => {
    Alert.alert(
      '¿Deseas Eliminar este cliente?',
      'Un contacto eliminado no se puede recuperar',
      [
        {text:'Si, Eliminar', onPress: ()=> eliminarContacto()},
        {text:'Cancelar',style:'cancel'}
      ]
    )
  }

  const eliminarContacto = async () => {

    try {
      if(Platform.OS === 'ios'){
        resultado = await axios.delete(`http://localhost:3000/clientes/${id}`)
        guardarConsultarAPI(false)
      }else{
        resultado = await axios.delete(`http://192.168.1.36:3000/clientes/${id}`)
        guardarConsultarAPI(false)
      } 
    } catch (error) {
      console.log(error)
    }

    //redireccionar
    navigation.navigate('Inicio')

    //volver a consultar la API
    guardarConsultarAPI(true)
  }

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
      <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
      <Text style={styles.texto}>Teléfono: <Subheading>{telefono}</Subheading></Text>

      <Button 
        mode='contained'
        icon='cancel'
        style={styles.btn}
        onPress={()=> mostrarConfirmacion()}
      >
        Eliminar Cliente
      </Button>

      <FAB
        icon='pencil'
        style={globalStyles.fab}
        onPress={()=>navigation.navigate('NuevoCliente',{cliente:route.params.item,guardarConsultarAPI})}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  texto:{
    marginBottom:20,
    fontSize:18,
    textAlign:'center'
  },

  btn:{
    borderRadius:5,
    marginTop:100,
    backgroundColor:'red'
  }
})

export default DetallesCliente