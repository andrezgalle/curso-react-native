import React, {useEffect, useState} from 'react';
import {
  SafeAreaView, 
  Text,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import { generarId } from './src/helpers';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';

function App(){

  //state
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0)
  const [gastos, setGastos] = useState([])
  const [gasto, setGasto] = useState({})
  const [modal, setModal] = useState(false)
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(()=>{
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
        
        if(presupuestoStorage){
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }

      } catch (error) {
        console.log(error)
      }
    }

    obtenerPresupuestoStorage()
  },[])

  useEffect(()=>{
    if(isValidPresupuesto){
        const guardarPresupuestoStorage = async () => {
          try {
            await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
          } catch (error) {
            console.log(error)
          }
        }

        guardarPresupuestoStorage()
    }

  },[isValidPresupuesto])

  useEffect(()=>{
    const obtenerGastosStorage = async () => {
      const gastosStorage = await AsyncStorage.getItem('planificador_gastos')
      setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
    }
    obtenerGastosStorage()
   },[])

  useEffect(()=>{
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos',JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage()
  },[gastos])

  const handleNuevoPresupuesto = presupuesto => {
    if(Number(presupuesto) > 0){
      setIsValidPresupuesto(true)
    }else{
      Alert.alert('Error','El presupuesto no puede ser 0 o menor',)
    }
  }

  const handleGasto = gasto => {
    if([gasto.nombre,gasto.categoria,gasto.cantidad].includes('')){
        Alert.alert(
          'Error',
          'Todos los campos son obligatorios'
        )
        return;
    }

    if(gasto.id){

      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)

    }else{
      //Añadir nuevo gasto al state
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos,gasto])
    }

    setModal(!modal)
  }

  const eliminarGasto = id => {

    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [{text:'No', style:'cancel'}, {text:'Si, Eliminar', onPress:() => {
        const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
        setGastos(gastosActualizados)
        setModal(!modal)
        setGasto({})
      }}]
    )
  }

  const resetearApp = () => {
    Alert.alert(
      '¿Deseas resetear la app?',
      'Esto eliminará presupuestos y gastos',
      [
        {text:'No',style:'cancel'},
        {text:'Si, eliminar', onPress : async() => {
          try {
            await AsyncStorage.clear()
            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])
            
          } catch (error) {
            console.log(error)
          }
        } }
      ]
    )
  }

  return (
      <View style={styles.contenedor}>
        <ScrollView>
            <View style={styles.header}>
              <Header/>

              {isValidPresupuesto ? (
                    <ControlPresupuesto
                        presupuesto={presupuesto}
                        gastos={gastos}
                        resetearApp={resetearApp}
                    />
                ) : 
                (
                  <NuevoPresupuesto
                    handleNuevoPresupuesto={handleNuevoPresupuesto}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                  />
                )
              }

            </View>
            
            {isValidPresupuesto && (
              <>
                <Filtro
                  gastos={gastos}
                  setGastosFiltrados={setGastosFiltrados}
                  filtro={filtro}
                  setFiltro={setFiltro}
                />
                <ListadoGastos
                  gastos={gastos}
                  setModal={setModal}
                  setGasto={setGasto}
                  filtro={filtro}
                  gastosFiltrados={gastosFiltrados}
                />
              </>

            )}
        </ScrollView>
        {modal && (
          <Modal
              animationType='slide'
              visible={modal} 
              onRequestClose={()=>{
                setModal(!modal)
              }}
          >
            <FormularioGasto
                setModal={setModal}
                handleGasto={handleGasto}
                setGasto={setGasto}
                gasto={gasto}
                eliminarGasto={eliminarGasto}
            />
          </Modal>
        )}
        {isValidPresupuesto && (
          <Pressable style={styles.pressable} onPress={()=> setModal(!modal)}>
            <Image
                source={require('./src/img/nuevo-gasto.png')}
                style={styles.imagen}
            />
          </Pressable>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  contenedor:{
      backgroundColor:'#f5f5f5',
      flex: 1
  },

  header:{
    backgroundColor: '#3b82f6',
    minHeight:500
  },

  imagen:{
    width: 60,
    height: 60,
  },

  pressable:{
    width: 60,
    height: 60,
    position:'absolute',
    bottom:20,
    right:30
  }
})

export default App;
