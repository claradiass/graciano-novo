import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, StatusBar, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns-tz';

import axios from 'axios';
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';

const listaOpcoes = [
  {label: 'Selecionar', value: ''},
  {label: 'Ar-condicionado', value: 'Ar-condicionado'},
  {label: 'Geladeira', value: 'Geladeira'},
  {label: 'Freezer', value: 'Freezer'},
  {label: 'outros', value: 'outros'},
];

export default function TelaManutencaoAdicionar({ route }) {
  const [clienteDados, setClienteDados] = useState(route.params);
  const [nome, setNome] = useState(clienteDados.attributes.nome);
  const [telefone, setTelefone] = useState(clienteDados.attributes.telefone);
  const [endereco, setEndereco] = useState(clienteDados.attributes.endereco);
  const [cliente, setIdCliente] = useState(clienteDados.id);

  const [nomeAparelhoManual, setNomeAparelhoManual] = useState("");

  const hoje = new Date();
  const dataHoje = format(hoje, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
  const horarioHoje = format(hoje, 'HH:mm', { timeZone: 'America/Sao_Paulo' });
  const dataHorarioHoje = `${dataHoje} ${horarioHoje}`;

  const [descricao, setDescricao] = useState("");
  const [valorTotal, setValorTotal] = useState("0");
  const [totalDespesas, setTotalDespesas] = useState("0");
  const [valorRecebido, setValorRecebido] = useState("0");
  const [aparelho, setAparelho] = useState("");
  const [outros, setOutros] = useState("");
  const [dataFinalizado, setDataFinalizado] = useState(null);
  const [dataIniciado, setDataIniciado] = useState(dataHorarioHoje);

  function formatarData(dataString) {
    const data = new Date(dataString);
    
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
  
    const dataFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    return dataFormatada;
  }
  const [realizarAtualizacao, setRealizarAtualizacao] = useState(false);

  function adicionar() {
    if (!itemSelecionado) {
      Alert.alert("Atenção", "Você precisa escolher um aparelho!")
      return;
    }
    const dados = {
      data: {
        valorTotal,
        totalDespesas,
        valorRecebido,
        aparelho: listaOpcoes.includes(itemSelecionado) ? itemSelecionado : "outros",
        descricao,
        outros: nomeAparelhoManual, // Utilize o novo estado aqui
        dataIniciado,
        dataFinalizado,
        cliente
      },
    };

    axios.post(baseUrlServicos, dados, configAxios)
      .then(() => {
        setRealizarAtualizacao(true);
        navigation.navigate('TelaManutencaoLista', { realizarAtualizacao: true });
        
      })
      .catch(error => {
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Status code:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request failed:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  }

  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const navigation = useNavigation();

  const formatarValor = (input, setStateFunction) => {
    // Remove tudo que não for número
    const numeroLimpo = input.replace(/[^\d]/g, '');

    if (!numeroLimpo) {
      setStateFunction('0.00');
      return;
    }
    // Garante pelo menos 3 dígitos para evitar erros de slice
    const numeroComZeros = numeroLimpo.padStart(3, '0');
    const inteiro = numeroComZeros.slice(0, -2);
    const decimal = numeroComZeros.slice(-2);

    // Remove zeros à esquerda do inteiro, mas mantém pelo menos '0'
    const inteiroFormatado = String(Number(inteiro));

    const valorFormatado = `${inteiroFormatado}.${decimal}`;

    setStateFunction(valorFormatado);
  };

  const handlePickerChange = (itemValor) => {
    setItemSelecionado(itemValor);
    if (itemValor === 'outros') {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
    navigation.navigate('ClienteLista');
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

 return (
  <LinearGradient colors={['#88CDF6', '#2D82B5']} style={styles.container}>
    <ScrollView>
      <SafeAreaView style={styles.content}>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Adicionar nova manutenção</Text>
        </View>
        <View style={styles.area}>
          <View>
            <Text style={styles.text2}>Aparelho:</Text>

            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={itemSelecionado}
                onValueChange={handlePickerChange}
                dropdownIconColor="#fff"
                mode="dropdown"
              >
                {listaOpcoes.map((opcao, index) => (
                  <Picker.Item 
                    key={index} 
                    label={opcao.label} 
                    value={opcao.value} 
                  />
                ))}
              </Picker>
              {showInput && (
                <View>
                  <Text style={styles.text2}>Nome do aparelho: </Text>
                  <TextInput
                    style={styles.input}
                    value={nomeAparelhoManual}
                    onChangeText={setNomeAparelhoManual}
                    placeholder="Digite o nome do aparelho"
                    placeholderTextColor={'rgba(255,255,255,0.5)'}
                  />
                </View>
              )}
            </View>
          </View>

          <View>
            <Text style={styles.text2}>Nome: </Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor={'#fff'}
              value={nome}
              onChangeText={setNome}
              editable={false}
            />
          </View>

          <View>
            <Text style={styles.text2}>Data:</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor={'#fff'}
              value={formatarData(dataIniciado)}
              onChangeText={setDataIniciado}
              editable={false}
            />
          </View>

          <View>
            <Text style={styles.text2}>Descrição do serviço:</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor={'#fff'}
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>

          <View>
            <Text style={styles.text2}>Valor do serviço:</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#fff"
              keyboardType="numeric"
              value={valorTotal}
              onChangeText={(input) => formatarValor(input, setValorTotal)}
            />
          </View>
          <View>
            <Text style={styles.text2}>Despesas:</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"                
              placeholderTextColor={'#fff'}
              keyboardType="numeric"
              value={totalDespesas}
              onChangeText={(input) => formatarValor(input, setTotalDespesas)}              
            />
          </View>
          <View>
            <Text style={styles.text2}>Status de pagamento:</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor={'#fff'}
              keyboardType="numeric"
              value={valorRecebido}
              onChangeText={(input) => formatarValor(input, setValorRecebido)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.botao} activeOpacity={0.7} onPress={adicionar}>
          <Text style={styles.textbotao}>Adicionar Serviço</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Serviço adicionado com sucesso!</Text>
              <View style={styles.bots}>
                <TouchableOpacity style={styles.bot2} onPress={() => {
                  toggleModal2();
                  setRealizarAtualizacao(false);
                }}>
                  <Text style={styles.textbotao}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  </LinearGradient>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginBottom: 90,
  },
  detalhe: {
    paddingLeft: 20,
    paddingBottom: 25,
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
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
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
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
    marginTop: 20,
  },
  pickerContainer: {
    width: 320,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 50, // Aumentei a altura para melhor visualização
    color: '#fff',
    backgroundColor: 'transparent',
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
  bot2:{
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  bots:{
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center'
  }
});










