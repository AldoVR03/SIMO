import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function OlvideContrasena({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rut, setRut] = useState('');

  const manejarSiguiente = () => {
    if (nombre && correo && rut) {
      navigation.navigate('VerificarCodigo');
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Recuperar contraseña</Text>

      <TextInput style={estilos.entrada} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={estilos.entrada} placeholder="Correo electrónico" value={correo} onChangeText={setCorreo} keyboardType="email-address" />
      <TextInput style={estilos.entrada} placeholder="RUT" value={rut} onChangeText={setRut} />

      <TouchableOpacity style={estilos.boton} onPress={manejarSiguiente}>
        <Text style={estilos.textoBoton}>Siguiente</Text>
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
    fontSize: 22,
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
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
