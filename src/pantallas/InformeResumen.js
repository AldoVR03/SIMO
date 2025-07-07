import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function InformeResumen({ route, navigation }) {
  const { informe, respuestas, imagenes = [], firmas = {}, respaldos = {} } = route.params;

  const capitalizarRol = (rol) => {
    if (rol === 'calidad') return 'A. Calidad DGM';
    return rol.charAt(0).toUpperCase() + rol.slice(1);
  };

  return (
    <ScrollView
      style={estilos.scroll}
      contentContainerStyle={estilos.contenedor}
    >
      <Text style={estilos.titulo}>Resumen del Informe</Text>

      {/* DATOS DEL EQUIPO */}
      <View style={estilos.seccion}>
        <Text style={estilos.tituloSeccion}>Datos del equipo</Text>
        <Text>Nombre: {informe.nombre}</Text>
        <Text>ID interno: {informe.id}</Text>
        <Text>Código SGS: {informe.codigo}</Text>
        <Text>Fecha: {informe.fecha}</Text>
        <Text>Estado: {informe.estado}</Text>
      </View>

      {/* RESPUESTAS */}
      <View style={estilos.seccion}>
        <Text style={estilos.tituloSeccion}>Respuestas del formulario</Text>
        {Object.entries(respuestas).map(([index, respuesta], i) => (
          <View key={i} style={estilos.respuestaItem}>
            <Text style={estilos.pregunta}>{parseInt(index) + 1}. {respuesta.pregunta}</Text>
            <Text style={estilos.respuesta}>Respuesta: {respuesta.respuesta}</Text>
            {respuesta.otros && respuesta.otros.length > 0 && (
              <>
                <Text style={estilos.otrosTitulo}>Otros:</Text>
                {respuesta.otros.map((item, idx) => (
                  <Text key={idx} style={estilos.otros}>• {item}</Text>
                ))}
              </>
            )}
          </View>
        ))}
      </View>

      {/* EVIDENCIA */}
      <View style={estilos.seccion}>
        <Text style={estilos.tituloSeccion}>Evidencia</Text>
        {imagenes.length === 0 ? (
          <Text>No se subieron imágenes.</Text>
        ) : (
          imagenes.map((uri, i) => (
            <Image
              key={i}
              source={{ uri }}
              style={estilos.imagenEvidencia}
              resizeMode="contain"
            />
          ))
        )}
      </View>

      {/* FIRMAS */}
      <View style={estilos.seccion}>
        <Text style={estilos.tituloSeccion}>Firmas y respaldos</Text>
        {['mantenedor', 'supervisor', 'calidad'].map((rol, i) => (
          <View key={i} style={estilos.firmaBloque}>
            <Text style={estilos.nombreRol}>{capitalizarRol(rol)}</Text>

            {firmas[rol] ? (
              <Image source={{ uri: firmas[rol] }} style={estilos.firmaImagen} />
            ) : (
              <Text style={estilos.firmaFaltante}>Firma no ingresada</Text>
            )}

            {respaldos[rol] ? (
              <>
                <Text style={estilos.subtitulo}>Imagen de respaldo:</Text>
                <Image source={{ uri: respaldos[rol] }} style={estilos.imagenRespaldo} />
              </>
            ) : (
              <Text style={estilos.firmaFaltante}>Respaldo no ingresado</Text>
            )}
          </View>
        ))}
      </View>

      {/* ✅ BOTÓN FINAL */}
      <TouchableOpacity
        style={estilos.botonFinalizar}
        onPress={() => navigation.navigate('InicioMantenedor')}
      >
        <Text style={estilos.textoBoton}>Finalizar informe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contenedor: {
    padding: 16,
    paddingBottom: 60,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  seccion: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  tituloSeccion: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  respuestaItem: {
    marginBottom: 12,
  },
  pregunta: {
    fontWeight: 'bold',
    color: '#444',
  },
  respuesta: {
    color: '#555',
    marginLeft: 10,
  },
  otrosTitulo: {
    fontWeight: 'bold',
    marginTop: 4,
    marginLeft: 10,
    color: '#444',
  },
  otros: {
    fontStyle: 'italic',
    color: '#555',
    marginLeft: 20,
  },
  imagenEvidencia: {
    width: '100%',
    height: 160,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
  },
  firmaBloque: {
    marginBottom: 20,
  },
  nombreRol: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
  },
  firmaImagen: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 8,
  },
  imagenRespaldo: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#aaa',
    marginTop: 6,
  },
  firmaFaltante: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 8,
  },
  subtitulo: {
    fontWeight: '600',
    marginTop: 4,
  },
  botonFinalizar: {
    backgroundColor: '#3b44c3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
