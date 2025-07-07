import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioSesion from '../pantallas/InicioSesion';
import InicioMantenedor from '../pantallas/InicioMantenedor';
import InicioAdmin from '../pantallas/InicioAdmin';
import Formulario from '../pantallas/Formulario';
import Evidencia from '../pantallas/Evidencia';
import Firma from '../pantallas/Firma';
import InformeResumen from '../pantallas/InformeResumen';


const Stack = createNativeStackNavigator();

export default function NavegadorPrincipal() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesion" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InicioSesion" component={InicioSesion} />
        <Stack.Screen name="InicioMantenedor" component={InicioMantenedor} />
        <Stack.Screen name="InicioAdmin" component={InicioAdmin} />
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="Evidencia" component={Evidencia} />
        <Stack.Screen name="Firma" component={Firma} />
        <Stack.Screen name="InformeResumen" component={InformeResumen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
