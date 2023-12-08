import React from 'react'
import { Pressable, Text,View, StyleSheet } from 'react-native'
import { formatearFecha } from '../helpers/formatearFecha'

const InformacionPaciente = ({paciente,setModalPaciente,setPaciente}) => {
  const {paciente:nombrePaciente, propietario, email, telefono, fecha, sintomas} = paciente
  return (
        <View style={styles.contenedor}>

            <Text style={styles.titulo}>Información {''}
                <Text style={styles.tituloBold}>Paciente</Text>
            </Text>
            <View>
                <Pressable style={styles.btnCerrar} onPress={()=>{
                     setModalPaciente(false)
                     setPaciente({})
                }}>
                    <Text style={styles.btnCerrarTexto}>X Cerrar</Text>
                </Pressable>
            </View>

            <View style={styles.contenido}>
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.valor}>{nombrePaciente}</Text> 
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Propietario:</Text>
                    <Text style={styles.valor}>{propietario}</Text> 
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.valor}>{email}</Text> 
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.valor}>{telefono}</Text> 
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha Alta:</Text>
                    <Text style={styles.valor}>{formatearFecha(fecha)}</Text> 
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Síntomas:</Text>
                    <Text style={styles.valor}>{sintomas}</Text> 
                </View>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#F59E0B',
        flex: 1
    },
    titulo: {
        textAlign:'center',
        fontSize: 30,
        color:'#fff',
        marginTop:25,
        fontWeight:'400'
    },
    
    tituloBold:{
        fontWeight:'900',
        color:'#fff'
    },

    btnCerrar:{
        marginVertical:30,
        backgroundColor:'#E06900',
        marginHorizontal:30,
        padding:15,
        borderRadius:10
    },
    btnCerrarTexto:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'900',
        fontSize:16,
        textTransform:'uppercase',
    },

    contenido:{
        backgroundColor:'#fff',
        marginHorizontal:30,
        borderRadius:10,
        padding:10,
        shadowColor:'#000',
        shadowOffset: {
            width:0,
            height:2
        },
        shadowOpacity: 0.25,
        shadowRadius:3.84,
        elevation:5
    },

    campo: {
        marginBottom:10
    },

    label:{
        textTransform:'uppercase',
        color:'#374151',
        fontWeight:'700',
        fontSize:12
    },

    valor:{
        fontWeight:'700',
        fontSize:20,
        color:'#334155'
    }
})

export default InformacionPaciente