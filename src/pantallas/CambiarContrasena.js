import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CambiarContrasena({ navigation }) {
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const cambiar = () => {
    if (!nueva || !confirmar) {
      alert('Completa ambos campos');
    } else if (nueva !== confirmar) {
      alert('Las contraseñas no coinciden');
    } else {
      alert('Contraseña cambiada exitosamente');
      navigation.navigate('InicioSesion');
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Nueva contraseña</Text>

      <TextInput
        style={estilos.entrada}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={nueva}
        onChangeText={setNueva}
      />
      <TextInput
        style={estilos.entrada}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmar}
        onChangeText={setConfirmar}
      />

      <TouchableOpacity style={estilos.boton} onPress={cambiar}>
        <Text style={estilos.textoBoton}>Cambiar contraseña</Text>
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
