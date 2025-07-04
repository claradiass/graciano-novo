import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {isBefore, isToday} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ItemListaManutencao({ data, setData, toggleModal, IconeLixeira }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);

  

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

  const figuras = () => {
    if (data.attributes.aparelho === 'Geladeira') {
      return (
        <Image
          source={require('./imagens/geladeira.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
          style={{ width: 30, height: 30 }} // ajuste o estilo conforme necessário
        />
      );
    } else if (data.attributes.aparelho === 'Ar-condicionado') {
      return (
        <Image
          source={require('./imagens/arcondicionado.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
          style={{ width: 30, height: 30, marginHorizontal: 5 }} // ajuste o estilo conforme necessário
        />
      );
    } else if (data.attributes.aparelho === 'Freezer') {
      return (
        <Image
          source={require('./imagens/freezer.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
          style={{ width: 30, height: 30, marginHorizontal: 5 }} // ajuste o estilo conforme necessário
        />
      );
    } else {
      return (
        <Image
          source={require('./imagens/outros.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
          style={{ width: 30, height: 30, marginHorizontal: 5 }} // ajuste o estilo conforme necessário
        />
      );
    }
  };

  function formatarData(dataString) {
    const dataISO = new Date(dataString + 'T00:00:00');
    const dia = dataISO.getDate();
    const mes = (dataISO.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataISO.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  }

  if (data.attributes.dataFinalizado != null && data.attributes.dataFinalizado !== undefined){
    return (
    <View style={styles.container}>
      <View style={styles.header}>
      
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} >
            <Text style={styles.text}>
              {' '}
              {data.attributes.aparelho === 'outros'
                ? data.attributes.outros
                : data.attributes.aparelho}{' '}
            </Text>
            {figuras()}
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={ () => { setData(data); toggleModal(); }}>
          <IconeLixeira />
          </TouchableOpacity>
          </View>
        
      <View style={styles.content}>
        <View>
            <Text style={styles.text2}>Cliente: {data.attributes.cliente?.data?.attributes?.nome} </Text>
            <Text style={styles.text2}>Contato: {data.attributes.cliente?.data?.attributes?.telefone} </Text>
            <Text style={styles.text2}>Endereço: {data.attributes.cliente?.data?.attributes?.endereco} </Text>
            <Text style={styles.text2}>Iniciado em: {`${formatarData(data.attributes.dataIniciado)}`} </Text>
            <Text style={styles.text2}>Finalizado em: {`${formatarData(data.attributes.dataFinalizado)} `} </Text>
            <Text style={styles.text2}>Descrição do serviço: {data.attributes.descricao} </Text>
            <Text style={styles.text2}>Valor do serviço: {data.attributes.valorTotal} </Text>
            <Text style={styles.text2}>Status de pagamento: {data.attributes.valorRecebido} </Text>          
            <Text style={styles.text2}>Despesas: {data.attributes.totalDespesas} </Text>
        </View>
        <MaterialCommunityIcons name="calendar-check" size={70} color="#00A86B" />
      </View>

      <View style={{}}>
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
              <TouchableOpacity style={styles.bot} onPress={mostrarMensagemExcluido}>
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
              onPress={() => setExcluidoModalVisible(false)}>
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        
          
    </View>
  );

  } else {
    return null;
  }
  
};



    const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#fff',
        borderColor: '#015C92',
        marginTop: 10,
        borderBottomWidth: 3,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    text: {
        fontFamily: 'Urbanist_900Black',
        textAlign: 'center',
        fontSize: 18,
        color: '#015C92',
    },

    text2: {
        fontSize: 14,
        color: '#015C92',
        fontFamily: 'Urbanist_700Bold',
        maxWidth: 230,
    },

    img: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: 15,
        marginHorizontal: 20,
    },

    botao: {
        width: 150,
        height: 44,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#379BD8',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 4,
    },

    botao2: {
        width: 150,
        height: 44,
        backgroundColor: '#379BD8',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 4,
    },

    textbotao: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Urbanist_900Black',
        textAlign: 'center',
    },

    textbotao2: {
        fontSize: 14,
        color: '#379BD8',
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












