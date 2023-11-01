import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [servicos, setServicos] = useState([
    { id: '1', nome: 'Serviço 1' },
    { id: '2', nome: 'Serviço 2' },
    { id: '3', nome: 'Serviço 3' },
    { id: '4', nome: 'Serviço 4' },
    { id: '5', nome: 'Serviço 5' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de servicos</Text>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
});
