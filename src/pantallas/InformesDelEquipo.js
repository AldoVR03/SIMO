import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const todosLosInformes = [
  {
    equipo: 'HORNO DE SECADO N°8',
    fecha: '2025-06-01',
  },
  {
    equipo: 'HORNO DE SECADO N°8',
    fecha: '2025-07-01',
  },
  {
    equipo: 'BAÑO TERMOREGULADO N°1',
    fecha: '2025-06-15',
  },
];

export default function InformesDelEquipo({ route, navigation }) {
  const { nombreEquipo } = route.params;

  const informesFiltrados = todosLosInformes.filter(
    (inf) => inf.equipo === nombreEquipo
  );

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Informes de {nombreEquipo}</Text>

      {informesFiltrados.length === 0 ? (
        <Text style={estilos.sinInformes}>No hay informes para este equipo.</Text>
      ) : (
        <FlatList
          data={informesFiltrados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={estilos.tarjeta}
              onPress={() =>
                navigation.navigate('VerInforme', {
                  informe: {
                    nombre: item.equipo,
                    id: 'N°X',
                    codigo: 'SGS-XXX-001',
                    fecha: item.fecha,
                  },
                  respuestas: {
                    0: 'Sí',
                    1: 'No',
                    2: 'Sí',
                  },
                  imagenes: [],
                  firmas: {
                    mantenedor: null,
                    supervisor: null,
                    calidad: null,
                  },
                  respaldos: {
                    mantenedor: null,
                    supervisor: null,
                    calidad: null,
                  },
                })
              }
            >
              <Text style={estilos.nombre}>{item.equipo}</Text>
              <Text style={estilos.fecha}>Fecha: {item.fecha}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        style={estilos.botonCorrectivo}
        onPress={() => navigation.navigate('InformeCorrectivo', { equipo: nombreEquipo })}
        >
        <Text style={estilos.textoBoton}>Realizar informe correctivo</Text>
      </TouchableOpacity>
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
  tarjeta: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 12,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fecha: {
    fontSize: 14,
    color: '#555',
  },
  sinInformes: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
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
