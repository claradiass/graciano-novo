import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity, Modal, StatusBar, Alert } from 'react-native';
import axios from 'axios';
import { 
  configAxios,
  baseUrlClientes
} from '../util/constantes';
import { Ionicons, Feather } from '@expo/vector-icons';
import ItemListaCliente from '../components/ItemListaCliente';

export default function TelaClienteLista({route, navigation}) {
  const [clientes, setClientes] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [data, setData] = useState(null);

  const iconePessoa = () => {    
    return <Ionicons name="person-outline" size={70} color='#2D82B5' />;
  };
  const iconeLixeira = () => {
    return (<Feather
              name="trash-2"
              color="#2D82B5"
              size={22}
              style={{ alignSelf: 'center' }}          
            />);
    };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };
  
  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };

  const mostrarMensagemExcluido2 = () => {
    setExcluidoModalVisible2(true);
    toggleModal2();
  };

  function remover() {  
    axios.delete(baseUrlClientes + data.id, configAxios)
      .then(function (response) {
        if (response.status == 200) {
          setAtualizaLista(atualizaLista + 1);
          mostrarMensagemExcluido();
        } else {
          Alert.alert("Erro", "Houve um erro na comunicação com o servidor!");
        }
        
      })
      .catch(error => {
        Alert.alert("Erro", "Houve um erro na comunicação com o servidor!");
        console.log(error);
      });
  }

  function atualiza() {  
    console.log('get');
    axios.get(baseUrlClientes + "/?populate=*", configAxios)
      .then(function (response) {
        if (response.status == 200) {          
          setClientes(response.data.data);
          setExcluidoModalVisible(false);
        }        
      })
      .catch(error => {
        Alert.alert("Erro", "Houve um erro na comunicação com o servidor!");
        console.log(error);
      });
  }

  const renderEmptyItem = () => <View style={styles.emptyItem} />;

  useEffect(() => {
    atualiza();    
  }, [atualizaLista, route.params]);

  useEffect(() => {
    if (searchText === '') {
      //setList(pessoas);
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

  const renderItem = ({ item  }) => <ItemListaCliente data={item } toggleModal={toggleModal} setData={setData} IconePessoa={iconePessoa} IconeLixeira={iconeLixeira} />;  

  return (
      <SafeAreaView style={styles.safeArea}>
        {clientes.length > 0 ? (
          <FlatList
            data={clientes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListHeaderComponent={ () => (
                <View style={styles.detalhe}>
                  <Text style={styles.text1}>Clientes:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Busque aqui o cliente"
                    placeholderTextColor="#fff"
                    value={searchText}
                    onChangeText={(t) => setSearchText(t)}
                  />
                </View>
              )
            }   
            ListFooterComponent={renderEmptyItem}
          />
        ) : (
          <Text>Nenhum cliente encontrado!</Text>
        )}
        <View style={[styles.button, styles.menu]}>
          <TouchableOpacity onPress={() => navigation.navigate('ClienteAdicionar')}>
            <Ionicons name="ios-person-add-outline" size={28} color="#015C92" />
          </TouchableOpacity>
        </View>

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={toggleModal2}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textbotao}>Deseja concluir serviço?</Text>
                <View style={styles.bots}>
                <TouchableOpacity style={styles.bot} onPress={mostrarMensagemExcluido2}>
                  <Text style={styles.textbotao2} >Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
                  <Text style={styles.textbotao} >Cancelar</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={excluidoModalVisible2}
          onRequestClose={() => setExcluidoModalVisible2(false)}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Serviço concluido com sucesso!</Text>
              <TouchableOpacity
                style={styles.bot3}
                onPress={() => setExcluidoModalVisible2(false)}>
                <Text style={styles.textbotao2}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textbotao}>Deseja excluir esse serviço?</Text>
                <View style={styles.bots}>
                <TouchableOpacity style={styles.bot} onPress={() => remover()}>
                  <Text style={styles.textbotao2} >Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
                  <Text style={styles.textbotao} >Cancelar</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={excluidoModalVisible}
          onRequestClose={() => setExcluidoModalVisible(false)}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Serviço excluído com sucesso!</Text>
              <TouchableOpacity
                style={styles.bot3}
                onPress={() => atualiza()}>
                <Text style={styles.textbotao2}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  detalhe: {
    backgroundColor: '#88CDF6',
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
  button: {
    right: 20,
    bottom: 80,
    zIndex: 1,
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#88CDF6',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
  },
  menu: {
    backgroundColor: '#88CDF6',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#379BD8',
    margin: 20,
    width: 280,
    height: 140,
    borderRadius: 20,
    padding: 35,
    elevation: 5,
    
  },
  bot:{
    width: 50,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  bot2:{
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  bot3:{
    width: 80,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  bots:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20
  }
});
