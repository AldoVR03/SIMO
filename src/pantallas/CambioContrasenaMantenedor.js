import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CambioContrasenaMantenedor({ navigation }) {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmarNueva, setConfirmarNueva] = useState('');

  const manejarCambio = () => {
    if (!actual || !nueva || !confirmarNueva) {
      Alert.alert('Error', 'Completa todos los campos');
    } else if (nueva !== confirmarNueva) {
      Alert.alert('Error', 'Las nuevas contraseñas no coinciden');
    } else {
      Alert.alert('Éxito', 'Contraseña actualizada');
      navigation.goBack();
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>SGS</Text>

      <Text style={estilos.etiqueta}>Ingrese contraseña actual:</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Contraseña actual"
        secureTextEntry
        value={actual}
        onChangeText={setActual}
      />

      <Text style={estilos.etiqueta}>Ingrese nueva contraseña:</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={nueva}
        onChangeText={setNueva}
      />

      <Text style={estilos.etiqueta}>Ingrese nuevamente la contraseña:</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Confirmar nueva contraseña"
        secureTextEntry
        value={confirmarNueva}
        onChangeText={setConfirmarNueva}
      />

      <TouchableOpacity style={estilos.boton} onPress={manejarCambio}>
        <Text style={estilos.textoBoton}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[estilos.boton, { backgroundColor: '#999' }]} onPress={() => navigation.goBack()}>
        <Text style={estilos.textoBoton}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  etiqueta: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  boton: {
    marginTop: 20,
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
