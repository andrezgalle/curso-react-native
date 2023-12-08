import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Header = () => {
  return (
    <View style={styles.header}>
        <Text style={styles.texto}>Planificador de gastos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    texto:{
        textAlign:'center',
        fontSize: 30,
        color: '#fff',
        textTransform:'uppercase',
        fontWeight:'bold',
        paddingTop:30
    }
})

export default Header