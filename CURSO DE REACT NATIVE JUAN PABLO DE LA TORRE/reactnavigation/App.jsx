

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
import Inicio from './views/Inicio';
import Nosotros from './views/nosotros';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerStyle:{
              backgroundColor:'#f4511e',
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
              fontWeight:'bold'
            },
            headerTitleAlign:'center'
          }}
        >
          <Stack.Screen
            name='Inicio'
            component={Inicio}
            
          />
          <Stack.Screen
            name='Nosotros'
            component={Nosotros}
            options={({route})=>(
              {
                title:route.params.clienteId.toString()
              }
              )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


export default App;
