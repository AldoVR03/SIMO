import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AgregarEquipo({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [idInterno, setIdInterno] = useState('');
  const [codigoSGS, setCodigoSGS] = useState('');
  const [preguntas, setPreguntas] = useState(['']);
  const [respuestaOtro, setRespuestaOtro] = useState('');
  const [mostrarInputOtro, setMostrarInputOtro] = useState(false);

  const agregarPregunta = () => setPreguntas([...preguntas, '']);
  const eliminarPregunta = (index) => {
    const nuevas = [...preguntas];
    nuevas.splice(index, 1);
    setPreguntas(nuevas);
  };
  const actualizarPregunta = (text, index) => {
    const nuevas = [...preguntas];
    nuevas[index] = text;
    setPreguntas(nuevas);
  };

  const siguiente = () => navigation.navigate('VistaEjemploInforme');

  return (
    <View style={estilos.contenedor}>
      <TextInput style={estilos.entrada} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={estilos.entrada} placeholder="ID Interno" value={idInterno} onChangeText={setIdInterno} />
      <TextInput style={estilos.entrada} placeholder="Código SGS" value={codigoSGS} onChangeText={setCodigoSGS} />

      <Text style={estilos.subtitulo}>Ingresa las preguntas para su mantención</Text>
      {preguntas.map((pregunta, index) => (
        <View key={index} style={estilos.fila}>
          <TextInput
            style={[estilos.entrada, { flex: 1 }]}
            placeholder={`Pregunta N°${index + 1}`}
            value={pregunta}
            onChangeText={(text) => actualizarPregunta(text, index)}
          />
          <TouchableOpacity onPress={() => eliminarPregunta(index)}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={agregarPregunta}>
        <Ionicons name="add-circle" size={30} color="#3b44c3" />
      </TouchableOpacity>

      <Text style={estilos.otro}>Otro (Sí / No)</Text>
      <TouchableOpacity onPress={() => setMostrarInputOtro(!mostrarInputOtro)} style={estilos.boton}>
        <Text style={estilos.textoBoton}>{mostrarInputOtro ? 'Ocultar' : 'Sí'}</Text>
      </TouchableOpacity>
      {mostrarInputOtro && (
        <TextInput
          style={estilos.entrada}
          placeholder="Especifique..."
          value={respuestaOtro}
          onChangeText={setRespuestaOtro}
        />
      )}

      <TouchableOpacity style={estilos.botonGris} onPress={siguiente}>
        <Text style={estilos.textoBoton}>Siguiente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilos.botonCancelar} onPress={() => navigation.goBack()}>
        <Text style={estilos.textoBoton}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: '#fff' },
  entrada: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10 },
  subtitulo: { fontWeight: 'bold', marginBottom: 10 },
  fila: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  otro: { marginTop: 20, fontWeight: 'bold' },
  boton: { backgroundColor: '#3b44c3', padding: 10, marginTop: 10, borderRadius: 6, alignItems: 'center' },
  botonGris: { backgroundColor: 'gray', padding: 10, marginTop: 20, borderRadius: 6, alignItems: 'center' },
  botonCancelar: { backgroundColor: '#aaa', padding: 10, marginTop: 10, borderRadius: 6, alignItems: 'center' },
  textoBoton: { color: '#fff', fontWeight: 'bold' },
});
