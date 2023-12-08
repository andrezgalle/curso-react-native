import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Animated, LogBox, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
const Formulario = ({busqueda, guardarBusqueda,guardarConsultar}) => {

    const {pais, ciudad} = busqueda

    const [animacionBoton] = useState(new Animated.Value(1))

    const consultarClima = ( ) => {
        if(pais.trim()=== '' || ciudad.trim()===''){
            mostrarAlerta()
            return;
        }

        //consultar la API
        guardarConsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios, Agrega un país y una ciudad para la busqueda'
        )
    }

    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue:.7,
            useNativeDriver:true
        }).start()
    }

    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue:1,
            useNativeDriver:true,
            friction: 4,
            tension: 30
        }).start()
    }

    const estiloAnimacion = {
        transform:[{scale:animacionBoton}]
    }

  return (
    <>
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Ciudad'
                    placeholderTextColor={'#666'}
                    value={ciudad}
                    onChangeText={ciudad => guardarBusqueda({...busqueda ,ciudad})}
                />
            </View>
            <View>
                <Picker
                    selectedValue={pais}
                    style={{height:120, backgroundColor:'#fff'}}
                    onValueChange={pais => guardarBusqueda({...busqueda,pais})}
                >
                    <Picker.Item label='-- Seleccione un país' value={''} />
                    <Picker.Item label='Estados Unidos' value={'US'} />
                    <Picker.Item label='México' value={'MX'} />
                    <Picker.Item label='Argentina' value={'AR'} />
                    <Picker.Item label='Colombia' value={'CO'} />
                    <Picker.Item label='Costa Rica' value={'CR'} />
                    <Picker.Item label='España' value={'ES'} />
                    <Picker.Item label='Perú' value={'PE'} />
                </Picker>
            </View>

            <TouchableWithoutFeedback
                onPressIn={()=> animacionEntrada()}
                onPressOut={()=> animacionSalida()}
                onPress={() => consultarClima()}
            >
                <Animated.View
                    style={[styles.btnBuscar, estiloAnimacion]}
                >
                    <Text style={styles.textoBuscar}>Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    input:{
        padding:10,
        height:50,
        backgroundColor:'#fff',
        fontSize:20,
        marginBottom:20,
        textAlign:'center'
    },

    btnBuscar:{
        marginTop:50,
        backgroundColor:'#000',
        padding:10,
        justifyContent:'center'
    },

    textoBuscar:{
        color:'#fff',
        fontWeight:'bold',
        textTransform:'uppercase',
        textAlign:'center',
        fontSize:18
    }
})

export default Formulario