import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function Firma({ navigation, route }) {
  const {
    equipo = 'HORNO DE SECADO',
    informe = {},
    respuestas = {},
    imagenes = [],
  } = route?.params || {};

  const [firmas, setFirmas] = useState({
    mantenedor: null,
    supervisor: null,
    calidad: null,
  });

  const [respaldos, setRespaldos] = useState({
    mantenedor: null,
    supervisor: null,
    calidad: null,
  });

  const canvasRefs = {
    mantenedor: useRef(),
    supervisor: useRef(),
    calidad: useRef(),
  };

  const roles = ['mantenedor', 'supervisor', 'calidad'];

  const seleccionarImagen = async (rol) => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });

    if (!resultado.canceled) {
      setRespaldos({ ...respaldos, [rol]: resultado.assets[0].uri });
    }
  };

  const manejarFirma = (base64, rol) => {
    setFirmas({ ...firmas, [rol]: base64 });
  };

  const limpiarFirma = (rol) => {
    canvasRefs[rol].current.clearSignature();
    setFirmas({ ...firmas, [rol]: null });
  };

  const capitalizar = (text) =>
    text === 'calidad' ? 'A. Calidad DGM' : text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <ScrollView style={estilos.contenedor}>
      <Text style={estilos.titulo}>{equipo}</Text>

      {roles.map((rol, i) => (
        <View key={i} style={estilos.bloqueFirma}>
          <Text style={estilos.rolTexto}>{capitalizar(rol)}</Text>

          <View style={estilos.fila}>
            {/* Firma canvas */}
            <View style={estilos.cajaFirma}>
              <SignatureCanvas
                ref={canvasRefs[rol]}
                onOK={(base64) => manejarFirma(base64, rol)}
                autoClear={false}
                imageType="image/png"
                webStyle={`
                  .m-signature-pad--footer {display: none; margin: 0px;}
                  body,html {margin: 0; padding: 0;}
                `}
              />
              <TouchableOpacity
                onPress={() => limpiarFirma(rol)}
                style={estilos.botonLimpiar}
              >
                <Text style={estilos.textoLimpiar}>Limpiar</Text>
              </TouchableOpacity>
            </View>

            {/* Imagen de respaldo */}
            <TouchableOpacity
              style={estilos.cajaCarnet}
              onPress={() => seleccionarImagen(rol)}
            >
              {respaldos[rol] ? (
                <Image source={{ uri: respaldos[rol] }} style={estilos.imgRespaldo} />
              ) : (
                <>
                  <Ionicons name="image-outline" size={28} color="#777" />
                  <Text style={estilos.textoCarnet}>Subir carnet</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Botón Finalizar */}
      <TouchableOpacity
        style={estilos.botonFirmar}
        onPress={() =>
          navigation.navigate('InformeResumen', {
            informe,
            respuestas,
            imagenes,
            firmas,
            respaldos,
          })
        }
      >
        <Text style={estilos.textoBoton}>Finalizar</Text>
      </TouchableOpacity>

      {/* Botón Cancelar */}
      <TouchableOpacity
        style={estilos.botonCancelar}
        onPress={() => navigation.goBack()}
      >
        <Text style={estilos.textoBoton}>Cancelar</Text>
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
    alignSelf: 'center',
  },
  bloqueFirma: {
    marginBottom: 30,
  },
  rolTexto: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cajaFirma: {
    width: '68%',
    height: 160,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
  },
  botonLimpiar: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  textoLimpiar: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cajaCarnet: {
    width: '30%',
    height: 160,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarnet: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    textAlign: 'center',
  },
  imgRespaldo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 6,
  },
  botonFirmar: {
    backgroundColor: '#3b44c3',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  botonCancelar: {
    backgroundColor: '#aaa',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
