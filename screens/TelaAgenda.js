import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StatusBar, Modal, StyleSheet } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { format } from 'date-fns';
import axios from 'axios';
import { 
  configAxios,
  baseUrlagendamentos,
  baseUrlAgendamentos
} from '../util/constantes';

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'br';




function generateEmptyDates(startDate, endDate, agendamento) {
  const emptyDates = {};
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Adiciona apenas os dias com serviços agendados
    if (agendamento.some(item => item.attributes.data === formattedDate)) {
      emptyDates[formattedDate] = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return emptyDates;
}




export default function TelaAgenda() {
  const [agendamento, setagendamento] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [items, setItems] = useState({});

  const [selectedDate, setSelectedDate] = useState(new Date()); // Definir a data selecionada como o dia atual

  const navigation = useNavigation();

  useEffect(() => {
      axios
        .get('https://back-graciano--claragoncalves3.repl.co/api/agendamentos/?populate=*', configAxios)
        .then(function (response) {
          setagendamento(response.data.data);
          setAtualizaLista(false);
        })
        .catch(error => {
          console.log(error);
        });
    }, [atualizaLista]);


  useEffect(() => {
    const startDate = new Date(); // Defina a data de início, se desejar
    const endDate = new Date(); // Defina a data de término, se desejar
    endDate.setDate(endDate.getDate() + 365);
    const newItems = generateEmptyDates(startDate, endDate, agendamento);


    agendamento.forEach((item) => {
      const date = item.attributes.data; //  "data" = 'YYYY-MM-DD'
      if (!newItems[date]) {
        newItems[date] = [];
      }
      newItems[date].push({
        // name: `Cliente: ${item.attributes.cliente.data.attributes.nome}`,
        // hour: `Hora: ${item.attributes.hora}`
        aparelho: `Aparelho: ${item.attributes.aparelho === 'outros' ? item.attributes.outros : item.attributes.aparelho}`,
      });
    });

    setItems(newItems);
  }, [agendamento]); // analisar

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

  const loadItems = (day) => {
    setTimeout(() => {
      // Carregar itens adicionais para o dia, se necessário
      <text>sem serviços</text>
    }, 1);
  }
  
   

  const renderItem = (item) => {
    
    return (
      <View>
        <TouchableOpacity style={{ marginRight: 10, marginTop: 20 }} activeOpacity={0.7} onPress={() => navigation.navigate("visualizar", { data: item, setAtualizaLista })}>
          <Card>
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.textbotao3}>{item.name}</Text>
                  <Text style={styles.textbotao3}>{item.hour}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={toggleModal}>
                  <Feather
                    name="trash-2"
                    color="#2D82B5"
                    size={22}
                    style={{ alignSelf: 'center' }}
                  />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  const calendarTheme = {
    calendarBackground: '#88CDF6', 
    dayTextColor: '#FFF',
    todayTextColor: '#FFF', 
    selectedDayBackgroundColor: '#015C92',
    selectedDayTextColor: '#88CDF6', 
    dotColor: '#015C92',
    textSectionTitleColor: "#FFF",
    monthTextColor: "#FFF",
    agendaKnobColor: '#015C92', // Cor do botão para carregar mais eventos
    selectedDay: {
      backgroundColor: '#88CDF6', // Cor de fundo dos dias com eventos
      borderRadius: 0,
    },
    'stylesheet.calendar.main': {
      emptyDayContainer: {
        backgroundColor: '#f0f0f0', // Cor de fundo para dias sem serviços
      },
    },
  };

  const renderEmptyItem = () => <View style={styles.emptyItem} />;

  return (
    <View style={{ flex: 1}}>
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Agenda</Text>
      </View>
      <Agenda
        items={items}
        renderItem={renderItem}
        theme={calendarTheme}
        ListFooterComponent={renderEmptyItem}
        hideKnob={false}
        selected={selectedDate} 
      />
      

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
};

const styles = StyleSheet.create({
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

  textbotao3: {
    fontSize: 14,
    color: '#015C92',
    fontFamily: 'Urbanist_900Black',
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
  },
  detalhe: {
    backgroundColor: '#88CDF6',
    posistion: 'absolute',
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
  emptyItem: {
    height: 2000, 
  },
});

















// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text, StatusBar, Modal, StyleSheet } from 'react-native';
// import { Agenda, LocaleConfig } from 'react-native-calendars';
// import { Feather } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { Card } from 'react-native-paper';
// import { format } from 'date-fns';
// import axios from 'axios';
// import { 
//   configAxios,
//   baseUrlagendamentos,
//   baseUrlAgendamentos
// } from '../util/constantes';

// LocaleConfig.locales['br'] = {
//   monthNames: [
//     'Janeiro',
//     'Fevereiro',
//     'Março',
//     'Abril',
//     'Maio',
//     'Junho',
//     'Julho',
//     'Agosto',
//     'Setembro',
//     'Outubro',
//     'Novembro',
//     'Dezembro',
//   ],
//   monthNamesShort: [
//     'Jan',
//     'Fev',
//     'Mar',
//     'Abr',
//     'Mai',
//     'Jun',
//     'Jul',
//     'Ago',
//     'Set',
//     'Out',
//     'Nov',
//     'Dez',
//   ],
//   dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
//   dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
//   today: 'Hoje',
// };

// LocaleConfig.defaultLocale = 'br';




// function generateEmptyDates(startDate, endDate) {
//   const emptyDates = {};
//   const currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     const formattedDate = currentDate.toISOString().split('T')[0];
//     emptyDates[formattedDate] = [];
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return emptyDates;
// }



// export default function TelaAgenda() {
//   const [agendamento, setagendamento] = useState([]);
//   const [atualizaLista, setAtualizaLista] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
//   const [modalVisible2, setModalVisible2] = useState(false);
//   const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
//   const [items, setItems] = useState({});

//   const [selectedDate, setSelectedDate] = useState(new Date()); // Definir a data selecionada como o dia atual

//   const navigation = useNavigation();

//   useEffect(() => {
//       axios
//         .get('https://back-graciano--claragoncalves3.repl.co/api/agendamentos/?populate=*', configAxios)
//         .then(function (response) {
//           setagendamento(response.data.data);
//           setAtualizaLista(false);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }, [atualizaLista]);


//   useEffect(() => {
//     const startDate = new Date(); // Defina a data de início, se desejar
//     const endDate = new Date(); // Defina a data de término, se desejar
//     endDate.setDate(endDate.getDate() + 365);
//     const newItems = generateEmptyDates(startDate, endDate);

//     agendamento.forEach((item) => {
//       const date = item.attributes.data; //  "data" = 'YYYY-MM-DD'
//       if (!newItems[date]) {
//         newItems[date] = [];
//       }
//       newItems[date].push({
//         name: `Cliente: ${item.attributes.cliente.data.id.attributes.nome}`,
//         // hour: `Hora: ${item.attributes.hora}`
//         // aparelho: `Aparelho: ${item.attributes.aparelho === 'outros' ? item.attributes.outros : item.attributes.aparelho}`,
//       });
//     });

//     setItems(newItems);
//   }, [agendamento]); // analisar

//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   const mostrarMensagemExcluido = () => {
//     setExcluidoModalVisible(true);
//     toggleModal();
//   };

//   const toggleModal2 = () => {
//     setModalVisible2(!modalVisible2);
//   };

//   const mostrarMensagemExcluido2 = () => {
//     setExcluidoModalVisible2(true);
//     toggleModal2();
//   };

//   const loadItems = (day) => {
//     setTimeout(() => {
//       // Carregar itens adicionais para o dia, se necessário
//       <text>sem serviços</text>
//     }, 1);
//   }
  
   

//   const renderItem = (item) => {
    
//     return (
//       <View>
//         <TouchableOpacity style={{ marginRight: 10, marginTop: 20 }} activeOpacity={0.7} onPress={() => navigation.navigate("visualizar", { data: item, setAtualizaLista })}>
//           <Card>
//             <Card.Content>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}>
//                 <View>
//                   <Text style={styles.textbotao3}>{item.name}</Text>
//                   <Text style={styles.textbotao3}>{item.hour}</Text>
//                 </View>
//                 <TouchableOpacity activeOpacity={0.7} onPress={toggleModal}>
//                   <Feather
//                     name="trash-2"
//                     color="#2D82B5"
//                     size={22}
//                     style={{ alignSelf: 'center' }}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </Card.Content>
//           </Card>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const calendarTheme = {
//     calendarBackground: '#88CDF6', 
//     dayTextColor: '#FFF',
//     todayTextColor: '#FFF', 
//     selectedDayBackgroundColor: '#015C92',
//     selectedDayTextColor: '#88CDF6', 
//     dotColor: '#015C92',
//     textSectionTitleColor: "#FFF",
//     monthTextColor: "#FFF",
//     agendaKnobColor: '#015C92', // Cor do botão para carregar mais eventos
//     selectedDay: {
//       backgroundColor: '#88CDF6', // Cor de fundo dos dias com eventos
//       borderRadius: 0,
//     },
//     'stylesheet.calendar.main': {
//       emptyDayContainer: {
//         backgroundColor: '#f0f0f0', // Cor de fundo para dias sem serviços
//       },
//     },
//   };

//   const renderEmptyItem = () => <View style={styles.emptyItem} />;

//   return (
//     <View style={{ flex: 1}}>
//       <View style={styles.detalhe}>
//         <Text style={styles.text1}>Agenda</Text>
//       </View>
//       <Agenda
//         items={items}
//         loadItemsForMonth={loadItems}
//         renderItem={renderItem}
//         theme={calendarTheme}
//         ListFooterComponent={renderEmptyItem}
//         hideKnob={false}
//         selected={selectedDate} 
//       />
      

//       <View>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={toggleModal}>
//           <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.textbotao}>Deseja excluir esse serviço?</Text>
//               <View style={styles.bots}>
//                 <TouchableOpacity style={styles.bot} onPress={mostrarMensagemExcluido}>
//                   <Text style={styles.textbotao2} >Sim</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
//                   <Text style={styles.textbotao} >Cancelar</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={excluidoModalVisible}
//         onRequestClose={() => setExcluidoModalVisible(false)}>
//         <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.textbotao}>Serviço excluído com sucesso!</Text>
//             <TouchableOpacity
//               style={styles.bot3}
//               onPress={() => setExcluidoModalVisible(false)}>
//               <Text style={styles.textbotao2}>Fechar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   textbotao: {
//     fontSize: 14,
//     color: 'white',
//     fontFamily: 'Urbanist_900Black',
//     textAlign: 'center',
//   },
  
//   textbotao2: {
//     fontSize: 14,
//     color: '#379BD8',
//     fontFamily: 'Urbanist_900Black',
//     textAlign: 'center',
//   },

//   textbotao3: {
//     fontSize: 14,
//     color: '#015C92',
//     fontFamily: 'Urbanist_900Black',
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
//   bot:{
//     width: 50,
//     height: 30,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center'
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
//   bot3:{
//     width: 80,
//     height: 30,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     marginTop: 20
//   },
//   bots:{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//     marginTop: 20
//   },
//   detalhe: {
//     backgroundColor: '#88CDF6',
//     posistion: 'absolute',
//     paddingLeft: 20,
//     paddingBottom: 10,
//     paddingTop: 10,
//     paddingRight: 20,
//   },
//   text1: {
//     fontSize: 30,
//     fontFamily: 'Urbanist_900Black',
//     color: '#015C92',
//     marginTop: 20,
//   },
//   emptyItem: {
//     height: 2000, 
//   },
// });