import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
    contenedor:{
        flex:1,
        width:'100%',
        position:'relative'
    },

    boton:{
        backgroundColor:'#FFDA00',
    },

    botonTexto:{
        textTransform:'uppercase',
        fontWeight:'bold',
        color:'#000'
    },

    contenido:{
        marginHorizontal:'2.5%',
        flex:1
    },

    imagen:{
        height:300,
        width:'100%'
    },

    imagen2:{
        height:90,
        width:90
    },

    cantidad:{
        marginVertical:20,
        textAlign:'center',
        fontSize:24,
        fontWeight:'bold',
        color:'#000'
    }
}) 

export default GlobalStyles