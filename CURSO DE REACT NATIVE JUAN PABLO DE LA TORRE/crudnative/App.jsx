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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

//views
import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';

//components
import BarraSuperior from './components/ui/BarraSuperior';

const Stack  = createNativeStackNavigator()

//Definir el tema
const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#1774f2',
    accent:'#0655bf'
  }
}

console.log(theme.colors.primary)

function App() {
  return (
    <>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerStyle:{
              backgroundColor:theme.colors.primary
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle:{
              fontWeight:'bold'
            },
            
            headerTitleAlign:'center'
          }}
        >
          
          <Stack.Screen
            name='Inicio'
            component={Inicio}
            options={({navigation, route})=>({
              /* headerLeft: ({props}) => <BarraSuperior {...props} navigation={navigation} route={route}/> */
            })}
          />

          <Stack.Screen
            name='NuevoCliente'
            component={NuevoCliente}
            options={{
              title:'Nuevo Cliente'
            }}
          />

          <Stack.Screen
            name='DetallesCliente'
            component={DetallesCliente}
            options={{
              title:'Detalles Cliente'
            }}
          />      


        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({

});

export default App;
