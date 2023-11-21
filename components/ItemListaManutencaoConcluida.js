import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ItemListaManutencaoConcluida({ data }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);

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

  // const servicosAtrasados = data.servicos.data.filter((item) => {
  //   // Verifica se a dataFinalizado é null
  //   return item.attributes.dataFinalizado === null;
  // });

  function formatarData(dataString) {
    const dataISO = new Date(dataString);
    const dataFormatada = `${dataISO.getDate()}/${dataISO.getMonth() + 1}/${dataISO.getFullYear()}`;
    return dataFormatada;
  }

  function formatarData2(dataString) {
    const partes = dataString.split('-');
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataFormatada;
  }

  const figuras = () => {
    if (data.attributes.aparelho === 'Geladeira') {
      return <MaterialCommunityIcons name="fridge" size={70} color="#B52D2D" />;
    } else if (data.attributes.aparelho === 'Ar-condicionado') {
      return <AntDesign name="hdd" size={70} color="#B52D2D" />;
    } else if (data.attributes.aparelho === 'Freezer') {
      return <FontAwesome5 name="box" size={60} color="#B52D2D" />;
    } else {
      return <MaterialIcons name="miscellaneous-services" size={70} color="#B52D2D" />;
    }
  };
  console.log(data.attributes.dataFinalizado)
  
  if (data.attributes.dataFinalizado != null) {
    return (
      <View style={styles.container}>
          <Text style={styles.text}> {data.attributes.aparelho === 'outros' ? data.attributes.outros : data.attributes.aparelho} </Text>
        <View style={styles.content}>
          <View>
          <Text style={styles.text2}> Cliente: {data.attributes.cliente.data.attributes.nome} </Text>
          <Text style={styles.text2}>Endereço: {data.attributes.cliente.data.attributes.endereco} </Text>

          <Text style={styles.text2}>Contato: {data.attributes.cliente.data.attributes.telefone} </Text>
          <Text style={styles.text2}>Iniciado em: {`${formatarData(data.attributes.dataIniciado)} ás ${data.attributes.dataIniciado.split('T')[1].split('.')[0].slice(0, -2).slice(':', -1)}`} </Text>
          <Text style={styles.text2}>Finalizado em: {formatarData2(data.attributes.dataFinalizado)}</Text>
          <Text style={styles.text2}>Descrição do serviço: {data.attributes.descricao} </Text>
          <Text style={styles.text2}>Valor do serviço: {data.attributes.valorRecebido} </Text>
          <Text style={styles.text2}>Status de pagamento: {data.attributes.valorRecebido} </Text>          
          <Text style={styles.text2}>Despesas: {data.attributes.valorRecebido} </Text>

          </View>
          <TouchableOpacity
        style={styles.botao}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('TelaManuntencaoAtualizar', data)}>
        <Text style={styles.textbotao}>Atualizar</Text>
      </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return null;
  }

};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 30,
    borderColor: '#379BD8',
    backgroundColor: 'rgba(188, 230, 255, 0.5)',
  },

  text: {
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
    fontSize: 18,
    color: '#379BD8',
    marginBottom: 10,
  },

  text2: {
    fontSize: 13,
    color: '#2D82B5',
    fontFamily: 'Urbanist_700Bold',
    maxWidth: 200,
    textAlign: 'center',
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
    marginHorizontal: 25,
  },
  botao: {
    width: 100,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#379BD8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  textbotao: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Urbanist_900Black',
  },
});


















