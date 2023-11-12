import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, StatusBar } from 'react-native';
import axios from 'axios';
import { configAxios, baseUrlClientes } from '../util/constantes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import ItemManutencaoDoCliente from '../components/ItemManutencaoDoCliente';


export default function TelaClienteServicos({ route }) {
  const [cliente, setCliente] = useState(route.params);
  const [modalVisible, setModalVisible] = useState(false);
  const { id, data } = route.params;

  const navigation = useNavigation();

  const renderEmptyItem = () => <View style={styles.emptyItem} />;
  const [ordenacaoMaisAntiga, setOrdenacaoMaisAntiga] = useState(true);



  function atualiza() {
    
  
    axios.get(baseUrlClientes + id + "/?populate=*", configAxios)
      .then(function (response) {
        
        // Handle a successful update
        toggleModal1(); // Show a success modal
      })
      .catch(error => {
        // Handle the error
        console.log(error);
      });
  }
  

  const toggleModal1 = () => {
    setModalVisible(!modalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('ClienteLista', { realizarAtualizacao: true }); // Certifique-se de que 'ClienteLista' seja o nome correto da tela
  };

  const servicosAtrasados = data.servicos.data.filter((item) => {
    // Verifica se a dataFinalizado é null
    return item.attributes.dataFinalizado === null;
  });

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.content}>
          <View style={styles.detalhe}>
            <Text style={styles.text1}>Serviços atrasados de {data.nome} </Text>

            <Text style={styles.text2}>Endereço: {data.endereco} </Text>
            <Text style={styles.text2}>Contato: {data.telefone}</Text>

            <TouchableOpacity
              style={styles.button1}
              activeOpacity={0.7}
              onPress={() => setOrdenacaoMaisAntiga(!ordenacaoMaisAntiga)}>
              <Text style={styles.text3}>{ordenacaoMaisAntiga ? 'Serviços mais antigos' : 'Serviços mais recentes'}</Text>
            </TouchableOpacity> 
          </View>
          <View style={styles.area}>   
          {/* <TouchableOpacity
  style={styles.botaoOrdenar}
  activeOpacity={0.7}
  onPress={() => setOrdenacaoMaisAntiga(!ordenacaoMaisAntiga)}>
  <Text
    style={[
      styles.text3,
      {
        backgroundColor: ordenacaoMaisAntiga ? '#2DB56E' : 'black',
        // Adicione outros estilos condicionais conforme necessário
      },
    ]}>
    {ordenacaoMaisAntiga ? 'Mais Antigos Primeiro' : 'Mais Recentes Primeiro'}
  </Text>
</TouchableOpacity>  */}


          </View>
          <FlatList
  data={servicosAtrasados.sort((a, b) => {
    const dataA = new Date(a.attributes.dataMarcada);
    const dataB = new Date(b.attributes.dataMarcada);

    return ordenacaoMaisAntiga ? dataA - dataB : dataB - dataA;
  })}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <ItemManutencaoDoCliente data={item} />
  )}
  ListFooterComponent={renderEmptyItem}
/>

          {/* <TouchableOpacity
            style={styles.botao}
            activeOpacity={0.7}
            onPress={atualiza}>
            <Text style={styles.textbotao}>Atualizar Cliente</Text>
          </TouchableOpacity> */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal1}>
            <StatusBar
              backgroundColor="rgba(0, 0, 0, 0.5)"
              translucent={true}
            />
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textbotao}>
                  Cliente atualizado com sucesso!
                </Text>
                <View style={styles.bots}>
                  <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
                    <Text style={styles.textbotao}>Fechar</Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: '#FFF'
  },
  content: {
    marginBottom: 90,
  },
  emptyItem: {
    height: 300,
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
    color: '#fff',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'Urbanist_700Bold',
    color: '#FFF',
    textAlign: 'center'
  },
  input: {
    width: 320,
    height: 40,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff',
  },
  area: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    width: 200,
    height: 44,
    backgroundColor: '#88CDF6',
    borderRadius: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 4,
    marginTop: 40,
  },
  textbotao: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Urbanist_900Black',
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
  bot2: {
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bots: {
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  button1: {
    backgroundColor: '#B52D2D',
    width: 200,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    fontFamily: 'Urbanist_700Bold',
    marginTop: 10,
    alignSelf: 'center'
  },
  text3: {
    fontFamily: 'Urbanist_700Bold',
    color: '#FFF',
    textAlign: 'center',
  },
});
