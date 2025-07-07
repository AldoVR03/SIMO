import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListadoEquipos({ navigation }) {
  const equipos = [
    {
      id: 'eq1',
      nombre: 'Horno de secado',
      codigo: 'LAB–DGM–HDR–002',
      preguntas: ['Limpieza de equipo', 'Estado de cables', 'Otro'],
    },
  ];

  return (
    <View style={estilos.contenedor}>
      {equipos.map((equipo) => (
        <View key={equipo.id} style={estilos.card}>
          <Text style={estilos.nombre}>{equipo.nombre}</Text>
          <Text style={estilos.codigo}>{equipo.codigo}</Text>
          {equipo.preguntas.map((p, i) => (
            <Text key={i} style={estilos.pregunta}>• {p}</Text>
          ))}
        </View>
      ))}

      <TouchableOpacity style={estilos.boton} onPress={() => navigation.navigate('AgregarEquipo')}>
        <Text style={estilos.textoBoton}>Agregar Equipo</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20 },
  card: { backgroundColor: '#f3f3f3', padding: 12, borderRadius: 8, marginBottom: 10 },
  nombre: { fontWeight: 'bold', fontSize: 16 },
  codigo: { color: '#666', marginBottom: 6 },
  pregunta: { marginLeft: 10 },
  boton: { backgroundColor: '#3b44c3', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 10 },
  textoBoton: { color: '#fff', fontWeight: 'bold' },
});
