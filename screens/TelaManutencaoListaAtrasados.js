import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import results from '../dados/Resultados';
import ItemListaManutencaoPendente from '../components/ItemListaManutencaoPendente';


export default function TelaManutencaoAtrasados() {

  const [servicos, setServicos] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(results);

  useEffect( () => {      
    axios.get(baseUrlServicos, configAxios)
      .then( function (response) {
        setServicos(response.data.data);
      } )
      .catch(error => {
        console.log(error);
      })
  }, []) 

  const renderItem = ({ item }) => <Text>{item.title}</Text>;
  
  const renderEmptyItem = () => <View style={styles.emptyItem} />;

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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.content}>
        <Text style={styles.text1}>Serviços pendentes:</Text>
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
            keyExtractor={(item) => item.attributes}
            renderItem={({ item }) => (
              <ItemListaManutencaoPendente
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
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginTop: 20,
    marginHorizontal: 20,
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
    marginTop: '5%',
    // marginTop: 20
  },
  emptyItem: {
    height: 300, // Ajuste a altura conforme necessário para empurrar os itens visíveis para cima
  },
  content: {
    backgroundColor: '#88CDF6',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
