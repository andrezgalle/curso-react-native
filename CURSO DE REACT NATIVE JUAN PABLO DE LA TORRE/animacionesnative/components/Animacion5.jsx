import React, {useState} from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, Animated } from 'react-native'

const Animacion5 = () => {

    const [animacion] = useState(new Animated.Value(1))

    const presionarBoton = () => {
        Animated.spring(animacion,{
            toValue: .8,
            useNativeDriver: true
        }).start()
    }

    const soltarBoton = () => {
        Animated.spring(animacion,{
            toValue: 1,
            useNativeDriver: true,
            friction:4, //mas bajo sera igual a mayor rebote,
            tension:80

        }).start()
    }

    const estiloAnimacion = {
        transform: [{scale: animacion}]
    }

  return (
    <View style={styles.contenedor}>
        <TouchableWithoutFeedback
            onPressIn={()=> presionarBoton()}
            onPressOut={()=> soltarBoton()}
        >
            <Animated.View style={[styles.btn,estiloAnimacion]}>
                <Text style={styles.texto}>Iniciar Sesión</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        alignItems:'center'
    },

    btn:{
        backgroundColor:'cornflowerblue',
        width:280,
        height:80,
        justifyContent:'center',
        alignItems:'center'
    },

    texto:{
        color:'#fff',
        fontWeight:'bold',
        textTransform:'uppercase',
        fontSize:28
    }
})

export default Animacion5