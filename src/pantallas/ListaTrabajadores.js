import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListaTrabajadores({ navigation }) {
  const [usuarios, setUsuarios] = useState([
    { id: '1', nombre: 'Carlos Moya', estado: 'Habilitado' },
    { id: '2', nombre: 'Matías Araya', estado: 'Deshabilitado' },
  ]);

  const cambiarEstado = (id) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, estado: u.estado === 'Habilitado' ? 'Deshabilitado' : 'Habilitado' }
          : u
      )
    );
  };

  const eliminarUsuario = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <View style={estilos.contenedor}>
      {usuarios.map((usuario) => (
        <View key={usuario.id} style={estilos.card}>
          <Text style={estilos.nombre}>{usuario.nombre}</Text>
          <Text style={estilos.estado}>{usuario.estado}</Text>

          <View style={estilos.botones}>
            <TouchableOpacity
              style={[
                estilos.botonEstado,
                { backgroundColor: usuario.estado === 'Habilitado' ? '#ccc' : 'green' },
              ]}
              onPress={() => cambiarEstado(usuario.id)}
            >
              <Text style={estilos.textoBoton}>
                {usuario.estado === 'Habilitado' ? 'Deshabilitar' : 'Habilitar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[estilos.botonEstado, { backgroundColor: 'red' }]}
              onPress={() => eliminarUsuario(usuario.id)}
            >
              <Text style={estilos.textoBoton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={estilos.botonAzul} onPress={() => navigation.navigate('AgregarTrabajador')}>
        <Text style={estilos.textoBoton}>Agregar Trabajador</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: '#fff' },
  card: { backgroundColor: '#f3f3f3', borderRadius: 8, padding: 12, marginBottom: 10 },
  nombre: { fontWeight: 'bold', fontSize: 16 },
  estado: { marginTop: 4, marginBottom: 8, fontSize: 14, color: '#666' },
  botones: { flexDirection: 'row', gap: 10 },
  botonEstado: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  textoBoton: { color: '#fff', fontWeight: 'bold' },
  botonAzul: { backgroundColor: '#3b44c3', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 12 },
});
