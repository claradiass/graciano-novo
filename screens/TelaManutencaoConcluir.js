import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const listaOpcoes = [
  'Escolha um',
  'ar-condicionado',
  'geladeira',
  'freezer',
  'outros',
];

export default function TelaManutencaoConcluir() {
  const navigation = useNavigation();
  
  const [itemSelecionado, setItemSelecionado] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);

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
    navigation.navigate('ManutencaoLista')
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };

  return (
    <LinearGradient colors={['#88CDF6', '#2D82B5']} style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.content}>
          <View style={styles.detalhe}>
            <Text style={styles.text1}>Atualizar manuntenção</Text>
          </View>
          <View style={styles.area}>
            <View>
            <View>
              <Text style={styles.text2}>Nome do cliente:</Text>
              
            </View>
            <View>
              <Text style={styles.text2}>Contato:</Text>
              
            </View>
            <View>
              <Text style={styles.text2}>Local:</Text>
              
            </View>
              <Text style={styles.text2}>Aparelho:</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={itemSelecionado}
                  onValueChange={handlePickerChange}>
                  {listaOpcoes.map((opcao, index) => (
                    <Picker.Item key={index} label={opcao} value={opcao} />
                  ))}
                </Picker>
                {showInput && (
                  <View>
                    <Text style={styles.text2}>Nome do aparelho: </Text>
                    <TextInput style={styles.input} />
                  </View>
                )}
              </View>

              
            </View>
            

            <View>
              <Text style={styles.text2}>Data:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
              />
            </View>

            <View>
              <Text style={styles.text2}>Horário:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
              />
            </View>

            <View>
              <Text style={styles.text2}>Descrição do serviço:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
              />
            </View>

          

            <View>
              <Text style={styles.text2}>Observações:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
              />
            </View>
            <View>
              <Text style={styles.text2}>Valor do serviço:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
              />
            </View>
            <View>
              <Text style={styles.text2}>Status de pagamento:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
              />
            </View>
            <View>
              <Text style={styles.text2}>Despesas:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={'#fff'}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.botao} activeOpacity={0.7} onPress={toggleModal}>
            <Text style={styles.textbotao}>Atualizar Serviço</Text>
          </TouchableOpacity>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Serviço atualizado com sucesso!</Text>
              <View style={styles.bots}>
              <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
                <Text style={styles.textbotao} >Fechar</Text>
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
    alignItems: 'center',
    marginVertical: 10,
  },
  picker: {
    width: 320,
    height: 30,
    fontSize: 16,
    color: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
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






// export default function Concluir() {
//   const [modalVisible, setModalVisible] = useState(false);

//   const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   const mostrarMensagemExcluido = () => {
//     setExcluidoModalVisible(true);
//     toggleModal();
//   };
//   return (
//     <LinearGradient colors={['#88CDF6', '#2D82B5']} style={styles.container}>
//       <ScrollView>
//         <SafeAreaView style={styles.content}>
//           <View style={styles.detalhe}>
//             <Text style={styles.text1}>Finalizar manuntenção</Text>
//           </View>

//           <View style={styles.area}>
//             <View>
//               <Text style={styles.text2}>Aparelho:</Text>
//             </View>

//             <View>
//               <Text style={styles.text2}>Nome do cliente:</Text>
//             </View>

//             <View>
//               <Text style={styles.text2}>Contato:</Text>
//             </View>
//             <View>
//               <Text style={styles.text2}>Local:</Text>
//             </View>
//             <View>
//               <Text style={styles.text2}>Data:</Text>
//             </View>

//             <View>
//               <Text style={styles.text2}>Tipo de manuntenção:</Text>
//             </View>

//             <View>
//               <Text style={styles.text2}>Pagamento:</Text>
//             </View>

//             <View>
//               <Text style={styles.text2}>Observações:</Text>
//             </View>

//             <View>
//               <Text style={styles.text2}>Atualizar pagamento:</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 placeholderTextColor={'#fff'}
//               />
//             </View>

//             <View>
//               <Text style={styles.text2}>Atualizar observações:</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 placeholderTextColor={'#fff'}
//               />
//             </View>

//             <View>
//               <Text style={styles.text2}>Valor recebido:</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 placeholderTextColor={'#fff'}
//                 keyboardType="numeric"
//               />
//             </View>

//             <View>
//               <Text style={styles.text2}>Despesas:</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 placeholderTextColor={'#fff'}
//                 keyboardType="numeric"
//               />
//             </View>

//             <View>
//               <Text style={styles.text2}>Peças Utilizadas:</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder=""
//                 placeholderTextColor={'#fff'}
//               />
//             </View>
//           </View>
//           <TouchableOpacity style={styles.botao} activeOpacity={0.7} onPress={toggleModal}>
//             <Text style={styles.textbotao}>Concluir Serviço</Text>
//           </TouchableOpacity>
//           <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={toggleModal}>
//           <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.textbotao}>Serviço concluido com sucesso!</Text>
//               <View style={styles.bots}>
//               <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
//                 <Text style={styles.textbotao} >Fechar</Text>
//               </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//         </SafeAreaView>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     marginBottom: 90,
//   },

//   detalhe: {
//     paddingBottom: 25,
//     paddingTop: 10,
//     paddingRight: 10,
//     paddingLeft: 10,
//     alignItems: 'center',
//   },
//   text1: {
//     fontSize: 30,
//     fontFamily: 'Urbanist_900Black',
//     color: '#fff',
//     textAlign: 'center',
//   },
//   text2: {
//     fontSize: 16,
//     fontFamily: 'Urbanist_700Bold',
//     color: '#fff',
//     marginBottom: 5,
//     marginTop: 10,
//   },

//   input: {
//     width: 320,
//     height: 40,
//     borderWidth: 3,
//     borderColor: '#fff',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     padding: 5,
//     paddingLeft: 15,
//     fontFamily: 'Urbanist_700Bold',
//     color: '#fff',
//     alignSelf: 'center',
//   },
//   area: {
//     marginHorizontal: 20,
//   },
//   botao: {
//     width: 200,
//     height: 44,
//     backgroundColor: '#88CDF6',
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginBottom: 10,
//     elevation: 4,
//     marginTop: 20,
//   },
//   textbotao: {
//     fontSize: 14,
//     color: 'white',
//     fontFamily: 'Urbanist_900Black',
//     textAlign: 'center',
//   },

//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#379BD8',
//     margin: 20,
//     width: 280,
//     height: 140,
//     borderRadius: 20,
//     padding: 35,
//     elevation: 5,
    
//   },
//   bot2:{
//     width: 80,
//     height: 30,
//     borderWidth: 2,
//     borderRadius: 10,
//     borderColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
    
//   },
//   bots:{
//     marginHorizontal: 20,
//     marginTop: 20,
//     alignSelf: 'center'
//   }
// });
