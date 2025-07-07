import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function AgregarTrabajador({ navigation }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    correo: '',
    contrasena: '',
  });

  const guardar = () => {
    const { nombre, apellido, rut, correo, contrasena } = formulario;
    if (!nombre || !apellido || !rut || !correo || !contrasena) {
      Alert.alert('Error', 'Completa todos los campos');
    } else {
      Alert.alert('Éxito', 'Trabajador agregado correctamente');
      navigation.goBack();
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Agregar Trabajador</Text>

      <TextInput
        style={estilos.entrada}
        placeholder="Nombre"
        value={formulario.nombre}
        onChangeText={(text) => setFormulario({ ...formulario, nombre: text })}
      />
      <TextInput
        style={estilos.entrada}
        placeholder="Apellido"
        value={formulario.apellido}
        onChangeText={(text) => setFormulario({ ...formulario, apellido: text })}
      />
      <TextInput
        style={estilos.entrada}
        placeholder="RUT"
        value={formulario.rut}
        onChangeText={(text) => setFormulario({ ...formulario, rut: text })}
      />
      <TextInput
        style={estilos.entrada}
        placeholder="Correo"
        value={formulario.correo}
        onChangeText={(text) => setFormulario({ ...formulario, correo: text })}
      />
      <TextInput
        style={estilos.entrada}
        placeholder="Contraseña"
        secureTextEntry
        value={formulario.contrasena}
        onChangeText={(text) => setFormulario({ ...formulario, contrasena: text })}
      />

      <TouchableOpacity style={estilos.boton} onPress={guardar}>
        <Text style={estilos.textoBoton}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[estilos.boton, { backgroundColor: '#999' }]} onPress={() => navigation.goBack()}>
        <Text style={estilos.textoBoton}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  entrada: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10 },
  boton: { backgroundColor: '#3b44c3', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 10 },
  textoBoton: { color: '#fff', fontWeight: 'bold' },
});
