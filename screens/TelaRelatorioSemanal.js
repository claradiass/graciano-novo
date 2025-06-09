import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';
import { useFocusEffect } from '@react-navigation/native';


export default function TelaRelatorioSemanal() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [servico, setServico] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(true);
  const [data, setData] = useState({ expenses: 0, profits: 0 });

  useFocusEffect(
    React.useCallback(() => {
      // Defina atualizaLista como true para buscar os dados mais recentes
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrlServicos, configAxios);
          setServico(response.data.data);
          setAtualizaLista(false);

          // Se uma data estiver selecionada, recalcule os dados
          
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [selectedDate]) // Execute sempre que a data selecionada for alterada
  );

  
  

  const formatDateToBrazilian = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const generateDataForWeek = (startDate, services) => {
    let expenses = 0;
    let profits = 0;
  
    for (let i = 1; i < 8; i++) {
      const currentDate = addDays(startDate, i);
      const dailyData = generateDailyData(currentDate, services);
      expenses += dailyData.expenses;
      profits += dailyData.profits;
    }
  
    return { expenses, profits };
  };
  

  console.log("-------------------------")
  const generateDailyData = (date) => {
    console.log("Searching for Date:", date);
  
    const selectedData = servico.filter(item => {
      // Verifica se item não é nulo e se a dataFinalizado começa com a data desejada
      return item && item.attributes && item.attributes.dataFinalizado && item.attributes.dataFinalizado.startsWith(date);
    });
  
    if (selectedData.length > 0) {
      let totalDespesas = 0;
      let totalProfits = 0;
  
      selectedData.forEach(item => {
        console.log("Item Found:", item);
  
        // Certifique-se de substituir 'totalDespesas' e 'valorTotal' pelos nomes reais das propriedades
        if (item.attributes && typeof item.attributes.totalDespesas === 'number' && !isNaN(item.attributes.totalDespesas)) {
          totalDespesas += item.attributes.totalDespesas;
        }
  
        if (item.attributes && typeof item.attributes.valorTotal === 'number' && !isNaN(item.attributes.valorTotal)) {
          totalProfits += item.attributes.valorTotal;
        }
      });
  
      console.log("Total Expenses:", totalDespesas);
      console.log("Total Profits:", totalProfits);
  
      return {
        expenses: totalDespesas,
        profits: totalProfits,
      };
    } else {
      console.log("No Data Found");
      return { expenses: 0, profits: 0 };
    }
  };
  
  
  

  const addDays = (dateString, days) => {
    if (!dateString) return null;
    const currentDate = new Date(dateString);
    currentDate.setDate(currentDate.getDate() + days);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const newData = generateDataForWeek(day.dateString, servico);
    setData(newData);
  };
  

  const getMarkedDates = () => {
    if (selectedDate) {
      const markedDates = {};
      markedDates[selectedDate] = {
        startingDay: true,
        endingDay: true,
        color: '#015C92',
        textColor: 'white',
      };
  
      for (let i = 1; i < 8; i++) {
        const nextDate = addDays(selectedDate, i);
        if (i === 7) {
          markedDates[nextDate] = { endingDay: true, color: '#015C92', textColor: 'white' };
        } else if (i === 1){
          markedDates[nextDate] = { startingDay: true, color: '#015C92', textColor: 'white' };
        } else {
          markedDates[nextDate] = { color: '#015C92', textColor: 'white' };
        }
      }
  
      return markedDates;
    }
  
    return {};
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho do relatório */}
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Relatório Semanal</Text>
      </View>
  
      <View style={{ marginTop: 70 }}>
        {/* Espaço para não cobrir o conteúdo com o cabeçalho */}
        <View style={{ marginBottom: 100 }}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markingType={'period'}
              markedDates={getMarkedDates()}
              theme={{
                calendarBackground: '#88CDF6',
                dayTextColor: '#FFF',
                dayBackgroundColor: 'black',
                todayTextColor: '#015C92',
                textSectionTitleColor: '#015C92',
                monthTextColor: '#FFF',
                arrowColor: '#FFF',
              }}
              style={styles.roundedCalendar}
            />
          </View>
  
          {data && (
            <View style={styles.dataContainer}>
              <Text style={styles.text7}>Dados da Semana Selecionada</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}
              >
                <View style={{
                  backgroundColor: '#88CDF6',
                  borderRadius: 10,
                  width: 110,
                  height: 150,
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                  <Text style={styles.text4}>Despesas</Text>
                  <Entypo name="emoji-sad" color="#015C92" size={40} />
                  <Text style={styles.text4}>R$ {data.expenses.toFixed(2)}</Text>
                </View>
  
                <View style={{
                  backgroundColor: '#88CDF6',
                  borderRadius: 10,
                  width: 110,
                  height: 150,
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                  <Text style={styles.text4}>Rendimento</Text>
                  <Entypo name="emoji-happy" color="#015C92" size={40} />
                  <Text style={styles.text4}>R$ {data.profits.toFixed(2)}</Text>
                </View>
  
                <View style={{
                  backgroundColor: '#015C92',
                  borderRadius: 10,
                  width: 110,
                  height: 150,
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                  <Text style={styles.text3}>Lucro</Text>
                  <Entypo name="emoji-flirt" color="#88CDF6" size={40} />
                  <Text style={styles.text3}>
                    R$ {(data.profits - data.expenses).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detalhe: {
    backgroundColor: '#88CDF6',
    position: 'absolute',
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    width: '100%',
    zIndex: 10,
    top: 0,
    paddingBottom: 20
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginTop: 40,
  },
  
  calendarContainer: {
    padding: 20,
    marginTop: 40
  },
  dataContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  text7: {
    fontSize: 20,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginBottom: 10,
    marginLeft: 8,
    alignSelf: 'center',
    textAlign: 'center',
  },
  roundedCalendar: {
    borderRadius: 10,
  },
  text3: {
    fontFamily: 'Urbanist_900Black',
    color: '#FFF',
    fontSize: 16,
    margin: 10,
  },
  text4: {
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    fontSize: 16,
    margin: 10,
  },
});
