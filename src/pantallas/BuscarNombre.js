import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const equiposEjemplo = [
  { nombre: 'HORNO DE SECADO N°8' },
  { nombre: 'BAÑO TERMOREGULADO N°1' },
  { nombre: 'PLACA CALEFACTORA N°3' },
  { nombre: 'LAVADOR DE GASES SCRUBBER N°1' },
  { nombre: 'DIVISOR ROTATORIO N°1' },
];

export default function BuscarNombre({ navigation }) {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = equiposEjemplo.filter(equipo =>
    equipo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Buscar por nombre</Text>

      <TextInput
        placeholder="Ej: horno"
        style={estilos.input}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={filtrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
        <TouchableOpacity
            style={estilos.item}
            onPress={() =>
            navigation.navigate('InformesDelEquipo', { nombreEquipo: item.nombre })
            }
        >
            <Text>{item.nombre}</Text>
        </TouchableOpacity>
        )}

      />

      <TouchableOpacity
        style={estilos.botonVolver}
        onPress={() => navigation.goBack()}
      >
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
    paddingTop: 40,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  item: {
    padding: 14,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginBottom: 10,
  },
  botonVolver: {
    marginTop: 20,
    backgroundColor: '#888',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
