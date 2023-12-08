import React, {
  useState
} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Pressable,
  Modal,
  FlatList,
  Alert
} from 'react-native';

//components
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';

const App = () => {
  //los hooks se colocan en la parte superior
  const [modalVisible, setModalVisible] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [modalPaciente, setModalPaciente] = useState(false)

  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id)
    setPaciente(pacienteEditar[0])
  }

  const pacienteEliminar = id => {
    Alert.alert(
      '¿Deseas Eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text:'Cancelar'},
        {text: 'Si, Eliminar', onPress:() => {
            const pacientesActualizado = pacientes.filter(pacienteState => pacienteState.id !== id)
            setPacientes(pacientesActualizado)
        }}
      ]
    )
  }


  const cerrarModal = () => {
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        onPress={() =>{
          setModalVisible(!modalVisible)
          setPaciente({})
        }}
        style={styles.btnNuevaCita}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {
        pacientes.length === 0 ? <Text style={styles.noPacientes}>No hay pacientes aún</Text>
        : <FlatList
              style={styles.listado}
              data={pacientes}
              keyExtractor={item => item.id}
              renderItem={({item})=>{
                return(
                    <Paciente
                        item={item}
                        setModalVisible={setModalVisible}
                        pacienteEditar={pacienteEditar}
                        pacienteEliminar={pacienteEliminar}
                        setModalPaciente={setModalPaciente}
                        setPaciente={setPaciente}
                    />
                )
              }}
          />
      }

      {modalVisible && (
          <Formulario
            setPacientes={setPacientes}
            pacientes={pacientes}
            paciente={paciente}
            setPaciente={setPaciente}
            cerrarModal={cerrarModal}
          />
      )}


      <Modal 
        visible={modalPaciente}
        animationType='fade'
      >
        <InformacionPaciente
            paciente={paciente}
            setModalPaciente={setModalPaciente}
            setPaciente={setPaciente}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    backgroundColor:'#f3f4f6',
    flex:1
  },

  titulo: {
    textAlign:'center',
    textTransform:'uppercase',
    fontSize: 30,
    color:'#374151',
    marginTop:25,
    fontWeight:'600'
  },

  tituloBold:{
    fontWeight:'900',
    color:'#6d28d9'
  },

  btnNuevaCita:{
    backgroundColor: '#6D28D9',
    padding:15,
    marginTop:30,
    marginHorizontal:20,
    borderRadius:10
  },

  btnTextoNuevaCita: {
    textAlign:'center',
    color:'#FFF',
    fontSize:18,
    fontWeight:'900',
    textTransform:'uppercase'
  },

  noPacientes:{
    marginTop:40,
    textAlign:'center',
    fontSize:24,
    fontWeight:'600',
    color:'#000'
  },

  listado:{
    marginTop:50,
    marginHorizontal:30
  }
  
})



export default App;
