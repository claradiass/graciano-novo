import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import ItemListaManutencaoConcluida from '../components/ItemListaManutencaoConcluida';
import results from '../dados/Resultados';

export default function TelaManutencaoListaConcluidas() {

  const [servicos, setServicos] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(results);

  useEffect( () => {          
    axios.get(baseUrlServicos,  {
      params: {
        finalizado: true
      }
    },
    configAxios)
      .then( function (response) {
        setServicos(response.data.data);
      } )
      .catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    if (searchText === '') {
      setList(results);
    } else {
      setList(
        results.filter(
          (item) =>
            item.cliente.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            item.aparelho.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  const renderItem = ({ item }) => <Text>{item.title}</Text>;

  const renderEmptyItem = () => <View style={styles.emptyItem} />;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Busque aqui o cliente ou aparelho"
            placeholderTextColor={'#fff'}
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
          />
        </View>

        <View style={styles.wrapper}>
          <FlatList
            style={styles.flat}
            data={servicos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemListaManutencaoConcluida
                data={item.attributes}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            )}
            ListFooterComponent={renderEmptyItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#fff',
    marginHorizontal: 20,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff',
    marginBottom: '8%',
    marginTop: '12%',
  },
  emptyItem: {
    height: 300,
  },
  content: {
    backgroundColor: '#88CDF6',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});










