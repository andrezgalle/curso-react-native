import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

const Formulario = ({
    moneda,
    setMoneda,
    criptomoneda,
    setCriptomoneda,
    guardarConsultarAPI}) => {
    const [criptomonedas, setCriptomonedas] = useState([]);
    useEffect(()=>{
        const consultarAPI = async () =>{
            const url ='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url)
            setCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    },[])

    const obtenerMoneda = moneda => {
        setMoneda(moneda)
    }

    const obtenerCriptoMoneda = cripto => {
        setCriptomoneda(cripto)
    }

    const cotizarPrecio = () => {
       if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta()
            return;
       }

       //pasa la validación
       guardarConsultarAPI(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios'
        )
    }

  return (
    <View>
        <Text style={styles.label}>Moneda</Text>
        <Picker 
            onValueChange={moneda => obtenerMoneda(moneda)}
            selectedValue={moneda}
            itemStyle={{height:120}}
        >
            <Picker.Item value={''} label='- Seleccione -' />
            <Picker.Item value={'USD'} label='Dolar de Estados Unidos'/>
            <Picker.Item value={'MXN'} label='Peso Mexicano'/>
            <Picker.Item value={'EUR'} label='Euro'/>
            <Picker.Item value={'GBP'} label='Libra Esterlina'/>
        </Picker>
        
        <Text style={styles.label}>Criptomoneda</Text>
        <Picker 
            onValueChange={cripto => obtenerCriptoMoneda(cripto)}
            selectedValue={criptomoneda}
            itemStyle={{height:120}}
        >
            <Picker.Item value={''} label='- Seleccione -' />
            {criptomonedas.map(cripto => (
                <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
            ))}
        </Picker>

        <TouchableHighlight style={styles.btnCotizar} onPress={() => cotizarPrecio()}>
            <Text style={styles.textoCotizar}>Cotizar</Text>
        </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
    label:{
        fontFamily:'Lato-Black',
        fontSize:22,
        marginVertical:20,
        textTransform:'uppercase',
        color:'#000'
    },

    btnCotizar:{
        backgroundColor:'#5e49e2',
        padding:10,
        marginTop:20,
        
    },

    textoCotizar:{
        color:'#fff',
        fontSize:18,
        fontFamily:'Lato-Black',
        textTransform:'uppercase',
        textAlign:'center'
    }
})

export default Formulario