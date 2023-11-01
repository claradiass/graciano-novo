// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   Button
// } from 'react-native';

// import Grafico from './components/Grafico';

// import { LineChart } from 'react-native-chart-kit';

// export default function Mes() {

//   return (
//     <ScrollView style={styles.container}>
//       <SafeAreaView style={styles.content}>
//         <View style={styles.detalhe}>
//           <Text style={styles.text1}>Resumo mensal!</Text>
//         </View>

//         <Grafico />

//         <View style={{ marginTop: 30 }}>
//           <View style={styles.inf}>
//             <View style={styles.quadrado1} />
//             <Text style={styles.text5}>Despesas</Text>
//           </View>

//           <View style={styles.inf}>
//             <View style={styles.quadrado2} />
//             <Text style={styles.text5}>Lucro</Text>
//           </View>
//         </View>

//         <View style={{ marginTop: 30 }}>
//           <Text style={styles.text4}>Total do valor recebido: </Text>
//           <Text style={styles.text4}>Despesas: </Text>
//           <Text style={styles.text4}>Lucro: </Text>
//         </View>

//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   content: {
//     marginBottom: 90,
//   },
//   detalhe: {
//     posistion: 'absolute',
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#88CDF6',
//     borderBottomRightRadius: 40,
//     borderBottomLeftRadius: 40,
//     paddingLeft: 20,
//     paddingBottom: 30,
//     paddingTop: 10,
//     paddingRight: 20,
//   },
//   text1: {
//     fontSize: 30,
//     fontFamily: 'Urbanist_900Black',
//     color: '#015C92',
//     textAlign: 'center',
//     marginTop: 20,
//   },

//   text4: {
//     textAlign: 'center',
//     fontFamily: 'Urbanist_900Black',
//     color: '#015C92',
//     fontSize: 16,
//     marginTop: 10,
//   },

//   text5: {
//     textAlign: 'center',
//     fontFamily: 'Urbanist_900Black',
//     color: '#015C92',
//     fontSize: 16,
//     marginLeft: 10,
//   },

//   quadrado1: {
//     height: 25,
//     width: 25,
//     backgroundColor: '#379BD8',
//     borderRadius: 50,
//     alignSelf: 'center',
//   },

//   quadrado2: {
//     height: 25,
//     width: 25,
//     backgroundColor: '#015C92',
//     borderRadius: 50,
//     alignSelf: 'center',
//   },
//   inf: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// type Data = {
//   expenses: number;
//   profits: number;
// };

// // Função para gerar dados fictícios de despesas e lucros para uma semana específica
// const generateDataForWeek = (selectedDate) => {
//   // Implementação fictícia para gerar dados de exemplo
//   const data = {
//     '2023-09-25': { expenses: 100, profits: 500 },
//     '2023-09-26': { expenses: 50, profits: 300 },
//     '2023-09-27': { expenses: 200, profits: 600 },
//     '2023-09-28': { expenses: 150, profits: 700 },
//     '2023-09-29': { expenses: 120, profits: 400 },
//     '2023-09-30': { expenses: 80, profits: 350 },
//     '2023-10-01': { expenses: 90, profits: 400 }, // Próxima semana
//   };

//   return data[selectedDate] || { expenses: 0, profits: 0 };
// };

// const App = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [data, setData] = useState(null);

//   // Função para lidar com a seleção de data no calendário
//   const handleDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     const newData = generateDataForWeek(day.dateString);
//     setData(newData);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.calendarContainer}>
//         <Text style={styles.text6}>Calendário</Text>
//         <Calendar
//           onDayPress={handleDayPress}
//           markedDates={{ [selectedDate]: { selected: true } }}
//           theme={{
//             todayTextColor: 'blue',
//           }}
//         />
//       </View>
//       {data && (
//         <View style={styles.dataContainer}>
//           <Text style={styles.text6}>Dados da Semana Selecionada</Text>
//           <Text>Data: {selectedDate}</Text>
//           <Text>Despesas: ${data.expenses}</Text>
//           <Text>Lucros: ${data.profits}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   calendarContainer: {
//     flex: 1,
//   },
//   dataContainer: {
//     flex: 1,
//     marginTop: 20,
//   },
//   text6: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });

// export default App;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { format } from 'date-fns';

// import Grafico from './components/Grafico';
// import { LineChart } from 'react-native-chart-kit';

// const App = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [data, setData] = useState({ expenses: 0, profits: 0 });

//   const formatDateToBrazilian = (date) => {
//     if (!date) return '';
//     const [year, month, day] = date.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   const generateDataForWeek = (startDate) => {
//     let expenses = 0;
//     let profits = 0;

//     for (let i = 0; i < 7; i++) {
//       const currentDate = addDays(startDate, i);
//       const dailyData = generateDailyData(currentDate);
//       expenses += dailyData.expenses;
//       profits += dailyData.profits;
//     }

//     return { expenses, profits };
//   };

//   const generateDailyData = (date) => {
//     const data = {
//       '2023-09-25': { expenses: 100, profits: 500 },
//       '2023-09-26': { expenses: 50, profits: 300 },
//       '2023-09-27': { expenses: 200, profits: 600 },
//       '2023-09-28': { expenses: 150, profits: 700 },
//       '2023-09-29': { expenses: 120, profits: 400 },
//       '2023-09-30': { expenses: 80, profits: 350 },
//       '2023-10-01': { expenses: 90, profits: 400 },
//     };

//     return data[date] || { expenses: 0, profits: 0 };
//   };

