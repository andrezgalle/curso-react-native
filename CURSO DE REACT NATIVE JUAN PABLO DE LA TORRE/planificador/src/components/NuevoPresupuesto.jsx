import React from 'react'
import { Text,View,StyleSheet, TextInput, Pressable } from 'react-native'
import globalStyles from '../styles'
const NuevoPresupuesto = ({handleNuevoPresupuesto,presupuesto,setPresupuesto}) => {
  return (
    <View style={styles.contenedor}>
        <Text style={styles.label}>Definir Presupuesto</Text>
        <TextInput
            keyboardType='numeric'
            placeholder='Agrega tu presupuesto: Ej. 300'
            style={styles.input}
            value={presupuesto.toString()}
            onChangeText={setPresupuesto}
        />

        <Pressable
            style={styles.boton}
            onPress={()=> handleNuevoPresupuesto(presupuesto)}
        >
            <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
        </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor
    },

    label:{
        textAlign:'center',
        fontSize:24,
        color:'#3b82f6',
        fontWeight:'700'
    },

    input:{
        backgroundColor:'#f5f5f5',
        padding:10,
        borderRadius:10,
        textAlign:'center',
        marginTop:20
    },

    boton:{
        marginTop: 20,
        backgroundColor: '#1048a4',
        padding: 10,
        borderRadius: 10
    },

    botonTexto:{
        color:'#fff',
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight:'bold'
    }
})

export default NuevoPresupuesto