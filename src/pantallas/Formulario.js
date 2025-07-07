import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

const opciones = ['Sí', 'No', 'No aplica'];
const opcionesOtros = ['Sí', 'No'];

export default function Formulario({ route, navigation }) {
  const { informe, mostrarPreguntas } = route.params;
  const [respuestas, setRespuestas] = useState({});
  const [otrosComentarios, setOtrosComentarios] = useState([]);
  const [entradaTemporal, setEntradaTemporal] = useState('');

  const preguntas = mostrarPreguntas
    ? [
        'Limpieza del equipo',
        'Revisar estado de cables de alimentacion',
        'Revisar funcionamiento de timer de temperatura',
        'Revisar temperatura de funcionamiento',
        'Revisar botones y caja de alimentacion',
        'Otros',
      ]
    : [];

  const manejarRespuesta = (indice, valor) => {
    setRespuestas({ ...respuestas, [indice]: valor });
  };

  const agregarComentario = () => {
    if (entradaTemporal.trim()) {
      setOtrosComentarios([...otrosComentarios, entradaTemporal.trim()]);
      setEntradaTemporal('');
    }
  };

  return (
    <ScrollView style={estilos.contenedor}>
      <Text style={estilos.titulo}>Formulario de mantenimiento</Text>

      <View style={estilos.info}>
        <Text style={estilos.textoInfo}>Equipo: {informe.nombre}</Text>
        <Text style={estilos.textoInfo}>ID: {informe.id}</Text>
        <Text style={estilos.textoInfo}>Código SGS: {informe.codigo}</Text>
      </View>

      {preguntas.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 30, fontStyle: 'italic' }}>
          No hay preguntas asignadas a este equipo.
        </Text>
      ) : (
        preguntas.map((pregunta, idx) => (
          <View key={idx} style={estilos.bloquePregunta}>
            <Text style={estilos.pregunta}>{pregunta}</Text>

            <View style={estilos.opciones}>
              {(pregunta === 'Otros' ? opcionesOtros : opciones).map((op, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    estilos.opcion,
                    respuestas[idx] === op && estilos.opcionSeleccionada,
                  ]}
                  onPress={() => manejarRespuesta(idx, op)}
                >
                  <Text>{op}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Campo adicional si "Otros" == "Sí" */}
            {pregunta === 'Otros' && respuestas[idx] === 'Sí' && (
              <View style={estilos.otrosBloque}>
                <View style={estilos.entradaFila}>
                  <TextInput
                    placeholder="Escribe una observación"
                    style={estilos.inputTexto}
                    value={entradaTemporal}
                    onChangeText={setEntradaTemporal}
                  />
                  <TouchableOpacity onPress={agregarComentario} style={estilos.botonMas}>
                    <Text style={estilos.textoBotonMas}>+</Text>
                  </TouchableOpacity>
                </View>

                {otrosComentarios.map((comentario, i) => (
                  <Text key={i} style={estilos.comentarioItem}>• {comentario}</Text>
                ))}
              </View>
            )}
          </View>
        ))
      )}

    <TouchableOpacity
        style={estilos.botonFinalizar}
        onPress={() => navigation.navigate('Evidencia',  {informe,respuestas,})}
        >
        <Text style={estilos.textoBotonFinalizar}>Evidencia obtenida</Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={estilos.botonCancelar}
        onPress={() => navigation.navigate('InicioMantenedor')}
        >
        <Text style={estilos.textoBotonCancelar}>Cancelar informe</Text>
    </TouchableOpacity>


    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  info: { marginBottom: 20 },
  textoInfo: { fontSize: 14 },
  bloquePregunta: { marginBottom: 20 },
  pregunta: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  opciones: { flexDirection: 'row', justifyContent: 'space-between' },
  opcion: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '30%',
    alignItems: 'center',
  },
  opcionSeleccionada: {
    backgroundColor: '#cce5ff',
    borderColor: '#007aff',
  },
  otrosBloque: {
    marginTop: 12,
    paddingLeft: 4,
  },
  entradaFila: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTexto: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    flex: 1,
  },
  botonMas: {
    marginLeft: 8,
    backgroundColor: '#007aff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  textoBotonMas: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  comentarioItem: {
    marginTop: 6,
    fontStyle: 'italic',
    color: '#444',
  },
  botonFinalizar: {
    marginTop: 30,
    backgroundColor: '#3b44c3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotonFinalizar: { color: '#fff', fontWeight: 'bold' },
  botonCancelar: {
  marginTop: 12,
  backgroundColor: '#aaa',
  padding: 12,
  borderRadius: 6,
  alignItems: 'center',
},
  textoBotonCancelar: {
  color: '#fff',
  fontWeight: 'bold',
},

});
