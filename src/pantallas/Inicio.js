import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Inicio() {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.texto}>Bienvenido al sistema SIMO 🎉</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#e6f0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
