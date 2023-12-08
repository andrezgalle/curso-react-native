

import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text, View, TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native';

//components
import Formulario from './components/Formulario';
import Clima from './components/Clima';

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais:''
  })

  const {ciudad, pais} = busqueda;

  const [consultar, guardarConsultar] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const [bgColor, guardarBgColor] = useState('rgb(71,149,212)')


  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No hay resultados, intenta con otra ciudad o país'
    )
  }

  useEffect(()=>{
    const consultarAPI  = async() => {
      if(consultar){
        const appId = 'b3fb663a360a66ec63c9fc911def6655'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
        
        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          guardarResultado(resultado)
          guardarConsultar(false)

          //modifica los colores de fondo basado en la temperatura
          const kelvin = 273.15;
          const {main} = resultado;

          const actual = main.temp - kelvin;
          console.log(actual)

          if(actual < 10 ){
            guardarBgColor('rgb(105, 108, 149)')
          }else if(actual >=10 && actual < 25){
            guardarBgColor('rgb(71,149,212)')
          }else{
            guardarBgColor('rgb(178,28,61)')
          }

        } catch (error) {
          mostrarAlerta()
        }
      }
    }
    consultarAPI()
  },[consultar])

  const ocultarTeclado = () => {
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor:bgColor
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app,bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado}/>
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app:{
    flex:1,
    justifyContent:'center'
  },

  contenido:{
    marginHorizontal:'2.5%'
  }
})

export default App;
