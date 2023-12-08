import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

//components
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';




function App(){
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] = useState(false)


  useEffect(()=>{
    
    if(consultarAPI){
      const cotizarCriptomonedas = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado = await axios.get(url)

        guardarCargando(true)

        //Ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
          guardarConsultarAPI(false)
          guardarCargando(false)
        }, 1000);
      }
      cotizarCriptomonedas()
    }
  
  },[consultarAPI])

  const componente = cargando ? <ActivityIndicator size={'large'} color={'#5e49e2'}/> : <Cotizacion resultado={resultado}/>

  return (
    <ScrollView>
      <Header/>

      <Image 
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />

      <View style={styles.contenido}>
        <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            guardarConsultarAPI={guardarConsultarAPI}
        />
      </View>

    <View style={{marginTop:40}}>
      {componente}
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height:150,
    marginHorizontal:'2.5%'
  },

  contenido:{
    marginHorizontal:'2.5%'
  }
})

export default App;
