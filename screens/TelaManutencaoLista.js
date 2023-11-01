import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import ItemListaManutencao from '../components/ItemListaManutencao';
import results from '../dados/Resultados';
import { useNavigation } from '@react-navigation/native';


export default function TelaManutencaoLista() {

  const [servicos, setServicos] = useState([]);

  const navigation = useNavigation();

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
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Serviços:</Text>

          <TextInput
            style={styles.input}
            placeholder="Busque aqui o cliente ou aparelho"
            placeholderTextColor={'#fff'}
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
          />

          <View style={styles.buttons}>
          <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ManutencaoListaAtrasados')}>
              <Text style={styles.text2}>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ManutencaoListaConcluidas')}>
              <Text style={styles.text2}>Concluidos</Text>
            </TouchableOpacity>
            

            
            
          </View>
          
        </View>

        
        
        
        <FlatList
          style={styles.flat}
          data={servicos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemListaManutencao data={item.attributes} />}
          ListFooterComponent={renderEmptyItem}
        />

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    // paddingBottom: 100
  },
  content: {
    marginBottom: 90,
  },
  detalhe: {
    backgroundColor: '#88CDF6',
    posistion: 'absolute',

    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginTop: 20,
  },
  input: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#fff',
    margin: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff',
  },
  emptyItem: {
    height: 200, 
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#fff',
    width: 80,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    fontFamily: 'Urbanist_700Bold',
  },
  text2: {
    fontFamily: 'Urbanist_700Bold',
    color: '#88CDF6',
    textAlign: 'center',
  },
});







