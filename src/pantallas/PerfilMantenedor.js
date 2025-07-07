import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilMantenedor({ navigation }) {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>SGS</Text>

      <Text style={estilos.etiqueta}>Nombre Completo:</Text>
      <TextInput style={estilos.entrada} value="Mantenedor" editable={false} />

      <Text style={estilos.etiqueta}>Correo:</Text>
      <TextInput style={estilos.entrada} value="Mantenedor@sgs.com" editable={false} />

      <Text style={estilos.etiqueta}>Contraseña:</Text>
      <View style={estilos.fila}>
        <TextInput
          style={[estilos.entrada, { flex: 1 }]}
          value="**********"
          editable={false}
          secureTextEntry
        />
        <TouchableOpacity onPress={() => navigation.navigate('CambioContrasenaMantenedor')}>
          <Ionicons name="create-outline" size={24} color="#444" />
        </TouchableOpacity>
      </View>

      <Text style={estilos.etiqueta}>RUT:</Text>
      <TextInput style={estilos.entrada} value="12.345.678-9" editable={false} />

      <TouchableOpacity style={estilos.boton} onPress={() => navigation.goBack()}>
        <Text style={estilos.textoBoton}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  etiqueta: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  boton: {
    backgroundColor: '#3b44c3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
