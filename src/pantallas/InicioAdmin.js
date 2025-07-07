import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ListaTrabajadores from './ListaTrabajadores';
import ListadoEquipos from './ListadoEquipos';

export default function InicioAdmin({ navigation }) {
  const [vistaActual, setVistaActual] = useState('trabajadores');

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.logo}>SGS</Text>

      <View style={estilos.tabs}>
        <TouchableOpacity onPress={() => setVistaActual('trabajadores')}>
          <Text style={vistaActual === 'trabajadores' ? estilos.tabActivo : estilos.tab}>Trabajadores</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVistaActual('equipos')}>
          <Text style={vistaActual === 'equipos' ? estilos.tabActivo : estilos.tab}>Equipos</Text>
        </TouchableOpacity>
      </View>

      {vistaActual === 'trabajadores' ? (
        <ListaTrabajadores />
      ) : (
        <ListadoEquipos navigation={navigation} />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: '#fff' },
  logo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tab: { fontSize: 16, color: '#777' },
  tabActivo: { fontSize: 16, color: '#3b44c3', fontWeight: 'bold', textDecorationLine: 'underline' },
});
