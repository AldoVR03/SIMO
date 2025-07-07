import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function VistaEjemploInforme({ navigation }) {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Vista previa del informe</Text>

      <Text>Equipo: Horno de secado</Text>
      <Text>ID interno: N°9</Text>
      <Text>Código SGS: LAB–DGM–HDR–002</Text>

      <Text style={estilos.subtitulo}>Preguntas:</Text>
      <Text>1. Limpieza del equipo: ✔</Text>
      <Text>2. Estado de cables: ✘</Text>
      <Text>3. Otro: ✔ (Detalle: "Observaciones adicionales...")</Text>

      <TouchableOpacity style={estilos.boton} onPress={() => navigation.navigate('InicioAdmin')}>
        <Text style={estilos.textoBoton}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitulo: { marginTop: 20, fontWeight: 'bold' },
  boton: { marginTop: 30, backgroundColor: '#3b44c3', padding: 12, borderRadius: 8, alignItems: 'center' },
  textoBoton: { color: 'white', fontWeight: 'bold' },
});
