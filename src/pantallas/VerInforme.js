// src/pantallas/VerInforme.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function VerInforme({ route, navigation }) {
  const { informe, respuestas, imagenes = [], firmas = {}, respaldos = {} } = route.params || {};

  return (
    <ScrollView style={estilos.contenedor}>
      <Text style={estilos.titulo}>Resumen del Informe</Text>

      <View style={estilos.seccion}>
        <Text style={estilos.subtitulo}>Datos del Equipo</Text>
        <Text>Nombre: {informe?.nombre}</Text>
        <Text>ID: {informe?.id}</Text>
        <Text>Código SGS: {informe?.codigo}</Text>
        <Text>Fecha: {informe?.fecha}</Text>
      </View>

      <View style={estilos.seccion}>
        <Text style={estilos.subtitulo}>Respuestas</Text>
        {respuestas ? (
          Object.entries(respuestas).map(([key, value]) => (
            <Text key={key}>• Pregunta {parseInt(key) + 1}: {value}</Text>
          ))
        ) : (
          <Text>No hay respuestas registradas.</Text>
        )}
      </View>

      <View style={estilos.seccion}>
        <Text style={estilos.subtitulo}>Evidencia</Text>
        {imagenes.length > 0 ? (
          imagenes.map((img, i) => (
            <Image key={i} source={{ uri: img }} style={estilos.imagen} />
          ))
        ) : (
          <Text>No se adjuntaron evidencias.</Text>
        )}
      </View>

      <View style={estilos.seccion}>
        <Text style={estilos.subtitulo}>Firmas</Text>
        {['mantenedor', 'supervisor', 'calidad'].map((tipo) => (
          <View key={tipo} style={estilos.firmaBloque}>
            <Text style={estilos.textoRol}>{tipo}</Text>
            {firmas?.[tipo] ? (
              <Image source={{ uri: firmas[tipo] }} style={estilos.firmaImagen} />
            ) : (
              <Text>No disponible</Text>
            )}
            {respaldos?.[tipo] && (
              <Text style={estilos.respaldoTexto}>Imagen respaldo disponible</Text>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity style={estilos.botonVolver} onPress={() => navigation.goBack()}>
        <Text style={estilos.textoBoton}>Volver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.botonPDF} onPress={() => alert('Simulación de exportación a PDF')}>
        <Text style={estilos.textoBoton}>Exportar a PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  seccion: {
    marginBottom: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  imagen: {
    width: '100%',
    height: 180,
    marginTop: 10,
    borderRadius: 8,
  },
  firmaBloque: {
    marginTop: 10,
  },
  textoRol: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  firmaImagen: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  respaldoTexto: {
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 4,
  },
  botonVolver: {
    backgroundColor: '#aaa',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  botonPDF: {
    backgroundColor: '#3b44c3',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
