import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioSesion from '../pantallas/InicioSesion';
import OlvideContrasena from '../pantallas/OlvideContrasena';
import VerificarCodigo from '../pantallas/VerificarCodigo';
import CambiarContrasena from '../pantallas/CambiarContrasena';
import InicioMantenedor from '../pantallas/InicioMantenedor';
import PerfilMantenedor from '../pantallas/PerfilMantenedor';
import CambioContrasenaMantenedor from '../pantallas/CambioContrasenaMantenedor';
import Formulario from '../pantallas/Formulario';
import Evidencia from '../pantallas/Evidencia';
import Firma from '../pantallas/Firma';
import InformeResumen from '../pantallas/InformeResumen';
import BuscarNombre from '../pantallas/BuscarNombre';
import InformesDelEquipo from '../pantallas/InformesDelEquipo';
import VerInforme from '../pantallas/VerInforme';
import InformeCorrectivo from '../pantallas/InformeCorrectivo';

import InicioAdmin from '../pantallas/InicioAdmin';
import ListaTrabajadores from '../pantallas/ListaTrabajadores'; 
import ListadoEquipos from '../pantallas/ListadoEquipos';
import AgregarEquipo from '../pantallas/AgregarEquipo';
import VistaEjemploInforme from '../pantallas/VistaEjemploInforme';
import AgregarTrabajador from '../pantallas/AgregarTrabajador';

const Stack = createNativeStackNavigator();

export default function NavegadorPrincipal() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesion" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InicioSesion" component={InicioSesion} />
        <Stack.Screen name="OlvideContrasena" component={OlvideContrasena} />
        <Stack.Screen name="VerificarCodigo" component={VerificarCodigo} />
        <Stack.Screen name="CambiarContrasena" component={CambiarContrasena} />
        <Stack.Screen name="InicioMantenedor" component={InicioMantenedor} />
        <Stack.Screen name="PerfilMantenedor" component={PerfilMantenedor} />
        <Stack.Screen name="CambioContrasenaMantenedor" component={CambioContrasenaMantenedor} />
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="Evidencia" component={Evidencia} />
        <Stack.Screen name="Firma" component={Firma} />
        <Stack.Screen name="InformeResumen" component={InformeResumen} />
        <Stack.Screen name="BuscarNombre" component={BuscarNombre} />
        <Stack.Screen name="InformesDelEquipo" component={InformesDelEquipo} />
        <Stack.Screen name="VerInforme" component={VerInforme} />
        <Stack.Screen name="InformeCorrectivo" component={InformeCorrectivo} />

        <Stack.Screen name="InicioAdmin" component={InicioAdmin} />
        <Stack.Screen name="ListaTrabajadores" component={ListaTrabajadores} />
        <Stack.Screen name="ListadoEquipos" component={ListadoEquipos} />
        <Stack.Screen name="AgregarEquipo" component={AgregarEquipo} />
        <Stack.Screen name="VistaEjemploInforme" component={VistaEjemploInforme} />
        <Stack.Screen name="AgregarTrabajador" component={AgregarTrabajador} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
