import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, KeyboardAvoidingView, Platform,
} from 'react-native';

export default function InicioSesion({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarInicioSesion = () => {
    if (usuario === 'mantenedor' && contrasena === '123') {
      navigation.navigate('InicioMantenedor');
    } else if (usuario === 'admin' && contrasena === 'admin123') {
      navigation.navigate('InicioAdmin');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <KeyboardAvoidingView
      style={estilos.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/30/SGS_SA_logo.svg' }}
        style={estilos.logo}
        resizeMode="contain"
      />

      <Text style={estilos.titulo}>SIMO</Text>

      <Text style={estilos.etiqueta}>usuario</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="mantenedor o admin"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={estilos.etiqueta}>contraseña</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="tu contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />

      <TouchableOpacity style={estilos.boton} onPress={manejarInicioSesion}>
        <Text style={estilos.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('OlvideContrasena')}>
        <Text style={estilos.olvido}>¿Olvidaste la contraseña?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 16,
    marginTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  etiqueta: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },
  entrada: {
    width: '100%',
    height: 44,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  boton: {
    width: '100%',
    height: 44,
    backgroundColor: '#3b44c3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 12,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  olvido: {
    color: '#2e4fff',
    textDecorationLine: 'underline',
  },
});
