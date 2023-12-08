import React, {useState, useEffect} from 'react'
import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import globalStyles from '../styles'
import { formatearCantidad } from '../helpers'

const ControlPresupuesto = ({presupuesto, gastos,resetearApp}) => {
    const [disponible,setDisponible] = useState(0)
    const [gastado,setGastado] = useState(0)

    useEffect(()=>{
        const totalGastado = gastos.reduce((total,gasto)=> Number(gasto.cantidad)+ total ,0)
        setGastado(totalGastado)

        const totalDisponible = presupuesto - totalGastado
        setDisponible(totalDisponible)
    },[gastos])
  return (
    <View style={styles.contenedor}>
        <View style={styles.centrarGrafica}>
        </View>

        <View style={styles.contenedorTexto}>
            <Pressable style={styles.boton} onPress={() => resetearApp()}>
                <Text style={styles.textoBoton}>Reiniciar App</Text>
            </Pressable>
            <Text style={styles.valor}>
                <Text style={styles.label}>Presupuesto: {''}</Text>
                {formatearCantidad(presupuesto)}
            </Text>
            <Text style={styles.valor}>
                <Text style={styles.label}>Disponible: {''}</Text>
                {formatearCantidad(disponible)}
            </Text>
            <Text style={styles.valor}>
                <Text style={styles.label}>Gastado: {''}</Text>
                {formatearCantidad(gastado)}
            </Text>
        </View>
    </View>

  )
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor
    },

    centrarGrafica:{
        alignItems:'center'
    },

    imagen:{
        width:250,
        height:250
    },

    contenedorTexto:{
        marginTop:50
    },

    valor:{
        fontSize:24,
        textAlign:'center',
        marginBottom:10
    },

    label:{
        fontWeight:'700',
        color:'#3B82F6'
    },

    boton:{
        backgroundColor:'#db2777',
        padding: 10,
        marginBottom:40,
        borderRadius:5
    },

    textoBoton:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold',
        textTransform:'uppercase'
    }
})

export default ControlPresupuesto