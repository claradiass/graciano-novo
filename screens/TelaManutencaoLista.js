import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity, Modal, StatusBar, Alert } from 'react-native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import ItemListaManutencao from '../components/ItemListaManutencao';

import { useNavigation } from '@react-navigation/native';


export default function TelaManutencaoLista({route, navigation}) {

  const [servicos, setServicos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [atualizaLista, setAtualizaLista] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [data, setData] = useState(null);

  const iconeLixeira = () => {
    return (<Feather
              name="trash-2"
              color="#2D82B5"
              size={22}
              style={{ alignSelf: 'center' }}          
            />);
    };

  useEffect( () => {      

    axios.get(baseUrlServicos, configAxios)
      .then( function (response) {
        setServicos(response.data.data);
      } )
      .catch(error => {
        console.log(error);
      })
  }, []) 

  function remover() {  
    axios.delete(baseUrlServicos + data.id, configAxios)
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
  axios.get(baseUrlServicos + "/?populate=*", configAxios)
      .then(function (response) {
        if (response.status == 200) {          
          setServicos(response.data.data);
          setExcluidoModalVisible(false);
        }        
      })
      .catch(error => {
        Alert.alert("Erro", "Houve um erro na comunicação com o servidor!");
        console.log(error);
      });
}

useEffect(() => {
  atualiza();    
}, [atualizaLista, route.params]);






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

















  useEffect(() => {
    // if (searchText === '') {
    //   setList(results);
    // } else {
    //   setList(
    //     results.filter(
    //       (item) =>
    //         item.cliente.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
    //         item.aparelho.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    //     )
    //   );
    // }
  }, [searchText]);

  const renderItem = ({ item  }) => <ItemListaManutencao data={item } toggleModal={toggleModal} setData={setData} IconeLixeira={iconeLixeira} />;  

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
          renderItem={renderItem}
          ListFooterComponent={renderEmptyItem}
        />








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







