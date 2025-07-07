import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function VerificarCodigo({ navigation }) {
  const [codigo, setCodigo] = useState('');

  const verificar = () => {
    if (codigo === '123abc') {
      navigation.navigate('CambiarContrasena');
    } else {
      alert('Código incorrecto');
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Ingresa el código enviado</Text>

      <TextInput
        style={estilos.entrada}
        placeholder="Código de verificación"
        value={codigo}
        onChangeText={setCodigo}
      />

      <TouchableOpacity style={estilos.boton} onPress={verificar}>
        <Text style={estilos.textoBoton}>Verificar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  entrada: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  boton: {
    backgroundColor: '#3b44c3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
