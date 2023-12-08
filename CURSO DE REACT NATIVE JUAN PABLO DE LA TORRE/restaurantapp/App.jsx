
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//components
import NuevaOrden from './views/NuevaOrden';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import Menu from './views/Menu';
import ProgresoPedido from './views/ProgresoPedido';
import ResumenPedido from './views/ResumenPedido';
import FirebaseState from './context/firebase/firebaseState';
import PedidoState from './context/pedidos/pedidosState';

//native-base
import {NativeBaseProvider} from 'native-base'

//components
import BotonResumen from './components/ui/BotonResumen';


const Stack = createNativeStackNavigator()

function App() {

  return (
    <>
      <FirebaseState>
        <PedidoState>
          <NativeBaseProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle:{
                    backgroundColor:'#FFDA00',
                  },
                  headerTitleStyle:{
                    fontWeight:'bold',
                    
                  },
                  headerTitleAlign:'center',
                  headerTintColor:'#000'
                  
                }}
              >
                <Stack.Screen 
                  name='NuevaOrden'
                  component={NuevaOrden}
                  options={{
                    title:'Nueva Orden',
                  }}
                />

                <Stack.Screen 
                  name='Menu'
                  component={Menu}
                  options={{
                    title:'Nuestro Menú',
                    headerRight: props => <BotonResumen/>
                  }}
                />

                <Stack.Screen 
                  name='DetallePlatillo'
                  component={DetallePlatillo}
                  options={{
                    title:'Detalle Platillo'
                  }}
                />

                <Stack.Screen 
                  name='FormularioPlatillo'
                  component={FormularioPlatillo}
                  options={{
                    title:'Ordenar Platillo'
                  }}
                />

                <Stack.Screen 
                  name='ResumenPedido'
                  component={ResumenPedido}
                  options={{
                    title:'Resumen Pedido'
                  }}
                />

                <Stack.Screen 
                  name='ProgresoPedido'
                  component={ProgresoPedido}
                  options={{
                    title:'Progreso de Pedido'
                  }}
                />


              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </PedidoState>
      </FirebaseState>
    </>
  );
}



export default App;
