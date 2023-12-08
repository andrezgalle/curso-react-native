import React, {useState,useEffect} from 'react'
import { View,StyleSheet, Text, Platform } from 'react-native'
import { TextInput, Headline, Button, Paragraph, Dialog, Portal,PaperProvider } from 'react-native-paper'
import globalStyles from '../styles/global'
import Icon from 'react-native-vector-icons/AntDesign'
import axios from 'axios'

const NuevoCliente = ({navigation,route}) => {

    const {guardarConsultarAPI} = route.params

    //Campos Formularios
    const [nombre, guardarNombre] = useState('')
    const [telefono, guardarTelefono] = useState('')
    const [correo, guardarCorreo] = useState('')
    const [empresa, guardarEmpresa] = useState('')
    const [alerta, guardarAlerta] = useState(false)


    //detectar si estamos editando
    useEffect(()=>{
        if(route.params.cliente){
            const {nombre, telefono, correo, empresa} = route.params.cliente
            guardarNombre(nombre)
            guardarTelefono(telefono)
            guardarCorreo(correo)
            guardarEmpresa(empresa)
        }else{

        }
    },[])

    //almacena el cliente en la BD
    const guardarCliente = async() => {
        //validar
        if([nombre,telefono,correo,empresa].includes('')){
            guardarAlerta(true)
            return
        }

        //generar el cliente
        const cliente = {
            nombre,
            telefono,
            correo,
            empresa,
        }

        //guardar el cliente en la BD

        //si estamos editando o creando un nuevo cliente
        if(route.params.cliente){
            const {id} = route.params.cliente;
            cliente.id = id
            if(Platform.OS === 'ios'){
                await axios.put(`http://localhost:3000/clientes/${id}`,cliente)
            }else{
                await axios.put(`http://192.168.1.36:3000/clientes/${id}`,cliente)
            }

        }else{
            try {
                if(Platform.OS === 'ios'){
                    await axios.post('http://localhost:3000/clientes',cliente)
                }else{
                    await axios.post('http://192.168.1.36:3000/clientes',cliente)
                }

            } catch (error) {
                console.log(error)
            }
        }

        //redireccionar
        navigation.navigate('Inicio')
        
        //limpiar el form (opcional)
        guardarNombre('')
        guardarCorreo('')
        guardarTelefono('')
        guardarEmpresa('')

        //Cambiar a true para traernos el nuevo cliente
        guardarConsultarAPI(true)
    }

  return (
    <View style={globalStyles.contenedor}>
        
        <Headline 
            style={globalStyles.titulo}>
                Añadir Nuevo Cliente
        </Headline>
        
        <TextInput
            style={styles.input}
            label='Nombre'
            placeholder='Andrés'
            value={nombre}
            onChangeText={(nombre)=> guardarNombre(nombre)}
        />

        <TextInput
            label='Teléfono'
            style={styles.input}
            value={telefono}
            onChangeText={(nombre)=> guardarTelefono(nombre)}
        />

        <TextInput
            label='Correo'
            value={correo}
            style={styles.input}
            keyboardType='email-address'
            onChangeText={(nombre)=> guardarCorreo(nombre)}
        />

        <TextInput
            value={empresa}
            label='Empresa'
            style={styles.input}
            onChangeText={(nombre)=> guardarEmpresa(nombre)}
        />

            <Button 
                icon={'pencil'}
                mode='contained'
                style={
                    {
                        borderRadius:5,
                        backgroundColor:'#0655bf'
                    }
                }
                uppercase={true}
                onPress={() => guardarCliente()}
                
            >
                Guardar Cliente
            </Button>
            
                <Portal>
                    <Dialog
                        visible={alerta}
                        onDismiss={()=> guardarAlerta(false)}
                    >
                        <Dialog.Title>Error</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Todos los campos son obligatorios</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => guardarAlerta(false)}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>


    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:20,
        backgroundColor:'transparent'
    }
})

export default NuevoCliente