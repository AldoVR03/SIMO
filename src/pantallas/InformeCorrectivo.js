// src/pantallas/InformeCorrectivo.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function InformeCorrectivo({ route, navigation }) {
  const { equipo } = route.params;
  const [subtareas, setSubtareas] = useState([]);
  const [observacion, setObservacion] = useState('');
  const [imagenes, setImagenes] = useState([]);

  const [responsable, setResponsable] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tipo, setTipo] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [jefeArea, setJefeArea] = useState('');
  const [responsableEquipo, setResponsableEquipo] = useState('');
  const [suplente, setSuplente] = useState('');

  const agregarSubtarea = () => {
    setSubtareas([...subtareas, { pregunta: '', respuesta: '' }]);
  };

  const actualizarSubtarea = (index, campo, valor) => {
    const nuevas = [...subtareas];
    nuevas[index][campo] = valor;
    setSubtareas(nuevas);
  };

  const seleccionarImagen = async () => {
    if (imagenes.length >= 2) {
      Alert.alert('Límite alcanzado', 'Solo se permiten 2 evidencias.');
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!resultado.canceled) {
      setImagenes([...imagenes, resultado.assets[0].uri]);
    }
  };

  const finalizar = () => {
    if (!observacion.trim() || subtareas.some(s => !s.pregunta || !s.respuesta) || imagenes.length === 0) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    Alert.alert('Informe enviado correctamente');
    navigation.goBack();
  };

  return (
    <ScrollView style={estilos.contenedor}>
      <Text style={estilos.titulo}>Informe Correctivo - {equipo}</Text>

      <View style={estilos.seccion}>
        <Text style={estilos.subtitulo}>Información general</Text>
        <TextInput placeholder="Responsable" style={estilos.input} value={responsable} onChangeText={setResponsable} />
        <TextInput placeholder="Duración" style={estilos.input} value={duracion} onChangeText={setDuracion} />
        <TextInput placeholder="Ubicación" style={estilos.input} value={ubicacion} onChangeText={setUbicacion} />
        <TextInput placeholder="Tipo" style={estilos.input} value={tipo} onChangeText={setTipo} />
        <TextInput placeholder="Prioridad (Baja - Media - Alta)" style={estilos.input} value={prioridad} onChangeText={setPrioridad} />
        <TextInput placeholder="Localidad" style={estilos.input} value={localidad} onChangeText={setLocalidad} />
        <TextInput placeholder="Jefe de área" style={estilos.input} value={jefeArea} onChangeText={setJefeArea} />
        <TextInput placeholder="Responsable del equipo" style={estilos.input} value={responsableEquipo} onChangeText={setResponsableEquipo} />
        <TextInput placeholder="Suplente" style={estilos.input} value={suplente} onChangeText={setSuplente} />
      </View>

      <View style={estilos.seccion}>
        <Text style={estilos.subtitulo}>Subtareas</Text>
        {subtareas.map((sub, i) => (
          <View key={i} style={estilos.bloqueSubtarea}>
            <TextInput
              placeholder="Describa la subtarea"
              style={estilos.input}
              value={sub.pregunta}
              onChangeText={(text) => actualizarSubtarea(i, 'pregunta', text)}
            />
            <View style={estilos.filaOpciones}>
              {['SI', 'NO', 'NOAplica'].map((resp) => (
                <TouchableOpacity
                  key={resp}
                  style={[estilos.opcion, sub.respuesta === resp && estilos.opcionActiva]}
                  onPress={() => actualizarSubtarea(i, 'respuesta', resp)}
                >
                  <Text style={estilos.textoOpcion}>{resp}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity style={estilos.botonAgregar} onPress={agregarSubtarea}>
          <Text style={estilos.textoBoton}>+ Agregar subtarea</Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.seccion}>
        <Text style={estilos.subtitulo}>Observaciones</Text>
        <TextInput
          placeholder="Describa la falla o intervención"
          multiline
          style={[estilos.input, { height: 100 }]}
          value={observacion}
          onChangeText={setObservacion}
        />
      </View>

      <View style={estilos.seccion}>
        <Text style={estilos.subtitulo}>Evidencias</Text>
        <View style={estilos.areaImagenes}>
          {imagenes.map((uri, i) => (
            <Image key={i} source={{ uri }} style={estilos.imagen} />
          ))}
          {imagenes.length < 2 && (
            <TouchableOpacity style={estilos.recuadro} onPress={seleccionarImagen}>
              <Text style={estilos.mas}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity style={estilos.botonFinalizar} onPress={finalizar}>
        <Text style={estilos.textoBoton}>Finalizar informe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  seccion: {
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  filaOpciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  opcion: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#aaa',
    backgroundColor: '#eee',
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  opcionActiva: {
    backgroundColor: '#3b44c3',
  },
  textoOpcion: {
    color: '#000',
  },
  botonAgregar: {
    backgroundColor: '#3b44c3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bloqueSubtarea: {
    marginBottom: 16,
  },
  areaImagenes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  recuadro: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mas: {
    fontSize: 28,
    color: '#aaa',
  },
  botonFinalizar: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
});
