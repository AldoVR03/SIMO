import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Alert
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { format, addDays, subDays, startOfWeek, isSameWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import * as Permissions from 'expo-permissions';
import * as Camera from 'expo-camera';

const COLOR_NARANJA = '#ff9900';

const informesSimulados = [
  {
    fecha: '2025-07-07',
    nombre: 'HORNO DE SECADO',
    id: 'N°2',
    codigo: 'LAB-DGM-HOR-002',
    estado: 'gris',
  },
  {
    fecha: '2025-07-07',
    nombre: 'BAÑO TERMOREGULADO',
    id: 'N°1',
    codigo: 'LAB-DGM-BTR-001',
    estado: 'rojo',
  },
  {
    fecha: '2025-07-07',
    nombre: 'PLACA CALEFACTORA',
    id: 'N°3',
    codigo: 'LAB-DGM-PLC-003',
    estado: 'amarillo',
  },
  {
    fecha: '2025-07-04',
    nombre: 'BAÑO TERMOREGULADO',
    id: 'N°1',
    codigo: 'LAB-DGM-BTR-001',
    estado: 'rojo-atrasado',
  },
];

export default function InicioMantenedor({ navigation }) {
  const [diaBase, setDiaBase] = useState(new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState(new Date());
  const [informeSeleccionado, setInformeSeleccionado] = useState(null);
  const [mostrarRealizados, setMostrarRealizados] = useState(true);

  useEffect(() => {
    const lunes = startOfWeek(diaBase, { weekStartsOn: 1 });
    const diaActual = addDays(lunes, diasSemana.findIndex(d => d.esSeleccionado));
    setDiaSeleccionado(diaActual);
  }, [diaBase]);

  const lunes = startOfWeek(diaBase, { weekStartsOn: 1 });

  const diasSemana = Array.from({ length: 7 }, (_, i) => {
    const dia = addDays(lunes, i);
    return {
      fecha: dia,
      diaTexto: format(dia, 'EEE', { locale: es }).toUpperCase(),
      diaNumero: format(dia, 'd', { locale: es }),
      esSeleccionado: format(dia, 'yyyy-MM-dd') === format(diaSeleccionado, 'yyyy-MM-dd'),
    };
  });

  const informesDelDia = informesSimulados.filter(
    inf => inf.fecha === format(diaSeleccionado, 'yyyy-MM-dd')
  );

  const informesAtrasados = informesSimulados.filter(
    inf =>
      inf.estado === 'rojo-atrasado' &&
      inf.fecha === format(subDays(diaSeleccionado, -1), 'yyyy-MM-dd')
  );

  const abrirCamara = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      Alert.alert('Cámara abierta', 'La cámara está activa (funcionalidad simulada)');
    } else {
      Alert.alert('Permiso denegado', 'No se pudo acceder a la cámara');
    }
  };

  return (
    <View style={estilos.contenedor}>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <Text style={estilos.logoTexto}>SGS</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilMantenedor')}>
          <Ionicons name="person-circle-outline" size={30} color={COLOR_NARANJA} />
        </TouchableOpacity>
      </View>

      {/* Calendario semana */}
      <View style={estilos.semanaEncabezado}>
        <TouchableOpacity onPress={() => setDiaBase(subDays(diaBase, 7))}>
          <Ionicons name="chevron-back" size={24} color="#444" />
        </TouchableOpacity>
        <Text style={estilos.mesTexto}>
          {format(diaSeleccionado, 'MMMM yyyy', { locale: es })}
        </Text>
        <TouchableOpacity onPress={() => setDiaBase(addDays(diaBase, 7))}>
          <Ionicons name="chevron-forward" size={24} color="#444" />
        </TouchableOpacity>
      </View>

      <View style={estilos.semana}>
        {diasSemana.map((dia, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              setDiaSeleccionado(dia.fecha);
              setInformeSeleccionado(null);
            }}
            style={[
              estilos.dia,
              dia.esSeleccionado && estilos.diaSeleccionado,
            ]}
          >
            <Text style={estilos.textoDia}>{dia.diaTexto}</Text>
            <Text style={estilos.numeroDia}>{dia.diaNumero}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones filtro */}
      <View style={estilos.botonesFiltro}>
        <TouchableOpacity
          onPress={() => setMostrarRealizados(true)}
          style={[
            estilos.filtro,
            { backgroundColor: mostrarRealizados ? COLOR_NARANJA : '#ddd' },
          ]}
        >
          <Text style={[
            estilos.textoFiltro,
            { color: mostrarRealizados ? '#fff' : '#555' },
          ]}>Informes a realizar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMostrarRealizados(false)}
          style={[
            estilos.filtro,
            { backgroundColor: !mostrarRealizados ? COLOR_NARANJA : '#ddd' },
          ]}
        >
          <Text style={[
            estilos.textoFiltro,
            { color: !mostrarRealizados ? '#fff' : '#555' },
          ]}>Informes terminados</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de informes */}
      <ScrollView style={{ flex: 1 }}>
        {mostrarRealizados && (
          <>
            {informesAtrasados.map((equipo, i) => (
              <View
                key={`atrasado-${i}`}
                style={[estilos.carta, estilos.rojo, { opacity: 0.4 }]}
              >
                <Text>{equipo.nombre}</Text>
                <Text style={estilos.estadoTexto}>Atrasado</Text>
              </View>
            ))}
            {informesDelDia.map((equipo, i) => (
              <TouchableOpacity
                key={`normal-${i}`}
                onPress={() => setInformeSeleccionado(equipo)}
                style={[
                  estilos.carta,
                  equipo.estado === 'rojo' && estilos.rojo,
                  equipo.estado === 'amarillo' && estilos.amarillo,
                  equipo.estado === 'gris' && estilos.gris,
                ]}
              >
                <Text>{equipo.nombre}</Text>
                <Text style={estilos.estadoTexto}>
                  {equipo.estado === 'gris' && 'No realizado'}
                  {equipo.estado === 'rojo' && 'Atrasado'}
                  {equipo.estado === 'amarillo' && 'Falta firma'}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}
        {!mostrarRealizados && (
          <Text style={{ padding: 20, textAlign: 'center', color: '#888' }}>
            No hay informes terminados aún.
          </Text>
        )}
      </ScrollView>

      {/* Resumen del equipo */}
      {informeSeleccionado && (
        <View style={estilos.resumen}>
          <Text style={estilos.tituloResumen}>Resumen del equipo</Text>
          <Text>Nombre del equipo: {informeSeleccionado.nombre}</Text>
          <Text>ID interno: {informeSeleccionado.id}</Text>
          <Text>Código SGS: {informeSeleccionado.codigo}</Text>
          <TouchableOpacity
            style={estilos.botonIniciar}
            onPress={() =>
              navigation.navigate('Formulario', {
                informe: informeSeleccionado,
                mostrarPreguntas:
                  informeSeleccionado.nombre === 'HORNO DE SECADO' &&
                  informeSeleccionado.id === 'N°2',
              })
            }
          >
            <Text style={estilos.textoBotonIniciar}>Iniciar informe</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botonera inferior */}
      <View style={estilos.botonera}>
        <TouchableOpacity style={estilos.botonIcono} onPress={abrirCamara}>
          <Ionicons name="qr-code-outline" size={32} color={COLOR_NARANJA} />
          <Text style={estilos.textoBotonIcono}>Escanear QR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.botonIcono}
          onPress={() => navigation.navigate('BuscarNombre')}
        >
          <Ionicons name="search-outline" size={32} color={COLOR_NARANJA} />
          <Text style={estilos.textoBotonIcono}>Buscar nombre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, backgroundColor: '#fff' },
  encabezado: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  logoTexto: { fontSize: 18, fontWeight: 'bold' },
  semanaEncabezado: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10,
  },
  mesTexto: { fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' },
  semana: { flexDirection: 'row', justifyContent: 'space-between' },
  dia: { alignItems: 'center', padding: 6, flex: 1 },
  diaSeleccionado: { backgroundColor: '#ffeacc', borderRadius: 6 },
  textoDia: { fontSize: 12, color: '#333' },
  numeroDia: { fontSize: 16, fontWeight: 'bold' },
  botonesFiltro: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  filtro: {
    flex: 1, padding: 8, borderRadius: 6, marginHorizontal: 5, alignItems: 'center',
  },
  textoFiltro: { fontWeight: 'bold' },
  carta: {
    padding: 14, marginVertical: 6, marginHorizontal: 4, borderRadius: 6,
  },
  gris: { backgroundColor: '#f2f2f2' },
  rojo: { backgroundColor: '#ffcccc' },
  amarillo: { backgroundColor: '#fff4cc' },
  estadoTexto: { fontSize: 12, color: '#444', marginTop: 4 },
  botonera: {
    flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderColor: '#ddd',
  },
  botonIcono: { alignItems: 'center', flex: 1 },
  textoBotonIcono: { fontSize: 12, color: COLOR_NARANJA, marginTop: 4 },
  resumen: {
    backgroundColor: '#eee', padding: 12, borderRadius: 8, marginTop: 10,
  },
  tituloResumen: {
    fontWeight: 'bold', fontSize: 16, marginBottom: 8,
  },
  botonIniciar: {
    marginTop: 10, backgroundColor: '#3b44c3', padding: 10, borderRadius: 6, alignItems: 'center',
  },
  textoBotonIniciar: {
    color: 'white', fontWeight: 'bold',
  },
});
