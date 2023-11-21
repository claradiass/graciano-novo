import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import ItemListaManutencaoConcluida from '../components/ItemListaManutencaoConcluida';


export default function TelaManutencaoListaConcluidas() {

  const [servicos, setServicos] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [ordenacaoMaisAntiga, setOrdenacaoMaisAntiga] = useState(true);


  useEffect( () => {          
    axios.get(baseUrlServicos + "/?populate=*", configAxios)
      .then( function (response) {
        setServicos(response.data.data);
      } )
      .catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    if (searchText === '') {
      // setList(results);
    } else {
      // setList(
      //   results.filter(
      //     (item) =>
      //       item.cliente.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      //       item.aparelho.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      //   )
      // );
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
          <TouchableOpacity
              style={styles.button1}
              activeOpacity={0.7}
              onPress={() => setOrdenacaoMaisAntiga(!ordenacaoMaisAntiga)}>
              <Text style={styles.text3}>{ordenacaoMaisAntiga ? 'Serviços mais antigos' : 'Serviços mais recentes'}</Text>
            </TouchableOpacity> 
        </View>

        <View style={styles.wrapper}>
          <FlatList
            style={styles.flat}
            data={servicos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ItemListaManutencaoConcluida
                data={item}
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
  button1: {
    backgroundColor: '#2DB56E',
    width: 200,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    fontFamily: 'Urbanist_700Bold',
    marginVertical: 10,
    alignSelf: 'center'
  },
  text3: {
    fontFamily: 'Urbanist_700Bold',
    color: '#FFF',
    textAlign: 'center',
  },
});










