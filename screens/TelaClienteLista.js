import React, { useState, useEffect, memo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  Alert,
} from 'react-native';
import axios from 'axios';
import { configAxios, baseUrlClientes } from '../util/constantes';
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import ItemListaCliente from '../components/ItemListaCliente';
import { useSelector  } from 'react-redux'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function TelaClienteLista({ route, navigation }) {
  const [clientes, setClientes] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.login.token);
  const ITEM_HEIGHT = 80; 
  
  useEffect(() => {
    if (!token) {
      navigation.navigate('Login');
    }
  }, [token]);


  useEffect(() => {      
    atualiza();    
  }, [atualizaLista, route.params, token]);



  const iconePessoa = useCallback(() => {
    return <AntDesign name="solution1" size={70} color="#015C92" />;
  }, []);
  
  const iconeLixeira = useCallback(() => {
    return (
      <Feather
        name="trash-2"
        color="#015C92"
        size={22}
        style={{ alignSelf: 'center' }}
      />
    );
  }, []);


  const toggleModal = useCallback(() => {
    setModalVisible(prev => !prev);
  }, []);
  
  const toggleModal2 = useCallback(() => {
    setModalVisible2(prev => !prev);
  }, []);
  
  const mostrarMensagemExcluido = useCallback(() => {
    setExcluidoModalVisible(true);
    toggleModal();
  }, [toggleModal]);
  
  const mostrarMensagemExcluido2 = useCallback(() => {
    setExcluidoModalVisible2(true);
    toggleModal2();
  }, [toggleModal2]);
  
  const remover = useCallback(() => {
    axios.delete(baseUrlClientes + data.id, configAxios)
      .then(function (response) {
        if (response.status == 200) {
          setAtualizaLista(prev => prev + 1);
          mostrarMensagemExcluido();
        } else {
          Alert.alert('Erro', 'Houve um erro na comunicação com o servidor!');
        }
      })
      .catch((error) => {
        Alert.alert('Erro', 'Houve um erro na comunicação com o servidor!');
        console.log(error);
      });
  }, [data?.id, mostrarMensagemExcluido]);

  const atualiza = useCallback(() => {
    if (!token) return;
  
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    
    axios.get(baseUrlClientes + '?populate=*', config)
      .then(function (response) {
        if (response.status == 200) {
          console.log("DATA:", response.data.data)
          console.log("==========================")
          // setList(response.data.data);
          console.log("LIST:", list)
          console.log("==========================")
          setClientes(response.data.data);
          console.log("CLIENTS: ", clientes)
          setExcluidoModalVisible(false);
          setAtualizaLista(0);
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Erro', 'Houve um erro na comunicação com o servidor!');
      });
    }, [token]);
    
  console.log("CLIENTS2: ", clientes)
  const renderEmptyItem = () => <View style={styles.emptyItem} />;

  useEffect(() => {
    if (searchText === '') {
      setList(clientes);
    } else {
      setList(
        clientes.filter(
          (item) =>
            item.attributes.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1 
        )
      );
    }
  }, [searchText, clientes]);


  const [ascendingOrder, setAscendingOrder] = useState(true);

  const ordenar = useCallback(() => {
    setList(prevList => {
      const newList = [...prevList];
      newList.sort((a, b) => {
        const nomeA = a.attributes.nome.toLowerCase();
        const nomeB = b.attributes.nome.toLowerCase();
        return ascendingOrder 
          ? nomeA.localeCompare(nomeB) 
          : nomeB.localeCompare(nomeA);
      });
      return newList;
    });
    setAscendingOrder(prev => !prev);
  }, [ascendingOrder]);

  const ItemListaClienteMemo = memo(ItemListaCliente);

  const renderItem = ({ item }) => (
    <ItemListaClienteMemo
      data={item}
      toggleModal={toggleModal}
      setData={setData}
      IconePessoa={iconePessoa}
      IconeLixeira={iconeLixeira}
    />
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Clientes:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            placeholder="Busque aqui o cliente"
            placeholderTextColor="#015C92"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={ordenar} style={{}}>
            <MaterialCommunityIcons
              name="order-alphabetical-ascending"
              size={28}
              color="#015C92"
            />
          </TouchableOpacity>
        </View>
      </View>
      {clientes.length > 0 ? (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          initialNumToRender={10}
          windowSize={21}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true} // Melhor para Android
          ListFooterComponent={renderEmptyItem}
          getItemLayout={ITEM_HEIGHT ? (data, index) => (
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          ) : undefined}
      />

      ) : (
        <Text>Nenhum cliente encontrado!</Text>
      )}
      <View style={[styles.button, styles.menu]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ClienteAdicionar')}>
          <FontAwesome6 name="add" size={28} color="#015C92" />
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
                <TouchableOpacity
                  style={styles.bot}
                  onPress={mostrarMensagemExcluido2}>
                  <Text style={styles.textbotao2}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
                  <Text style={styles.textbotao}>Cancelar</Text>
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
              <Text style={styles.textbotao}>Deseja excluir esse cliente?</Text>
              <View style={styles.bots}>
                <TouchableOpacity style={styles.bot} onPress={() => remover()}>
                  <Text style={styles.textbotao2}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
                  <Text style={styles.textbotao}>Cancelar</Text>
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
            <TouchableOpacity style={styles.bot3} onPress={() => atualiza()}>
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
    borderColor: '#015C92',
    margin: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#015C92',
    width: '85%',
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
  bot: {
    width: 50,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bot2: {
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bot3: {
    width: 80,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  bots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  textbotao: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },
  
  textbotao2: {
    fontSize: 14,
    color: '#053F5C',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },
});