//   const addDays = (dateString, days) => {
//     if (!dateString) return null;
//     const currentDate = new Date(dateString);
//     currentDate.setDate(currentDate.getDate() + days);
//     const year = currentDate.getFullYear();
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//     const day = String(currentDate.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const handleDayPress = (day) => {
//     setSelectedDate(day.dateString);
//     const newData = generateDataForWeek(day.dateString);
//     setData(newData);
//   };

//   const getMarkedDates = () => {
//     if (selectedDate) {
//       const markedDates = {};
//       markedDates[selectedDate] = {
//         startingDay: true,
//         color: '#015C92',
//         textColor: 'white',
//       };

//       for (let i = 1; i < 8; i++) {
//         const nextDate = addDays(selectedDate, i);
//         markedDates[nextDate] = { color: '#015C92', textColor: 'white' };
//       }

//       return markedDates;
//     }

//     return {};
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//       <View style={{marginBottom: 100}}>
//         <View style={styles.detalhe}>
//           <Text style={styles.text1}>Balanço</Text>
//         </View>
//         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
//   <Text style={styles.text6}>Resumo semanal</Text>
//   <View style={{ flex: 1, height: 2, backgroundColor: '#015C92', marginLeft: 10 }} />
// </View>
//         <View style={styles.calendarContainer}>
//           <Calendar
//             onDayPress={handleDayPress}
//             markingType={'period'}
//             markedDates={getMarkedDates()}
//             theme={{
//               calendarBackground: '#88CDF6',
//               dayTextColor: '#FFF',
//               dayBackgroundColor: 'black',
//               todayTextColor: '#015C92',
//               textSectionTitleColor: '#015C92',
//               monthTextColor: '#FFF',
//             }}
//             style={styles.roundedCalendar}
//           />
//         </View>
//         {data && (
//           <View style={styles.dataContainer}>
//             <Text style={styles.text7}>Dados da Semana Selecionada</Text>
//             <Text style={styles.text4}>Início da semana: {formatDateToBrazilian(selectedDate)}</Text>
//             <Text style={styles.text4}>
//               Fim da semana: {formatDateToBrazilian(addDays(selectedDate, 7))}
//             </Text>
//             <Text style={styles.text4}>Despesas: R${data.expenses}</Text>
//             <Text style={styles.text4}>Lucros: R${data.profits}</Text>
//           </View>
//         )}

//         <View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <Text style={styles.text6}>Resumo mensal</Text>
//             <View
//               style={{
//                 flex: 1,
//                 height: 2,
//                 backgroundColor: '#015C92',
//                 marginLeft: 10,
//               }}
//             />
//           </View>

//           <Grafico />

//           <View style={{ marginTop: 30 }}>
//             <View style={styles.inf}>
//               <View style={styles.quadrado1} />
//               <Text style={styles.text5}>Despesas</Text>
//             </View>

//             <View style={styles.inf}>
//               <View style={styles.quadrado2} />
//               <Text style={styles.text5}>Lucro</Text>
//             </View>
//           </View>

//           <View style={{ marginTop: 30 }}>
//             <Text style={styles.text4}>Total do valor recebido: </Text>
//             <Text style={styles.text4}>Despesas: </Text>
//             <Text style={styles.text4}>Lucro: </Text>
//           </View>
//         </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   calendarContainer: {
//     padding: 20,
//     flex: 1,
//   },
//   dataContainer: {
//     marginTop: 20,
//     marginBottom: 20
//   },
//   text6: {
//     fontSize: 20,
//     fontFamily: 'Urbanist_900Black',
//     color: '#015C92',
//     marginBottom: 10,
//     marginLeft: 8,
//   },
//   text7: {
//     fontSize: 20,
//     fontFamily: 'Urbanist_900Black',
//     color: '#015C92',
//     marginBottom: 10,
//     marginLeft: 8,
//     alignSelf: 'center',
//     textAlign: 'center'
//   },
//   roundedCalendar: {
//     borderRadius: 10,
//   },
//   detalhe: {
//     backgroundColor: '#88CDF6',
//     posistion: 'absolute',
//     paddingLeft: 20,
//     paddingBottom: 10,
//     paddingTop: 10,
//     paddingRight: 20,
//     borderBottomEndRadius: 40,
//   },
//   text1: {
//     fontSize: 30,
//     fontFamily: 'Urbanist_900Black',
//     color: '#015C92',
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   text4: {
//     textAlign: 'center',
//     fontFamily: 'Urbanist_900Black',
//     color: '#2D82B5',
//     fontSize: 16,
//     marginTop: 10,
//   },

//   text5: {
//     textAlign: 'center',
//     fontFamily: 'Urbanist_900Black',
//     color: '#015C92',
//     fontSize: 16,
//     marginLeft: 10,
//   },

//   quadrado1: {
//     height: 25,
//     width: 25,
//     backgroundColor: '#379BD8',
//     borderRadius: 50,
//     alignSelf: 'center',
//   },

//   quadrado2: {
//     height: 25,
//     width: 25,
//     backgroundColor: '#015C92',
//     borderRadius: 50,
//     alignSelf: 'center',
//   },
//   inf: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;





import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavegadorRelatorios from "../navegadores/NavegadorRelatorios"

export default function TelaRelatorio() {
  return (
    <View style={styles.container}>
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Relatório</Text>
      </View>
      <NavegadorRelatorios />        
    </View>
  );
};


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginTop: 20,
  },
  detalhe: {
    backgroundColor: '#88CDF6',
    posistion: 'absolute',
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
  },
})