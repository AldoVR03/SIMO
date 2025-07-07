import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function Evidencia({ navigation, route }) {
  const { informe, respuestas } = route.params; // ✅ Desestructuración segura
  const [imagenes, setImagenes] = useState([]);

  const seleccionarImagen = async () => {
    if (imagenes.length >= 2) {
      Alert.alert('Límite alcanzado', 'Solo se permiten 2 evidencias.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!resultado.canceled) {
      setImagenes([...imagenes, resultado.assets[0].uri]);
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Evidencia</Text>

      <View style={estilos.areaImagenes}>
        {[...Array(2)].map((_, i) => (
          <TouchableOpacity
            key={i}
            style={estilos.recuadro}
            onPress={seleccionarImagen}
            disabled={imagenes[i] ? true : imagenes.length >= 2}
          >
            {imagenes[i] ? (
              <Image source={{ uri: imagenes[i] }} style={estilos.imagen} />
            ) : (
              <>
                <Ionicons name="add" size={40} color="#aaa" />
                <Text style={estilos.textoAgregar}>Agregar evidencia</Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={estilos.botonesInferiores}>
        <TouchableOpacity
          style={estilos.botonFirmar}
          onPress={() =>
            navigation.navigate('Firma', {
              equipo: 'HORNO DE SECADO N°2',
              informe,
              respuestas,
              imagenes,
            })
          }
        >
          <Text style={estilos.textoBoton}>Ir a firmar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.botonVolver}
          onPress={() => navigation.goBack()}
        >
          <Text style={estilos.textoBoton}>Volver a preguntas</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  areaImagenes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  recuadro: {
    width: '48%',
    height: 180,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  textoAgregar: {
    marginTop: 8,
    color: '#888',
    fontSize: 12,
  },
  imagen: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  botonesInferiores: {
    marginTop: 'auto',
  },
  botonFirmar: {
    backgroundColor: '#3b44c3',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  botonVolver: {
    backgroundColor: '#aaa',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
